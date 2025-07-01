import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPasswordRequestAPIFn, resendOtpAPIFn, verifyOtpAPIFn } from '../../redux/features/auth/authFns';
import OtpInput from '../verifyOtp/OtpInput';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [mode, setMode] = useState('reset'); // "reset" or "verify"
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const res = await dispatch(forgotPasswordRequestAPIFn({ email }));

    if (res?.meta?.requestStatus === 'fulfilled') {
      setMessage('✅ Reset link sent. Please check your email.');
    } else {
      const errorMsg = res?.payload;

      if (errorMsg?.includes('not verified')) {
        setMessage('');
        setError('Your email is not verified.');
      } else {
        setError(errorMsg || 'Failed to send link.');
      }
    }

    setLoading(false);
  };

  const handleVerifyClick = async () => {
    setError('');
    setMessage('Sending verification OTP...');
    setLoading(true);

    const resendRes = await dispatch(resendOtpAPIFn({ email }));

    if (resendRes?.meta?.requestStatus === 'fulfilled') {
      setMode('verify');
      setMessage('OTP sent! Please verify your email.');
    } else {
      setError(resendRes?.payload || 'Failed to send verification OTP.');
    }

    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const res = await dispatch(verifyOtpAPIFn({ email, otp: Number(otp) }));

    if (res?.meta?.requestStatus === 'fulfilled') {
      setMessage('✅ Email verified successfully! Now you can reset your password.');
      setMode('reset');
    } else {
      setError(res?.payload || 'OTP verification failed.');
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#12161fc5] bg-opacity-50 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-[#090D19] bg-opacity-70 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          {mode === 'reset' ? 'Forgot Password?' : 'Verify Your Email'}
        </h2>
        <p className="text-sm mb-4">
          {mode === 'reset'
            ? 'Enter your email to receive a password reset link.'
            : `Enter the OTP sent to ${email}`}
        </p>

        {mode === 'reset' ? (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Email address"
              required
            />
            {error && error.includes('not verified') && (
              <p className="text-yellow-400 text-sm">
                {error}{' '}
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  className="underline cursor-pointer text-blue-400"
                >
                  Verify Now
                </button>
              </p>
            )}
            {error && !error.includes('not verified') && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-full bg-pink-600 cursor-pointer text-white py-2 rounded hover:bg-pink-700"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Link'}
              </button>
              <button
                type="button"
                className="w-full border cursor-pointer border-gray-300 text-gray-300 py-2 rounded hover:bg-gray-800"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <OtpInput onChange={setOtp} />
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-full bg-pink-600 cursor-pointer text-white py-2 rounded hover:bg-pink-700"
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                className="w-full border cursor-pointer border-gray-300 text-gray-300 py-2 rounded hover:bg-gray-800"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
