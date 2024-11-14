import { homeAddress } from '../homeAddress';
import { normalizeDate } from '../normalizeDate';

export const customerNormalize = (
  insuredDataFormik,
  homeAddressFormik,
  contactsFormik,
  identityCard
) => {
  const {
    taxNumber,
    surname,
    name,
    middleName,
    birthDate,
    series,
    number,
    date,
    issuedBy,
  } = insuredDataFormik?.values || {};

  const { phone, email } = contactsFormik?.values || {};

  const customer = {
    code: taxNumber,
    nameLast: surname,
    nameFirst: name + ' ' + middleName,
    nameMiddle: middleName,
    address: homeAddress(homeAddressFormik),
    phone,
    email,
    birthDate: normalizeDate(birthDate),
    document: {
      type: identityCard.value,
      series: series,
      number: number,
      date: normalizeDate(date),
      issuedBy: issuedBy,
    },
  };
  return customer;
};
