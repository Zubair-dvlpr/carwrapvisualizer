import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import loaderGif from "../../assets/loading.gif";
import { useDispatch } from "react-redux";
import { loginUserAPIFn } from "../../redux/features/auth/authFns.js";
import ForgotPasswordModal from "./ForgotPasswordModal.jsx";
// zubair6@yopmail.com
// zubair6
// enthusiastplan@yopmail.com
// enthusiastplan
const Login = () => {
  const dispatch = useDispatch();
  const { animation, setAnimation, setCountLogin } = useContext(AuthContext);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setAnimation(true);

    try {
      const data = await dispatch(
        loginUserAPIFn({
          email,
          password,
        })
      );

      if (data?.meta?.requestStatus === "fulfilled") {
        const alreadyWelcomed = localStorage.getItem("welcomeShown");
        setCountLogin(data?.payload?.data?.user?.loginCount);

        if (!alreadyWelcomed) {
          localStorage.setItem("showWelcome", "true");
          localStorage.setItem("welcomeShown", "true");
        }

        navigate("/dashboard");
      } else {
        setError(data?.payload || "Login failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setAnimation(false);
    }
  };

  return (
    <>
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />

      {/* Loader */}
      {animation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <img src={loaderGif} alt="Loading..." className="w-36" />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,#020617,#020712_55%,#020617)] px-4 py-6 text-white">
        <div className="w-full max-w-5xl rounded-3xl border border-indigo-500/40 shadow-[0_32px_90px_rgba(0,0,0,0.8)] 
          grid grid-cols-1 md:grid-cols-2 overflow-hidden
          bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_55%),rgba(15,23,42,0.96)]
        ">
          
          {/* LEFT PANEL — only visible on desktop */}
          <div className="hidden md:block border-r border-blue-900/70 p-8 relative">
            <div className="flex items-center gap-3 mb-6">
              <Link to="/">
                <img src={logo} alt="CarWrapVisualizer Logo" className="w-32 object-contain" />
                
              </Link>
              <div className="flex flex-col">
                <span className="text-[13px] tracking-[0.16em] uppercase text-indigo-300">
                  CARWRAPVISUALIZER
                </span>
                <span className="text-[11px] text-gray-400">
                  Live wrap previews for every build.
                </span>
              </div>
            </div>

            <div className="text-[11px] tracking-[0.16em] text-indigo-400 uppercase mb-2">
              Welcome Back
            </div>
            <div className="text-2xl font-semibold leading-snug">
              Sign in and pick up where you left off.
            </div>

            <p className="text-sm text-gray-400 mt-2 mb-4 max-w-xs">
              Access your saved projects, recent vehicles, and wrap
              combinations — whether you're an enthusiast or a wrap shop.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] border border-gray-400/50 bg-[#0f172a]/80 backdrop-blur-md">
                1990–2026 vehicle coverage
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] border border-gray-400/50 bg-[#0f172a]/80 backdrop-blur-md">
                Front, rear, side & top angles
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] border border-gray-400/50 bg-[#0f172a]/80 backdrop-blur-md">
                Real wrap brands & finishes
              </span>
            </div>

            <ul className="text-[12px] text-gray-300 space-y-2 mb-4">
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1"></span>
                Preview hundreds of wrap colors on real vehicle renders.
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1"></span>
                For wrap shops: connect projects to your customers & website.
              </li>
              <li className="flex gap-2 items-start">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1"></span>
                For enthusiasts: save and compare your favorite builds.
              </li>
            </ul>

            <div className="text-[11px] text-gray-400">
              <strong className="text-gray-200">Plans:</strong> Enthusiasts from{" "}
              <strong>$2.49/week</strong> · Wrap shops from{" "}
              <strong>$79/month</strong> after free trial.
            </div>

            {/* Glow orb */}
            <div className="absolute bottom-[-70px] right-[-50px] w-[260px] h-[260px] rounded-full 
              bg-[radial-gradient(circle,rgba(96,165,250,0.15),transparent_60%)]
              opacity-70 pointer-events-none"
            />
             {/* Glow orb */}
            <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-gray-300 opacity-5
               pointer-events-none"
            />
          </div>

          {/* RIGHT PANEL — Login Form */}
          <div className="sm:p-8 p-4 flex flex-col justify-center relative bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.2),rgba(2,6,23,0.98))]">

            <h1 className="text-xl font-semibold mb-1">Sign in to your account</h1>
            <p className="text-sm text-gray-400 mb-4">
              Use the email & password you registered with.
            </p>

            <div className="text-[11px] text-gray-400 mb-4 space-x-2">
              <span className="px-3 py-1 bg-[#0f172a]/90 border border-gray-400/40 rounded-full">
                Secure login
              </span>
              <span className="px-3 py-1 bg-[#0f172a]/90 border border-gray-400/40 rounded-full">
                For enthusiasts & wrap shops
              </span>
            </div>

            <form onSubmit={handleLogin}>

              <label className="text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3 focus:border-indigo-400 outline-none"
              />

              <label className="text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-2 focus:border-indigo-400 outline-none"
              />

              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={() => setKeepSignedIn(!keepSignedIn)}
                    className="h-3.5 w-3.5 rounded border border-gray-600 bg-[#020617] accent-indigo-500"
                  />
                  Keep me signed in
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-indigo-300 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <p className="text-red-400 text-sm mb-2">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 font-semibold text-white mt-1"
              >
                Sign In
              </button>

              <div className="flex items-center justify-center my-4 text-gray-500 text-[11px]">
                <span className="flex-1 h-px bg-gray-700"></span>
                <span className="px-3">or</span>
                <span className="flex-1 h-px bg-gray-700"></span>
              </div>

              <p className="text-center text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-300 hover:underline"
                >
                  Create a free account
                </Link>
              </p>
            </form>
            {/* Glow orb */}
            <div className="absolute top-[-30%] right-[-20%] w-full h-full rounded-full 
              bg-[radial-gradient(circle,rgba(96,165,250,0.05),transparent_60%)]
              opacity-80 pointer-events-none"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
