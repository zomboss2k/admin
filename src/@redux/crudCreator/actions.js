import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { apiWrapper } from 'utils/reduxUtils';
import { getAllApi, getDataByIdApi, postApi, putApi, delApi } from 'api/crud';
import {
  convertRequestParams,
  convertResponseData,
  PRIMARY_KEY,
} from './dataProvider';

export const getAll = (resource, primaryKey = PRIMARY_KEY, customApiResource) =>
  createAsyncThunk(`${resource}/getAll`, async (payload, thunkAPI) => {
    try {
      const { data = {}, options = {} } = payload;
      const { pageSize, page, includes, filter } =
        thunkAPI.getState()[resource];
      const convertRequest = convertRequestParams(
        'GET_ALL',
        {
          limit: pageSize,
          offset: pageSize * (page - 1),
          filter,
          includes,
          ...data,
        },
        resource,
      );
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getAllApi,
        options.customApiResource || customApiResource || resource,
        convertRequest,
      );
      const result = convertResponseData('GET_ALL', response, { primaryKey });
      if (result.data) {
        return {
          data: {
            numberOfPages: Math.round(result.total / pageSize),
            ...result,
          },
          options,
        };
      }
      return thunkAPI.rejectWithValue({ data: response, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  });

export const getDataById = (
  resource,
  primaryKey = PRIMARY_KEY,
  customApiResource,
) =>
  createAsyncThunk(`${resource}/getDataById`, async (payload, thunkAPI) => {
    const { data, options = { extraParams: {}, isRequestApi: true } } = payload;
    try {
      if (!options.isRequestApi) {
        return { data };
      }
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getDataByIdApi,
        options.customApiResource || customApiResource || resource,
        data[PRIMARY_KEY],
        options.suffix,
        options.extraParams,
      );
      const result = convertResponseData('GET_BY_ID', response, { primaryKey });
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ data: result, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data, options });
    }
  });

export const edit = (resource, primaryKey = PRIMARY_KEY, customApiResource) =>
  createAsyncThunk(`${resource}/edit`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const requestData = convertRequestParams('EDIT', data, { primaryKey });
      const response = await apiWrapper(
        options,
        putApi,
        options.customApiResource || customApiResource || resource,
        data[PRIMARY_KEY],
        options.suffix,
        requestData,
      );
      const result = convertResponseData('EDIT', response, { primaryKey });
      if (result) {
        return { data: { ...data, ...result }, options };
      }
      return thunkAPI.rejectWithValue({
        error: true,
        data: { ...data, ...response },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data, error: true, options });
      //
    }
  });

export const create = (resource, primaryKey, customApiResource) =>
  createAsyncThunk(`${resource}/create`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress, ...options },
        postApi,
        options.customApiResource || customApiResource || resource,
        options.suffix,
        data,
      );
      const result = convertResponseData('CREATE', response);
      if (result) {
        return { data: result };
      }
      return thunkAPI.rejectWithValue({ error: true, data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, error: true });
    }
  });

export const del = (resource, primaryKey = PRIMARY_KEY, customApiResource) =>
  createAsyncThunk(`${resource}/del`, async (payload, thunkAPI) => {
    const { data, options = {} } = payload;
    try {
      await apiWrapper(
        { isShowProgress: true },
        delApi,
        options.customApiResource || customApiResource || resource,
        data.path || data[primaryKey],
      );
      // const result = convertResponseData('DELETE', response, { primaryKey });
      return { data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ options, data, error });
    }
  });

export const clearCurrent = (resource) =>
  createAction(`${resource}/clearCurrent`);

export const resetData = (resource) => createAction(`${resource}/resetData`);

export const setItem = (resource) => createAction(`${resource}/setItem`);

export const updatePosition = (resource) =>
  createAction(`${resource}/updatePosition`);

export const makeActions = (resource, primaryKey, customApiResource) => ({
  getAll: getAll(resource, primaryKey, customApiResource),
  getDataById: getDataById(resource, primaryKey, customApiResource),
  edit: edit(resource, primaryKey, customApiResource),
  create: create(resource, primaryKey, customApiResource),
  del: del(resource, primaryKey, customApiResource),
  clearCurrent: clearCurrent(resource, primaryKey, customApiResource),
  resetData: resetData(resource, primaryKey, customApiResource),
  setItem: setItem(resource, primaryKey, customApiResource),
  updatePosition: updatePosition(resource, primaryKey, customApiResource),
});
