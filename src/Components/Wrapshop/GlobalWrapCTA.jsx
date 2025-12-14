import React from "react";
import { Link } from "react-router-dom";
import iPadMini from "../../assets/images/iPadMini.png";
import BoostSalesVisual from "../../assets/images/BoostSalesVisual.png";
// import phoneRightImage from "../../assets/images/phone-right.png";
const GlobalWrapCTA = () => {
  return (
    <section className="py-24 text-white bg-gradient-to-r from-[#000] via-[#2D2D2D] to-[#000]">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left Content */}
          <div>
            <h2 className="text-5xl md:text-8xl font-BeniRegular font-extrabold  mb-6">
              Take Your Wrap Game{" "}<br />
              <span className="relative inline-block">
                Global
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 to-orange-500" />
              </span>{" "}
              With
              <br />
              Car Wrap Visualizer™
            </h2>

            <p className="text-gray-400 max-w-lg mb-8">
              Join the world’s first wrap visualization platform built for shops
              like yours. Get early access to the latest vehicles, unlock new
              revenue streams, enjoy hands-on support, and stand out in the
              industry’s top network.
            </p>

            <div className="flex flex-col items-start gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 transition"
              >
                Get Started →
              </Link>

              <span className="text-sm text-gray-400">
                No Credit Card Required
              </span>
            </div>
          </div>

          {/* Right Device */}
          <div className="relative flex justify-center">
            
              <img
                src={iPadMini}
                alt="Dashboard Tablet"
                className="max-w-xl w-full"
              />
         
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Phones */}
          <div className="relative flex gap-6 justify-center">
           
              <img
                src={BoostSalesVisual}
                alt="Visualizer Phone"
                className="w-full"
              />
          

          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-6xl sm:text-8xl font-BeniRegular font-extrabold uppercase leading-tight mb-6">
              Boost Sales and
              <br />
              Close Deals{" "}
              <span className="relative inline-block">
                Faster
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 to-orange-500" />
              </span>
            </h3>

            <p className="text-gray-400 max-w-lg mb-8">
              Elevate your website with the world’s first consumer-friendly Car
              Wrap Visualizer — fully white-labeled to match your brand. Let
              visitors preview colors, finishes, and designs on their actual
              vehicle in seconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/tool"
                className="px-6 py-3 rounded-full border border-gray-400 text-gray-300 hover:bg-white hover:text-black transition"
              >
                Try Demo
              </Link>

              <Link
                to="/signup"
                className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalWrapCTA;
