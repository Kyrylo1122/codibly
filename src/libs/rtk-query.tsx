import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductByIdResponse, ProductsResponse, Void } from "../types";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, Void>({
      query: (params) => {
        return { url: `/products`, params };
      },
    }),
    getProductById: builder.query<ProductByIdResponse, number | string>({
      query: (id: number) => {
        return { url: `/products/${id}` };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
