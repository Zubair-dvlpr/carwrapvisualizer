import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  forgotPasswordRequestAPIFn,
  resendOtpAPIFn,
  verifyOtpAPIFn,
} from "../../redux/features/auth/authFns";
import OtpInput from "../verifyOtp/OtpInput";
import logo from "../../assets/images/logo.png";
import CountryDropdown from "./CountryDropdown";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  const [mode, setMode] = useState("email");
  const [stage, setStage] = useState("reset");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load Countries API
  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags"
      );
      const data = await res.json();

      const formatted = data
        .filter((c) => c.idd?.root)
        .map((c) => ({
          name: c.name.common,
          flag: c.flags.svg,
          code: c.idd.root + (c.idd.suffixes?.[0] || ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(formatted);
    };

    load();
  }, []);

  if (!isOpen) return null;

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    let payload = {};

    // If mode = email
    if (mode === "email") {
      payload = { email };
    }

    // If mode = phone
    if (mode === "phone") {
      if (!phone) {
        setError("Please enter your phone number.");
        setLoading(false);
        return;
      }
      payload = { phone: countryCode + phone };
    }

    const res = await dispatch(forgotPasswordRequestAPIFn(payload));

    if (res?.meta?.requestStatus === "fulfilled") {

      if (mode === "email") {
        setMessage("📩 Reset link sent to your email.");
      }

      if (mode === "phone") {
        setMessage("📱 Reset code sent to your phone.");
      }

    } else {
      const errorMsg = res?.payload;

      if (errorMsg?.includes("not verified")) {
        setError("Your account is not verified.");
        setStage("verify");
      } else {
        setError(errorMsg || "Failed to send reset request.");
      }
    }

    setLoading(false);
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const res = await dispatch(
      verifyOtpAPIFn({ email, otp: Number(otp) })
    );

    if (res?.meta?.requestStatus === "fulfilled") {
      setMessage("Email verified! You can reset your password now.");
      setStage("reset");
    } else {
      setError(res?.payload || "OTP verification failed.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] text-white flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#0a101c]/95 border border-indigo-500/30 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.75)] p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} className="h-12 drop-shadow-xl" />
          <div className="text-[11px] uppercase tracking-[0.16em] text-indigo-200 mt-1">
            CarWrapVisualizer
          </div>
        </div>

        <h2 className="text-2xl text-white font-semibold text-center">
          Reset your password
        </h2>
        <p className="text-sm text-gray-400 text-center mb-5">
          Choose whether to reset using your <strong>email</strong> or <strong>phone number</strong>.
        </p>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-3 mb-5">
          <button
            onClick={() => setMode("email")}
            className={`px-4 py-2  rounded-full border text-sm transition 
            ${mode === "email"
                ? "bg-gradient-to-r  from-teal-300 via-indigo-500 to-pink-500 border-transparent"
                : "border-gray-700 cursor-pointer bg-[#020617]"
              }`}
          >
            Email
          </button>

          <button
            onClick={() => setMode("phone")}
            className={`px-4 py-2  rounded-full border text-sm transition 
            ${mode === "phone"
                ? "bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 border-transparent"
                : "border-gray-700 cursor-pointer bg-[#020617]"
              }`}
          >
            Phone
          </button>
        </div>

        {/* STAGE: RESET PASSWORD */}
        {stage === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-4">

            {/* Email */}
            {mode === "email" && (
              <div>
                <label className="text-sm mb-1 block">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 
                  focus:border-indigo-500 outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            {/* Phone */}
            {mode === "phone" && (
              <div>
                <label className="text-sm mb-1 block">Phone Number</label>

                <div className="flex gap-3">
                  <CountryDropdown
                    countries={countries}
                    value={selectedCountry}
                    onChange={(c) => {
                      setSelectedCountry(c);
                      setCountryCode(c.code);
                    }}
                  />

                  <input
                    type="tel"
                    className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 
                    focus:border-indigo-500 outline-none"
                    placeholder="555 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 cursor-pointer rounded-full font-semibold 
              bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 
              mt-3 text-white"
            >
              {loading ? "Sending..." : "Send Reset Instructions"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 cursor-pointer rounded-lg border border-gray-600 text-gray-300"
            >
              Cancel
            </button>
          </form>
        )}

        {/* STAGE: VERIFY OTP */}
        {stage === "verify" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-center text-sm mb-1">
              Enter OTP sent to <strong>{email}</strong>
            </p>

            <OtpInput onChange={setOtp} />

            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
            {message && <p className="text-green-400 text-center text-sm">{message}</p>}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 cursor-pointer rounded-full font-semibold 
              bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 
              mt-3 text-white"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 cursor-pointer rounded-lg border border-gray-600 text-gray-300"
            >
              Cancel
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-400 mt-4">
          Remember your password?{" "}
          <button
            onClick={onClose}
            className="text-indigo-300 cursor-pointer underline"
          >
            Go back to sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
