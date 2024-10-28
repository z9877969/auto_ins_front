import { PRIVILEGED_TYPE } from '../../constants';

export const PRIVILEGEDSelectOptions = [
  {
    value: 'PENSION_CERTIFICATE',
    label: 'Пенсійне посвідчення',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'PENSIONER',
  },
  {
    value: 'VETERAN_CERTIFICATE',
    label: 'Посвідчення учасника війни',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'VETERAN',
  },
  {
    value: 'DISABILITY_CERTIFICATE.',
    label: 'Посвідчення інваліда 2гр.',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'DISABLED',
  },
  {
    value: 'CHERNOBYL_CERTIFICATE',
    label: 'Посвідчення постраждалого на ЧАЕС (1,2 кат.)',
    privilegeType: PRIVILEGED_TYPE.PRIVILEGED,
    customerStatus: 'CHERNOBYLETS',
  },
];
export const NATURALSelectOptions = [
  {
    value: 'DRIVING_LICENSE',
    label: 'Посвідчення водія',
  },
  {
    value: 'PASSPORT',
    label: 'Паспорт',
  },
  {
    value: 'ID_PASSPORT',
    label: 'ID карта',
  },
];
