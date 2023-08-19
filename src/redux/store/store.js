import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state-slice/cartSlice";
import categoryReducer from "../state-slice/category-slice";
import itemReducer from "../state-slice/menuItemSlice";
export default configureStore({
  reducer: {
    category: categoryReducer,
    menuItem: itemReducer,
    cart: cartReducer,
  },
});
