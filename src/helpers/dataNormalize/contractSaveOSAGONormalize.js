// import format from 'date-fns/format';
import { convertCurTimeToUTC } from 'helpers/convertCurTimeToUTC';

export const contractSaveOSAGONormalize = (
  userParams,
  user,
  tariff,
  customerInsuriensObject,
  privilegeData
) => {
  const { customer, insuranceObject } = customerInsuriensObject;
  const requestBody = {
    type: 'epolicy',
    ...user,
    customer,
    tariff,
    insuranceObject,
    dateFrom: convertCurTimeToUTC(userParams?.dateFrom),
    // dateFrom: format(
    //   new Date(userParams?.dateFrom),
    //   'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxxx'
    // ),
    state: 'DRAFT',
  };
  if (privilegeData) {
    requestBody.privilegeType = privilegeData.customerStatus;
  }

  return requestBody;
};
