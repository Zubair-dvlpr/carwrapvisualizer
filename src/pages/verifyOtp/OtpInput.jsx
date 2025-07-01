import React, { useState, useRef } from 'react';

const OtpInput = ({ onChange }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 mb-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={e => handleChange(e.target.value, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className="border sm:w-12 sm:h-12 w-10 h-10 text-center text-xl rounded focus:ring-2 focus:ring-pink-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
