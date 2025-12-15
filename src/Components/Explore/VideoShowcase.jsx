import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import posterImg from "../../assets/images/videoposter.webp";
import dashbaordsceen from "../../assets/images/dashbaordsceen.png";
// import demoVideo from "../assets/videos/demo.mp4";

const VideoShowcase = () => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        videoRef.current.play();
        setPlaying(true);
    };

    return (
        <section className="relative -mt-60" >
            <div className="max-w-7xl mx-auto px-6">
                {/* Video Wrapper */}
                <div className="relative z-30 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    {/* Video */}
                    <img src={dashbaordsceen} alt="" />
                </div>

            </div>

            <div className="custom-shape-divider-bottom-1765570074 absolute sm:bottom-0 -bottom-10 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg data-name="Layer 1" className="sm:h-[192px] h-28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" fill="white" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
};

export default VideoShowcase;
