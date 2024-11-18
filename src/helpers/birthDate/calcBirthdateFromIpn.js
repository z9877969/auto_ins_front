export const calcBirthdateFromIpn = (ipn = '3079801898') => {
  const _1900_Ms = new Date('1900-01-01').valueOf(); // new Date(0)
  const diff = -1 * _1900_Ms;
  const daysAmount = ipn.slice(0, 5) - diff / 1000 / 60 / 60 / 24 - 1;
  const birthDateMs = daysAmount * 24 * 60 * 60 * 1000;

  return new Date(birthDateMs);
};
