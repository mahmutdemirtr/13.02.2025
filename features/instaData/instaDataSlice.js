import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  username: '',
  isPaid: false,
  isUnlocked: false,
};

const instaDataSlice = createSlice({
  name: 'instaData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setIsPaid: (state, action) => {
      state.isPaid = action.payload;
    },
    setIsUnlocked: (state, action) => {
      state.isUnlocked = action.payload;
    },
  },
});

// Export action creators
export const { setUserData, setUsername, setIsPaid, setIsUnlocked } = instaDataSlice.actions;

// Export the reducer
export default instaDataSlice.reducer;