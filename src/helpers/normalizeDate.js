export const normalizeDate = (value) => {
  return value
    .split('/')
    .map((el, idx) => (idx !== 2 ? el.padStart(2, '0') : el.padStart(4, '20')))
    .reverse()
    .join('-');
};
