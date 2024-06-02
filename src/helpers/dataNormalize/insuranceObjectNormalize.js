export const insuranceObjectNormalize = (
  carDataFormik,
  insurObject,
  registrationPlaceId,
  fullCarModel,
  privilegeData
) => {
  const insuranceObject = {
    type: 'auto',
    modelText: carDataFormik.values.brand || fullCarModel,
    category: carDataFormik.values.category,
    bodyNumber: carDataFormik.values.bodyNumber,
    stateNumber: carDataFormik.values.stateNumber,
    registrationPlace: {
      id: insurObject?.registrationPlace?.id || registrationPlaceId,
    },
    registrationType: 'PERMANENT_WITHOUT_OTK',
    year: carDataFormik.values.year,
  };
  if (carDataFormik.values.model.id !== 'custom') {
    const model = {
      autoMaker: { id: carDataFormik.values.maker.id },
      id: carDataFormik.values.model.id,
    };
    insurObject.model = model;
  }
  if (privilegeData) {
    insuranceObject.engineVolume = privilegeData.engineVolume;
  }
  return insuranceObject;
};
