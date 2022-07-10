import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart.slice";

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
