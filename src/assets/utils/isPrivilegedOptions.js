import { PRIVILEGED_TYPE } from '../../constants';

const PRIVILEGED_OPTIONS_DICT = {
  PENSION_CERTIFICATE: {
    value: 'PENSION_CERTIFICATE',
    label: 'Пенсійне посвідчення',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'PENSIONER',
  },
  VETERAN_CERTIFICATE: {
    value: 'VETERAN_CERTIFICATE',
    label: 'Посвідчення учасника війни',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'VETERAN',
  },
  DISABILITY_CERTIFICATE: {
    value: 'DISABILITY_CERTIFICATE',
    label: 'Посвідчення інваліда 2гр.',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'DISABLED',
  },
  CHERNOBYL_CERTIFICATE: {
    value: 'CHERNOBYL_CERTIFICATE',
    label: 'Посвідчення постраждалого на ЧАЕС (1,2 кат.)',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'CHERNOBYLETS',
  },
};

const NATURAL_OPTIONS_DICT = {
  DRIVING_LICENSE: {
    value: 'DRIVING_LICENSE',
    label: 'Посвідчення водія',
  },
  PASSPORT: {
    value: 'PASSPORT',
    label: 'Паспорт',
  },
  ID_PASSPORT: {
    value: 'ID_PASSPORT',
    label: 'ID карта',
  },
};

const PRIVILEGEDSelectOptions = [
  PRIVILEGED_OPTIONS_DICT.PENSION_CERTIFICATE,
  PRIVILEGED_OPTIONS_DICT.VETERAN_CERTIFICATE,
  PRIVILEGED_OPTIONS_DICT.DISABILITY_CERTIFICATE,
  PRIVILEGED_OPTIONS_DICT.CHERNOBYL_CERTIFICATE,
];
const NATURALSelectOptions = [
  NATURAL_OPTIONS_DICT.DRIVING_LICENSE,
  NATURAL_OPTIONS_DICT.PASSPORT,
  NATURAL_OPTIONS_DICT.ID_PASSPORT,
];

/* 
  словник з індивідуальними умовами для різних СК 
  з відповідним id,
  або для привілегійованих
  або для всіх інших
*/
export const docsOptionsDict = {
  294450: [NATURAL_OPTIONS_DICT.PASSPORT, NATURAL_OPTIONS_DICT.ID_PASSPORT],
  NATURAL: NATURALSelectOptions,
  PRIVILEGED: PRIVILEGEDSelectOptions,
};

/* 'PENSION_CERTIFICATE, DRIVING_LICENSE, E_PENSION_CERTIFICATE, PASSPORT, \
RESIDENCE_PERMIT, ID_PASSPORT, VETERAN_CERTIFICATE, ID_RESIDENCE_PERMIT, \
CHERNOBYL_CERTIFICATE, FOREIGN_PASSPORT, EXTERNAL_PASSPORT, DISABILITY_CERTIFICATE, \
BIRTH_CERTIFICATE, REGISTRATION_CARD' */
