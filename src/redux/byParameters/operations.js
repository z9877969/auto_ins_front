import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/api';
import { selectAddressOptions } from '../../helpers/ByParameters/selectOptions';
import { mainRoutes } from '../../constants';

export const fetchAddress = async (cityName) => {
  const { data } = await instance.get(mainRoutes.GLOBAL + '/place', {
    params: {
      query: cityName,
      cdbMtibu: false,
      country: 'UA',
    },
  });
  return selectAddressOptions(data);
};

export const getAddress = createAsyncThunk(
  'byParameters/getAddress',
  async (cityName, { rejectWithValue }) => {
    try {
      return await fetchAddress(cityName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
