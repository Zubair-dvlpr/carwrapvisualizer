import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const images = [
    'https://fakeimg.pl/150x150?text=logo1',
    'https://fakeimg.pl/150x150?text=logo2',
    'https://fakeimg.pl/150x150?text=logo3',
    'https://fakeimg.pl/150x150?text=logo4',
    'https://fakeimg.pl/150x150?text=logo5',
    'https://fakeimg.pl/150x150?text=logo6',
    'https://fakeimg.pl/150x150?text=logo7',
];

const ImageCarousel = () => {
    return (
        <div className="relative px-4 py-8">
            {/* Custom Navigation Buttons */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <div className="swiper-button-prev cursor-pointer text-2xl text-gray-600 hover:text-black">
                    <FaArrowLeft />
                </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <div className="swiper-button-next cursor-pointer text-2xl text-gray-600 hover:text-black">
                    <FaArrowRight />
                </div>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                }}
                loop={true}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className='text-center'>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-28 mx-auto h-auto rounded-lg shadow-md"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
