import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordConfirmAPIFn } from "../../redux/features/newUser/newUser";
import logo from "../../assets/images/logo.png";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await dispatch(
        resetPasswordConfirmAPIFn({ token, newPassword })
      );

      if (res?.meta?.requestStatus === "fulfilled") {
        setMessage("Password updated successfully! Redirecting...");
        setError("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("");
        setError(res?.payload || "Something went wrong.");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 
      bg-[radial-gradient(circle_at_top_left,#020617,#020712_55%,#020617)] text-white">

      {/* Card */}
      <div className="w-full max-w-md bg-[#0a101c]/95 border border-indigo-500/30 
        rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.75)] p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} className="h-12 drop-shadow-xl" alt="logo" />
          <div className="text-[11px] uppercase tracking-[0.16em] text-indigo-200 mt-1">
            CarWrapVisualizer
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2">Reset Password</h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter a new password below to complete your reset request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* New Password */}
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 
              focus:border-indigo-500 outline-none"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 
              focus:border-indigo-500 outline-none"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Messages */}
          {message && (
            <p className="text-green-400 text-sm">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full font-semibold 
            bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 
            mt-3 text-white"
          >
            Update Password
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">
            Once your password is updated, you’ll be able to log in again.
          </p>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
