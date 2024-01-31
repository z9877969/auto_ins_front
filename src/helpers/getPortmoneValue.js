const portmoneFormProps = {
  PAYEE_ID: "133520",
  SUCCESS_URL: "http://localhost:5173/form?type=order-emmited",
  // FAILURE_URL: "http://localhost:5173/form?type=order-payment",
  FAILURE_URL: "http://localhost:5173/form",
};

export const getPortmoneValue = ({
  description,
  emailAddress,
  shopOrderNumber,
  lang,
  billAmount,
  billCurrency,
}) => ({
  paymentTypes: {
    card: "Y",
    // portmone: "Y",
    privat: "Y",
    gpay: "Y",
    token: "N",
    clicktopay: "N",
    createtokenonly: "N",
  },
  priorityPaymentTypes: {
    card: "1",
    portmone: "2",
    token: "0",
    clicktopay: "1",
    createtokenonly: "0",
  },
  payee: {
    payeeId: portmoneFormProps.PAYEE_ID,
    login: "",
    dt: "",
    signature: "",
    shopSiteId: "",
  },
  order: {
    description,
    shopOrderNumber,
    billAmount,
    billCurrency,
    successUrl: portmoneFormProps.SUCCESS_URL,
    failureUrl: portmoneFormProps.FAILURE_URL,
    preauthFlag: "N",
    expTime: 1200,
    // attribute1: "1",
    // attribute2: "2",
    // attribute3: "3",
    // attribute4: "4",
    // attribute5: "",
    // encoding: "",
  },
  token: {
    tokenFlag: "N",
    returnToken: "N",
    token: "",
    cardMask: "",
    otherPaymentMethods: "Y",
    sellerToken: "",
  },
  payer: {
    lang,
    emailAddress,
  },
  style: {
    type: "light",
    logo: "",
    logoWidth: "300px",
    backgroundColorHeader: "#ff0000",
    backgroundColorButtons: "#212121",
    colorTextAndIcons: "#212121",
    borderColorList: "#123456",
    bcMain: "#00000050",
  },
});
