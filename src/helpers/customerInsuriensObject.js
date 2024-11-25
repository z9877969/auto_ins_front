import { customerNormalize } from './dataNormalize/customerNormalize';
import { insuranceObjectNormalize } from './dataNormalize/insuranceObjectNormalize';

export const customerInsuriensObject = (
  insuredDataFormik,
  homeAddressFormik,
  contactsFormik,
  carDataFormik,
  insurObject,
  registrationPlaceId,
  fullCarModel,
  privilegeData
) => {
  const customer = customerNormalize(
    insuredDataFormik,
    homeAddressFormik,
    contactsFormik,
  );
  const insuranceObject = insuranceObjectNormalize(
    carDataFormik,
    insurObject,
    registrationPlaceId,
    fullCarModel,
    privilegeData
  );
  return { customer, insuranceObject };
};
