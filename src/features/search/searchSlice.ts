import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IQueryParams } from "../../types";
const initialState: IQueryParams = {
  page: 1,
  per_page: "5",
  q: "",
  id: 1,
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
    changeId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
  },
});

export const { changePage, changeSearchParams, changeId } = searchSlice.actions;

export default searchSlice.reducer;
