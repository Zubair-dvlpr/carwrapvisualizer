const initialState = {
  bookingsByDate: {},
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingsByDate: (state, action) => {
      const { date, bookings } = action.payload;
      state.bookingsByDate[date] = bookings;
    },
  },
});

export const { setBookingsByDate } = bookingSlice.actions;
export default bookingSlice.reducer;
