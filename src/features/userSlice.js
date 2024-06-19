import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage if available
const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromLocalStorage || null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(payload));
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
    clear: (state) => {
      state.user = null;
      // Remove user from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { login, isAuthReady, clear } = userSlice.actions;
export default userSlice.reducer;
