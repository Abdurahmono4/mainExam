import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: "",
  authReady: false,
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
      state.user = "";
    },
  },
});

export const { login, logout, isAuthReady, clear } = userSlice.actions;
export default userSlice.reducer;
