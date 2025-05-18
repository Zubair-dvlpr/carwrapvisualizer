import React from 'react';
import cardsection from "../../../assets/images/cardsectionbg.png"
import card1 from "../../../assets/images/card1.svg"
import card2 from "../../../assets/images/card2.png"
import card3 from "../../../assets/images/card3.png"
const cards = [
  {
    img: card1,
    title: 'Close Sales Faster',
    desc: 'No more endless back-and-forth on color choices. Let customers see the wrap before they step foot in your shop.',
  },
  {
    img: card2,
    title: 'Modernize Your Website',
    desc: 'Give your online visitors something to interact with — and turn them into paying customers.',
  },
  {
    img: card3,
    title: 'Reduce In-Person Consultations',
    desc: 'Customers come in confident and ready to commit.',
  },
];

const CardSection = () => {
  return (
    <section
      className="relative bg-gray-300 bg-cover bg-center bg-no-repeat py-12 px-6"
      style={{ backgroundImage: `url('${cardsection}')` }}
    >
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-2 flex flex-col justify-around  text-center rounded-lg shadow-lg overflow-hidden">
            <img src={card.img} alt={card.title} className="w-38 mx-auto object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-Poppins text-[#041527] leading-7 text-[26px] font-medium mb-2">{card.title}</h3>
              <p className="text-base leading-6  text-[#041527] ">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>      
    </section>
  );
};

export default CardSection;
