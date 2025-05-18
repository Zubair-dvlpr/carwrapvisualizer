import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import pagess from "../../../assets/images/pagess.png"
import howtoworkbg from "../../../assets/images/howtoworkbg.png"
const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 text-center bg-center  bg-no-repeat" style={{backgroundImage: `url('${howtoworkbg}')`}}>
      {/* Top Heading and Text */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 text-lg">
          With our Wrap Visualizer, customers can explore top brands like 3M, Avery Dennison, and Hexis. They’ll instantly see how their car—any make, any model, from 1990 to 2026—looks in their desired wrap. Eliminate doubts and make confident choices. We white-label the Visualizer with your branding to close deals faster and boost sales.
        </p>
        <Link
          to="/get-started"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 border border-transparent text-blue-400  hover:scale-105 transition rounded-full"
        >
          Get Started Now <FaArrowRight />
        </Link>
      </div>

      {/* Full Width Image */}
      <div className="w-full max-w-6xl mx-auto ">
        <img
          src={pagess}
          alt="How it works"
          className="w-full"
        />
      </div>

      {/* Bottom Button */}
      <Link
        to="/get-started"
        className="inline-flex items-center relative -top-5 gap-2 px-5 py-2 bg-[#ED217B]  text-white hover:text-white hover:scale-105 transition"
      >
       Get Started Now
      </Link>
    </section>
  );
};

export default HowItWorks;
