import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice.ts";
import brandReducer from "../features/brand/brandSlice.ts";
import productReducer from "../features/product/productSlice.ts";
import cartReducer from '../features/cart/cartSlice.ts';
import authReducer from '../features/auth/authSlice.ts';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        brand: brandReducer,
        product: productReducer,
        cart: cartReducer,
        auth: authReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;