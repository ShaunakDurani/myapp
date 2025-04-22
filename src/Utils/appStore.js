import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice"; // Assuming you have a userReducer

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    user: userReducer, // Replace 'useReducer' with the correct userReducer
  },
});

export default store;
