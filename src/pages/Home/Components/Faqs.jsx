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
      "Yes. If you’re a brand looking to showcase your wrap colors inside Car Wrap Visualizer™, we offer an integration program for a one-time fee of $999. Your finishes will be modeled to reflect their true real-life appearance and added directly to our system for users to preview. To get started, email integrate@carwrapvisualizer.com and our team will guide you through the onboarding process.",
  },
  {
    id: 6,
    question: "What vehicles are supported?",
    answer:
      "We support 1.2 million+ vehicles from 1990 to 2026. New models are added regularly.",
  },
  {
    id: 7,
    question: "Which wrap brands and finishes are included?",
    answer:
      "We currently have the full 3M 1080, 2080, and Avery Dennison wrap catalogs uploaded and ready to use. We’re also actively partnering with wrap brands and wrap shops that offer their own private-label films to integrate their collections into our platform. This allows other shops to use them in previews—and gives customers a true-to-life look at available options.",
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
      "To get started, you’ll need to subscribe to one of our monthly Studio plans:\n• Basic – $79/month for 250 image generations\n• Ultimate – $149/month for 1,000 image generations\n• Pro – $249/month for 2,500 image generations\n\nAll plans include full access to the Car Wrap Visualizer™ studio. Need customer management? Add our optional CRM system for $49.99/month to manage leads, track jobs, and send quotes—all from one dashboard.\n\n👉 Subscribe to activate your account.",
  },
  {
    id: 11,
    question: "Can I use it in-store with customers?",
    answer:
      "Yes. It works great on tablets, desktops, or showroom kiosks — perfect for consultations and upselling.",
  },
  {
    id: 12,
    question: "Can I use the visualizer on an iPad or TV in-store?",
    answer:
      "Yes. The visualizer is fully compatible with tablets, touchscreen displays, and smart TVs—perfect for in-store demos or sales consultations.",
  },
  {
    id: 13,
    question: "Is there a free trial available?",
    answer:
      "We offer a limited free trial for verified wrap shops. Reach out to our team to request access and explore the platform before subscribing.",
  },
  {
    id: 14,
    question: "How realistic are the wrap previews?",
    answer:
      "Wrap previews are designed to match real-life finishes—gloss, matte, satin, chrome, carbon, and more—so customers can see exactly what to expect.",
  },
  {
    id: 15,
    question: "Can I see how customers are interacting with the tool?",
    answer:
      "Yes. Your dashboard provides insights like preview usage, popular vehicles, and trends to help you understand what your customers are exploring.",
  },
  {
    id: 16,
    question: "I have my own wrap brand—can I get it added to the platform?",
    answer:
      "Absolutely. We offer a $999 integration program that allows brands and wrap shops to upload their own product lines. Email integrate@carwrapvisualizer.com to get started.",
  },
  {
    id: 17,
    question: "Can I cancel or switch plans anytime?",
    answer:
      "Yes. All plans are month-to-month and can be upgraded, downgraded, or canceled directly from your dashboard.",
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
          {faqs.slice(0, 8).map((faq) => (
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
          {faqs.slice(8).map((faq) => (
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
