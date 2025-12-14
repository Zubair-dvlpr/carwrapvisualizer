import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
// import colorCarImg from '../../assets/bannerImg.png';
import colorCarImg from '../../assets/images/bannerImg.png';
import gradientbg from '../../assets/images/gradientbg.webp';
import ShapeDivider from "../ShapeDivider";
import { Link } from "react-router-dom";

const ColorVisualizer = ({ title, desc, app = false }) => {
    return (
        <section className=" bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${gradientbg})` }}>
            <div className="grid md:grid-cols-2 grid-cols-1 px-3 sm:px-0 gap-8 max-w-[1400px] ml-auto text-white items-center py-20  relative ">

                {/* Text Section */}
                <div className="z-10">
                    <h1 className="text-5xl md:text-6xl font-BeniRegular leading-tight mb-6">
                        READY TO SEE YOUR  {title}
                        CAR IN A WHOLE NEW
                        COLOR?
                    </h1>
                    <p className="text-lg mb-6">
                        {desc}
                    </p>

                    {/* App Store Buttons */}
                    {app && (
                        <>
                            <p className="text-white mb-3 text-lg">Coming soon on...</p>
                            <div className="flex items-center gap-4 mb-6">
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
                        </>)}

                    {/* CTA Button */}
                    <div className="mt-7">
                        <Link to={'/tool'} className="bg-black cursor-pointer hover:scale-105   hover:bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition">
                            Start Visualizing
                        </Link>
                    </div>

                </div>

                {/* Car Image Section */}
                <div className="w-full flex justify-center z-10">
                    <img
                        src={colorCarImg}
                        alt="Colorful car visual"
                        className="max-w-md md:max-w-full"
                    />
                </div>
            </div>

            {/* Optional Gradient Background Design */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-pink-600/10 pointer-events-none" /> */}
        </section>
    );
};

export default ColorVisualizer;
