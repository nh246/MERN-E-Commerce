import { configureStore } from "@reduxjs/toolkit";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice"
import productsApi from "./features/products/productsApi";
import reviewsApi from "./features/reviews/reviewsApi";
import cartReducer from "../redux/features/cart/cartSlice"

 export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        cart: cartReducer,
    },

    middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewsApi.middleware)
})