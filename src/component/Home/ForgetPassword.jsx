"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForgetPasswordMutation } from "../../redux/features/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(t("please_enter_email"));
      return;
    }
    try {
      const result = await forgetPassword({ email }).unwrap();
      toast.success(result?.message || t("reset_link_sent"));
      localStorage.setItem("email",email)
      navigate("/verification")
    } catch (err) {
      const errMsg =
        err?.data?.message || err?.message || t("something_went_wrong");
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
          <div className="flex justify-between items-center mb-10 text-sm font-medium text-gray-500">
            <NavLink to="/login">
              <button className="flex items-center hover:text-gray-700 transition duration-150 cursor-pointer">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t("back")}
              </button>
            </NavLink>
           
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              {t("forgot_password")}
            </h1>
            <p className="text-base text-gray-600">
              {t("enter_email_instruction")}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                {t("email")}
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder={t("your_email")}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-200 ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isLoading ? t("sending") : t("next")}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default ForgetPassword;