import { createSelector } from '@reduxjs/toolkit';
import { getAutoByNumber } from '@redux/References/selectors';
import { CARDATA_FORM_FIELDS_DICT } from '@constants/index';
import * as h from '../../helpers/calcIncludedAutoTypes';

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

export const selectIsPrivileged = (state) => state.byParameters.benefits;

export const getRegistrationPlaceData = createSelector(
  (state) => state.byParameters.address,
  ({ value, label }) => {
    return {
      city: label,
      id: value,
    };
  }
);

export const selectDisabledCarDataField = createSelector(
  [getEngineType, getAutoByNumber],
  (autoType, autoByNumber) => {
    const engineVolumeKey = CARDATA_FORM_FIELDS_DICT.ENGINE_VOLUME;
    const motorPowerKey = CARDATA_FORM_FIELDS_DICT.ELECTRIC_MOTOR_POWER;
    const seatingCapacityKey = CARDATA_FORM_FIELDS_DICT.SEATING_CAPACITY;
    const autoDataByNumber =
      (autoByNumber &&
        Array.isArray(autoByNumber) &&
        autoByNumber[0] &&
        autoByNumber[0]) ||
      null;
    const curType = autoDataByNumber?.category || autoType || null;
    if (!curType) return null;
    if (h.calcIsE_F_G3(curType)) {
      return {
        [engineVolumeKey]: true,
        [motorPowerKey]: true,
        [seatingCapacityKey]: true,
      };
    }
    if (h.calcIsB5(curType)) {
      return {
        [engineVolumeKey]: true,
        [motorPowerKey]: false,
        [seatingCapacityKey]: false,
      };
    }
    if (h.calcIsWithoutE_F_G3_B5(curType)) {
      return {
        [engineVolumeKey]: false,
        [motorPowerKey]: false,
        [seatingCapacityKey]: false,
      };
    }
    if (h.calcIsWithoutE_F_G3_AllB(curType)) {
      return {
        [engineVolumeKey]:
          autoDataByNumber[motorPowerKey] && autoDataByNumber[engineVolumeKey]
            ? false
            : autoDataByNumber[motorPowerKey]
            ? true
            : false,
        [motorPowerKey]:
          autoDataByNumber[motorPowerKey] && autoDataByNumber[engineVolumeKey]
            ? true
            : autoDataByNumber[engineVolumeKey]
            ? true
            : false,
        [seatingCapacityKey]: false,
      };
    }
  }
);
