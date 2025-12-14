import React from 'react'
import FeatureCard from "./FeatureCard";
import { FaDatabase, FaDesktop, FaCar } from "react-icons/fa";
import carflag from '../../assets/icons/carflag.svg';
import calender from '../../assets/icons/calender.svg';
import watchVideo from '../../assets/icons/watchVideo.svg';

const Whouses = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Title */}
                <h2 className="text-center font-BeniRegular text-6xl sm:text-8xl font-extrabold uppercase mb-5">
                    Who Uses Our Visualizer?
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
                    <FeatureCard
                        imgpath={carflag}
                        title="Car Enthusiasts"
                        description="Access hundreds of colors across all major brands."
                    />

                    <FeatureCard
                        imgpath={calender}
                        title="Daily Drivers"
                        description="Access hundreds of colors across all major brands."
                        mt="mt-16"
                    />

                    <FeatureCard
                        imgpath={watchVideo}
                        title="Content Creators"
                        description="Every model from 1990–2026, multiple angles included."
                    />
                </div>

            </div>
        </section>
    )
}

export default Whouses
