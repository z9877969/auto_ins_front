export const formatBirthdate = (date) => {
  return date.toJSON().split('T')[0].split('-').reverse().join('/');
};
