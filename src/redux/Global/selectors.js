import { createSelector } from '@reduxjs/toolkit';
import { getError as calculatorError } from '../../redux/Calculator/selectors';

import { getError as referencesError } from '../../redux/References/selectors';
import { SAVED_ORDER_TYPE } from '../../constants';

export const getIsModalErrorOpen = (state) => state.global.isModalErrorOpen;
export const getIsLoading = (state) => state.global.isLoading;
export const getGlobalCustomerData = (state) => state.global.globalCustomerData;
export const getParamsFromUrl = (state) => state.global.paramsFromUrl;
export const getIsContractOSAGO = (state) => state.global.isContractOSAGO;
export const getIsContractDGO = (state) => state.global.isContractDGO;
export const selectHomeAddress = (state) => state.global.homeAddress;
export const selectCompanyAllDocTypes = (state) =>
  state.global.globalCustomerData.allowedDocTypes;

export const selectAllowedDocTypes = createSelector(
  selectCompanyAllDocTypes,
  (docTypes) => {
    const { epolicy, vcl } = docTypes;
    if (vcl) return epolicy.filter((type) => vcl.includes(type));
    return epolicy;
  }
);

export const combineError = createSelector(
  (state) => state.global.error,
  calculatorError,
  referencesError,
  (error, calculatorError, referencesError) => {
    return error || calculatorError || referencesError;
  }
);

export const orderType = {
  VCL: 'vcl',
  EPOLICY: 'epolicy', // needing for id
};

export const selectOrderData = createSelector(
  [(state) => state.global.order],
  (order) => {
    if (order) {
      return {
        epolicyOrderId: order[SAVED_ORDER_TYPE.EPOLICY].id,
        vclOrderId: order[SAVED_ORDER_TYPE.VCL]?.id ?? null,
        billAmount: order[SAVED_ORDER_TYPE.VCL]
          ? order[SAVED_ORDER_TYPE.VCL].brokerDiscountedPayment +
            order[SAVED_ORDER_TYPE.EPOLICY].brokerDiscountedPayment
          : order[SAVED_ORDER_TYPE.EPOLICY].brokerDiscountedPayment,
        shopOrderNumber: order[SAVED_ORDER_TYPE.EPOLICY].code,
        email: order[SAVED_ORDER_TYPE.EPOLICY].customer.email,
        orderState: order[SAVED_ORDER_TYPE.EPOLICY].state,
      };
    }
    return null;
  }
);
