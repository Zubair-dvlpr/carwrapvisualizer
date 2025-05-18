import React from 'react';
import bannerImg from "../../../assets/images/bannerImg.png"
import bannerbg from "../../../assets/images/bannerbg.png"
import ImageCarousel from './ImageCarousel';
const Banner = () => {
  return (
    <section className="bg-gray-100 py-10 bg-center bg-cover" style={{ backgroundImage: `url('${bannerbg}')` }}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Column */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl leading-[71px] font-bold font-Inter text-gray-800 mb-4">
            World’s First Consumer Car Wrap Visualizer
          </h1>
          <p className="text-gray-600 text-base mb-6">
            Boost sales and speed up decisions by integrating the world’s first consumer-friendly Car Wrap Visualizer directly on your website. Let visitors preview wrap styles on their actual vehicle — in seconds.
          </p>
          <button className="bg-[#ED217B] uppercase text-sm font-medium text-white px-4 py-2 hover:scale-95 transition mb-4">
            Try Now
          </button>
          <p className="text-[#12A99D] font-Inter text-lg">
            <span className='font-bold'>Over 10,000+ </span>  customers and wrap shops around the world have already made the switch.
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <ImageCarousel />
    </section>
  );
};

export default Banner;
