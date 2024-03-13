import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../libs/rtk-query";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,

    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
