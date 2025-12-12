import { BACK_URL, mainRoutes } from '@constants/index';
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

export const createContractPaymentApi = async ({
  contractId /* { vcl, epolicy } */,
  amount /* { vcl, epolicy } */,
  orderId /* { vcl, epolicy } */,
  shoperEmail,
}) => {
  const { data } = await instance.post(
    '/orders/contractpayment/createContractPayment',
    null,
    {
      params: {
        epolicyAmount: amount.epolicy,
        ...(amount.vcl && { vclAmount: amount.vcl }),
        epolicyOrderId: orderId.epolicy,
        ...(orderId.vcl && { vclOrderId: orderId.vcl }),
        epolicyContractId: contractId.epolicy,
        ...(contractId.epolicy && { vclContractId: contractId.vcl }),
        shoperEmail,
      },
    }
  );

  return data.linkPayment;
};

export const addLogApi = async (errorData) => {
  try {
    await instance.post('/logs/type-error', errorData);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error.message);
  }
};

export const saveContractApi = async (body) => {
  const { data } = await instance.post(mainRoutes.GLOBAL + '/contract/save', {
    ...body,
    sourceInfo: 'https://auto-ins.com.ua/',
  });

  return data;
};

export const getIpnBlackListApi = async () => {
  const { data } = await instance.get(mainRoutes.GLOBAL + '/blacklist');

  return data;
};
