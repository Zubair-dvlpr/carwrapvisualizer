import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const CompareColors = ({
  title = "COMPARE COLORS\nAND FINISHES.",
  description = "Matte, gloss, satin, metallic, chrome, color-shift — explore them all and save your favorites.",
  imgpath,
  showStores = true,
}) => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Visuals */}
        <div className="space-y-6">
          {imgpath && (
            <img
              src={imgpath}
              alt="Vehicle preview"
              className="sm:max-w-md w-full"
            />
          )}
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-5xl font-extrabold uppercase leading-tight mb-6 whitespace-pre-line">
            {title}
          </h2>

          <p className="text-white max-w-md mb-8">
            {description}
          </p>

          {showStores && (
            <div className="flex gap-4">
              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg">
                <FaApple size={22} />
                <div>
                  <p className="text-xs text-white">Coming soon on</p>
                  <span className="text-sm">App Store</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg">
                <FaGooglePlay size={22} />
                <div>
                  <p className="text-xs text-white">Coming soon on</p>
                  <span className="text-sm">Google Play</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompareColors;
