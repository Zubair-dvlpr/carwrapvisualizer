// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';
import axios from 'axios';

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

export const completedAppointmentAPIFn = createAsyncThunk(
  'booking/completedAppointment',
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

export const quoteSentAppointmentAPIFn = createAsyncThunk(
  'booking/quoteSentAppointment',
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

export const getPublicBookingAPIFn = createAsyncThunk(
  'booking/getPublicBooking',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${endPoints.getPublicBooking}/${values?._id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const updateBookingStatusAPIFn = createAsyncThunk(
  'booking/updateBookingStatus',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${endPoints.updateBookingStatus}`, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);

export const updateBookingDetailsAPIFn = createAsyncThunk(
  'booking/updateBookingDetails',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`${endPoints.updateBookingDetails}/${values?._id}`, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);
