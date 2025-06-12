import React from 'react';
import { Link } from 'react-router-dom';
import cardsection from "../../../assets/images/cardsectionbg.png"
import mobileview from "../../../assets/images/mobileview.png"
const BoostSales = () => {
  return (
    <>
      <section className=" text-white mb-20 pt-16 px-4  text-center bg-[#ED217B] bg-center  bg-no-repeat">
        {/* style={{ backgroundImage: `url('${cardsection}')` }} */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl text-left sm:text-4xl font-bold  mb-4">
              Boost Sales and Close Deals Faster
            </h2>
            <p className=" mb-6 text-left">
              Elevate your website with the world’s first consumer-friendly Car Wrap Visualizer—fully white-labeled to match your brand. Let visitors preview colors, finishes, and designs on their actual vehicle in seconds. Our expert developers handle the integration for you, so you can focus on wrapping, not tech.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/demo"
                className=" bg-[#12161F] uppercase  text-white px-6 py-2 hover:scale-105  transition"
              >
                Use Demo
              </Link>
              <Link
                to="/get-started"
                className=" bg-[#12161F] capitalize  text-white  px-6 py-2 hover:scale-105   transition"
              >
                Get Started Now
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div>
            <img
              src={mobileview}
              alt="Boost Sales Visual"
              className="w-full"
            />
          </div>
        </div>

        {/* <div className='-mt-28'>

          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="114" viewBox="0 0 1897 80" fill="none">
            <path d="M-23 111.297C582.773 -32.4019 1215.26 -36.5672 1823.65 96.5768L1897 111.297V113.963H-23V111.297Z" fill="#12161F" />
          </svg>
        </div> */}


      </section>

      <div className='relative md:-mt-16 -mt-7 w-full'>
        <div class="custom-shape-divider-bottom-1749603305">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default BoostSales;
