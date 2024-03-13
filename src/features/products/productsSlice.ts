import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  page: 0,
  query: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export default productsSlice.reducer;
