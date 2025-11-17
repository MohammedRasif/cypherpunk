"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOtpVerifyMutation } from "../../redux/features/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

const DigitInput = React.forwardRef(
  ({ value, onChange, onKeyDown, onPaste }, ref) => (
    <input
      ref={ref}
      type="text"
      maxLength="1"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg mx-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-150 outline-none"
      style={{ appearance: "textfield" }}
      inputMode="numeric"
    />
  )
);

function Verification() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email") || "";
  const [email] = useState(storedEmail); 

  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [verfyOtp, { isLoading }] = useOtpVerifyMutation();

  const focusInput = useCallback(
    (index) => {
      if (inputRefs.current[index]) inputRefs.current[index].focus();
    },
    []
  );

  const handleChange = (e, index) => {
    const value = e.target.value;
    const digit = value.replace(/\D/g, "");
    const newCode = [...code];

    if (digit) {
      newCode[index] = digit[0];
      setCode(newCode);
      if (index < 5) focusInput(index + 1);
    } else {
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index] !== "") {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        focusInput(index - 1);
        newCode[index - 1] = "";
        setCode(newCode);
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      focusInput(index + 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key.length === 1 && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (paste.length >= 6) {
      const digits = paste.substring(0, 6).split("");
      setCode(digits);
      focusInput(5);
    }
  };

  const fullCode = code.join("");

  const handleVerify = async () => {
    if (!email) {
      toast.error(t("email_not_found"));
      return;
    }
    if (fullCode.length !== 6) {
      toast.error(t("enter_full_otp"));
      return;
    }

    try {
      const payload = { email, code: fullCode };
      const result = await verfyOtp(payload).unwrap();

      if (result.access) localStorage.setItem("access", result.access);
      if (result.refresh) localStorage.setItem("refresh", result.refresh);
      localStorage.setItem("email", email);

      toast.success(result?.message || t("otp_verified"));
      navigate("/create-new-password"); 
    } catch (err) {
      const msg =
        err?.data?.message || err?.message || t("otp_verification_failed");
      toast.error(msg);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 text-sm font-medium text-gray-500">
            <NavLink to="/forget-password">
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

          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              {t("check_your_mail")}
            </h1>
            <p className="text-base text-gray-600 px-4">
              {t("sent_code_to", { email })}{" "}
              <span className="font-semibold text-gray-800">{email}</span>.{" "}
              {t("enter_correct_code")}
            </p>
          </div>

          {/* 6-digit inputs */}
          <div className="flex justify-center mb-10">
            {code.map((digit, idx) => (
              <DigitInput
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
              />
            ))}
          </div>

          {/* Verify button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={fullCode.length !== 6 || isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-200 ${
              fullCode.length === 6 && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-200 text-blue-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? t("verifying") : t("verify")}
          </button>

          {/* Resend */}
          <p className="mt-5 text-center text-sm text-gray-600">
            {t("didnt_receive_code")}{" "}
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              {t("resend_code")}
            </a>
          </p>
        </div>
      </div>

      {/* Toast container */}
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

export default Verification;