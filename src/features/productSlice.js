import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  price: 0,
  product: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseAmount: (state, action) => {
      state.product.amount += 1;
      state.product = { ...state.product };
    },
    decreaseAmount: (state, action) => {
      state.product.amount -= 1;
      state.product = { ...state.product };
    },
    calculateTotal: (state) => {
      let totalPrice = 0;
      state.products.forEach((product) => {
        totalPrice += product.price * product.amount;
      });
      state.price = totalPrice;
    },
    addProduct: (state, action) => {
      const productExists = state.products.find(
        (item) => item.id === state.product.id
      );
      if (!productExists) {
        state.products.push(state.product);
      }
      productsSlice.caseReducers.calculateTotal(state);
    },
    addItems: (state) => {
      localStorage.setItem("items", JSON.stringify(state.products));
    },
    getProduct: (state) => {
      const itemsStorage = JSON.parse(localStorage.getItem("items"));
      if (itemsStorage) {
        state.products = itemsStorage;
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      productsSlice.caseReducers.calculateTotal(state);
    },
    getOneProduct(state, action) {
      state.product = { ...action.payload, price: 20, amount: 1 };
    },
  },
});

export const {
  increaseAmount,
  decreaseAmount,
  calculateTotal,
  addProduct,
  addItems,
  getProduct,
  removeProduct,
  getOneProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
