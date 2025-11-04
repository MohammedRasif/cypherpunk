import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cowbird-central-crawdad.ngrok-free.app/",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  // Define tag types for cache management
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


    // User-related mutations
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/accounts/web/register/company/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"], 
    }),

    verifyEmail: builder.mutation({
      query: (email) => ({
        url: "/accounts/auth/verify-otp/",
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
  useCreateUserMutation,
  useLogInMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useVerifyEmailMutation,
  useUpdatePasswordMutation,
  useGoogleLoginMutation,
 
} = baseApi;