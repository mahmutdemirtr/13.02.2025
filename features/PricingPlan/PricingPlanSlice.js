import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalMonthCount: 1, // Default to monthly
  totalPriceCount: 9.99, // Default price for monthly
};

const priceCountSlice = createSlice({
  name: 'priceCount',
  initialState,
  reducers: {
    setTotalMonthCount: (state, action) => {
      state.totalMonthCount = action.payload; // Correctly update totalMonthCount
    },
    setTotalPriceCount: (state, action) => {
      state.totalPriceCount = action.payload; // Correctly update totalPriceCount
    },
  },
});

// Export action creators
export const { setTotalMonthCount, setTotalPriceCount } = priceCountSlice.actions;

// Export the reducer
export default priceCountSlice.reducer;