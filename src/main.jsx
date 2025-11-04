import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDashboardLayout from "./component/UserDashboard/UserDashboardLayout/UserDashboardLayout.jsx";
import Dashboard from "./component/UserDashboard/UserDashboardPages/Dashboard.jsx";
import DashboardTrade from "./component/UserDashboard/UserDashboardPages/DashboardTrade.jsx";
import DashboardSocialFeed from "./component/UserDashboard/UserDashboardPages/DashboardSocialFeed.jsx";
import DashboardAnalytics from "./component/UserDashboard/UserDashboardPages/DashboardAnalytics.jsx";
import DashboardProfile from "./component/UserDashboard/UserDashboardPages/DashboardProfile.jsx";
import { TranslationProvider } from "./context/TranslationContext.jsx";
import Login from "./component/Home/Login.jsx";
import Register from "./component/Home/register.jsx";
import ForgetPassword from "./component/Home/ForgetPassword.jsx";
import Verification from "./component/Home/Verification.jsx";
import CreateNewPassword from "./component/Home/CreateNewPassword.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLINT_ID =
  "968286436200-7if31tvqbolu41g359vmf8eet6pfcf8u.apps.googleusercontent.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserDashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "trade", element: <DashboardTrade /> },
      { path: "social-feed", element: <DashboardSocialFeed /> },
      { path: "analytics", element: <DashboardAnalytics /> },
      { path: "profile", element: <DashboardProfile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/create-new-password",
    element: <CreateNewPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLINT_ID}>
      <Provider store={store}>
        <TranslationProvider>
          <RouterProvider router={router} />
        </TranslationProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
