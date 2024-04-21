import { ENV } from '../constants';

// const URL = ENV.DEV ? 'http://localhost:4040' : 'https://api.auto-ins.com.ua';
const URL = 'https://api.auto-ins.com.ua';

const portmoneFormProps = {
  PAYEE_ID: ENV.VITE_PAYEE_ID,
  GET_SUCCESS_URL: ({ vclId, epolicyId }) =>
    `${URL}/api/orders/${epolicyId}/emmit?epolicy=${epolicyId}${
      vclId ? `&vcl=${vclId}` : ''
    }`,
  FAILURE_URL: URL + '/order/payment',
};

export const getPortmoneValue = ({
  description,
  emailAddress,
  shopOrderNumber,
  lang,
  billAmount,
  billCurrency,
  orderId: { epolicyId, vclId },
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
    successUrl: portmoneFormProps.GET_SUCCESS_URL({ epolicyId, vclId }),
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
