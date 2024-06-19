// features/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return { products: [], totalAmount: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { products: [], totalAmount: 0 };
  }
};

const initialState = loadState();

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    incrementProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.amount += 1;
      }
    },
    decrementProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.amount > 1) {
        product.amount -= 1;
      }
    },
    calculateTotal: (state) => {
      state.totalAmount = state.products.reduce(
        (total, product) => total + product.amount * product.price,
        0
      );
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementProduct,
  decrementProduct,
  calculateTotal,
  setProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
