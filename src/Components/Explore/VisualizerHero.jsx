import React from "react";
import { Link } from "react-router-dom";
import moon from '../../assets/images/moon.webp';
const VisualizerHero = ({
  title = "SEE HOW YOUR CAR\nLOOKS IN ANY COLOR.",
  description = "Preview wrap colors across multiple angles including front angle, rear angle, side view, and top view.",
  ctaText = "Start Visualizing",
  imgpath
}) => {
  return (
    <section className="py-10 ab">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{backgroundImage: `url(${moon})`, backgroundRepeat: 'repeat-y', backgroundPosition: 'center', backgroundSize: 'contain'}}>

        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-extrabold uppercase leading-tight mb-6 whitespace-pre-line">
            {title}
          </h1>

          <p className="text-gray-500 max-w-md mb-8">
            {description}
          </p>

          <Link
            to="/visualizer"
            className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition"
          >
            {ctaText}
          </Link>
        </div>

        {/* Right Phones */}
        <div className="relative flex justify-center gap-6">
          {imgpath && (
            <img
              src={imgpath}
              alt="Visualizer phone left"
              className="w-full"
            />
          )}

         
        </div>

      </div>
    </section>
  );
};

export default VisualizerHero;
