import { FaStar } from "react-icons/fa";

import iphonegold from '../../../assets/images/iphonegold.webp';
import { Link } from "react-router-dom";
export default function VisualizeEasySection() {
  return (
    <section className="relative w-full bg-white pt-14 pb-22 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          {/* RATING */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
            <span className="text-black font-semibold text-lg">
              4.7 Rating on the App Store
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-6xl font-BeniRegular md:text-8xl font-extrabold text-black">
            VISUALIZING YOUR CAR HAS <br />
            <span className="text-black">NEVER BEEN EASIER.</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-700 mt-4 leading-relaxed">
            No uploads or editing. Select your vehicle and instantly explore wraps across all major angles:
          </p>

          {/* BULLETS */}
          <ul className="mt-4 text-gray-700 space-y-1 ml-4 list-disc">
            <li>Front Angle</li>
            <li>Rear Angle</li>
            <li>Side View</li>
            <li>Top View</li>
          </ul>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Fast, clean, and easy for anyone — from daily drivers to full-on enthusiasts.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-10">
            <Link to={'/explore'} className=" px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] rounded-full text-white font-semibold shadow-xl">
              Explore the features →
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE MOCKUP */}
        <div className="relative flex justify-center lg:justify-end">


          {/* FLOATING BOLT */}
          <img
            src={iphonegold}
            alt="Bolt"
            className=" w-4/5 animate-[float_5s_ease-in-out_infinite]"
          />


        </div>
      </div>

      {/* CURVED BOTTOM WAVE */}
      {/* <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#0D0B1F"
          d="M0,96L1440,0L1440,320L0,320Z"
        />
      </svg> */}
    </section>
  );
}
