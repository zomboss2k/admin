import { createAsyncThunk } from '@reduxjs/toolkit';
import { scaleDownApi, scaleUpApi } from 'api/user';
import { apiWrapper } from 'utils/reduxUtils';

export const createStrategy = createAsyncThunk(
  'strategies/createStrategy',
  async (payload, thunkAPI) => {
    const { data, headers = {} } = payload;
    try {
      const response = await apiWrapper(
        {
          isShowSuccessNoti: true,
        },
        scaleUpApi,
        data,
        headers,
      );
      if (response) {
        return response;
      }
      return thunkAPI.rejectWithValue({ error: true, data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, error: true });
    }
  },
);

export const deleteStrategy = createAsyncThunk(
  'strategies/deleteStrategy',
  async (payload, thunkAPI) => {
    const { data, headers = {} } = payload;
    try {
      const response = await apiWrapper(
        {
          isShowSuccessNoti: true,
        },
        scaleDownApi,
        data,
        headers,
      );
      if (response) {
        return response;
      }
      return thunkAPI.rejectWithValue({ error: true, data: response });
    } catch (error) {
      return thunkAPI.rejectWithValue({ data: error, error: true });
    }
  },
);
