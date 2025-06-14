import React from 'react'
import worldmap from '../../../assets/images/worldmap.png'
const Worldmap = () => {
    return (
        <div className='bg-[#2B2C2C] py-20'>
            <div className='grid grid-cols-1 gap-9 md:grid-cols-5 max-w-[1320px] mx-auto'>
                {/* <div className=' p-5 sm:p-10    col-span-3'>
                    <div className='bg-white rounded-2xl'>
                        <img src={worldmap} alt="" className='rounded-xl' />
                    </div>
                </div> */}

                <div className='col-span-full flex md:flex-row flex-col items-center justify-center px-3 md:px-0'>
                    <div className='flex md:flex-row flex-col gap-10' >
                        <div className=' flex-1 text-center'>
                            <h3 className='text-4xl font-Lato font-bold text-white'>60000+ </h3>
                            <p className='text-[#ffffff99] mt-3 '>1990-2026- We have the largest selection of any visualizser</p>
                        </div>
                        <div className=' flex-1 text-center'>
                            <h3 className='text-4xl font-Lato font-bold text-white'>3M</h3>
                            <p className='text-[#ffffff99] mt-3 '>Gloss Black (G12)</p>
                        </div>
                        <div className=' flex-1 text-center'>
                            <h3 className='text-4xl font-Lato font-bold text-white'>Build For Shops - Available Worldwide</h3>
                            <p className='text-[#ffffff99] mt-3 '>Seamless integration, full support and API access globally</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Worldmap
