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
    showbalance: builder.query({
      query: () => "/trade/overview-stats/",
      providesTags: ["earnings"],
    }),

    // show protfilio value in chart
    showPortfolioValue: builder.query({
      query: () => "/trade/overview-chart/",
      providesTags: ["earnings"],
    }),

    // show dashboard monthly summary
    showMonthlySummary: builder.query({
      query: () => "/trade/portfolio-values/monthly-summary/",
      providesTags: ["earnings"],
    }),

    // show dashbaord recent activities
    showRecentActivities: builder.query({
      query: () => "/trade/portfolio-values/recent-activity/",
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
  useShowbalanceQuery,
  useShowPortfolioValueQuery,
  useShowMonthlySummaryQuery,
  useShowRecentActivitiesQuery,

} = sqQuery;
