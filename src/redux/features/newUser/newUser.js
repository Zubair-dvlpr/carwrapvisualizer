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


// redux/features/newUser/newUser.js
export const deleteShopManUserAPIFn = createAsyncThunk(
  'newUser/deleteShopManUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        endPoints.deleteShopManUser,
        {
          data: { userId }, // ✅ send userId in request body
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return data?.message || 'Deleted successfully';
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Delete failed');
    }
  }
);


// reset Password Request API Fn
export const resetPasswordRequestAPIFn = createAsyncThunk(
  'newUser/resetPasswordRequest',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.resetPasswordRequest, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);


// resetPasswordConfirmAPIFn
export const resetPasswordConfirmAPIFn = createAsyncThunk(
  'newUser/resetPasswordConfirm',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.resetPassword, {
        token,
        newPassword,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || 'Failed to reset password');
    }
  }
);

