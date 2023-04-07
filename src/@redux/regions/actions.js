import { makeActions } from '@redux/crudCreator';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailabilityZone } from 'api/user';
import { apiWrapper } from 'utils/reduxUtils';

export const MODEL_NAME = 'regions';
export const regionsActions = makeActions(MODEL_NAME);

export const getAllRegions = regionsActions.getAll;
export const getByIdRegions = regionsActions.getDataById;

export const showAvailabilityZone = createAsyncThunk(
  'regions/availabilityZone',
  async (payload, thunkAPI) => {
    const { code, data, headers = {} } = payload;
    try {
      const response = await apiWrapper(
        {
          isShowSuccessNoti: false,
        },
        fetchAvailabilityZone,
        code,
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
