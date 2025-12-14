import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Brandlogo = ({ brands }) => {
    return (
        <div>
            {/* Desktop Brand Logos */}
            <div className="hidden md:grid grid-cols-6 gap-8 place-items-center mb-10">
                {brands.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt="brand"
                        className="h-10 opacity-80 hover:opacity-100 hover:scale-105 transition"
                    />
                ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden mb-10">
                <Swiper slidesPerView={3} loop autoplay>
                    {brands.map((src, i) => (
                        <SwiperSlide key={i}>
                            <img src={src} alt="brand" className="h-10 mx-auto opacity-80" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Brandlogo
