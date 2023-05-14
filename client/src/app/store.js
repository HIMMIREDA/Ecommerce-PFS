import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        brand: brandReducer,
        product: productReducer,
        cart: cartReducer,
    }
});