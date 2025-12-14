import React from "react";
import FeatureCard from "./FeatureCard";
import { FaDatabase, FaDesktop, FaCar } from "react-icons/fa";
import db from '../../assets/icons/db.svg';
import carAmb from '../../assets/icons/carAmb.svg';
import line_color from '../../assets/icons/line_color.svg';

const FeaturedTools = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-center font-BeniRegular text-6xl sm:text-8xl font-extrabold uppercase mb-5 ">
          Featured Tools
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
          <FeatureCard
            imgpath={db}
            title="Full wrap color database"
            description="Access hundreds of colors across all major brands."
          />

          <FeatureCard
            imgpath={carAmb}
            title="Accurate Automotive Renders"
            description="Access hundreds of colors across all major brands."
            mt="mt-16"
          />

          <FeatureCard
            imgpath={line_color}
            title="Real Vehicle Coverage"
            description="Every model from 1990–2026, multiple angles included."
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedTools;
