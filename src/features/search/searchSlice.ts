import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IQueryParams } from "../../types";
const initialState: IQueryParams = {
  page: 1,
  q: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number | string>) => {
      state.page = action.payload;
    },
    changeSearchParams: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
  },
});

export const { changePage, changeSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
