import React from 'react';
import { Link } from 'react-router-dom';
import cardsection from "../../../assets/images/cardsectionbg.png"
import mobileview from "../../../assets/images/mobileview.png"
const BoostSales = () => {
  return (
    <section className="bg-white mb-20 py-16 px-4  text-center bg-center  bg-no-repeat" style={{ backgroundImage: `url('${cardsection}')` }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Boost Sales and Close Deals Faster
          </h2>
          <p className="text-gray-600 mb-6">
            Elevate your website with the world’s first consumer-friendly Car Wrap Visualizer—fully white-labeled to match your brand. Let visitors preview colors, finishes, and designs on their actual vehicle in seconds. Our expert developers handle the integration for you, so you can focus on wrapping, not tech.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/demo"
              className=" bg-[#ED217B] uppercase  text-white px-6 py-2 hover:scale-105  transition"
            >
              Use Demo
            </Link>
            <Link
              to="/get-started"
              className=" bg-[#ED217B] capitalize  text-white  px-6 py-2 hover:scale-105   transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src={mobileview}
            alt="Boost Sales Visual"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default BoostSales;
