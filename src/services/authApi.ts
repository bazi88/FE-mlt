import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTHENTICATION_IP } from "../data/constantData";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTHENTICATION_IP,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return { url: "/auth/login", method: "post", body };
      },
    }),

    registerUser: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => {
        return { url: "/users/signup", method: "post", body };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
