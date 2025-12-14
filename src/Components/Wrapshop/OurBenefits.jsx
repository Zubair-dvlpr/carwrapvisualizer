import React from 'react'
import ourbenefits from "../../assets/images/our-benefits.png";
import graycloud from "../../assets/icons/graycloud.svg";
import yellowmap from "../../assets/images/yellowmap.png";
import ShapeDivider from '../ShapeDivider';
const OurBenefits = () => {
    return (
        <>
            <section className='relative ourbenefits pb-28'>
                <div className='max-w-7xl  overflow-hidden mx-auto px-2 py-20'>
                    <h2 className='text-4xl z-10 relative text-center  md:text-7xl font-extrabold uppercase leading-tight mb-6'>
                        <span className="px-1.5 relative rounded font-BeniRegular sm:text-9xl text-5xl bg-gradient-to-r from-[#f7754256] via-[#e002665f] to-[#ba02ba5e] ">
                            Our<span className='relative'> Benefits
                                <span className='font-BeniRegular rounded-md px-3 sm:text-4xl text-2xl absolute sm:-right-18 -right-16 sm:-top-10 top-0  bg-gradient-to-r from-[#f77542] via-[#e00266] to-[#ba02ba] text-white'>  try now</span>
                            </span>

                            <br />
                        </span>
                    </h2>
                    <div className="relative z-10 mt-12" >
                        <img src={ourbenefits} alt="" />
                    </div>





                </div>

                <img src={graycloud} className="absolute left-0 bottom-1/5 " alt="" />


                <div className='max-w-3xl z-10 relative mx-auto text-center text-white bg-gradient-to-r from-[#000] via-[#2D2D2D] py-6 rounded-xl to-[#000]'>
                    <h3 className="sm:text-7xl text-4xl font-BeniRegular  font-semibold mb-2">Build For Shops - Available Worldwide</h3>
                    <p className="text-lg font-Inter ">Seamless integration, full support and API access globally</p>
                </div>

                <img src={yellowmap} className="absolute left-0 bottom-0  w-full" alt="" />



            </section>
            
        </>
    )
}

export default OurBenefits
