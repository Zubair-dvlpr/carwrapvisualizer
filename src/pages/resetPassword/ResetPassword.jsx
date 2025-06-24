import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPasswordConfirmAPIFn } from '../../redux/features/newUser/newUser';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setError('Please fill in both fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await dispatch(resetPasswordConfirmAPIFn({ token, newPassword }));

            if (res?.meta?.requestStatus === 'fulfilled') {
                setMessage('✅ Password updated successfully. Redirecting to login...');
                setError('');

                setTimeout(() => {
                    navigate('/login'); // your login route
                }, 3000);
            } else {
                setMessage('');
                setError(res?.payload || 'Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            setError('Unexpected error occurred.');
        }
    };

    return (
        <div className=" py-20 flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>



                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    {message && <p className="text-green-600 mb-3">{message}</p>}
                    {error && <p className="text-red-600 mb-3">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
