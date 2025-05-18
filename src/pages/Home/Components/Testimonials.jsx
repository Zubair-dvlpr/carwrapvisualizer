import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Avatar1 from "../../../assets/images/Avatar1.png"
const testimonials = [
  {
    text: "“Before the Visualizer, we spent hours going back and forth with customers over color choices. Now, clients come in already confident in their decision. We’ve seen a noticeable increase in close rates and a faster sales cycle within the first week of integrating the tool.”",
    img: Avatar1,
    name: "Mark D",
    role: "Owner at Precision Wraps",
  },
  {
    text: "Very easy to use and efficient tool for both customers and our team. Highly recommended!",
    img: Avatar1,
    name: "Sarah Lee",
    role: "Manager, AutoStyle Pros",
  },
  {
    text: "Game changer! It's made our workflow smoother and clients more confident.",
    img: Avatar1,
    name: "Mike Jordan",
    role: "CEO, Urban Car Wraps",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-[#33375C]">
         What Wrap Shops Say About Us
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Pagination]}
          spaceBetween={40}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition h-full flex flex-col justify-between">
                <p className="text-gray-700 text-lg italic mb-6">"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
