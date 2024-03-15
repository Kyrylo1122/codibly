import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IQueryParams } from "../../types";
const initialState: IQueryParams = {
  id: null,
  page: 1,
  per_page: 5,
  productInfoId: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    changeId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
    changeProductInfoId: (state, action: PayloadAction<string | null>) => {
      state.productInfoId = action.payload;
    },
  },
});

export const { changePage, changeId, changeProductInfoId } =
  searchSlice.actions;

export default searchSlice.reducer;
