import { ProductDetailType, ProductType, UpdateProductDto } from "@/types/productType";
import { productsApi } from "../api/productsApi";
import { CreateUserDto, Login, UserLoginResponse, UserTypeRegister } from "@/types/userType";
import { FileUploadType } from "@/types/fileType";

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
    }),
    createUser:builder.mutation<UserTypeRegister, CreateUserDto>({
      query: (formData) => ({
        url: `users`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    login:builder.mutation<UserLoginResponse,Login>({
      query: (credentials) => ({
        url: `auth/login`,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],

    }),
    createFile: builder.mutation<FileUploadType, FormData>({
      query: (formData) => {
        // Get token from localStorage or cookie (adjust as needed)
        // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
        return {
          url: `files/upload`,
          method: 'POST',
          body: formData,
          // headers: token ? { Authorization: `Bearer ${token}` } : {},
        };
      },
      invalidatesTags: [{ type: "File", id: "LIST" }],
    })
  }),

});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateUserMutation,
  useCreateFileMutation,
  useLoginMutation
} = apiSlice;
