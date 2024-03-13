import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types";
interface IQuery {
  per_page: number;
  page: number;
}
type Void = Partial<IQuery>;
type ProductsResponse = { data: IProduct[] };

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, Void>({
      query: (params) => {
        return { url: `/products`, params };
      },
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id: string) => {
        return { url: `/${id}` };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
