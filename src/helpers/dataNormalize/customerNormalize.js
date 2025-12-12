import { homeAddress } from '../homeAddress';
import { normalizeDate } from '../normalizeDate';

export const customerNormalize = (
  insurerDataFormik,
  homeAddressFormik,
  contactsFormik
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
    type,
  } = insurerDataFormik?.values || {};

  const { phone, email } = contactsFormik?.values || {};

  const customer = {
    code: taxNumber,
    nameLast: surname,
    // nameFirst: name + ' ' + middleName,
    nameFirst: name,
    nameMiddle: middleName,
    address: homeAddress(homeAddressFormik),
    phone,
    email,
    birthDate: normalizeDate(birthDate),
    document: {
      type: type.value,
      number: number,
      date: normalizeDate(date),
      issuedBy: issuedBy,
    },
  };
  if (type.value === 'ID_PASSPORT') {
    customer.document.record = series;
  } else {
    customer.document.series = series;
  }
  return customer;
};
