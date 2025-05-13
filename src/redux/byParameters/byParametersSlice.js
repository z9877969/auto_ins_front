import { createSlice } from '@reduxjs/toolkit';
import { getAddress } from './operations';
import {
  selectAutoCategory,
  vehicleGroupsOptions,
} from '../../helpers/ByParameters/selectOptions';
import { PRIVILEGED_TYPE } from '../../constants';

const initialState = {
  queryText: '',
  address: { label: '', value: '' },
  vehicle: vehicleGroupsOptions[0],
  engineCapacity: selectAutoCategory(vehicleGroupsOptions[0].value)[0],
  addressOptions: [],
  benefits: false,
  foreignNumber: false,
  submitObj: {},
};
export const byParameters = createSlice({
  name: 'byParameters',
  initialState,
  reducers: {
    setQueryText: (state, { payload }) => {
      state.queryText = payload;
    },
    setSubmitObj: (state, { payload }) => {
      state.submitObj = payload;
      state.benefits =
        payload.customerCategory === PRIVILEGED_TYPE.PRIVILEGED ? true : false;
      state.foreignNumber = payload.outsideUkraine;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setVehicle: (state, { payload }) => {
      state.vehicle = payload;
    },
    setEngineCapacity: (state, { payload }) => {
      state.engineCapacity = payload;
    },
    setAddressOptions: (state, { payload }) => {
      state.addressOptions = payload;
    },
    setByByramsInitialState: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddress.fulfilled, (state, { payload }) => {
      state.addressOptions = payload;
    });
  },
});

export const byParametersReducer = byParameters.reducer;
export const {
  setAddressOptions,
  setQueryText,
  setSubmitObj,
  setAddress,
  setVehicle,
  setEngineCapacity,
  setByByramsInitialState,
} = byParameters.actions;
