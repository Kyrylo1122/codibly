import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../libs/rtk-query";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
