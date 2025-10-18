import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboardLayout from "./component/UserDashboard/UserDashboardLayout/UserDashboardLayout.jsx";
import Dashboard from "./component/UserDashboard/UserDashboardPages/Dashboard.jsx";
import DashboardTrade from "./component/UserDashboard/UserDashboardPages/DashboardTrade.jsx";
import DashboardSocialFeed from "./component/UserDashboard/UserDashboardPages/DashboardSocialFeed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Dashboard />,
      },
      {
        path: "trade", 
        element: <DashboardTrade />, 
      },
      {
        path: "social-feed", 
        element: <DashboardSocialFeed />, 
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);