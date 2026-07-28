import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIpnBlackListApi, saveContractApi } from 'services/api';
import { SAVED_ORDER_TYPE } from '@constants/index';

export const contractSave = createAsyncThunk(
  'global/contractSave',
  async ({ vcl: vclBody, epolicy: epolicyBody }, { rejectWithValue }) => {
    try {
      const payload = {};

      if (vclBody) {
        payload[SAVED_ORDER_TYPE.VCL] = await saveContractApi(vclBody);
        payload.isContract = { dgo: true };
      }

      payload[SAVED_ORDER_TYPE.EPOLICY] = await saveContractApi(epolicyBody);
      payload.isContract = payload.isContract
        ? { ...payload.isContract, osago: true }
        : { osago: true };

      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
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
  },
);
