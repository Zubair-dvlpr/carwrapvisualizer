
import bannerImg from "../../../assets/images/bannerImg.png"

const Banner = () => {
  return (
    <section className="py-10 text-white bg-center bg-cover" >
      <div className="max-w-[1420px] ml-auto  flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Column */}
        <div className="md:w-1/2 px-1 sm:px-0 text-center md:text-left">
          <p className="font-Inter text-2xl font-light leading-9 tracking-[7.02px] uppercase mb-6">
            Where Dream Cars Become Reality
          </p>
          <h1 className="sm:text-7xl text-5xl leading-[69px] font-extrabold font-Inter  mb-4">
            World’s First Consumer Car Wrap Visualizer
          </h1>

          <p className=" text-base mb-6">
            Let customers preview wraps on their own car in seconds. Choose from over 1.2 million cars.
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
