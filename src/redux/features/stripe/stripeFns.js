// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';

// Login User API Fn
export const stripeFetchPlansAPIFn = createAsyncThunk(
  'stripe/fetchPlan',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.fetchPlans, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const stripeActiveSubscriptionsAPIFn = createAsyncThunk(
  'stripe/activeSubscriptions',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.activeSubscription, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const stripeCheckoutSessionAPIFn = createAsyncThunk(
  'stripe/checkoutSession',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.checkoutSession, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const stripeVerifySessionAPIFn = createAsyncThunk(
  'stripe/verifySession',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.verifySession, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);