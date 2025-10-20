import React from "react";
import img from "../../assets/image/aaa.png";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-7xl overflow-hidden lg:h-[75vh]">
        {/* Input/Form Section (Left Side) */}
        <div className="w-1/2 p-12">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
            Create an account
          </h2>

          {/* Continue with Google */}
          <button className="flex items-center justify-center font-bold w-full py-2 bg-gray-200  mb-6 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200">
            <FcGoogle size={30} />
            Continue with Google
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your name"
            />
          </div>

          {/* Email Address Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
            />
          </div>

          {/* Password Fields */}
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  defaultValue="********" // Placeholder for the mask
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  {/* Eye icon placeholder */}
                  👁️
                </span>
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  defaultValue="********" // Placeholder for the mask
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  {/* Eye icon placeholder */}
                  👁️
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-start mb-8">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree with the{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Sign In button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
            Sign In
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600 hover:underline font-semibold">
              Log in
            </NavLink>
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
