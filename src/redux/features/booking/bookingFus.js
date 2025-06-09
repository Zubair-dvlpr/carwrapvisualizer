// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';

// Login User API Fn
export const bookingAppointmentAPIFn = createAsyncThunk(
  'booking/bookingAppointment',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.bookingAppointment, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const todayAppointmentAPIFn = createAsyncThunk(
  'booking/todayAppointment',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.appointmentDetail, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);


export const tomorrowAppointmentAPIFn = createAsyncThunk(
  'booking/tomorrowAppointment',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.appointmentDetail, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const canceledAppointmentAPIFn = createAsyncThunk(
  'booking/canceledAppointment',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.appointmentDetail, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const inProgressAPIFn = createAsyncThunk(
  'booking/inProgress',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.appointmentDetail, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const updateBookingAPIFn = createAsyncThunk(
  'booking/updateBooking',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.updateBooking, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);