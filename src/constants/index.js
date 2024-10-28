export const DNUMBER_REGEX =
  // /^([ABCEHIKMOPTXYА-ЯЇІЄ]{1,2}\d{4}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}|[ABCEHIKMOPTXYА-ЯЇІЄ]{3,4}\d{4}|\d{2}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}\d{4}|\d{4}[ABCEHIKMOPTXА-ЯЇІЄ]\d{1}|\d{4,6}[ABCEHIKMOPTXYА-ЯЇІЄ]{2}|\d{4}[ABCEHIKMOPTXYА-ЯЇІЄ]{3}|[ABCEHIKMOPTXYА-ЯЇІЄ]{2}\d{4,5}|\d{3})$/;
  /^([A-ZА-ЯЇІЄ]{1,2}\d{4}[A-ZА-ЯЇІЄ]{2}|[A-ZА-ЯЇІЄ]{3,4}\d{4}|\d{2}[A-ZА-ЯЇІЄ]{2}\d{4}|\d{4}[A-ZА-ЯЇІЄ]\d{1}|\d{4,6}[A-ZА-ЯЇІЄ]{2}|\d{4}[A-ZА-ЯЇІЄ]{3}|[A-ZА-ЯЇІЄ]{2}\d{4,5}|\d{3})$/;

export const VIN_REGEX = /^[(A-H|J-N|P|R-ZА-ДЄЖЗИЛПФЦЧШЩЮЯ){1,2}\d+]{5,17}$/;
export const NAME_REGEX = /^[a-zA-Zа-яіїйєґА-ЯІЇЙЄҐ\u2019\u2013'-\s]+$/;
export const SERIES_PASSPORT_REGEX = /^[а-яіїйєґА-ЯІЇЙЄҐ]{2}$/;
export const SERIES_DRIVING_LICENSE_REGEX = /^[а-яіїйєґА-ЯІЇЙЄҐ]{3}$/;
export const SERIES_PASSPORT_AND_DRIVING_LICENSE_REGEX =
  /^[а-яіїйєґА-ЯІЇЙЄҐ]{2,3}$/;
// eslint-disable-next-line
export const REQUIRED_FIELD = "Обов'язкове поле";
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
export const PRIVILEGED_TYPE = {
  PRIVILEGED: 'PRIVILEGED',
  NATURAL: 'NATURAL',
};

export const VEHICLES_GROUPS = {
  A: {
    main: 'A',
    A1: 'A1',
    A2: 'A2',
  },
  B: {
    main: 'B',
    B1: 'B1',
    B2: 'B2',
    B3: 'B3',
    B4: 'B4',
  },
  C: {
    main: 'C',
    C1: 'C1',
    C2: 'C2',
  },
  D: {
    main: 'D',
    D1: 'D1',
    D2: 'D2',
  },
  EF: {
    main: 'EF',
    E: 'E',
    F: 'F',
  },
};

export const CATEGORY = Object.values(VEHICLES_GROUPS).reduce((acc, el) => {
  if (typeof el === 'object') {
    for (const key in el) {
      key !== 'main' && acc.push(el[key]);
    }
  } else {
    acc.push(el);
  }
  return acc;
}, []);

export const VEHICLES_TYPES = {
  [VEHICLES_GROUPS.A.A1]: {
    min: 0,
    max: 300,
  },
  [VEHICLES_GROUPS.A.A2]: {
    min: 301,
  },
  [VEHICLES_GROUPS.B.B1]: {
    min: 0,
    max: 1600,
  },
  [VEHICLES_GROUPS.B.B2]: {
    min: 1601,
    max: 2000,
  },
  [VEHICLES_GROUPS.B.B3]: {
    min: 2001,
    max: 3000,
  },
  [VEHICLES_GROUPS.B.B4]: {
    min: 3001,
  },
  [VEHICLES_GROUPS.C.C1]: {
    min: 0,
    max: 2000,
  },
  [VEHICLES_GROUPS.C.C2]: {
    min: 2001,
  },
  [VEHICLES_GROUPS.D.D1]: {
    min: 0,
    max: 20,
  },
  [VEHICLES_GROUPS.D.D2]: {
    min: 21,
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
