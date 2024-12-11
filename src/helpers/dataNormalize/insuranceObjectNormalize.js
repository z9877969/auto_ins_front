export const insuranceObjectNormalize = (
  carDataFormik,
  insurObject,
  registrationPlaceId,
  fullCarModel,
  privilegeData,
  otkData
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
    registrationType: otkData.registrationType,
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
  if (otkData.otkDate) {
    insuranceObject.otkDate = otkData.otkDate;
  }
  return insuranceObject;
};
