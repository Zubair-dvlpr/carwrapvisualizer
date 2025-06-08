// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { endPoints } from '../../constant';
// SignUp API Fn
export const signUpAPIFn = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.signUp, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

// Login User API Fn
export const loginUserAPIFn = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.login, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);
