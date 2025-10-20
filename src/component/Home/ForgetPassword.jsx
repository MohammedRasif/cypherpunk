import React from 'react';
import { ChevronLeft } from 'lucide-react'; // Using lucide-react for the back icon
import { NavLink } from 'react-router-dom';

function ForgetPassword() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-100 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg'>
        
        {/* Header: Back button and Step indicator */}
        <div className='flex justify-between items-center mb-10 text-sm font-medium text-gray-500'>
         <NavLink to="/login">
             <button className='flex items-center hover:text-gray-700 transition duration-150'>
            {/* Using an arrow icon, like ChevronLeft from lucide-react (or a simple arrow if not using an icon library) */}
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>
         </NavLink>
          <span>Step 1 of 3</span>
        </div>

        {/* Content */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-3 text-gray-800'>Forgot Password</h1>
          <p className='text-base text-gray-600'>
            Enter the email of your account and we will send the email to reset your password.
          </p>
        </div>

        {/* Form */}
        <form>
          <div className='mb-6'>
            <label htmlFor='email' className='block text-sm font-medium mb-2 text-gray-700'>
              Email
            </label>
            <div className='relative'>
              <input
                type='email'
                id='email'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
                placeholder='Your email'
              />
            </div>
          </div>

          {/* Next Button */}
          <button 
            type='submit' 
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200'
          >
            Next
          </button>
        </form>

      </div>
    </div>
  );
}

export default ForgetPassword;