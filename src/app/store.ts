import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "src/libs/rtk-query";
import searchReducer from "src/features/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
