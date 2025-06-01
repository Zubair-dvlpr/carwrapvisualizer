import React, { useState } from 'react';
import tabimg1 from "../../../assets/images/tabImg1.png"
const tabs = [
  {
    id: 'tab1',
    label: 'Vehicles',
    heading: '🚗 Real Vehicle Wrap Visualizer: 1990–2026 Models',
    image: tabimg1, // Replace with actual image path
    paragraph: ' Car Wrap Visualizer™ Your wraps. Your brand. Instant previews—standalone or embedded. Show clients exactly how their car will look—full-body or caliper wraps—on real vehicle templates, right in your browser or seamlessly integrated into your site.',
    list: ['Coverage for any make/model 1990–2026', '200+ wrap colors plus upload your own custom lines', 'Finish options: gloss, matte, satin, chrome, carbon fiber', 'Caliper color customizations to match any design','White-label option to fully brand as your own', 'White-label option to fully brand as your own', 'Use as a standalone studio or embed directly on your website', 'No downloads, no guesswork—just instant, photo-real previews'],
  },
  {
    id: 'tab2',
    label: 'Wrap Colors & Finishes',
    heading: 'Wrap Colors & Finishes',
    image: tabimg1,
    paragraph: 'Select from top-tier vinyl brands and explore every color and finish.',
    list: ['Gloss', 'Matte', 'Satin', 'Chrome'],
  },
  {
    id: 'tab3',
    label: 'Calipers',
    heading: 'Customize Calipers',
    image: tabimg1,
    paragraph: 'Change caliper colors to suit the wrap style or highlight performance.',
    list: ['Red', 'Yellow', 'Black', 'Custom Paint'],
  },
  {
    id: 'tab4',
    label: 'Chrome Deletes',
    heading: 'Chrome Delete Options',
    image: tabimg1,
    paragraph: 'Easily visualize black-out trim and de-chrome packages.',
  },
  {
    id: 'tab5',
    label: 'Roofs & Mirrors',
    heading: 'Wrap Roofs & Mirrors',
    image: tabimg1,
    paragraph: 'Add contrast or continuity with roof and mirror wraps.',
    list: ['Gloss Black Roof', 'Satin Mirrors', 'Carbon Fiber Option'],
  },
  {
    id: 'tab6',
    label: 'Environments',
    heading: 'Preview in Real Environments',
    image: tabimg1,
    paragraph: 'See your wrap in a realistic setting to impress clients.',
  },
];

const InstantlyPreview = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full px-4 pt-12 text-white">
      {/* Top content */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-sm uppercase text-gray-400 mb-2">Real Photos. Real Colors. Real Impact.</p>
        <h2 className="text-4xl font-bold mb-4">🎨 Instantly Preview Any Wrap on Any Car</h2>
        <p className="text-lg text-gray-300">
          Whether you’re using your own custom wrap line or global brands like 3M, Avery, or Inozetek — Car Wrap Visualizer™ lets your customers see the final look before you ever unwrap a roll.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto">
        <div className="flex border rounded-lg max-w-4xl mx-auto border-[#8A8A8A] p-4 justify-center mb-6 flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 text-sm cursor-pointer py-3 rounded-full transition-colors duration-300 ${
                activeTab === tab.id ? 'bg-black text-white' : 'bg-[#ffffff0d] text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#FF0069] p-8 rounded-t-2xl text-white max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left: Heading */}
            <div>
              <h3 className="text-2xl font-bold mb-4">{activeContent.heading}</h3>
            </div>

            {/* Center: Image */}
            <div className="flex justify-center">
              <img
                src={activeContent.image}
                alt={activeContent.label}
                className="rounded-xl object-cover"
                style={{boxShadow: '-8px -8px white'}}
              />
            </div>

            {/* Right: Paragraph and List */}
            <div>
              <p className="mb-4">{activeContent.paragraph}</p>
              {activeContent.list && (
                <ul className="list-disc list-inside text-sm text-white/90">
                  {activeContent.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantlyPreview;
