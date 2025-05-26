import React, { useState } from 'react';
import colorfulcar1 from '../../../assets/images/colorful-car-illustration.png'
import { Link } from 'react-router-dom';
const tabData = [
    {
        name: 'Saved',
        img: colorfulcar1,
    },
    {
        name: 'Lead Sent',
        img: colorfulcar1,
    },
    {
        name: 'Drafts',
        img: colorfulcar1,
    },
    {
        name: 'All',
        img: colorfulcar1,
    },
];

const MyWrap = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex mt-4 flex-col p-4 border border-[#E1E1E1] rounded-[10px] bg-[#F5F5F7] gap-8">
            {/* Left Side */}
            <div className='grid grid-cols-5'>
                <div className="col-span-1">
                    <h2 className="text-black font-Lato text-xl font-semibold leading-8">My Wraps</h2>
                    <span className="text-gray-500 text-sm">
                        Generate New Wrap
                    </span>
                </div>

                <div className="flex col-span-3  justify-center mb-4">
                    {tabData.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 font-Lato text-xs font-medium leading-5 cursor-pointer border-b py-2 ${activeTab === index
                                ? ' border-[#030410] text-[#030410]'
                                : 'bg-transparent border-[#858585] text-[#858585]'
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                <div className='col-span-1'></div>
            </div>

            {/* Tabs & Content */}
            <div className=" text-center">
            
                {/* Tab Content */}
                <div className=" p-4 rounded">
                    <h3 className='text-3xl font-Lato font-bold text-gray-500'>{tabData[activeTab].name}</h3>
                    <img
                        src={tabData[activeTab].img}
                        alt={tabData[activeTab].name}
                        className="mx-auto mb-4 rounded"
                    />
                    <Link to="/tool" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                        Generate Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyWrap;
