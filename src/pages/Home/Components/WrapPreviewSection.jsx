import { Swiper, SwiperSlide } from "swiper/react";
import BoostSalesVisual from '../../../assets/images/BoostSalesVisual.png';
import "swiper/css";
import { Link } from "react-router-dom";

export default function WrapPreviewSection() {
    // Dummy testimonial data
    const testimonials = [
        {
            text: "Wraps are expensive. Photos online aren’t enough. Our visualizer shows exactly how a color will look on your car’s body lines, reflections, and angles.",
            user: "@boelterdesignco",
            role: "Content Creator",
            img: "/images/user1.jpg",
        },
        {
            text: "The level of accuracy blows my mind. No other tool shows reflections and wrap behavior like this.",
            user: "@wrapguru",
            role: "Professional Wrapper",
            img: "/images/user2.jpg",
        },
        {
            text: "I use this to preview colors for clients every day — it saves so much time.",
            user: "@autostylist",
            role: "Designer",
            img: "/images/user3.jpg",
        },
    ];

    return (

            <div className="relative w-full bg-white py-24 px-6">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">

                    {/* LEFT: SINGLE PHONE IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src={BoostSalesVisual}
                            alt="Wrap Visualizer"
                            className="w-full max-w-md object-contain"
                        />
                    </div>

                    {/* RIGHT SIDE CONTENT */}
                    <div>
                        <h2 className="text-6xl font-BeniRegular md:text-7xl font-extrabold text-[#020202]">
                            THE MOST ACCURATE WRAP PREVIEW.
                        </h2>

                        <p className="text-gray-700 mt-4 font-Inter leading-relaxed">
                            Our rendering engine shows how each wrap color behaves on your car’s body lines
                            with realistic reflections, shadows, and texture. Works with all vehicles
                            from 1990–2026. Updated weekly with new brands and finishes.
                        </p>

                        {/* TESTIMONIAL SLIDER */}
                        <div className="mt-10">
                            <Swiper spaceBetween={20} slidesPerView={1} className="w-full">

                                {testimonials.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
                                            <p className="italic text-gray-300">“{item.text}”</p>

                                            <div className="flex items-center gap-4 mt-6">
                                                <img
                                                    src={item.img}
                                                    alt={item.user}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold">{item.user}</p>
                                                    <p className="text-sm text-gray-400">{item.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>
                        </div>


                    </div>
                </div>
                {/* CTA BUTTON */}
                <div className="mt-16 text-center">
                    <Link to={'/explore'} className=" px-8 py-3 cursor-pointer bg-gradient-to-r from-[#F77442] via-[#E00265] to-[#BA02BA] transition-all rounded-full text-white font-semibold">
                        Explore the features →
                    </Link>
                </div>
            </div>
    
    );
}
