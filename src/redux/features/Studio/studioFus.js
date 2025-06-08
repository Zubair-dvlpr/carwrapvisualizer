// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';

// Login User API Fn
export const getYearsAPIFn = createAsyncThunk(
  'studio/getYears',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.getYears, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);


export const getMakesAPIFn = createAsyncThunk(
  'studio/getMakes',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${endPoints.getMakes}?year=${year}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Failed to fetch makes');
    }
  }
);



export const getModelsAPIFn = createAsyncThunk(
  'studio/getModels',
  async ({ year, make }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${endPoints.getModels}?year=${year}&make=${encodeURIComponent(make)}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Failed to fetch models');
    }
  }
);

export const generateCarImageAPIFn = createAsyncThunk(
  'studio/generateCarImage',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.generateCarImage, values);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Image generation failed');
    }
  }
);
