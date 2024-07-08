export const insuranceObjectNormalize = (
  carDataFormik,
  insurObject,
  registrationPlaceId,
  fullCarModel,
  privilegeData
) => {
  const { brand, category, bodyNumber, stateNumber, year, model, maker } =
    carDataFormik.values;
  const insuranceObject = {
    type: 'auto',
    modelText: brand || fullCarModel,
    category: category,
    bodyNumber: bodyNumber,
    stateNumber: stateNumber,
    registrationPlace: {
      id: insurObject?.registrationPlace?.id || registrationPlaceId,
    },
    registrationType: 'PERMANENT_WITHOUT_OTK',
    year: year,
  };
  if (model.id !== 'custom') {
    const newModel = {
      autoMaker: { id: maker.id },
      id: model.id,
    };
    insuranceObject.model = newModel;
  }
  if (privilegeData) {
    insuranceObject.engineVolume = privilegeData.engineVolume;
  }
  return insuranceObject;
};
