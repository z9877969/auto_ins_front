import { addDays, addYears, format } from 'date-fns';

export const getDefaultOtkDate = () => {
  return format(addDays(addYears(new Date(), 1), 2), 'dd/MM/yyyy');
};
