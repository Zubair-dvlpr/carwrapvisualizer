import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import loaderGif from '../../assets/loading.gif';
import { resendOtpAPIFn, verifyOtpAPIFn } from '../../redux/features/auth/authFns';
import OtpInput from './OtpInput';

const VerifyOtp = () => {
    const [params] = useSearchParams();
    const email = params.get('email');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [verifyloading, setVerifyLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        // console.log('OTP:', otp, 'Email:', email); // Debug
        if (!otp || !email) {
            setError('Email or OTP is missing');
            return;
        }
        setVerifyLoading(true);
        setMsg('');
        setError('');

        const res = await dispatch(verifyOtpAPIFn({ email, otp: Number(otp) }));
        if (res?.meta?.requestStatus === 'fulfilled') {
            setVerifyLoading(false);
            setMsg('OTP verified successfully!');
            navigate('/login');
        } else {
            setError(res?.payload);
        }
        setVerifyLoading(false);
    };

    const handleResend = async () => {
        setVerifyLoading(true);
        setMsg('');
        setError('');
        const res = await dispatch(resendOtpAPIFn({ email }));
        if (res?.meta?.requestStatus === 'fulfilled') {
            setMsg('OTP resent successfully. Please check your email.');
        } else {
            setError(res?.payload);
        }
        setVerifyLoading(false);
    };

    return (
        <div className='flex justify-center items-center py-25 bg-gray-100 px-4'>
            <div className='bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center'>
                <h2 className='text-2xl font-bold mb-4'>Verify your email</h2>
                <p className='mb-4 text-gray-600'>Enter the 6-digit OTP sent to <strong>{email}</strong></p>
                <OtpInput onChange={setOtp} />
                {error && <p className='text-red-500'>{error}</p>}
                {msg && <p className='text-green-500'>{msg}</p>}

                <button
                    onClick={handleVerify}
                    className={`w-full py-3 rounded mt-2 cursor-pointer transition 
                            ${otp.length !== 6 || verifyloading
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-pink-600 hover:bg-pink-700 text-white'}`}
                    disabled={otp.length !== 6 || verifyloading}
                >
                    {verifyloading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                    onClick={handleResend}
                    className='mt-4 text-sm cursor-pointer text-blue-500 hover:underline'
                    disabled={verifyloading}
                >
                    Resend OTP
                </button>

                {verifyloading && <img src={loaderGif} className='w-12 mx-auto mt-4' alt='Loading...' />}
            </div>
        </div>
    );
};

export default VerifyOtp;
