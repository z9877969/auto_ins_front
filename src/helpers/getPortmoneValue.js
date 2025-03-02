import moment from 'moment';
import { ENV, PORTMONE_URL, FRONT_URL, BACK_URL } from '../constants';

const portmoneFormProps = {
  PAYEE_ID: ENV.PORTMONE_PAYEE_ID,
  GET_SUCCESS_URL: ({
    vclId,
    epolicyId,
    amount,
    userId,
    salePointId,
    orderId,
  }) =>
    `${BACK_URL}/api/orders/contractpayment/redirect` +
    `?epolicy=${epolicyId}` +
    `&amount=${amount}` +
    `&userId=${userId}` +
    `&salePointId=${salePointId}` +
    `&orderId=${orderId}` +
    `&payDate=${moment().format('YYYY-MM-DDThh:mm:ss')}` +
    `${vclId ? `&vcl=${vclId}` : ''}`,
  FAILURE_URL: FRONT_URL + '/order/payment',
};

export const createPaymentUrl = (
  bodyRequest /* json object transformed to string */
) => {
  const url = new URL(PORTMONE_URL);

  const params = new URLSearchParams({
    typeRequest: 'json',
    bodyRequest,
  });

  url.search = params.toString();

  return url.toString();
};

export const getPortmoneValue = ({
  description,
  emailAddress,
  shopOrderNumber,
  lang,
  billAmount,
  billCurrency,
  contractId: { epolicyId, vclId },
  userId,
  salePointId,
  orderId,
}) => ({
  paymentTypes: {
    card: 'Y',
    portmone: 'Y',
    privat: 'Y',
    gpay: 'Y',
    token: 'N',
    clicktopay: 'N',
    createtokenonly: 'N',
  },
  priorityPaymentTypes: {
    gpay: '1',
    privat: '2',
    card: '3',
    portmone: '4',
    token: '0',
    clicktopay: '0',
    createtokenonly: '0',
  },
  payee: {
    payeeId: portmoneFormProps.PAYEE_ID,
    login: '',
    dt: '',
    signature: '',
    shopSiteId: '',
  },
  order: {
    description,
    shopOrderNumber,
    billAmount,
    billCurrency,
    successUrl: portmoneFormProps.GET_SUCCESS_URL({
      epolicyId,
      vclId,
      amount: billAmount,
      userId,
      salePointId,
      orderId,
    }),
    failureUrl: portmoneFormProps.FAILURE_URL,
    preauthFlag: 'N',
    expTime: 1200,
    // attribute1: "1",
    // attribute2: "2",
    // attribute3: "3",
    // attribute4: "4",
    // attribute5: "",
    // encoding: "",
  },
  token: {
    tokenFlag: 'N',
    returnToken: 'N',
    token: '',
    cardMask: '',
    otherPaymentMethods: 'Y',
    sellerToken: '',
  },
  payer: {
    lang,
    emailAddress,
  },
  style: {
    // type: "light",
    type: 'portmone',
    logo: '',
    logoWidth: '300px',
    backgroundColorHeader: '#ff0000',
    backgroundColorButtons: '#212121',
    colorTextAndIcons: '#212121',
    borderColorList: '#123456',
    bcMain: '#00000050',
  },
});
