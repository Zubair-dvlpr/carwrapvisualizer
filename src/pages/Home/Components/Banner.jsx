import React from 'react';
import bannerImg from "../../../assets/images/bannerImg.png"
import bannerbg from "../../../assets/images/bannerbg.png"
import ImageCarousel from './ImageCarousel';
const Banner = () => {
  return (
    <section className="py-10 text-white bg-center bg-cover" >
      {/* style={{ backgroundImage: `url('${bannerbg}')` }} */}
      <div className="max-w-[1420px] ml-auto  flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Column */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="font-Inter text-2xl font-light leading-9 tracking-[7.02px] uppercase mb-6">
            Where Dream Cars Become Reality
          </p>
          <h1 className="text-7xl leading-[69px] font-extrabold font-Inter  mb-4">
            World’s First Consumer Car Wrap Visualizer
          </h1>

          <p className=" text-base mb-6">
            Let customers preview wraps on their own car in seconds. Choose from over 60,000+ cars.
          </p>
          
        </div>

        {/* Right Column */}
        <div className="md:w-1/2  z-10">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-auto "
          />
        </div>
      </div>

      <div className='grid grid-cols-2 max-w-7xl -mt-20 '>
          <div className='h-[130px] bg-[#FF0069]'></div>
          <div className='h-[130px] bg-[#2B2C2C]'></div>
          <div></div>
      </div>
      {/* <ImageCarousel  /> */}
    </section>
  );
};

export default Banner;
