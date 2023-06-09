import { createSlice } from '@reduxjs/toolkit';
import { USER_ROLES } from 'configs/localData';
import {
  getConfig,
  getSummaries,
  getRevenue,
  getGlobalSales,
  getSummariesCustomers,
  getPopularProduct,
  getAddress,
} from './actions';

export const initialState = {
  data: {
    roles: USER_ROLES,
  },
  address: [],
};

const { actions, reducer } = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    clearSummariesData: (state) => {
      state.summaries = {};
    },
  },
  extraReducers: {
    [getAddress.fulfilled]: (state, { payload }) => {
      state.address = payload;
    },
    [getConfig.fulfilled]: (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    },
    [getConfig.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getSummaries.fulfilled]: (state, { payload }) => {
      state.summaries = payload;
    },
    [getSummaries.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getRevenue.fulfilled]: (state, { payload }) => {
      if (payload.type === 'day') {
        state.revenue.byDay = payload.data;
      } else {
        state.revenue.byMonth = payload.data;
      }
    },
    [getRevenue.fulfilled]: (state, { payload }) => {
      state.error = payload;
    },
    [getGlobalSales.fulfilled]: (state, { payload }) => {
      state.globalSales = payload;
    },
    [getGlobalSales.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getSummariesCustomers.fulfilled]: (state, { payload }) => {
      state.summariesCustomers = payload;
    },
    [getSummariesCustomers.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getPopularProduct.fulfilled]: (state, { payload }) => {
      state.popularProduct = payload;
    },
    [getPopularProduct.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { clearSummariesData } = actions;

export default reducer;
