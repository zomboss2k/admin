import _ from 'lodash';
import { apiWrapper } from 'utils/reduxUtils';
import { getAllApi } from 'api/crud';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  convertResponseData,
  convertRequestParams,
} from '../crudCreator/dataProvider';

const debouncedIds = {};
const mappeds = {};
const tasks = {};

const addIds = (resource, ids) => {
  if (!debouncedIds[resource]) {
    debouncedIds[resource] = [];
  }
  debouncedIds[resource] = _.flatten(_.union(debouncedIds[resource], ids));
};

const addMappedBy = (resource, mappedBy) => {
  if (!mappeds[resource]) {
    mappeds[resource] = [];
  }
  mappeds[resource] = mappedBy;
};

function finalize(resource, options, dispatch) {
  // combined with cancel(), this debounces the calls
  dispatch(retrieveReferenceListFromMapped({ resource, options }));
  delete tasks[resource];
  delete debouncedIds[resource];
  delete mappeds[resource];
}

export const retrieveReferenceList = createAsyncThunk(
  'reference/retrieveReferenceList',
  async ({ data = {}, options = {}, resource }, thunkAPI) => {
    try {
      const { pageSize, page, join, filter, outsideFilter } =
        thunkAPI.getState().reference?.[resource] || {};

      const {
        filter: filterData,
        outsideFilter: outsideFilterData,
        ...restData
      } = data;

      const convertRequest = convertRequestParams('GET_ALL', {
        limit: pageSize,
        offset: pageSize * (page - 1),
        join,
        ...outsideFilter,
        ...restData,
        ...outsideFilterData,
        filter: {
          ...filter,
          ...filterData,
        },
      });

      const response = await apiWrapper(
        { isShowProgress: options.isShowProgress },
        getAllApi,
        options.customApiResource || resource,
        convertRequest,
      );

      const result = convertResponseData('GET_ALL', response, options);

      if (result.data) {
        return {
          resource,
          data: {
            numberOfPages: Math.round(result.total / pageSize),
            ...result,
          },
        };
      }
      return thunkAPI.rejectWithValue({ resource, data: response, options });
    } catch (error) {
      return thunkAPI.rejectWithValue({ resource, error });
    }
  },
);

export const retrieveReferenceListFromMapped = createAsyncThunk(
  'reference/retrieveReferenceListFromMapped',
  async ({ resource, options }, thunkAPI) => {
    try {
      const params = {
        limit: 50,
        page: 1,
        ...(options?.join && {
          join: options.join,
        }),
        filter: debouncedIds[resource]?.length
          ? `${mappeds[resource] || 'id'}||$in||${debouncedIds[resource].join(
              ',',
            )}`
          : '',
      };
      const response = await apiWrapper(
        { isShowProgress: false },
        getAllApi,
        options.customApiResource || resource,
        params,
      );
      const result = convertResponseData('GET_ALL', response, options);
      return { resource, data: result };
    } catch (error) {
      return thunkAPI.rejectWithValue({ resource, error });
    }
  },
);

export const retrieveReference = createAsyncThunk(
  'reference/retrieveReference',
  // eslint-disable-next-line
  async ({ resource, ids, mappedBy, options }, thunkAPI) => {
    try {
      if (tasks[resource]) {
        clearTimeout(tasks[resource]);
        tasks[resource] = null;
      }

      addIds(resource, ids);
      addMappedBy(resource, mappedBy);

      tasks[resource] = setTimeout(() => {
        finalize(
          resource,
          { primaryKey: mappedBy, ...options },
          thunkAPI.dispatch,
        );
      }, 50);
    } catch (error) {
      return thunkAPI.rejectWithValue({ resource, error });
    }
  },
);

export const clearData = createAction('clearData');
