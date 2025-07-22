import { ProductDetailType, ProductType } from "@/types/productType";
import { productsApi } from "../api/productsApi";

export const apiSlice = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: ProductType[] }, void>({
      query: () => `products`, // fetch all without params
      providesTags: ["Product"],
    }),

    getProductById: builder.query<ProductDetailType, number>({
      query: (id) => `products/${id}`, // fetch by id
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = apiSlice;
