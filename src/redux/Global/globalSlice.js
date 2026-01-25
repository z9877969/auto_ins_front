import { createSlice } from '@reduxjs/toolkit';
import { contractSave, getIpnBlackList } from './operations';

const initialState = {
  isLoading: false,
  isModalErrorOpen: false,
  isContractOSAGO: false,
  isContractDGO: false,
  isOrderRequested: false,
  globalCustomerData: {},
  paramsFromUrl: null,
  homeAddress: { label: '', value: '' },
  error: '',
  order: null,
  prevOrdersData: {
    warning: [], // ['Укладання цього полісу призведе до припинення дії договорів: EP226531544']
    warningCancel: [], // [ 'EP226531544' ]
  },
  blackList: [],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setGlobalCustomerData: (state, { payload }) => {
      state.globalCustomerData = { ...state.globalCustomerData, ...payload };
    },
    setIsModalErrorOpen: (state, { payload }) => {
      state.isModalErrorOpen = payload;
    },
    setParamsFromUrl: (state, { payload }) => {
      state.paramsFromUrl = { ...state.payload, ...payload };
    },
    setHomeAddress: (state, { payload }) => {
      state.homeAddress = payload;
    },
    setIsContractOSAGO: (state, { payload }) => {
      state.isContractOSAGO = payload;
    },
    setIsContractDGO: (state, { payload }) => {
      state.isContractDGO = payload;
    },
    setIsOrderRequested: (state, { payload }) => {
      state.isOrderRequested = payload;
    },
    setGlobError: (state, { payload }) => {
      state.error = payload;
    },
    clearGlobal: () => {
      return initialState;
    },
    resetOrderData: (state) => {
      state.order = initialState.order;
    },
    setPrevOrdersData: (state, { payload = null }) => {
      if (!payload) {
        state.prevOrdersData = initialState.prevOrdersData;
        return;
      }
      state.prevOrdersData = {
        warning: payload.warning || [],
        warningCancel: payload.warningCancel || [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contractSave.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contractSave.fulfilled, (state, { payload }) => {
        state.error = initialState.error;
        state.isLoading = false;
        if (!state.order) {
          state.order = {};
        }
        state.order = { ...state.order, ...payload };
      })
      .addCase(contractSave.rejected, (state, { payload = {} }) => {
        const { message, errorResponse } = payload;
        state.isLoading = false;
        const combinedMessage = errorResponse.constraintViolations.filter(
          ({ message }, i, arr) => {
            if (i > 0 && arr[i - 1].message === message) {
              return false;
            }
            return true;
          }
        );
        const erroMessage =
          combinedMessage.length === 0
            ? message
            : combinedMessage
                .reduce((acc, el) => {
                  return acc + el.message + ' ';
                }, '')
                .trim();
        state.error = erroMessage;
        state.isLoading = false;
      })
      .addCase(getIpnBlackList.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(getIpnBlackList.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.blackList = payload;
        s.error = null;
      })
      .addCase(getIpnBlackList.rejected, (s, { payload }) => {
        s.isLoading = false;
        s.error = payload;
      });
  },
});

export const {
  setIsModalErrorOpen,
  setIsLoading,
  setGlobalCustomerData,
  setParamsFromUrl,
  setGlobalCustomerDataCustomer,
  setFormData,
  setHomeAddress,
  setIsContractOSAGO,
  setIsContractDGO,
  setIsOrderRequested,
  setGlobError,
  resetOrderData,
  setPrevOrdersData,
} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
