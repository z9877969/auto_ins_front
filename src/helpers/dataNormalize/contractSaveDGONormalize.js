import format from 'date-fns/format';

export const contractSaveDGONormalize = (
  userParams,
  user,
  dgoTariff,
  insurObject,
  customerInsuriensObject,
  privilegeData,
  vclOrderData
) => {
  const { customer, insuranceObject } = customerInsuriensObject;
  const requestBody = {
    type: 'vcl',
    ...user,
    customer,
    tariff: { id: dgoTariff?.id, type: dgoTariff?.type },
    insuranceObject: {
      ...insuranceObject,
      engineVolume: insurObject?.engineVolume || vclOrderData.engineVolume,
    },
    dateFrom: format(
      new Date(userParams?.dateFrom),
      // eslint-disable-next-line
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxxx"
    ),
    // eslint-disable-next-line
    date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxxx"),
    state: 'DRAFT',

    limit: dgoTariff?.limit,
  };

  if (privilegeData) {
    requestBody.privilegeType = privilegeData.customerStatus;
  }
  if (vclOrderData) {
    requestBody.customFields = [
      {
        code: 'EWA_type_ts',
        value: vclOrderData.autoCategory,
      },
    ];
  }

  return requestBody;
};
