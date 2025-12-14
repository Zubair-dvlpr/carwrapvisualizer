import React from 'react'

import howtowrkImg from "../../assets/images/howtowrkImg.png";
// import howtowrkImg from "../../assets/images/howtowrkImg.webp";
const Howtowork = () => {
    return (
        <div className='max-w-7xl mx-auto px-2 py-20'>
            <h2 className='text-4xl md:text-7xl font-extrabold uppercase leading-tight mb-6'>
                <span className="px-1.5 relative rounded bg-gradient-to-r from-[#f7754256] via-[#e002665f] to-[#ba02ba5e] ">
                    hOW IT <span className='relative'>WORKS
                        <span className='font-BeniRegular rounded-md px-3 sm:text-4xl text-2xl absolute sm:-right-18 -right-16 sm:-top-10 top-0  bg-gradient-to-r from-[#f77542] via-[#e00266] to-[#ba02ba] text-white'>  try now</span>
                    </span>

                    <br />
                </span>
            </h2>
            <p className='max-w-3xl font-Inter'>Unlock the largest vehicle selection with our Car Wrap Visualizer™! Choose from over 1.2 million cars & see how any car—from 1990 to 2026, any make or model—looks with premium wraps from top brands like 3M, Avery Dennison, and Hexis.</p>
            <div className="relative mt-12" >
                <img src={howtowrkImg} alt="" />
            </div>
        </div>
    )
}

export default Howtowork
