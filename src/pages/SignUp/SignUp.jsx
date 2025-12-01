import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpAPIFn } from "../../redux/features/auth/authFns.js";

// Your real logo
import logo from "../../assets/images/logo.png";

const SignUp = () => {
  const { animation, setAnimation } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",
    phone: "",
    isBusinessman: true
  });

  const [role, setRole] = useState("business");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selected) => {
    setRole(selected);
    setFormData({ ...formData, isBusinessman: selected === "business" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimation(true);
    setError("");

    const res = await dispatch(
      signUpAPIFn({
        firstName: formData.fname,
        lastName: formData.sname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        isBusinessman: formData.isBusinessman
      })
    );

    if (res?.meta?.requestStatus === "fulfilled") {
      localStorage.setItem("showWelcome", "true");
      setAnimation(false);
      navigate(`/verify-otp?email=${formData.email}`);
    } else {
      setError(res?.payload || "Signup failed");
      setAnimation(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top_left,#02111f,#020712_55%,#02030a)] text-white">

      {/* Loader */}
      {animation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <img src="/loading.gif" className="w-32" />
        </div>
      )}

      {/* Card */}
      <div className="max-w-xl w-full bg-[#0a101c]/95 border border-indigo-400/20 rounded-2xl shadow-2xl sm:px-8 px-3 py-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="w-48 drop-shadow-xl" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-center">Create Your CarWrapVisualizer™ Account</h1>
        <p className="text-center text-gray-300 text-sm mt-2">
          Start your free trial and unlock full access to the wrap visualizer, vehicle library, projects, and business tools.
        </p>

        {/* Trust Pills */}
        <div className="flex flex-wrap justify-center gap-2 text-[11px] mt-4 mb-4">
          <span className="px-2 py-1 bg-white/5 border border-gray-500/30 rounded-full">No credit card</span>
          <span className="px-2 py-1 bg-white/5 border border-gray-500/30 rounded-full">Free trial</span>
          <span className="px-2 py-1 bg-white/5 border border-gray-500/30 rounded-full">Enthusiast: $2.49/week</span>
          <span className="px-2 py-1 bg-white/5 border border-gray-500/30 rounded-full">Business: $79/month</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Names */}
          <div className="flex gap-4 mb-3">
            <div className="w-1/2">
              <label className="text-sm">First Name</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full p-3 mt-1 rounded-lg bg-[#020617] border border-gray-700 focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                name="sname"
                value={formData.sname}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full p-3 mt-1 rounded-lg bg-[#020617] border border-gray-700 focus:border-indigo-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 mt-1 rounded-lg bg-[#020617] border border-gray-700 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3 mt-1 rounded-lg bg-[#020617] border border-gray-700 focus:border-indigo-500 outline-none"
              required
            />
            <p className="text-[11px] text-gray-400 mt-1">
              We’ll text a verification code to this number to confirm your account.
            </p>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 mt-1 rounded-lg bg-[#020617] border border-gray-700 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          {/* Role Selector */}
          <p className="text-sm mt-5 font-medium">I am signing up as…</p>
          <p className="text-[11px] text-gray-400 mb-2">
            Choose your account type. Your free trial and phone verification start immediately.
          </p>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
            {/* Business */}
            <div
              onClick={() => handleRoleSelect("business")}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                role === "business"
                  ? "bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 border-transparent scale-105"
                  : "bg-[#020617] border-gray-700"
              }`}
            >
              <p className="font-semibold text-sm">Wrap Shop / Business</p>
              <p className="text-[11px] opacity-80">
                For wrap installers, studios & shops.
              </p>
            </div>

            {/* Enthusiast */}
            <div
              onClick={() => handleRoleSelect("enthusiast")}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${
                role === "enthusiast"
                  ? "bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 border-transparent scale-105"
                  : "bg-[#020617] border-gray-700"
              }`}
            >
              <p className="font-semibold text-sm">Enthusiast</p>
              <p className="text-[11px] opacity-80">
                For drivers wrapping their own car.
              </p>
            </div>
          </div>

          {/* Benefit Pills */}
          <div className="flex flex-wrap gap-2 mt-4 text-[11px]">
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">Save wrap projects</span>
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">Full color & brand library</span>
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">Front, rear, side & top angles</span>
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">Free trial included</span>
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">Phone verification via SMS</span>
            <span className="benefit-pill px-3 py-1 bg-white/5 border border-gray-500/30 rounded-full">No credit card required</span>
          </div>

          {/* Dynamic Section */}
          {role === "business" ? (
            <div className="text-[11px] text-gray-300 mt-5 leading-relaxed">
              <h3 className="uppercase text-indigo-300 tracking-wider text-xs mb-1">
                Business Plan
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Embed the visualizer on your website in under 5 minutes.</li>
                <li>Show customers real wrap previews for any car 1990–2026.</li>
                <li>Access all wrap brands: 3M, Avery, Inozetek, KPMF, Hexis, VViViD & more.</li>
                <li>Generate high-intent customer leads.</li>
                <li><strong>Plans start at $79/month after free trial.</strong></li>
              </ul>
            </div>
          ) : (
            <div className="text-[11px] text-gray-300 mt-5 leading-relaxed">
              <h3 className="uppercase text-indigo-300 tracking-wider text-xs mb-1">
                Enthusiast Plan
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Preview hundreds of wrap colors for any car from 1990–2026.</li>
                <li>Switch between front, rear, side, and top views instantly.</li>
                <li>Save favorites & compare multiple looks.</li>
                <li>Explore wrap brands used by top wrap shops.</li>
                <li><strong>Access starts at $2.49/week after free trial.</strong></li>
              </ul>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-400 text-center text-sm mt-4">{error}</p>
          )}

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-teal-300 via-indigo-500 to-pink-500 font-semibold text-white shadow-lg"
          >
            Start My Free Trial
          </button>

          {/* Footer Text Under CTA */}
          <p className="text-[11px] text-gray-400 text-center mt-3">
            Your free trial begins immediately — no credit card required.
            We’ll text your verification code to finish signup.
          </p>

          <p className="text-[11px] text-gray-400 text-center mt-3">
            By creating an account, you agree to our{" "}
            <span className="text-indigo-300 cursor-pointer">Terms</span> and{" "}
            <span className="text-indigo-300 cursor-pointer">Privacy Policy</span>.
          </p>

          {/* Login */}
          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
