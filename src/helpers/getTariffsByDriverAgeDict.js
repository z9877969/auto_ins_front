export const getTariffsByDriverAgeDict = (tariffesList) => {
  const tariffesByDriverAgeDict = tariffesList.reduce(
    (acc, { tariff, driverMinAge, driverMaxAge, discountedPayment }) => {
      const companyId = tariff.insurer.id;
      if (!acc[companyId]) {
        acc[companyId] = [];
      }
      acc[companyId].push({
        driverMinAge,
        driverMaxAge,
        discountedPayment,
      });
      return acc;
    },
    {},
  );

  const filteredTarrifesByDriverAge = Object.fromEntries(
    Object.entries(tariffesByDriverAgeDict)
      .filter(
        // eslint-disable-next-line no-unused-vars
        ([_, tarrifes]) => tarrifes.length > 1,
      )
      .map(([companyId, tarrifes]) => {
        const sortedTarrifes = tarrifes.sort(
          (a, b) => a.driverMinAge - b.driverMinAge,
        );
        return [companyId, sortedTarrifes];
      }),
  );

  return filteredTarrifesByDriverAge;
};
