export const DNUMBER_REGEX =
  /^([ABCEHIKMOPTXYА-ЯЇІЄ]{1,2}\d{4}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}|[ABCEHIKMOPTXYА-ЯЇІЄ]{3,4}\d{4}|\d{2}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}\d{4}|\d{4}[ABCEHIKMOPTXА-ЯЇІЄ]\d{1}|\d{4,6}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}|\d{4}[ABCEHIKMOPTXYА-ЯЇІЄ]{3}|[ABCEHIKMOPTXYА-ЯЇІЄ]{2}\d{4,5}|\d{3})$/;

export const VIN_REGEX = /^[(A-H|J-N|P|R-ZА-ДЄЖЗИЛПФЦЧШЩЮЯ){1,2}\d+]{5,17}$/;
export const NAME_REGEX = /^[a-zA-Zа-яіїйєґА-ЯІЇЙЄҐ\u2019\u2013'-\s]+$/;
export const SERIES_PASSPORT_REGEX = /^[а-яіїйєґА-ЯІЇЙЄҐ]{2}$/;
export const SERIES_DRIVING_LICENSE_REGEX = /^[а-яіїйєґА-ЯІЇЙЄҐ]{3}$/;
export const SERIES_PASSPORT_AND_DRIVING_LICENSE_REGEX =
  /^[а-яіїйєґА-ЯІЇЙЄҐ]{2,3}$/;
// eslint-disable-next-line
export const REQUIRED_FIELD = "Обов'язкове поле";
export const CATEGORY = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'E', 'F'];
export const CATEGORY_ERROR =
  'Транспорний засіб повиннен проходити обовязкове технічне обслуговування. Для прорахунку полісу зверніться будь-ласка до наших консультантів.';
export const mainRoutes = {
  CALCULATOR: '/calculator',
  AUTO_MODEL: '/automodel',
  GLOBAL: '/global',
};
Object.freeze(mainRoutes);
export const ENV = {
  VITE_PAYEE_ID: import.meta.env.VITE_PAYEE_ID,
  DEV: import.meta.env.DEV,
};
export const ORDER_TYPE = {
  BY_LICENSE_PLATE: 'by-license-plate',
  BY_PARAMS: 'by-params',
};
export const ENGINE_VOLUME_TYPES = {
  B1: {
    min: 0,
    max: 1600,
  },
  B2: {
    min: 1601,
    max: 2000,
  },
  B3: {
    min: 2001,
    max: 3000,
  },
  B4: {
    min: 3001,
  },
};
export const DATE_MESSAGE_ERRORS = {
  birthDate: 'Вік має бути більше 18 років',
  '100yearsOldDate': 'Вік має бути не більше 100 років',
  date: 'Має бути більше дати народження',
  startContract: 'Дата має бути більшою за поточну',
  dateFormat: 'Не коректна дата',
};
export const FORMIK_DATA_KEYS = {
  CONTACTS: 'contactsFormik',
  INSURED: 'insuredDataFormik',
  HOME_ADDRESS: 'homeAddressFormik',
  CAR: 'carDataFormik',
};
export const SAVED_ORDER_TYPE = {
  VCL: 'vcl',
  EPOLICY: 'epolicy', // needing for id
};
