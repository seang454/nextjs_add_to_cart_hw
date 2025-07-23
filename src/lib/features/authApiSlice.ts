import { ProductDetailType, ProductType, UpdateProductDto } from "@/types/productType";
import { productsApi } from "../api/productsApi";

export const apiSlice = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[] , void>({
      query: () => `products`, // fetch all without params
      providesTags: ["Product"],
    }),
    getProductById: builder.query<ProductDetailType, number>({
      query: (id) => `products/${id}`, // fetch by id
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct:builder.mutation<ProductType, Partial<ProductType>>({
      query: (newProduct) => ({
        url: `products`,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct:builder.mutation<ProductType,Partial<UpdateProductDto>>({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct:builder.mutation<void,number>({
      query:(id)=>({
        url:`products/${id}`,
        method:'DELETE',
      })
    })
  }),

});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = apiSlice;
