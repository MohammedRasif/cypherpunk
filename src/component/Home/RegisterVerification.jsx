import React, { useRef, useState, useCallback } from "react";
import { useVerifyRegisterEmailMutation } from "../../redux/features/baseApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function RegisterVerification() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [verifyRegisterEmail, { isLoading }] = useVerifyRegisterEmailMutation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "username@gmail.com";

  const focusInput = useCallback((index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    let value = e.target.value;
    const digit = value.replace(/\D/g, "");
    const newCode = [...code];
    if (digit.length > 0) {
      newCode[index] = digit.charAt(0);
      setCode(newCode);
      if (index < 5 && digit.length === 1) {
        focusInput(index + 1);
      }
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
    const pasteData = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasteData.length >= 6) {
      const pastedDigits = pasteData.substring(0, 6).split("");
      setCode(pastedDigits);
      focusInput(5);
    }
  };

  const fullCode = code.join("");

  const handleVerify = async () => {
    if (fullCode.length === 6) {
      try {
        const response = await verifyRegisterEmail({ email, code: fullCode }).unwrap();
        if (response.access) localStorage.setItem("access", response.access);
        if (response.refresh) localStorage.setItem("refresh", response.refresh);
        toast.success("Verification Successful!");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || "Verification failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
        

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-800">
            Check your Mail
          </h1>
          <p className="text-base text-gray-600 px-4">
            We've sent a 6-digit confirmation code to{" "}
            <span className="font-semibold text-gray-800">{email}</span>.
            Make sure you enter correct code.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          {code.map((digit, index) => (
            <DigitInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        <button
          type="submit"
          onClick={handleVerify}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-200 ${
            fullCode.length === 6 && !isLoading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-500 cursor-not-allowed"
          }`}
          disabled={fullCode.length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Didn't Receive code?{" "}
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            Resend Code
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterVerification;