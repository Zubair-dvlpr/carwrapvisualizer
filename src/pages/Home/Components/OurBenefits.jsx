import React from 'react';
import car1 from "../../../assets/images/car1.png"
import car2 from "../../../assets/images/car2.png"
import Benefitsbg from "../../../assets/images/Benefitsbg.png"
const benefits = [
  {
    img: car1,
    title: 'Predictable Revenue',
    desc: '1 new customer/month = $36K/year—just the beginning.',
  },
  {
    img: car2,
    title: 'Faster Sales, Fewer Questions',
    desc: 'No more color debates—customers visualize, commit, and pay a deposit online.',
  },
  {
    img: car1,
    title: 'Close More Jobs, Save More Time',
    desc: 'Boost your sales pipeline—customers visualize, decide quickly, and close deals faster.',
  },
];

const OurBenefits = () => {
  return (
    <section className="py-12 px-4 bg-center" style={{backgroundImage: `url('${Benefitsbg}')`}}>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-6xl font-bold text-white">Our Benefits</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="">
            <img src={benefit.img} alt={benefit.title} className="w-full " />
            <div className="p-5 text-center">
              <h3 className="text-xl text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurBenefits;
