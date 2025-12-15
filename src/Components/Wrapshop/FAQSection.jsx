import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import iPadMini from "../../assets/images/iPadMini.png";
const faqData = [
  {
    question: "What is Car Wrap Visualizer?",
    answer:
      "Car Wrap Visualizer is a digital platform that lets users preview how different wrap colors and finishes may look on vehicles. It helps individuals explore ideas and helps wrap shops present concepts faster and more clearly.",
  },
  {
    question: "Who can use Car Wrap Visualizer?",
    answer:
      "Anyone can use the platform, including individual vehicle owners, wrap shops, installers, dealerships, and businesses. You choose your account type during sign-up.",
  },
  {
    question: "Do I need an account to use the visualizer?",
    answer:
      "Yes. You must create an account to generate wrap previews, save designs, and access platform features.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes. Both individuals and wrap shops can sign up for a free trial with no credit card required. You can try the platform before upgrading.",
  },
  {
    question: "Is Car Wrap Visualizer available worldwide?",
    answer:
      "Yes. Car Wrap Visualizer is a global-first platform available worldwide with no country restrictions for sign-up or usage.",
  },
  {
    question: "Which vehicles are supported?",
    answer:
      "Most vehicles from model years 1990–2026 are supported, including cars, SUVs, trucks, and vans. The catalog is updated regularly.",
  },
  {
    question: "Can I upload a photo of my own vehicle?",
    answer:
      "Not at this time. Instead, you select the year, make, model, and viewing angle to ensure consistent, high-quality previews.",
  },
  {
    question: "What wrap brands and colors are available?",
    answer:
      "We support hundreds of wrap colors across many popular global wrap brands. New brands and colors are added weekly.",
  },
  {
    question: "Are the wrap colors exact matches to real life?",
    answer:
      "No. Visualizations are digital previews. Final results may vary due to lighting, materials, installation quality, and environment.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Car Wrap Visualizer uses a credit-based system. Credits are used to generate visualizations and access certain features depending on your plan.",
  },
  {
    question: "Are credits refundable?",
    answer:
      "Credits are generally non-refundable once used. Credit rules vary by plan and are always visible in your dashboard.",
  },
  {
    question: "Can wrap shops embed the visualizer on their website?",
    answer:
      "Yes. Wrap shops can embed the visualizer on any website using a unique embed link generated from the dashboard. No coding is required.",
  },
  {
    question: "Do you take a cut from wrap shop jobs?",
    answer:
      "No. Wrap shops keep 100% of their business. Car Wrap Visualizer only provides visualization and platform tools.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use trusted infrastructure and industry-standard security practices. We do not sell personal or business data.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team anytime at support@carwrapvisualizer.com.",
  },
];


const FAQSection = ({ image }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-5xl font-extrabold uppercase text-center mb-16">
          Have a Question?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* FAQ List */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className=" border-gray-300 border-2 rounded-xl p-5 cursor-pointer transition hover:shadow-md"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    {item.question}
                  </h3>

                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-600 text-white">
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </span>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image */}
         
            <div className="flex justify-center lg:justify-end">
              <img
                src={iPadMini}
                alt="Dashboard Preview"
                className=" w-full"
              />
            </div>
     
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
