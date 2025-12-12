import { customerNormalize } from './dataNormalize/customerNormalize';
import { insuranceObjectNormalize } from './dataNormalize/insuranceObjectNormalize';

export const customerInsuriensObject = (
  insuredDataFormik,
  homeAddressFormik,
  contactsFormik,
  carDataFormik,
  insurObject,
  registrationPlaceId,
  privilegeData,
  otkData
) => {
  const customer = customerNormalize(
    insuredDataFormik,
    homeAddressFormik,
    contactsFormik
  );
  const insuranceObject = insuranceObjectNormalize(
    carDataFormik,
    insurObject,
    registrationPlaceId,
    privilegeData,
    otkData
  );
  return { customer, insuranceObject };
};
