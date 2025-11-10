"use client";

import React from 'react';
import { useTranslation } from 'react-i18next'; // যোগ হলো

function CreateNewPassword() {
  const { t } = useTranslation(); // যোগ হলো

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-100 p-4'>
      <div className='bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg'>
        
        {/* Header: Back button and Step indicator */}
        <div className='flex justify-between items-center mb-10 text-sm font-medium text-gray-500'>
          <button className='flex items-center hover:text-gray-700 transition duration-150'>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            {t("back")}
          </button>
          <span>{t("step_of", { current: 3, total: 3 })}</span>
        </div>

        {/* Content */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3 text-gray-800'>
            {t("create_new_password")}
          </h1>
          <p className='text-base text-gray-600'>
            {t("enter_new_password")}
          </p>
        </div>

        {/* Form */}
        <form>
          {/* New Password Field */}
          <div className='mb-4'>
            <label htmlFor='newPassword' className='block text-sm font-medium mb-2 text-gray-700'>
              {t("new_password")}
            </label>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>Lock</span>
              <input
                type='password'
                id='newPassword'
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                placeholder='**********'
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>Eye</span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className='mb-6'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium mb-2 text-gray-700'>
              {t("confirm_password")}
            </label>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>Lock</span>
              <input
                type='password'
                id='confirmPassword'
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                placeholder='**********'
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>Eye</span>
            </div>
          </div>
          
          {/* Password Requirements Checklist */}
          <ul className='mb-8 text-sm text-gray-600 space-y-1'>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>Check</span>
              {t("password_length")}
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>Check</span>
              {t("password_uppercase")}
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>Check</span>
              {t("password_number")}
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>Check</span>
              {t("password_special")}
            </li>
          </ul>

          {/* Reset Password Button */}
          <button 
            type='submit' 
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200'
          >
            {t("reset_password")}
          </button>
        </form>

        {/* Resend Code (Footer) */}
        <p className='mt-5 text-center text-sm text-gray-600'>
          {t("didnt_receive_code")} <a href='#' className='text-blue-600 hover:underline font-semibold'>{t("resend_code")}</a>
        </p>

      </div>
    </div>
  );
}

export default CreateNewPassword;