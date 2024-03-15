import { store } from "./app/store";

export interface IProduct {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}
export interface IQueryParams {
  productInfoId: null | string;
  id?: null | string;
  page: number;
  per_page: number;
}
export type RootState = ReturnType<typeof store.getState>;

export type Void = Partial<IQueryParams>;

export type ProductsResponse = {
  data: IProduct[];
  per_page: number;
  page: number;
  total: number;
};
export type ProductByIdResponse = {
  data: IProduct;
};
