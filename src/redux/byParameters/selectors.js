import { createSelector } from '@reduxjs/toolkit';

// export const getSubmitObject = (state) => state.byParameters.submitObj;
export const getEngineType = (state) =>
  state.byParameters?.engineCapacity?.value ?? null;

export const getIsPrivilage = (state) => state.byParameters.benefits;

export const getAddressAndAuto = createSelector(
  (state) => state.byParameters.address,
  (state) => state.byParameters.engineCapacity,
  (address, engineCapacity) => {
    return {
      address: address.label,
      engineCapacity: engineCapacity.label,
    };
  }
);

export const getSubmitObject = createSelector(
  (state) => state.byParameters.submitObj,
  (submitObj) => submitObj
);

export const getRegistrationPlaceData = createSelector(
  (state) => state.byParameters.address,
  ({ value, label }) => {
    return {
      city: label,
      id: value,
    };
  }
);
