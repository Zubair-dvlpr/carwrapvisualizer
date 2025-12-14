import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import iPadMini from "../../assets/images/iPadMini.png";
const faqData = [
  {
    question: "What is Car Wrap Visualizer™ and how does it help my shop?",
    answer:
      "Car Wrap Visualizer™ lets customers preview wrap colors, finishes, and designs on real vehicle models before installation, helping shops close deals faster and generate more leads.",
  },
  {
    question: "Can I add my shop’s branding to the visualizer?",
    answer:
      "Yes. The platform supports full white-label branding including your logo, colors, and shop identity.",
  },
  {
    question: "Can I embed the visualizer on my website?",
    answer:
      "Absolutely. You can embed the visualizer directly on your website with no coding required.",
  },
  {
    question: "How do customers use it?",
    answer:
      "Customers select their vehicle, choose wrap colors and finishes, preview angles in real time, and submit a lead or booking request.",
  },
  {
    question: "Can I upload my own custom wrap colors?",
    answer:
      "Yes. You can upload and manage your own custom wrap color lines inside your dashboard.",
  },
  {
    question: "What vehicles are supported?",
    answer:
      "We support vehicles from 1990 to 2026, including cars, trucks, SUVs, and more.",
  },
  {
    question: "Which wrap brands and finishes are included?",
    answer:
      "Popular brands like 3M, Avery, VViViD and finishes such as gloss, matte, satin, chrome, and carbon fiber are supported.",
  },
  {
    question: "Can I also show tint, PPF, or chrome delete previews?",
    answer:
      "Yes. Tint, PPF, chrome delete, roof, mirror, and accent previews are all supported.",
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
