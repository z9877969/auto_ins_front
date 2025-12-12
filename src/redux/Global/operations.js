import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIpnBlackListApi, saveContractApi } from '../../services/api';
import { setIsContractDGO, setIsContractOSAGO } from './globalSlice';
import { SAVED_ORDER_TYPE } from '../../constants';

export const contractSave = createAsyncThunk(
  'global/contractSave',
  async (
    { vcl: vclBody, epolicy: epolicyBody },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const payload = {};

      if (vclBody) {
        payload[SAVED_ORDER_TYPE.VCL] = await saveContractApi(vclBody);
        dispatch(setIsContractDGO(true));
      }

      payload[SAVED_ORDER_TYPE.EPOLICY] = await saveContractApi(epolicyBody);
      dispatch(setIsContractOSAGO(true));

      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getIpnBlackList = createAsyncThunk(
  'global/blackList',
  async (_, { rejectWithValue }) => {
    try {
      return await getIpnBlackListApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition(_, { getState }) {
      return !getState().global.blackList;
    },
  }
);
