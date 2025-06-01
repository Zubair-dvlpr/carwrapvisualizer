import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

const faqs = [
  { id: 1, question: "What is your service?", answer: "We offer a platform to manage your business online." },
  { id: 2, question: "Is there a free trial?", answer: "Yes, we provide a 14-day free trial for all new users." },
  { id: 3, question: "How do I reset my password?", answer: "Click on 'Forgot Password' at login to reset it." },
  { id: 4, question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription anytime with no penalty." },
  { id: 5, question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards and PayPal." },
];

export default function Faqs() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-white mb-10">FAQs</h2>

      {/* Desktop: 2 left, 3 right; Mobile: stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side (2 items) */}
        <div className="space-y-4">
          {faqs.slice(0, 2).map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-base rounded bg-[#ED217B] p-1.5 text-white">{openItem === faq.id ? <RiSubtractFill /> : <FaPlus />}</span>
              </button>
              {openItem === faq.id && (
                <div className="p-4 bg-white">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* Right side (3 items) */}
        <div className="space-y-4">
          {faqs.slice(2).map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-base rounded bg-[#ED217B] p-1.5 text-white">{openItem === faq.id ? <RiSubtractFill /> : <FaPlus />}</span>
              </button>
              {openItem === faq.id && (
                <div className="p-4  bg-white">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
