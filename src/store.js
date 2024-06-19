import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productsReducer from "./features/productSlice";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState().products);
});
