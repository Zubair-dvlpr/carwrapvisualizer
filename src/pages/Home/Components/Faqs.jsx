import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

const faqs = [
  {
    id: 1,
    question: "What is Car Wrap Visualizer™️ and how does it help my shop?",
    answer:
      "Car Wrap Visualizer™️ is a sales and marketing tool that lets your customers preview their exact vehicle with real wrap colors and finishes. It helps you close more jobs by giving customers confidence in their wrap choices — right from your site or in-store.",
  },
  {
    id: 2,
    question: "Can I add my shop’s branding to the visualizer?",
    answer:
      "Yes. Your business name, logo, and contact info are fully white-labeled and appear throughout the platform.",
  },
  {
    id: 3,
    question: "Can I embed the visualizer on my website?",
    answer:
      "Yes. We provide a simple embed code or direct share link that works on any website. No developer needed.",
  },
  {
    id: 4,
    question: "How do customers use it?",
    answer:
      "Customers select their year, make, and model, then explore different wrap colors and finishes. Each render uses 1 credit from your shop’s account.",
  },
  {
    id: 5,
    question: "Can I upload my own custom wrap colors?",
    answer:
      "Yes. You can submit a support ticket with your custom color data (HEX codes, material type, finish, and photos). We’ll model it to reflect the real-life appearance and add it to your dashboard with a specialized shareable link for customers.",
  },
  {
    id: 6,
    question: "What vehicles are supported?",
    answer:
      "We support 60,000+ vehicles from 1990 to 2026. New models are added regularly.",
  },
  {
    id: 7,
    question: "Which wrap brands and finishes are included?",
    answer:
      "You can show colors from 3M, Avery, KPMF, Inozetek, TeckWrap, APA, and others. Finishes include matte, satin, gloss, chrome, carbon, and flip.",
  },
  {
    id: 8,
    question: "Can I also show tint, PPF, or chrome delete previews?",
    answer:
      "Yes. These services can be enabled in your dashboard if your shop offers them.",
  },
  {
    id: 9,
    question: "Is there a CRM or booking system included?",
    answer:
      "Yes. Our optional CRM includes:\n• Customer profiles and wrap history\n• Quote and invoice tools\n• Job assignments and reminders\n\nIt’s available as an add-on for just $49.99/month.\n\nYes. Optional Appointment booking\nIt’s available as an add-on for just $14.99/month or $9.99/month when bundled with our CRM option.",
  },
  {
    id: 10,
    question: "How much does it cost?",
    answer:
      "We offer flexible subscription plans:\n• Basic Plan: $79/month\n• CRM Add-On: $49.99/month (optional)\n• Appointment Booking Add-On: $14.99/month (optional)\n\n👉 Subscribe here to get started.",
  },
  {
    id: 11,
    question: "Can I use it in-store with customers?",
    answer:
      "Yes. It works great on tablets, desktops, or showroom kiosks — perfect for consultations and upselling.",
  },
];

export default function Faqs() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faq" className="max-w-6xl mx-auto px-4 pt-24 pb-10">
      <h2 className="text-4xl font-bold text-center text-white mb-10">FAQs</h2>

      {/* Desktop: 2 left, rest right; Mobile: stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side (first 2 FAQs) */}
        <div className="space-y-4">
          {faqs.slice(0, 5).map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-base rounded bg-[#ED217B] p-1.5 text-white">
                  {openItem === faq.id ? <RiSubtractFill /> : <FaPlus />}
                </span>
              </button>
              {openItem === faq.id && (
                <div className="p-4 bg-white whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side (remaining FAQs) */}
        <div className="space-y-4">
          {faqs.slice(5).map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-base rounded bg-[#ED217B] p-1.5 text-white">
                  {openItem === faq.id ? <RiSubtractFill /> : <FaPlus />}
                </span>
              </button>
              {openItem === faq.id && (
                <div className="p-4 bg-white whitespace-pre-line">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
