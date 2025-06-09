import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import colorfulcarImg from '../../../assets/images/colorful-car-illustration.png'
import creditslabel from '../../../assets/icons/creditslabel.svg'
import { AuthContext } from '../../../context/AuthContext';
const CreditsAndPlan = () => {
    // const { user, domain } = useContext(AuthContext);
    const [activePlan, setActivePlan] = useState();
    // useEffect(() => {
    //     const fetchSubscription = async () => {
    //         try {
    //             const res = await fetch(`${domain}/billing/get-user-subscription.php`, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ user_id: user.user.id }),
    //             });

    //             const data = await res.json();
    //             setActivePlan(data.plan)
    //             // console.log(data.plan); // total, remaining credits, plan name, expiry
    //         } catch (error) {
    //             console.error('Failed to fetch subscription info:', error);
    //         }
    //     };

    //     fetchSubscription();
    // }, []);

    return (
        <div className='grid mt-5 sm:grid-cols-11 grid-cols-1 gap-5'>
            {/* {console.log(activePlan)} */}
            <div className='md:col-span-3 col-span-full bg-[#12161F] rounded-xl p-5 text-white'>
                <img src={creditslabel} alt="" />
                <p className='my-3'>Top Up Account </p>
                <div className='text-[40px] font-semibold font-Lato'>
                    <div className='text-[40px] font-semibold font-Lato'>
                        {activePlan ? (
                            <>
                                {activePlan.remaining_credits} <span className='text-[12px] font-normal'>/ {activePlan.total_credits}</span>
                            </>
                        ) : (
                            <span className='text-sm'>Loading...</span>
                        )}
                    </div>
                </div>
                <p className='text-[#8F8F8F] text-[12px] font-medium'>Credits Used</p>
            </div>
            <div className='md:col-span-8  col-span-full'>
                <div className='border-[#E1E1E1] rounded-[10px] border bg-[#F5F5F7] flex items-center justify-between'>
                    <div className='pl-4'>
                        <div>
                            {activePlan ? (
                                <>
                                    <h4 className='font-Lato text-2xl font-semibold leading-9 '>{activePlan.product_name}</h4>
                                </>
                            ) : (
                                <SkeletonText width="w-24" height="h-10" />
                            )}

                            {/* <p className='text-xs text-[#000] font-medium font-Lato'>Subscription Tier <span className='text-[#454545] font-light text-[10px] sm:ml-3 ml-1'>Trials Ends in 6 Days</span></p> */}

                            <p className='text-xs text-[#000] font-medium font-Lato'>
                                Subscription Tier
                                {activePlan?.expires_at && (
                                    <span className='text-[#454545] font-light text-[10px] sm:ml-3 ml-1'>
                                        Trial Ends in {dayjs(activePlan.expires_at).add(1, 'month').diff(dayjs(), 'day')} Days
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                    <img src={colorfulcarImg} alt="" />
                </div>
                <div className='grid grid-cols-2 mt-2 gap-4'>
                    <div className='bg-[#F5F5F7] rounded-[10px] p-3 flex items-center border border-[#E1E1E1]'>
                        <span className='h-[38px] w-[38px] flex justify-center items-center bg-white rounded-2xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M16.5016 1.5L10.3516 7.65" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.75 4.62695V8.24945H13.3725" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <div className=' grow flex flex-col items-center  '>
                            <div className=''>
                                <h4 className='font-semibold font-Poppins leading-9 text-2xl'>0</h4>
                                <p className='text-[#8F8F8F] text-xs font-medium'>Deals Closed</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#F5F5F7] rounded-[10px] p-3 flex items-center border border-[#E1E1E1]'>
                        <span className='h-[38px] w-[38px] flex justify-center items-center bg-white rounded-2xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M16.5016 1.5L10.3516 7.65" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.75 4.62695V8.24945H13.3725" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75" stroke="#0071BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <div className=' grow flex flex-col items-center  '>
                            <div className=''>
                                <h4 className='font-semibold font-Poppins leading-9 text-2xl'>0</h4>
                                <p className='text-[#8F8F8F] text-xs font-medium'>Total Wraps</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreditsAndPlan


const SkeletonText = ({ width = "w-32", height = "h-6" }) => (
    <div className={`bg-gray-300 ${width} ${height} rounded animate-pulse`}></div>
);
