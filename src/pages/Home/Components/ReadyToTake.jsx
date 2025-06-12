import React from 'react'
import MacBook from "../../../assets/images/MacBook.png"
import { Link } from 'react-router-dom'
const ReadyToTake = () => {
    return (
        <>
            <div className='h-20 bg-gradient-to-t to-[#2B2C2C] from-[#12161F]'>

            </div>
            <div className='text-white'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center max-w-[1320px] mx-auto'>
                    <div className='px-3 md:px-0'>
                        <h2 className='text-4xl font-Inter font-bold'>🚀 Ready to Take Your Wrap Game Global?</h2>
                        <p className='font-Lato mt-3'>Join the Zeno Certified Network and put your shop on the map. Get early access to new vehicles, exclusive revenue streams, hands-on support, and a spotlight in the industry’s most elite circle.</p>

                        <div className='mt-10'>
                            <Link className="bg-[#ED217B] rounded px-12 font-Poppins font-medium py-4">Start Free Trial</Link>

                        </div>
                        <p className='mt-6 '>No Credit Card Required</p>
                    </div>
                    <div>
                        <img src={MacBook} alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReadyToTake
