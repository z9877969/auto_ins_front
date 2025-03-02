export const paramsByNumberNormalize = (params) => {
  const { bodyNumber, year, autoMaker, autoModel } = params[0];
  return [bodyNumber, year, `${autoMaker} ${autoModel}`];
};

export const pramsByParamsNormalize = (params) => {
  const { address, engineCapacity } = params;
  if (address === '') {
    return [...engineCapacity.split(' - ')];
  }
  return [...engineCapacity.split(' - '), address.split(',')[0]];
};
