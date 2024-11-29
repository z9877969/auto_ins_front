import * as Yup from 'yup';
import {
  DNUMBER_REGEX,
  NAME_REGEX,
  REQUIRED_FIELD,
  VIN_REGEX,
  VEHICLES_TYPES,
  DATE_MESSAGE_ERRORS,
} from '../constants';
import { isDate, parse } from 'date-fns';
import { insurerDocsDict } from 'assets/utils/insurerDocsDict';

export const validationName = () =>
  Yup.string()
    .required(REQUIRED_FIELD)
    .matches(NAME_REGEX, 'Введіть лише літери')
    .min(2, 'Введіть щонайменше 2 символа')
    .max(50, 'Занадто довге поле');

const getIsValidEngineType = (type) => {
  // eslint-disable-next-line
  const message = "Об'єм двигуна не відповідає вибраній категорій";
  switch (type) {
    case 'B1':
      return Yup.number().max(VEHICLES_TYPES[type]?.max, message);
    case 'B2':
      return Yup.number()
        .min(VEHICLES_TYPES[type]?.min, message)
        .max(VEHICLES_TYPES[type]?.max, message);
    case 'B3':
      return Yup.number()
        .min(VEHICLES_TYPES[type]?.min, message)
        .max(VEHICLES_TYPES[type]?.max, message);
    case 'B4':
      return Yup.number().min(VEHICLES_TYPES[type].min, message);
  }
};

// === Date Validation -Start
const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'dd/MM/yyyy', new Date());

  return parsedDate;
};

export const validateFullAgeDate = () => {
  const today = new Date();
  const date18YearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const date100YearsAgo = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  );
  return Yup.date()
    .transform(parseDateString)
    .max(date18YearsAgo, DATE_MESSAGE_ERRORS['birthDate'])
    .min(date100YearsAgo, DATE_MESSAGE_ERRORS['100yearsOldDate'])
    .required(REQUIRED_FIELD);
};

export const validateRegistrationDate = () => {
  return Yup.date()
    .transform(parseDateString)
    .required('Date is required')
    .when('birthDate', ([birthDate], schema) => {
      return schema.test({
        test: function (date) {
          if (!birthDate || !date) {
            return true; // Пропускаємо перевірку, якщо значення відсутнє
          }
          return date > birthDate;
        },
        message: DATE_MESSAGE_ERRORS['date'],
      });
    });
};

export const validateContractStartDate = () => {
  const today = new Date();
  const dateMoreThenToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  return Yup.date()
    .transform(parseDateString)
    .min(dateMoreThenToday, DATE_MESSAGE_ERRORS['startContract'])
    .required(REQUIRED_FIELD);
};

// === Date Validation -End

// =============================================================================
export const carDataFormValidationSchema = ({
  isPrivilege,
  engineType,
  hasVclOrder,
} = {}) => {
  const schemaOptions = {
    outsideUkraine: Yup.boolean(),
    stateNumber: Yup.string()
      .required(REQUIRED_FIELD)
      .when('outsideUkraine', {
        is: false,
        then: () =>
          Yup.string()
            .required(REQUIRED_FIELD)
            .matches(DNUMBER_REGEX, 'Номер авто вказано невірно'),
      }),

    year: Yup.number()
      .integer('Рік повинен бути цілим числом')
      .typeError('Будь ласка, введіть рік')
      .required(REQUIRED_FIELD)
      .min(1900, 'Рік повинен бути не менше 1900'),
    maker: Yup.object()
      .shape({
        id: Yup.string().required(REQUIRED_FIELD),
      })
      .required(REQUIRED_FIELD),
    model: Yup.object()
      .shape({
        id: Yup.string().required(REQUIRED_FIELD),
      })
      .required(REQUIRED_FIELD),
    bodyNumber: Yup.string()
      .required(REQUIRED_FIELD)
      .matches(VIN_REGEX, 'VIN повинен містити до 17 літер'),
  };
  if (isPrivilege && engineType) {
    schemaOptions.engineVolume = getIsValidEngineType(engineType)
      .max(
        2500,
        // eslint-disable-next-line
        "Об'єм двигуна для пільговиків не може перевищувати 2500"
      )
      .required(REQUIRED_FIELD);
  } else if (hasVclOrder) {
    schemaOptions.engineVolume = Yup.number()
      .min(0, 'Повинно бути 0 або більше')
      .required(REQUIRED_FIELD);
  }
  return Yup.object().shape(schemaOptions);
};
// ===========================================================================
export const homeAddressFormValidationSchema = () =>
  Yup.object({
    regionANDcity: Yup.string().required(REQUIRED_FIELD),
    street: validationName(),
    houseNumber: Yup.string().required(REQUIRED_FIELD),
    apartmentNumber: Yup.string(),
  });
// ===========================================================================
export const insuredDataFormValidationSchema = ({ docType } = {}) => {
  const docData = insurerDocsDict[docType];

  return Yup.object().shape({
    surname: validationName(),
    name: validationName(),
    middleName: validationName(),
    birthDate: validateFullAgeDate(),
    taxNumber: Yup.string()
      .required(REQUIRED_FIELD)
      .matches(/^[0-9\s]*$/, 'Введіть лише числа')
      .min(10, 'ІПН повинен мати 10 символів')
      .max(10, 'ІПН повинен мати 10 символів'),
    series: Yup.string()
      .matches(docData.series.regex, { message: docData.series.message })
      .required(REQUIRED_FIELD),
    number: Yup.string()
      .matches(docData.number.regex, { message: docData.number.message })
      .required(REQUIRED_FIELD),
    issuedBy: Yup.string()
      .max(150, 'Максимум 150 знаків')
      .required(REQUIRED_FIELD),
    date: validateRegistrationDate(),
  });
};
// ===========================================================================
export const contactsValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('Введіть електронну пошту')
      .min(5, 'Електронна пошта вказана невірно')
      .matches(
        /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,9}$/,
        'Електронна пошта вказана невірно'
      ),
    phone: Yup.string()
      .required('Введіть номер телефону')
      .matches(
        /^\+\d{12}$/,
        'Номер телефону неправильний (введіть у форматі +380123456789)'
      ),
  });
