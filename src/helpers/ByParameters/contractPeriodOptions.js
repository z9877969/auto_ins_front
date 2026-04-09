import { CONTRACT_PERIOD } from '@constants/index';

export const contractPeriodOptions = Object.values(CONTRACT_PERIOD).map(
  ({ label, value, quantityInMonth }) => ({
    label,
    value,
    quantityInMonth,
  }),
);
