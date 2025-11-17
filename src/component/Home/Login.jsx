"use client";

import img from "../../assets/image/rafiki.png";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";   // <-- eye icons
import { NavLink, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGoogleLoginMutation,
  useLogInMutation,
} from "../../redux/features/baseApi";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading }] = useLogInMutation();

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  

  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let email, name;

        if (tokenResponse.credential) {
          const decoded = jwtDecode(tokenResponse.credential);
          email = decoded.email;
          name = decoded.name || `${decoded.given_name} ${decoded.family_name}`;
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

        toast.success(t("google_login_success"));
        navigate("/");
      } catch (error) {
        toast.error(
          error?.data?.message || error.message || t("google_login_failed")
        );
      }
    },
    onError: () => toast.error(t("google_login_cancelled")),
    flow: "implicit",
    scope: "openid email profile",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t("please_fill_all_fields"));
      return;
    }

    try {
      const payload = { email, password };
      const response = await login(payload).unwrap();

      if (response.access) localStorage.setItem("access", response.access);
      if (response.refresh) localStorage.setItem("refresh", response.refresh);
      localStorage.setItem("email", email);

      toast.success(t("login_success"));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.message || t("login_failed"));
    }
  };

  return (
    <>
      <div className="lg:flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl lg:flex w-full max-w-7xl lg:h-[75vh]">
          {/* ---------- LEFT SIDE (FORM) ---------- */}
          <div className="lg:w-1/2 p-10 lg:mt-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              {t("login")}
            </h2>

            {/* Google */}
            <button
              onClick={() => handleGoogleLogin()}
              disabled={isGoogleLoading}
              className={`flex items-center justify-center w-full font-bold py-2 bg-gray-200 mb-6 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200 ${
                isGoogleLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FcGoogle size={30} className="mr-2" />
              {isGoogleLoading ? t("loading") : t("continue_with_google")}
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">{t("or")}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* ---------- FORM ---------- */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("email_address")}
                  required
                />
              </div>

              {/* Password + Eye */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  {t("password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("password")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 text-sm text-gray-600"
                    >
                      {t("remember_me")}
                    </label>
                  </div>
                  <NavLink
                    to="/forget-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {t("forgot_password")}
                  </NavLink>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoginLoading}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ${
                  isLoginLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoginLoading ? t("loading") : t("sign_in")}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {t("no_account")}{" "}
              <NavLink
                to="/register"
                className="text-blue-600 hover:underline font-semibold"
              >
                {t("sign_up")}
              </NavLink>
            </p>
          </div>

          <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-r-3xl">
            <img
              src={img}
              alt={t("global_business_illustration")}
              className="max-w-full lg:w-[90vh] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Login;