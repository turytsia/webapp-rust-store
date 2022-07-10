import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem("cart")) ?? {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: cart.products ?? [],
    quantity: cart.quantity ?? 0,
    total: cart.total ?? 0,
  },
  reducers: {
    clear(state) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    insert(state, action) {
      if (state.total < 0) {
        state.total = 0;
      }
      const index = state.products.findIndex(
        (product) =>
          product._id.toString() === action.payload.product._id.toString()
      );
      if (index >= 0) {
        state.total -= Number(state.products[index].price);
        state.products = state.products.filter(
          (product) =>
            product._id.toString() !== action.payload.product._id.toString()
        );
        state.quantity--;
      } else {
        state.products.push(action.payload.product);
        state.quantity++;
        state.total += Number(action.payload.product.price);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
