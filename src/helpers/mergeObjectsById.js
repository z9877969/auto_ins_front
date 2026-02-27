export const mergeObjectsById = (inputArray, normalizeFnc) => {
  if (!inputArray) return;
  const dataNormalize = inputArray?.map((proposition) =>
    normalizeFnc(proposition),
  );

  const groupedById = {};
  dataNormalize.forEach((proposition) => {
    const insurerId = proposition.insurerId;
    if (!groupedById[insurerId]) {
      groupedById[insurerId] = { ...proposition };
      groupedById[insurerId].tariff = [proposition.tariff];
    } else {
      groupedById[insurerId].tariff.push(proposition.tariff);
    }
  });
  const mergedArray = Object.values(groupedById);
  return mergedArray;
};
