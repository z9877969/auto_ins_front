import { DOCS_TYPES_DICT } from '@constants/index';

/* 
валідація документів:
Паспорт 2 букви серії, 6 цифр номера.
Права до 3 букв серія,до 6 цифр номер. 
Всі пільгові від однієї до 3 букв серія, до 6 цифр номер
УНЗР "12345678-12345", і на номер "123456789"
*/

export const insurerDocsDict = {
  [DOCS_TYPES_DICT.DRIVING_LICENSE]: {
    series: {
      regex: /^(?:[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}|[a-zA-Z]{1,3})$/,
      placeholder: 'ААА',
      message: 'Макс. 3 літери / всі кирилиця або всі латиниця ',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.PASSPORT]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{2}$/,
      placeholder: 'АА',
      message: 'Повинно бути 2 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{6}$/,
      placeholder: '123456',
      message: 'Повинно бути 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.ID_PASSPORT]: {
    series: {
      regex: /^[0-9]{8}-[0-9]{5}$/,
      placeholder: '12345678-12345',
      message: 'Коректний формат 12345678-12345',
    },
    number: {
      regex: /^[0-9]{9}$/,
      placeholder: '123456789',
      message: 'Повинно бути 9 цифр',
    },
  },
  [DOCS_TYPES_DICT.PENSION_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.VETERAN_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.DISABILITY_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.CHERNOBYL_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  // // відкорегувати валідацію для даних документів
  [DOCS_TYPES_DICT.E_PENSION_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.COMBAT_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
  [DOCS_TYPES_DICT.WAR_DISABILITY_CERTIFICATE]: {
    series: {
      regex: /^[а-яіїйєґА-ЯІЇЙЄҐ]{1,3}$/,
      placeholder: 'ААА',
      message: 'Максимум 3 літери / Кирилиця',
    },
    number: {
      regex: /^[0-9]{1,6}$/,
      placeholder: '123456',
      message: 'Максимум 6 цифр',
    },
  },
};
