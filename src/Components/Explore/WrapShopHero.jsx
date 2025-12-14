import React from "react";
import { Link } from "react-router-dom";
import laptopwithcar from "../../assets/images/laptopwithcar.webp";
const WrapShopHero = ({
  title = "ARE YOU A\nWRAPSHOP OWNER?",
  description = "Grow your business with our visualizer. Let customers preview your wraps, generate leads, and book installations faster than ever.",
  points = [
    "Add your shop profile",
    "List your available brands",
    "Get customer leads directly",
    "Boost conversions with real-time previews",
  ]
}) => {
  return (
    <section className="bg-white py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl sm:text-8xl font-BeniRegular uppercase leading-tight mb-6 whitespace-pre-line">
            {title}
          </h1>

          <p className="text-gray-600 max-w-lg mb-6">
            {description}
          </p>

          <ul className="space-y-2 text-gray-700 mb-10">
            {points.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-black font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition"
            >
              Sign up
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-full border border-pink-500 text-pink-500 font-semibold hover:bg-pink-500 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Main Dashboard Image */}
         
            <img
              src={laptopwithcar}
              alt="Dashboard Preview"
              className="relative z-10 w-full max-w-xl mx-auto"
            />
       

          
        </div>

      </div>
    </section>
  );
};

export default WrapShopHero;
