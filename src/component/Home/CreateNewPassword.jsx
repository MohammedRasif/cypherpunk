import React from 'react';

function CreateNewPassword() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-100 p-4'>
      <div className='bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg'>
        
        {/* Header: Back button and Step indicator */}
        <div className='flex justify-between items-center mb-10 text-sm font-medium text-gray-500'>
          <button className='flex items-center hover:text-gray-700 transition duration-150'>
            {/* Back Arrow Icon */}
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>
          <span>Step 3 of 3</span>
        </div>

        {/* Content */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3 text-gray-800'>Create New Password</h1>
          <p className='text-base text-gray-600'>
            Enter the new password for your account.
          </p>
        </div>

        {/* Form */}
        <form>
          {/* New Password Field */}
          <div className='mb-4'>
            <label htmlFor='newPassword' className='block text-sm font-medium mb-2 text-gray-700'>
              New Password
            </label>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
                {/* Lock Icon Placeholder */}
                🔒 
              </span>
              <input
                type='password'
                id='newPassword'
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                placeholder='**********'
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                {/* Eye Icon Placeholder */}
                👁️
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className='mb-6'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium mb-2 text-gray-700'>
              Confirm Password
            </label>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
                {/* Lock Icon Placeholder */}
                🔒 
              </span>
              <input
                type='password'
                id='confirmPassword'
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                placeholder='**********'
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                {/* Eye Icon Placeholder */}
                👁️
              </span>
            </div>
          </div>
          
          {/* Password Requirements Checklist */}
          <ul className='mb-8 text-sm text-gray-600 space-y-1'>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>✓</span>
              Password must be between 8 to 32 characters
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>✓</span>
              Must contain a uppercase character
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>✓</span>
              Must contain a number
            </li>
            <li className='flex items-center'>
              <span className='text-blue-600 mr-2'>✓</span>
              Must contain one special character
            </li>
          </ul>

          {/* Reset Password Button */}
          <button 
            type='submit' 
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200'
          >
            Reset Password
          </button>
        </form>

        {/* Resend Code (Footer) */}
        <p className='mt-5 text-center text-sm text-gray-600'>
          Didn't Receive code? <a href='#' className='text-blue-600 hover:underline font-semibold'>Resend Code</a>
        </p>

      </div>
    </div>
  );
}

export default CreateNewPassword;