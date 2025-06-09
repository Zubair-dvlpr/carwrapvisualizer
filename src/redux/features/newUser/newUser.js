// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';

// Login User API Fn
export const addNewUserAPIFn = createAsyncThunk(
  'newUser/addNewUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.addNewUser, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

// redux/features/newUser/newUser.js
export const getAllUsersAPIFn = createAsyncThunk(
  'newUser/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.usersList);
    //   console.log(data.data)
      return data?.data || []; // adjust based on actual API structure
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);
