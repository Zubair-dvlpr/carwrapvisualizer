import React from "react";

import logoimg from "../../assets/images/carImgs/Porsche2.png";
import ShapeDivider from "../ShapeDivider";
const WrapSellingMachine = ({
  title = "TURN YOUR WEBSITE\nINTO A WRAP-SELLING\nMACHINE.",
  description = "Add our visualizer and watch your lead conversions skyrocket. No coding. No hassle. Just plug it in.",
}) => {
  return (
    <section className="relative py-10">
          <ShapeDivider color="#fff" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <div className="flex justify-center lg:justify-start">
         
            <img
              src={logoimg}
              alt="Wrap Selling Machine"
              className="w-full"
            />
         
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-5xl md:text-8xl font-BeniRegular uppercase  mb-6 whitespace-pre-line">
            {title}
          </h2>

          <p className="font-Inter max-w-md">
            {description}
          </p>
        </div>

      </div>
    </section>
  );
};

export default WrapSellingMachine;
