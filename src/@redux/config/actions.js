import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getConfigApi,
  getSummariesApi,
  getRevenueApi,
  getGlobalSaleApi,
  getSummariesCustomersApi,
  getPopularProductApi,
  getAddressApi,
  clearCacheApi,
} from 'api/configs';
// import api
import { apiWrapper } from 'utils/reduxUtils';

export const getAddress = createAsyncThunk(
  'config/getAddress',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getAddressApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
export const clearCache = createAsyncThunk(
  'config/clearCache',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, clearCacheApi, payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getConfig = createAsyncThunk(
  'config/getConfig',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getConfigApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getSummaries = createAsyncThunk(
  'config/getSummaries',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getSummariesApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getRevenue = createAsyncThunk(
  'config/getRevenue',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getRevenueApi, payload);
      return { data: response, type: payload.type };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getGlobalSales = createAsyncThunk(
  'config/getGlobalSales',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getGlobalSaleApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getSummariesCustomers = createAsyncThunk(
  'config/getSummariesCustomers',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getSummariesCustomersApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);

export const getPopularProduct = createAsyncThunk(
  'config/getPopularProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await apiWrapper(null, getPopularProductApi);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  },
);
