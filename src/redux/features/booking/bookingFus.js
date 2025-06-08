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