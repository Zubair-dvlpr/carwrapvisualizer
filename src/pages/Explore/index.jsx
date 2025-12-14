import React from 'react'
import explore from '../../assets/images/EXPLORE.png';
import ColorVisualizer from '../../Components/Home/ColorVisualizer';
import FeaturedTools from '../../Components/Explore/FeaturedTools';
import Whouses from '../../Components/Explore/Whouses';
import WrapShopHero from '../../Components/Explore/WrapShopHero';
import ShapeDivider from '../../Components/ShapeDivider';
import Brandlogo from '../Home/Components/Brandlogo';

import theeM from '../../assets/images/Brandlogo/3m.png';
import apa from '../../assets/images/Brandlogo/apa.png';
import arlon from '../../assets/images/Brandlogo/arlon.png';
import avery from '../../assets/images/Brandlogo/avery.png';
import cheetah from '../../assets/images/Brandlogo/cheetah.png';
import frog from '../../assets/images/Brandlogo/frog.png';
import hexis from '../../assets/images/Brandlogo/hexis.png';
import inozetek from '../../assets/images/Brandlogo/inozetek.png';
import kpmg from '../../assets/images/Brandlogo/kpmg.png';
import teckwrap from '../../assets/images/Brandlogo/teckwrap.png';
import vvivid from '../../assets/images/Brandlogo/vvivid.png';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import VisualizerHero from '../../Components/Explore/VisualizerHero';
import CompareColors from '../../Components/Explore/CompareColors';
import BoostSalesVisual from '../../assets/images/BoostSalesVisual.png';
import colorboxcar from '../../assets/images/colorboxcar.webp';
import VideoShowcase from '../../Components/Explore/VideoShowcase';
import explorebg from '../../assets/images/explorebg.png';
import herobgtop from '../../assets/images/hero-bg-top.png';
import { Link } from 'react-router-dom';
const brands = [
  theeM,
  avery,
  vvivid,
  teckwrap,
  inozetek,
  cheetah,
  apa,
  frog,
  hexis,
  kpmg,
  arlon,
];

const Explore = () => {
  return (
    <div >
      <div className='bg-cover pb-80 bg-no-repeat' style={{ backgroundImage: `url(${explorebg})` }}>
        <img src={herobgtop} alt="hero-bg-top.png" className="absolute inset-0 pointer-events-none " />
        {/* Content */}
        <div className="relative text-white pt-32 z-10 max-w-7xl mx-auto px-6 text-center">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-white/20 text-sm text-white/90 backdrop-blur">
            ✨ HUNDREDS OF COLORS · 15+ BRANDS · EVERY VEHICLE FROM 1990–2026
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-BeniRegular font-extrabold uppercase leading-tight mb-6">
            THE <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              ALL-IN-ONE
            </span>
            <br />
            CAR WRAP VISUALIZER PLATFORM.
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-12">
            Preview colors. Explore finishes. Compare angles.
            <br />
            Everything you need to choose a wrap — in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/visualizer"
              className="px-10 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition"
            >
              Start Visualizing
            </Link>

            <Link
              to="/colors"
              className="px-10 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-700 hover:opacity-90 transition"
            >
              Browse Colors
            </Link>
          </div>

        </div>

      </div>
      <VideoShowcase />
      <Whouses />
      <div className='bg-[#0A0718] text-white'>
        <ShapeDivider color={'#0A0718'} />
        <VisualizerHero
          imgpath={BoostSalesVisual}
        />

        <CompareColors
          imgpath={colorboxcar}
        />


        <div className='max-w-7xl mx-auto px-6 text-center pt-16'>
          <h2 className='text-white text-6xl md:text-8xl font-BeniRegular mb-4'>Browse professional wrap brands.</h2>
          <p className='text-gray-300 max-w-xl mx-auto mb-10'>
            Preview wrap colors across multiple angles including: Front angle, Rear angle, Side view, and Top view.
          </p>
        </div>
        <Brandlogo brands={brands} />
        <div className='mx-auto w-fit'>
          <p className="text-white mb-3 text-lg">Coming soon on...</p>
          <div className="flex items-center gap-4 pb-6">
            <a
              href="#"
              className="flex items-center gap-4 bg-white text-black px-5 py-1.5 rounded-lg shadow hover:scale-105 transition"
            >
              <FaApple size={24} />
              <div>
                <p className="text-[#58646D] text-sm">Get on the</p>
                <span>App Store</span>
              </div>

            </a>

            <a
              href="#"
              className="flex items-center gap-4 bg-white text-black px-5 py-1.5 rounded-lg shadow hover:scale-105 transition"
            >
              <FaGooglePlay size={24} />
              <div>
                <p className="text-[#58646D] text-sm">Get it on</p>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <WrapShopHero />
      <FeaturedTools />
      <ColorVisualizer
        title={'Ready to explore wrap colors?'}
        desc={'Pick your vehicle and experience the most accurate wrap preview online.'}
      />
    </div>
  )
}

export default Explore
