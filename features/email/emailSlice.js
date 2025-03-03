import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Export the action creator
export const { setEmail } = emailSlice.actions;

// Export the reducer
export default emailSlice.reducer;