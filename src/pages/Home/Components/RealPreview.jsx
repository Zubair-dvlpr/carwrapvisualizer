import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import mapphoto from "../../../assets/images/mapphoto.png";

// Images
import Porsche2 from "../../../assets/images/carImgs/Porsche2.png";
import BMWM8 from "../../../assets/images/carImgs/BMWM8.png";
import Buggati from "../../../assets/images/carImgs/Buggati.png";
import Maybach from "../../../assets/images/carImgs/Maybach.png";
import Porsche from "../../../assets/images/carImgs/Porsche.png";
import ROllscholate from "../../../assets/images/carImgs/ROllscholate.png";

export default function RealPreview() {
  const images = [
    Porsche2,
    BMWM8,
    Buggati,
    Maybach,
    Porsche,
    ROllscholate,
  ];

  return (
    <div
      className="max-w-7xl mx-auto bg-no-repeat bg-bottom text-white py-20"
      style={{ backgroundImage: `url(${mapphoto})` }}
    >
      <div className="flex flex-col md:flex-row items-center gap-10">

        {/* Swiper Slider */}
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="rounded-xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`car preview ${index + 1}`}
                  className="rounded-xl shadow-xl w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-6xl font-BeniRegular sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase">
            Real Wrap Previews From Real Drivers.
          </h2>

          <p className="mt-4 text-gray-300">
            Browse real vehicles and wrap colors created by people using our platform.
            See how different finishes look on actual cars.
          </p>

          <div className="mt-6">
            <Link
              to="/tool"
              className="px-8 py-3 bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] rounded-full font-semibold inline-block"
            >
              Start Visualizing
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Banner */}
      <div className="mt-16">
        <div className="text-center bg-gradient-to-r from-[#FE8645] via-[#FF0C7D] to-[#C702C7] py-12 rounded-xl font-bold md:text-4xl sm:text-2xl text-lg">
          NEW WRAP BRANDS & COLORS ADDED WEEKLY.
        </div>
      </div>

      {/* Custom Swiper Dot Styling */}
      <style>
        {`
          .swiper-pagination-bullet {
            background: rgba(255,255,255,0.4);
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #ec4899; /* pink-500 */
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
}
