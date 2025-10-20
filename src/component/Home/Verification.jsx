import React, { useRef, useState, useCallback } from 'react';

// Utility component for the individual digit input field
const DigitInput = React.forwardRef(({ value, onChange, onKeyDown, onPaste }, ref) => (
  <input
    ref={ref}
    type="text"
    maxLength="1"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onPaste={onPaste}
    className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg mx-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition duration-150 outline-none"
    style={{ appearance: 'textfield' }} // Ensure consistent styling for text type
    inputMode="numeric"
  />
));

function Verification() {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  // Mock email to display, as shown in the image
  const mockEmail = 'username@gmail.com';

  // --- Core Auto-Tab Logic ---

  const focusInput = useCallback((index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    let value = e.target.value;

    // Remove any non-digit characters
    const digit = value.replace(/\D/g, ''); 

    // Update the state array
    const newCode = [...code];
    if (digit.length > 0) {
      newCode[index] = digit.charAt(0);
      setCode(newCode);

      // Auto-tab to the next input if a digit was entered
      if (index < 5 && digit.length === 1) {
        focusInput(index + 1);
      }
    } else {
      // If the field is cleared manually, keep focus
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyDown = (e, index) => {
    // 1. Backspace/Delete navigation
    if (e.key === 'Backspace' || e.key === 'Delete') {
      // Prevent default backspace behavior in an empty field to stop browser navigation
      e.preventDefault(); 
      
      const newCode = [...code];
      
      if (newCode[index] !== '') {
        // Clear the current field if it has a value
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // If current field is empty, move focus and clear the previous field
        focusInput(index - 1);
        newCode[index - 1] = '';
        setCode(newCode);
      }
    } 
    // 2. Arrow key navigation
    else if (e.key === 'ArrowRight' && index < 5) {
        focusInput(index + 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1);
    }
    // 3. Block multiple characters
    else if (e.key.length === 1 && !/\d/.test(e.key)) {
        e.preventDefault(); // Block non-digit characters
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    
    // Only process if the pasted data is the exact length or longer
    if (pasteData.length >= 6) {
      const pastedDigits = pasteData.substring(0, 6).split('');
      setCode(pastedDigits);
      // Move focus to the last input field after pasting
      focusInput(5); 
    }
  };

  const fullCode = code.join('');

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
          <span>Step 2 of 3</span>
        </div>

        {/* Content */}
        <div className='mb-10 text-center'>
          <h1 className='text-4xl font-bold mb-3 text-gray-800'>Check your Mail</h1>
          <p className='text-base text-gray-600 px-4'>
            We've sent a 6-digit confirmation code to <span className='font-semibold text-gray-800'>{mockEmail}</span>. Make sure you enter correct code.
          </p>
        </div>

        {/* 6-Digit Code Inputs */}
        <div className='flex justify-center mb-10'>
          {code.map((digit, index) => (
            <DigitInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on the first input
            />
          ))}
        </div>

        {/* Verify Button */}
        <button 
          type='submit' 
          className={`w-full py-3 rounded-lg font-semibold text-lg transition duration-200 ${
            fullCode.length === 6 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-200 text-blue-500 cursor-not-allowed'
          }`}
          disabled={fullCode.length !== 6}
        >
          Verify
        </button>

        {/* Resend Code */}
        <p className='mt-5 text-center text-sm text-gray-600'>
          Didn't Receive code? <a href='#' className='text-blue-600 hover:underline font-semibold'>Resend Code</a>
        </p>

      </div>
    </div>
  );
}

export default Verification;