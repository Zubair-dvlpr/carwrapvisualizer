import React from "react";

const FeatureCard = ({ imgpath, title, description, mt }) => {
  return (
    <div className={`bg-black rounded-2xl w-full max-w-sm h-[320px] flex flex-col items-center justify-center text-center px-6 shadow-lg ${mt ? mt : ''}`}>
      {/* Icon */}
      <div className="my-6 text-6xl">
        <img src={imgpath} alt="logo" className="w-28" />
      </div>

      {/* Title */}
      <h3 className="text-white font-BeniRegular uppercase text-4xl sm:text-5xl  mb-2 tracking-wide">
        {title}
      </h3>

      {/* Description (optional) */}
      {description && (
        <p className="text-white font-Inter text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default FeatureCard;
