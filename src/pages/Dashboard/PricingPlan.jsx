import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import pricingplan from "../../assets/icons/pricingplan.svg";
import { IoArrowForwardOutline } from 'react-icons/io5';

const PricingPlan = ({ activeP, newplans, newloading, setShowplans, showplans, home }) => {
    // console.log(showplans)
    const [activePlan, setActivePlan] = useState(null);

    const handlePlanSelect = (id) => {
        setActivePlan(id);
    };

    const handleUpgradeClick = async (priceId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const stripe = await loadStripe('pk_test_51R1Y9cD1VxxY3VIVGId78x9GYtUp1hYRJvhpF8yfhw9TGC5RLPJ99utKWUEMwy4BY7PCQbNqL3bGG3ygJMnU8xsf001dsIrIO4');

        try {
            const response = await fetch('https://api.theugcmachine.com/billing/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    priceId: String(priceId),
                    successUrl: `${window.location.origin}/Subscription`,
                    cancelUrl: `${window.location.origin}/Subscription`,
                }),
            });

            const data = await response.json();
            if (data?.sessionId) {
                await stripe.redirectToCheckout({ sessionId: data.sessionId });
            } else {
                alert('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mb-8 mx-auto">
            {home && (
                <h2 className="text-2xl capitalize flex items-center gap-1 font-semibold mb-8">

                    {showplans ? <><span onClick={() => setShowplans(!showplans)} className='text-blue-400 text-xl cursor-pointer'>Subscription Box </span>  <IoArrowForwardOutline className='text-blue-400 text-lg' /></> : ""}
                    Our Pricing Plans</h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* // Skeleton or animation while loading */}

                {newloading ? (
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-300 rounded-2xl p-6 h-full">
                                <div className="bg-gray-400 rounded-xl h-16 mb-4"></div>
                                <div className="bg-gray-400 h-8 mb-4"></div>
                                <div className="bg-gray-400 h-6 mb-4"></div>
                                <div className="bg-gray-400 h-6 mb-4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    newplans.map((plan) => (
                        <div key={plan.id} disabled={activeP === plan.name} className={`${activeP === plan.name
                            ? 'bg-gray-500 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#1AE1AB] to-[#712FFF]  text-white hover:opacity-90'
                            } rounded-2xl ${activePlan === plan.id ? "p-[1px]" : ""}`}>
                            <div
                                className={`p-6 h-full ${activeP === plan.name
                                    ? 'bg-gray-500 text-white cursor-not-allowed opacity-60'
                                    : 'bg-gradient-to-t  from-[#261055] to-[#105f4a]'
                                    }  rounded-2xl`}
                                onClick={() => handlePlanSelect(plan.id)}
                            >
                                <div className="mb-4">
                                    <img src={plan.icon} alt="Plan Icon" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                                <hr className='mb-8' />
                                <ul className="text-left capitalize mb-6">
                                    <li className="flex justify-between mb-2"><span>Price:</span><span className='text-[#22DEAE] font-bold capitalize'>{plan.price}</span></li>
                                    <li className="flex justify-between mb-2"><span>Credits:</span><span className='text-[#22DEAE] font-bold capitalize'>{plan.credits}</span></li>
                                    <li className="flex justify-between mb-2"><span>Custom Characters:</span><span className='text-[#22DEAE] font-bold capitalize'>{plan.customCharacters}</span></li>
                                </ul>
                                <button disabled={activeP === plan.name} className={`w-full py-3 border ${activeP === plan.name ? "cursor-not-allowed" : "cursor-pointer"} border-white text-white rounded-full mb-5`}>Price per token: {plan.btnprice}</button>
                                <button disabled={activeP === plan.name}
                                    className={`w-full py-3 uppercase bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] ${activeP === plan.name ? "cursor-not-allowed" : "cursor-pointer"}  rounded-4xl text-white`}
                                    onClick={() => handleUpgradeClick(plan.priceId)}
                                >
                                    {activeP === plan.name ? 'Current Plan' : 'subscribe'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PricingPlan;
