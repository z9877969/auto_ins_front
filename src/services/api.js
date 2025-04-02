import { BACK_URL } from '@constants/index';
import axios from 'axios';

export const instance = axios.create({
  baseURL: BACK_URL + '/api',
});

export const getOrderPasswordApi = async (contractId) => {
  return await instance.get(`orders/${contractId}`);
};

export const checkOrderPasswordApi = async ({ contractId, password }) => {
  return await instance.get(`orders/${contractId}/check`, {
    params: {
      password,
    },
  });
};

/* 
**response
  "id": 15633664,
  "number": "207965102",
  warning: []
*/
export const requestOrderApi = async ({ epolicy, vcl }) => {
  const { data } = await instance.post(
    `orders/${epolicy}/request`,
    {},
    {
      params: {
        epolicy,
        vcl,
      },
    }
  );
  return data;
};

export const emmitOrderApi = async ({ epolicy, vcl, ...rest }) => {
  await instance.post(
    `/orders/${epolicy}/emmit`,
    {},
    {
      params: {
        epolicy,
        vcl,
        ...rest,
      },
    }
  );
  return true;
};

export const createContractPaymentApi = async ({
  contractId,
  amount,
  orderId,
  linkInvoice,
}) => {
  await instance.post('/orders/contractpayment/createContractPayment', null, {
    params: {
      contractId,
      amount,
      orderId,
      linkInvoice,
    },
  });
  return true;
};

export const confirmContractPaymentApi = async ({
  contractId,
  amount,
  orderId,
  payDate,
}) => {
  await instance.post('/orders/contractpayment/confirmContractPayment', null, {
    params: {
      contractId,
      amount,
      orderId,
      payDate,
    },
  });
  return true;
};

export const getLinkInvoiceApi = async ({
  orderId,
  price,
  quantity,
  shoperEmail,
  expDate,
}) => {
  const { data } = await instance.get('/orders/pm/invoice/link', {
    params: { orderId, price, quantity, shoperEmail, expDate },
  });

  return data.linkInvoice;
};

export const addLogApi = async (errorData) => {
  try {
    await instance.post('/logs/type-error', errorData);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
};
