import { createSlice } from '@reduxjs/toolkit';
import { errorMessage } from '../../helpers/errorMessage';
import {
  chooseVclTariffDGO,
  loginThunk,
  osagoByDn,
  osagoByParams,
} from './operations';

const initialState = {
  filteredCompanies: [],
  tariffPolicyChoose: [],
  tariffVcl: [],
  stateNumber: '',
  error: '',
  policyStatus: 0,
  vclStatus: 0,
  hasVclOrder: false,
  user: null,
  isLoading: false,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setStateNumber: (state, { payload }) => {
      state.stateNumber = payload;
      state.tariffVcl = [];
      state.tariffPolicyChoose = [];
    },

    setTariffPolicyChoose: (state, { payload }) => {
      state.tariffPolicyChoose = payload;
    },
    setTariffVcl: (state, { payload }) => {
      state.tariffVcl = payload;
    },
    setFilteredCompanies: (state, { payload }) => {
      state.filteredCompanies = payload;
    },
    setCalcError: (state, { payload }) => {
      state.error = payload;
    },
    changeVslOrderStatus: (state, { payload }) => {
      // payload = true | false
      state.hasVclOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(osagoByParams.fulfilled, (state, { payload }) => {
        state.tariffPolicyChoose = payload;
        state.policyStatus = 1;
      })
      .addCase(osagoByParams.rejected, (state, { payload }) => {
        state.error = errorMessage(payload);
        state.policyStatus = -1;
        state.isLoading = false;
      })
      .addCase(osagoByParams.pending, (state) => {
        state.policyStatus = 0;
        state.isLoading = true;
      })

      .addCase(osagoByDn.fulfilled, (state, { payload }) => {
        state.tariffPolicyChoose = payload;
        state.policyStatus = 1;
        state.error = false;
      })
      .addCase(osagoByDn.rejected, (state, payload) => {
        state.error = errorMessage(payload);
        state.policyStatus = -1;
        state.isLoading = false;
      })
      .addCase(osagoByDn.pending, (state) => {
        state.policyStatus = 0;
        state.isLoading = true;
      })

      .addCase(chooseVclTariffDGO.fulfilled, (state, { payload }) => {
        state.tariffVcl = payload;
        state.vclStatus = 1;
        state.isLoading = false;
      })
      .addCase(chooseVclTariffDGO.rejected, (state, { payload }) => {
        state.error = errorMessage(payload);
        state.vclStatus = -1;
        state.isLoading = false;
      })
      .addCase(chooseVclTariffDGO.pending, (state) => {
        state.vclStatus = 0;
      });
  },
});

export const {
  setStateNumber,
  setTariffPolicyChoose,
  setFilteredCompanies,
  setTariffVcl,
  setCalcError,
  changeVslOrderStatus,
} = calculatorSlice.actions;
export const calculatorReducer = calculatorSlice.reducer;
