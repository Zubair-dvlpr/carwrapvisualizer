import React from 'react';
import car1 from "../../../assets/images/Benefitimg1.png"
import car2 from "../../../assets/images/Benefitimg2.png"
import car3 from "../../../assets/images/Benefitimg3.png"
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
    img: car3,
    title: 'Close More Jobs, Save More Time',
    desc: 'Boost your sales pipeline—customers visualize, decide quickly, and close deals faster.',
  },
];

const OurBenefits = () => {
  return (
    <section id='ourBenefits' className="pt-20 px-4 bg-contain bg-no-repeat bg-[#000000] bg-top" style={{ backgroundImage: `url('${Benefitsbg}')` }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-6xl font-bold text-white">Our Benefits</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-[#ffffff17]  backdrop-blur-[26px] rounded-2xl border border-[#ffffff4d] p-3">
            <img src={benefit.img} alt={benefit.title} className="w-full " />
            <div className="p-5 text-center">
              <h3 className="text-xl text-white font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>


      <div className='mt-20'>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="114" viewBox="0 0 1920 80" fill="none">
          <path d="M0 111.297C605.773 -32.4019 1238.26 -36.5672 1846.65 96.5768L1920 111.297V113.963H0V111.297Z" fill="#2B2C2C" />
        </svg>
      </div>
    </section>
  );
};

export default OurBenefits;
