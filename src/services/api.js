import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4040/api',
  // baseURL: 'https://api.auto-ins.com.ua/api',
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

export const emmitOrderApi = async ({ epolicy, vcl }) => {
  await instance.post(
    `orders/${epolicy}/emmit`,
    {},
    {
      params: {
        epolicy,
        vcl,
      },
    }
  );
  return true;
};
