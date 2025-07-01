// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';
// SignUp API Fn
export const signUpAPIFn = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.signup, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

// Verify OTP
export const verifyOtpAPIFn = createAsyncThunk(
  'auth/verifyOtp',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.verifyOtp, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'OTP verification failed');
    }
  }
);

// Resend OTP
export const resendOtpAPIFn = createAsyncThunk(
  'auth/resendOtp',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.resendOtp, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Failed to resend OTP');
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


// Forgot Password Request API Fn
export const forgotPasswordRequestAPIFn = createAsyncThunk(
  'auth/forgotPassword',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(endPoints.forgotPasswordRequest, {
        ...values
      });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error?.message || 'Error sending reset link');
    }
  }
);



// info User API Fn
export const userInfoAPIFn = createAsyncThunk(
  'auth/userInfoAPIFn',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.userInfo, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const userUpdateAPIFn = createAsyncThunk(
  'auth/userUpdateAPIFn',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.userUpdate, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);
