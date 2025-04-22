// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCart: false,
  },
  reducers: {
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
  },
});

export const { showCart, hideCart } = uiSlice.actions;
export default uiSlice.reducer;
