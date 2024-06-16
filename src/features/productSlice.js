import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  products: [],
  price: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increaseAmount: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product.id) {
        product.amount += 1;
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    decreaseAmount: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product.id && product.amount > 0) {
        product.amount -= 1;
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    calculateTotal: (state) => {
      let totalPrice = 0;
      state.products.forEach((product) => {
        totalPrice += product.price * product.amount;
      });
      state.price = totalPrice;
    },
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.products.push({ ...action.payload, amount: 1 });
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
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = updatedProducts;
      productsSlice.caseReducers.calculateTotal(state);
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
} = productsSlice.actions;

export default productsSlice.reducer;
