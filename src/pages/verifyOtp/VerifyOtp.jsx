import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOtpAPIFn, verifyOtpAPIFn } from "../../redux/features/auth/authFns";

import OtpInput from "./OtpInput";
import logo from "../../assets/images/logo.png";
import loaderGif from "../../assets/loading.gif";

const VerifyOtp = () => {
    const [params] = useSearchParams();
    const email = params.get("email");
    const phone = params.get("phone");
    const target = email || phone;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(45);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    // Countdown Timer
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            setError("Enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");
        setMsg("");

        const payload = email
            ? { email, otp: Number(otp) }
            : { phone, otp: Number(otp) };

        const res = await dispatch(verifyOtpAPIFn(payload));

        if (res?.meta?.requestStatus === "fulfilled") {
            setMsg("OTP verified successfully!");
            navigate("/login");
        } else {
            setError(res?.payload);
        }

        setLoading(false);
    };

    const handleResend = async () => {
        if (timer > 0) return;

        setLoading(true);
        setError("");
        setMsg("");

        const payload = email ? { email } : { phone };

        const res = await dispatch(resendOtpAPIFn(payload));

        if (res?.meta?.requestStatus === "fulfilled") {
            setMsg(email ? "OTP resent to your email." : "OTP resent to your phone.");
            setTimer(45);
        } else {
            setError(res?.payload);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#020617] px-4">
            <div className="bg-[#0a101c]/95 w-full max-w-md rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.75)] border border-indigo-500/20 text-white">

                {/* Logo */}
                <div className="flex flex-col items-center mb-4">
                    <img src={logo} className="h-14 drop-shadow-xl" alt="logo" />
                    <p className="text-[11px] tracking-[0.16em] text-indigo-300 uppercase">
                        CarWrapVisualizer™
                    </p>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold capitalize text-center mb-1">
                    Verify your {email ? "email" : "phone"}
                </h1>

                <p className="text-gray-400 text-center text-sm mb-4">
                    Enter the 6-digit code sent to
                    <span className="text-indigo-300 font-medium">
                        {" "}
                        {target}
                    </span>
                </p>

                {/* OTP Input */}
                <OtpInput onChange={setOtp} />

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                {msg && <p className="text-green-400 text-sm text-center">{msg}</p>}

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={loading || otp.length !== 6}
                    className={`w-full mt-4 py-3 rounded-full font-semibold transition 
            ${otp.length !== 6
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 cursor-pointer"
                        }`}
                >
                    {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                {/* Resend */}
                <p className="text-center text-sm text-gray-400 mt-3">
                    Didn’t get the code?{" "}
                    <button
                        onClick={handleResend}
                        disabled={timer > 0}
                        className={`underline ${timer > 0 ? "text-gray-600" : "text-indigo-300 cursor-pointer"
                            }`}
                    >
                        {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
                    </button>
                </p>

                <p className="text-center text-sm text-gray-400 mt-3">
                    Wrong phone number? {" "}
                    <Link to={email ? `/signup` : `/login` }
                        className=" text-indigo-300"
                    >
                       Go back and update your details
                    </Link>
                </p>

                {loading && (
                    <img src={loaderGif} className="w-12 mx-auto mt-3" alt="loading" />
                )}

                {/* Back Link */}
                <p className="text-center text-sm text-gray-400 mt-5">
                    Already verified?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-indigo-300  cursor-pointer"
                    >
                        Sign in instead
                    </button>
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;
