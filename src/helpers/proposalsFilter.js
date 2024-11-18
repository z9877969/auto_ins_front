export const priceSortOptionsGeneral = [
  {
    value: '',
    label: 'За популярністю',
  },
  {
    value: 'fromLowToHigh',
    label: 'Від низької ціни',
  },
  {
    value: 'fromHighToLow',
    label: 'Від високої ціни',
  },
  
];

export const createSelectOptionsByCompaniName = (arr) => {
  const companiesNames = [
    ...new Set(arr.map((compani) => compani.insurerName)),
  ];

  return companiesNames;
};
export const filterByPrice = (arr, sortFrom) => {
  switch (sortFrom) {
    case 'fromLowToHigh':
      arr.sort(
        (companiA, companiB) =>
          [...companiA.tariff].reverse()[0].discountedPayment -
          [...companiB.tariff].reverse()[0].discountedPayment
      );
      break;
    case 'fromHighToLow':
      arr.sort(
        (companiA, companiB) =>
          [...companiB.tariff].reverse()[0].discountedPayment -
          [...companiA.tariff].reverse()[0].discountedPayment
      );
      break;

    default:
      // eslint-disable-next-line
      console.log('Oops we have some problem!!!');
      break;
  }
};
