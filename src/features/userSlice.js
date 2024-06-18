// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: null,
  authReady: true,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
    clear: (state) => {
      state.user = null;
    },
  },
});

export const { login, isAuthReady, clear } = userSlice.actions;
export default userSlice.reducer;
