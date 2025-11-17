"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdatePasswordMutation } from "../../redux/features/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function CreateNewPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ---- Form fields ----
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ---- Mutation ----
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  // ---- Only check that passwords match ----
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  // ---- Submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error(t("please_fill_passwords"));
      return;
    }
    if (!passwordsMatch) {
      toast.error(t("passwords_do_not_match"));
      return;
    }

    const access_token = localStorage.getItem("access");
    if (!access_token) {
      toast.error(t("access_token_missing"));
      return;
    }

    try {
      const payload = {
        new_password: newPassword,
        confirm_password: confirmPassword,
        access_token,
      };

      const result = await updatePassword(payload).unwrap();

      toast.success(result?.message || t("password_updated"));
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (err) {
      const msg =
        err?.data?.message || err?.message || t("password_update_failed");
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 text-sm font-medium text-gray-500">
            <NavLink to="/verification">
              <button className="flex items-center hover:text-gray-700 transition duration-150">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t("back")}
              </button>
            </NavLink>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              {t("create_new_password")}
            </h1>
            <p className="text-base text-gray-600">{t("enter_new_password")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                {t("new_password")}
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="**********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showNew ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                {t("confirm_password")}
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="**********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* ---- NO CHECKLIST ANYMORE ---- */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !passwordsMatch}
              className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-200 ${
                passwordsMatch && !isLoading
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-200 text-blue-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? t("updating") : t("reset_password")}
            </button>
          </form>

          {/* Resend Code */}
          <p className="mt-5 text-center text-sm text-gray-600">
            {t("didnt_receive_code")}{" "}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              {t("resend_code")}
            </a>
          </p>
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

export default CreateNewPassword;
