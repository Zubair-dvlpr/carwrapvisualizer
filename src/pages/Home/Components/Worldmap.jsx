import React from 'react'
import worldmap from '../../../assets/images/worldmap.png'
const Worldmap = () => {
    return (
        <div className='bg-[#2B2C2C]'>
            <div className='grid grid-cols-1 gap-9 md:grid-cols-5 max-w-[1320px] mx-auto'>
                <div className=' p-5 sm:p-10    col-span-3'>
                    <div className='bg-white rounded-2xl'>
                        <img src={worldmap} alt="" className='rounded-xl' />
                    </div>
                </div>

                <div className='flex flex-col justify-center col-span-2'>
                    <div className='flex flex-col gap-10' >
                        <div>
                            <h3 className='text-4xl font-Lato font-bold text-white'>4.5k+</h3>
                            <p className='text-[#ffffff99] mt-3 '>Daily register from new users</p>
                        </div>
                        <div>
                            <h3 className='text-4xl font-Lato font-bold text-white'>1.5k+</h3>
                            <p className='text-[#ffffff99] mt-3 '>Language In the world</p>
                        </div>
                        <div>
                            <h3 className='text-4xl font-Lato font-bold text-white'>1000+</h3>
                            <p className='text-[#ffffff99] mt-3 '>Total learners in the world</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Worldmap
