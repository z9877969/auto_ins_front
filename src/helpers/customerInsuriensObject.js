import { customerNormalize } from './dataNormalize/customerNormalize';
import { insuranceObjectNormalize } from './dataNormalize/insuranceObjectNormalize';

export const customerInsuriensObject = (
  insuredDataFormik,
  homeAddressFormik,
  contactsFormik,
  identityCard,
  carDataFormik,
  insurObject,
  registrationPlaceId,
  fullCarModel
) => {
  const customer = customerNormalize(
    insuredDataFormik,
    homeAddressFormik,
    contactsFormik,
    identityCard
  );
  const insuranceObject = insuranceObjectNormalize(
    carDataFormik,
    insurObject,
    registrationPlaceId,
    fullCarModel
  );
  return { customer, insuranceObject };
};
