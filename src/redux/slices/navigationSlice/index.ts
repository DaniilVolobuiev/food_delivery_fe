import { createSlice } from '@reduxjs/toolkit';

const initialState = { currentShop: null };

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentShop(state, action) {
      state.currentShop = action.payload;
    },
  },
});

export const { reducer: navigationReducer, actions: navigationActions } = navigationSlice;
