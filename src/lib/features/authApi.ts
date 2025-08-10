import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
  creationAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  avatar: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      // Define RootState type for proper typing
      interface RootState {
        auth: {
          token?: string
        }
      }
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (userData) => ({
        url: "users/",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "auth/profile",
      providesTags: ["User"],
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useGetUsersQuery } = authApi
