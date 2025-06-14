import React from 'react'
import MacBook from "../../../assets/images/dashboardss.png"
import { Link } from 'react-router-dom'
const ReadyToTake = () => {
    return (
        <>
            <div className='h-20 bg-gradient-to-t to-[#2B2C2C] from-[#12161F]'>

            </div>
            <div className='text-white py-12'>
                <div className='grid gap-12 grid-cols-1 md:grid-cols-2 items-center max-w-[1320px] mx-auto'>
                    <div className='px-3 md:px-0'>
                        <h2 className='text-4xl font-Inter font-bold'>🚀 Take Your Wrap Game Global with Car Wrap Visualizer™</h2>
                        <p className='font-Lato mt-3'>Join the world’s first wrap visualization platform built for shops like yours. Get early access to the latest vehicles, unlock new revenue streams, enjoy hands-on support, and stand out in the industry’s top network.</p>

                        <div className='mt-10'>
                            <Link className="bg-[#ED217B] rounded px-12 font-Poppins font-medium py-4">Start Free Trial</Link>

                        </div>
                        <p className='mt-6 '>No Credit Card Required</p>
                    </div>
                    <div>
                        <img src={MacBook} alt=""  className='w-full rounded-2xl' />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReadyToTake
