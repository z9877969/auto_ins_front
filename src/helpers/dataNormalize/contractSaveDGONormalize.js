import format from 'date-fns/format';

export const contractSaveDGONormalize = (
  userParams,
  user,
  dgoTariff,
  insurObject,
  customerInsuriensObject,
  privilegeData
) => {
  const { customer, insuranceObject } = customerInsuriensObject;
  const requestBody = {
    type: 'vcl',
    ...user,
    customer,
    tariff: { id: dgoTariff?.id, type: dgoTariff?.type },
    insuranceObject: {
      ...insuranceObject,
      engineVolume: insurObject?.engineVolume,
    },
    dateFrom: format(
      new Date(userParams?.dateFrom),
      'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxxx'
    ),
    date: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxxx'),
    state: 'DRAFT',

    limit: dgoTariff?.limit,
  };

  if (privilegeData) {
    requestBody.privilegeType = privilegeData.customerStatus;
  }

  return requestBody;
};
