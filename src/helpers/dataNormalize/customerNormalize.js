import format from 'date-fns/format';
import { homeAddress } from '../homeAddress';

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
    address: homeAddress(homeAddressFormik),
    phone,
    email,
    // birthDate: format(insuredDataFormik.values.birthDate, 'yyyy-MM-dd'),
    birthDate: birthDate.split('/').reverse().join('-'),
    document: {
      type: identityCard.value,
      series: series,
      number: number,
      date: format(date, 'yyyy-MM-dd'),
      issuedBy: issuedBy,
    },
  };
  return customer;
};
