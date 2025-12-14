// HeroBrands.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import RealPreview from "./RealPreview";
import moon from '../../../assets/images/moon.webp';
import Brandlogo from "./Brandlogo";
import ShapeDivider from "../../../Components/ShapeDivider";

const brands = [
    "/logos/3m.png",
    "/logos/avery.png",
    "/logos/vvivd.png",
    "/logos/teckwrap.png",
    "/logos/inozetek.png",
    "/logos/premiumshield.png",
    "/logos/xpel.png",
    "/logos/kpmg.png",
    "/logos/hexis.png",
    "/logos/arion.png",
];

export default function HeroBrands() {
    return (
        <div>
            <ShapeDivider color="#0A0718" />
            <div className="relative w-full py-16 md:py-24 bg-[#0B0717] text-white overflow-hidden">
                {/* Purple Glow Sphere BG */}

                <img src={moon} alt="moon" className="absolute top-0 left-1/2 -translate-x-1/2 " />
                <div className="relative z-10  w-full max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="mb-12 max-w-2xl mx-auto">
                        {/* Title */}
                        <h1 className="text-6xl font-BeniRegular text-center sm:leading-28 leading-16 md:text-8xl font-extrabold tracking-wide uppercase">
                            Discover What People Are Creating
                        </h1>
                        <p className="mt-3 font-Inter text-center text-gray-300 text-sm md:text-base">
                            Explore hundreds of wrap colors on any vehicle from 1990 to 2026.
                        </p>
                    </div>
                    <RealPreview />
                </div>
            </div>
        </div>
    );
}
