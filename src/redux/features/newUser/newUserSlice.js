// redux/features/newUser/newUserSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addNewUserAPIFn, getAllUsersAPIFn } from './newUser';

const newUserSlice = createSlice({
  name: 'newUser',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAPIFn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAPIFn.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAPIFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newUserSlice.reducer;
