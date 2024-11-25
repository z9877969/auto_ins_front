import { PRIVILEGED_TYPE, DOCS_TYPES_DICT } from '../../constants';

const PRIVILEGED_OPTIONS_DICT = {
  [DOCS_TYPES_DICT.PENSION_CERTIFICATE]: {
    value: DOCS_TYPES_DICT.PENSION_CERTIFICATE,
    label: 'Пенсійне посвідчення',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'PENSIONER',
  },
  [DOCS_TYPES_DICT.VETERAN_CERTIFICATE]: {
    value: DOCS_TYPES_DICT.VETERAN_CERTIFICATE,
    label: 'Посвідчення учасника війни',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'VETERAN',
  },
  [DOCS_TYPES_DICT.DISABILITY_CERTIFICATE]: {
    value: DOCS_TYPES_DICT.DISABILITY_CERTIFICATE,
    label: 'Посвідчення інваліда 2гр.',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'DISABLED',
  },
  [DOCS_TYPES_DICT.CHERNOBYL_CERTIFICATE]: {
    value: DOCS_TYPES_DICT.CHERNOBYL_CERTIFICATE,
    label: 'Посвідчення постраждалого на ЧАЕС (1,2 кат.)',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'CHERNOBYLETS',
  },
};

const NATURAL_OPTIONS_DICT = {
  [DOCS_TYPES_DICT.DRIVING_LICENSE]: {
    value: DOCS_TYPES_DICT.DRIVING_LICENSE,
    label: 'Посвідчення водія',
    privilegeType: PRIVILEGED_TYPE.NATURAL,
    customerStatus: null,
  },
  [DOCS_TYPES_DICT.PASSPORT]: {
    value: DOCS_TYPES_DICT.PASSPORT,
    label: 'Паспорт',
    privilegeType: PRIVILEGED_TYPE.NATURAL,
    customerStatus: null,
  },
  [DOCS_TYPES_DICT.ID_PASSPORT]: {
    value: DOCS_TYPES_DICT.ID_PASSPORT,
    label: 'ID карта',
    privilegeType: PRIVILEGED_TYPE.NATURAL,
    customerStatus: null,
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

export const docsOptionsDict = {
  NATURAL: NATURALSelectOptions,
  PRIVILEGED: PRIVILEGEDSelectOptions,
};

/* 'PENSION_CERTIFICATE, DRIVING_LICENSE, E_PENSION_CERTIFICATE, PASSPORT, \
RESIDENCE_PERMIT, ID_PASSPORT, VETERAN_CERTIFICATE, ID_RESIDENCE_PERMIT, \
CHERNOBYL_CERTIFICATE, FOREIGN_PASSPORT, EXTERNAL_PASSPORT, DISABILITY_CERTIFICATE, \
BIRTH_CERTIFICATE, REGISTRATION_CARD' */