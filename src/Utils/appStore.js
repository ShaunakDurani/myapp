import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
