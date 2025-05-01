import { createAsyncThunk } from '@reduxjs/toolkit';

import { addYearToDate } from '../../helpers/addYearToDate';
import { autoKindAndLimit } from '../../helpers/autoKindAndLimit';
import { responseDGONormalize } from '../../helpers/dataNormalize/responseDGONormalize';
import { responseOSAGONormalize } from '../../helpers/dataNormalize/responseOSAGONormalize';
import { userNormalize } from '../../helpers/dataNormalize/userNormalize';
import { mergeObjectsById } from '../../helpers/mergeObjectsById';
import { sortAndFilterTariff } from '../../helpers/sortAndFilterTariff';
import { instance } from '../../services/api';
import { mainRoutes, PRIVILEGED_TYPE } from '../../constants';
import { setIsPrivilagedExist } from './calculatorSlice';

// const setSalePoint = (salePoint) => {
//   instance.defaults.params = { ...instance.defaults.params, salePoint };
// };

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        mainRoutes.CALCULATOR + '/user/getByEmail'
      );

      return userNormalize(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const osagoByParams = createAsyncThunk(
  'calculator/osagoByParams',
  async (body, { rejectWithValue, dispatch, getState }) => {
    try {
      const { calculator } = getState();
      const { dateFrom } = body;
      const salePoint = calculator.user.salePoint.id;

      const dateTo = addYearToDate(dateFrom);
      const { data } = await instance.get(
        mainRoutes.CALCULATOR + '/tariff/choose/policy',
        {
          params: {
            ...body,
            usageMonths: 0,
            taxi: false,
            salePoint,
            dateTo,
            contractPeriodquery: 'YEAR',
          },
        }
      );

      dispatch(chooseVclTariffDGO({ ...body, salePoint }));
      const newData = data
        .filter((el) => el.crossSell === false)
        .filter((el) => el.discountedPayment !== 0);
      const responseData = mergeObjectsById(newData, responseOSAGONormalize);
      const response = responseData.map((el) => {
        el.tariff = sortAndFilterTariff(el.tariff);
        return el;
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const osagoByDn = createAsyncThunk(
  'calculator/osagoByDn',
  async (body, { rejectWithValue, dispatch, getState }) => {
    try {
      // const {
      //   customerCategory,
      //   stateNumber,
      //   dateFrom,
      //   registrationType,
      // } = body;
      /* 
        outsideUkraine=false
        customerCategory=NATURAL
        stateNumber=%D0%90%D0%865366%D0%A0%D0%92
        dateFrom=2024-12-30
        registrationType=PERMANENT
        taxi=false
        dateTo=2025-12-29

        customerCategory=NATURAL
        taxi=false
        autoCategory=B2
        registrationType=PERMANENT
        dateFrom=2024-12-20
        dateTo=2025-12-19
        registrationPlace=1

      */
      const { data } = await instance.get(
        mainRoutes.CALCULATOR + '/tariff/choose/policy/statenumber',
        {
          params: {
            ...body,
            taxi: false,
          },
        }
      );

      if (
        body.customerCategory === PRIVILEGED_TYPE.PRIVILEGED &&
        !data.length
      ) {
        throw dispatch(setIsPrivilagedExist(false));
      }

      const newData = data
        .filter((el) => el.crossSell === false)
        .filter((el) => el.discountedPayment !== 0);
      const d = newData[0];

      const {
        autoCategory,
        registrationPlace: { id },
      } = d;

      const { calculator } = getState();
      const salePoint = { salePoint: calculator.user.salePoint.id };
      const b = {
        ...body,
        autoCategory,
        registrationPlace: id,
        ...salePoint,
      };

      setTimeout(() => {
        dispatch(chooseVclTariffDGO(b));
      }, 500);
      const responseData = mergeObjectsById(newData, responseOSAGONormalize);
      const response = responseData.map((el) => {
        el.tariff = sortAndFilterTariff(el.tariff);
        return el;
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chooseVclTariffDGO = createAsyncThunk(
  'calculator/tariffDGO',
  async (body, { rejectWithValue }) => {
    try {
      const { autoCategory, dateFrom, ...rest } = body;
      const dateTo = addYearToDate(dateFrom);
      const cat = autoKindAndLimit(autoCategory);

      const { data } = await instance.post(
        mainRoutes.CALCULATOR + '/tariff/choose/vcl',
        {
          ...rest,
          ...cat,
          dateFrom,
          dateTo,
        }
      );
      const newData = data.filter((el) => el.crossSell === false);

      return mergeObjectsById(newData, responseDGONormalize);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
