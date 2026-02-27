import { SAVED_ORDER_TYPE } from '@constants/index';
import { convertCurTimeToUTC } from 'helpers/convertCurTimeToUTC';

export const contractSaveOSAGONormalize = (
  userParams,
  user,
  tariff,
  customerInsuriensObject,
  privilegeData,
  driverAge,
) => {
  const { customer, insuranceObject } = customerInsuriensObject;
  const requestBody = {
    type: SAVED_ORDER_TYPE.EPOLICY,
    ...user,
    customer,
    tariff,
    insuranceObject,
    dateFrom: convertCurTimeToUTC(userParams?.dateFrom),
    state: 'DRAFT',
    // = new period info data -Start =
    period: {
      value: 12,
      datePeriodType: 'MONTHS',
    },
    // = new period info data -End =
  };
  if (privilegeData) {
    requestBody.privilegeType = privilegeData.customerStatus;
  }
  if (driverAge.min) {
    requestBody.driverMinAge = driverAge.min;
  }
  if (driverAge.max) {
    requestBody.driverMaxAge = driverAge.max;
  }

  return requestBody;
};
