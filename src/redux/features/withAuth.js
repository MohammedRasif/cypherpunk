import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { use } from "react";

export const sqQuery = createApi({
  reducerPath: "sqQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.13.60:8004/api",
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("ngrok-skip-browser-warning", "true");

      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      

      return headers;
    },
  }),

  tagTypes: ["profileInfo", "earnings", "rentals", "manageRentalsDetails"],
  endpoints: (builder) => ({
    showProfileInformation: builder.query({
      query: () => "/accounts/profile/",
      providesTags: ["profileInfo"],
    }),

    // show dashboard total earnings
    showUserEarnings: builder.query({
      query: () => "/api/accounts/web/dashboard/",
      providesTags: ["earnings"],
    }),

    // //show dashbaord earnings chart data
    // showRarningChartData: builder.query({
    //   query: () => "/api/accounts/web/dashboard/monthly-earnings/",
    //   providesTags: ["earnings"],
    // }),

    // // show dashbaord recent transactions data
    // showReactTransactions: builder.query({
    //   query: () => "/api/accounts/web/dashboard/recent-transactions/",
    //   providesTags: ["earnings"],
    // }),

    // // show manage rentals data
    // showManageRentals: builder.query({
    //   query: () => "/web/bookings/statistics/",
    //   providesTags: ["rentals"],
    // }),

    // // show manage rentals details data
    // showManageRentalsDetails: builder.query({
    //   query: () => "/web/bookings/management/",
    //   providesTags: ["manageRentalsDetails"],
    // }),


  }),
});

export const {
  useShowProfileInformationQuery,


} = sqQuery;
