import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';
import { setIsContractDGO, setIsContractOSAGO } from './globalSlice';
import { mainRoutes } from '../../constants';

export const contractSave = createAsyncThunk(
  'global/contractSave',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await instance.post(
        mainRoutes.GLOBAL + '/contract/save',
        {
          ...body,
          sourceInfo: 'https://auto-ins.com.ua/',
        }
      );
      if (data.tariff.type === 'epolicy') {
        dispatch(setIsContractOSAGO(true));
      }
      if (data.tariff.type === 'vcl') {
        dispatch(setIsContractDGO(true));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
