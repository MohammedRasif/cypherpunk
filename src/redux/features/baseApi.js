import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.60:8004/api",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  tagTypes: ["User", "Agency", "TourPlan"],
  endpoints: (builder) => ({

    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/accounts/social-login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),


    register: builder.mutation({
      query: (userData) => ({
        url: "/accounts/signup/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"], 
    }),

    verifyRegisterEmail: builder.mutation({
      query: (email) => ({
        url: "/accounts/verify-otp/",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"], 
    }),
    logIn: builder.mutation({
      query: (loginData) => ({
        url: "/accounts/web/auth/login/",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"], // Invalidate User-related queries on login
    }),

    forgetPassword: builder.mutation({
      query: (forgetPassword) => ({
        url: "/accounts/web/password/reset/",
        method: "POST",
        body: forgetPassword,
      }),
      invalidatesTags: ["User"],
    }),
    otpVerify: builder.mutation({
      query: (otpData) => ({
        url: "/accounts/web/password/reset/verify-otp/",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["User"], 
    }),
    // reSendOtp: builder.mutation({
    //   query: (email) => ({
    //     url: "/auth/resend_otp/",
    //     method: "POST",
    //     body: email,
    //   }),
    //   invalidatesTags: ["User"], // Invalidate User-related queries on OTP resend
    // }),
    
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/web/password/reset/confirm/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"], 
    }),
   

  }),
});

export const {
  useGoogleLoginMutation,
  useRegisterMutation,
  useVerifyRegisterEmailMutation,
 
} = baseApi;