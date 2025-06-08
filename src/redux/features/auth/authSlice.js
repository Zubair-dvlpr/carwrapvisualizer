import { createSlice } from '@reduxjs/toolkit';
import { loginUserAPIFn } from './authFns';
import { PURGE } from 'redux-persist';
// Initial State
const initialState = {
  loading: false,
  error: null,
  currentUser: null
};

// Login User Slices
export const currentUserSlice = createSlice({
  name: 'auth/currentUser',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserAPIFn.pending, state => {
        state.loading = true;
        state.error = null;
        state.currentUser = null;
      })
      .addCase(loginUserAPIFn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUserAPIFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentUser = null;
      })
      .addCase(PURGE, state => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
      });
  }
});

// Action creators are generated for each case reducer function
export const { logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
