"use client";

import React, { useState } from "react";
import img from "../../assets/image/aaa.png";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../../redux/features/baseApi";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next"; 

function Register() {
  const { t } = useTranslation(); 
  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();
      localStorage.setItem("email", formData.email);
      toast.success(t("signup_success"));
      navigate("/register_verification");
    } catch (error) {
      toast.error(error?.data?.message || t("signup_failed"));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let email, name;

        if (tokenResponse.credential) {
          const decoded = jwtDecode(tokenResponse.credential);
          email = decoded.email;
          name = decoded.name || decoded.given_name + " " + decoded.family_name;
        } else if (tokenResponse.access_token) {
          const res = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
          );
          const data = await res.json();
          email = data.email;
          name = data.name;
        }

        if (!email || !name) throw new Error("Failed to get user info");
        const response = await googleLogin({ email, name }).unwrap();
        if (response.access) localStorage.setItem("access", response.access);
        if (response.refresh) localStorage.setItem("refresh", response.refresh);
        localStorage.setItem("email", email);

        toast.success(t("google_signup_success"));
        navigate("/");
      } catch (error) {
        toast.error(
          error?.data?.message || error.message || t("google_login_failed")
        );
      }
    },
    onError: () => {
      toast.error(t("google_login_cancelled"));
    },
    flow: "implicit",
    scope: "openid email profile",
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-7xl overflow-hidden lg:h-[75vh]">
          <div className="w-1/2 p-12">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
              {t("create_account")}
            </h2>

            <button
              onClick={() => handleGoogleLogin()}
              disabled={isGoogleLoading}
              className={`flex items-center justify-center font-bold w-full py-2 bg-gray-200 mb-6 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200 ${
                isGoogleLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <FcGoogle size={30} className="mr-2" />
              {isGoogleLoading ? t("loading") : t("continue_with_google")}
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-sm text-gray-500">{t("or")}</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("your_name")}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                  {t("email_address")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("email_address")}
                />
              </div>

              <div className="flex space-x-4 mb-6">
                <div className="w-1/2">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                    {t("password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder=""
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </span>
                  </div>
                </div>

                <div className="w-1/2">
                  <label htmlFor="confirm_password" className="block text-gray-700 text-sm font-medium mb-1">
                    {t("confirm_password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder=""
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <input type="checkbox" id="terms" className="h-4 w-4 text-blue-600 rounded mt-1" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  {t("agree_terms")}{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    {t("terms_conditions")}
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isRegisterLoading}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-200 ${
                  isRegisterLoading
                    ? "bg-blue-200 text-blue-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isRegisterLoading ? t("signing_up") : t("sign_up")}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {t("already_have_account")}{" "}
              <NavLink to="/login" className="text-blue-600 hover:underline font-semibold">
                {t("log_in")}
              </NavLink>
            </p>
          </div>

          <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <img
              src={img}
              alt={t("illustration")}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Register;