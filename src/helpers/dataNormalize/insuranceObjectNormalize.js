export const insuranceObjectNormalize = (
  carDataFormik,
  insurObject = {},
  registrationPlaceId,
  fullCarModel,
  privilegeData,
  otkData
) => {
  const {
    brand,
    category,
    bodyNumber,
    stateNumber,
    year,
    model,
    maker,
    engineVolume,
    grossWeight,
    curbWeight,
    seatingCapacity,
    electricMotorPower,
  } = carDataFormik.values;
  const insuranceObject = {
    type: 'auto',
    modelText: brand || fullCarModel,
    category: category,
    bodyNumber: bodyNumber,
    stateNumber: stateNumber,
    registrationPlace: {
      id: insurObject.registrationPlace?.id || registrationPlaceId,
    },
    registrationType: otkData.registrationType,
    year: year,
    // = new car info data -Start =
    engineVolume: insurObject?.engineVolume || Number(engineVolume),
    grossWeight: insurObject?.grossWeight || Number(grossWeight) || 0, // - Повна маса, кг
    curbWeight: insurObject?.curbWeight || Number(curbWeight) || 0, // - Маса без навантаження, кг
    seatingCapacity:
      insurObject?.seatingCapacity || Number(seatingCapacity) || 0, // Кількість місць (з водієм)
    electricMotorPower:
      insurObject?.electricMotorPower || electricMotorPower || 1,
    // = new car info data -End =
  };
  if (model.id !== 'custom') {
    const newModel = {
      autoMaker: { id: maker.id },
      id: model.id,
    };
    insuranceObject.model = newModel;
  }
  if (privilegeData) {
    insuranceObject.engineVolume =
      insuranceObject.engineVolume || privilegeData.engineVolume;
  }
  if (otkData.otkDate) {
    insuranceObject.otkDate = otkData.otkDate;
  }
  return insuranceObject;
};
