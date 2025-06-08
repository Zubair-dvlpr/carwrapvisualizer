import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import ultimateplanbg from '../../assets/images/ultimateplanbg.png'
import pricebelowSection from '../../assets/images/pricebelowSection.png'
import { useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { stripeActiveSubscriptionsAPIFn, stripeFetchPlansAPIFn, stripeCheckoutSessionAPIFn } from '../../redux/features/stripe/stripeFns';
const PlansList = ({ location }) => {
    const dispatch = useDispatch();
    const stripePromise = loadStripe('pk_test_xxxxxxxxxxxxx'); // Replace with your actual publishable key

    // const { user } = useContext(AuthContext);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingPlanId, setProcessingPlanId] = useState(null);

    // Dummy descriptions per plan id
    const planDescriptions = {
        "price_1RQY8r05VZZMHB0BVeUPJ46Y": "For small shops just starting out or with light needs.",
        "price_1RQY8R05VZZMHB0BfxC6pdwl": "Start with a first step",
        "price_1RQY7k05VZZMHB0BVaVvwJBT": "Designed for high-volume shops, chains, or white-label partners."
    };

    // Dummy features list per plan id
    const planFeatures = {
        "price_1RQY8r05VZZMHB0BVeUPJ46Y": [
            "250 wrap generations/month",
            "All vehicles (1990–2026), all makes & models",
            "Finishes: Gloss, Satin, Matte, Carbon Fibre, Brushed Metal",
            "1 seat/user login",
            "Standard resolution exports",
            "Commercial use license ",
            "Lead Generation: Invite unlimited customers Customers can preview up to 2 designs Customers can book appointments after selecting a color",
            "Add-On: Purchase additional images at a discounted rate (up to 250 extra images/month)",
        ],
        "price_1RQY8R05VZZMHB0BfxC6pdwl": [
            "1000 wrap generations/month",
            "All features from Basic",
            "2 seats/user logins",
            "High-resolution exports (up to 2K)",
            "Priority email support",
            "Lead Generation: Invite unlimited customers Customers can preview up to 5 designs Customers can book appointments directly",
            "Add-On: Purchase additional images at a discounted rate (up to 600 extra images/month)",
            "Tints",
        ],
        "price_1RQY7k05VZZMHB0BVaVvwJBT": [
            "2,500 wrap generations/month",
            "All features from Pro",
            "5 seats/user logins",
            "White-label branding (remove our logo, add yours)",
            "4K export support",
            "API access (by request)",
            "Team dashboard for managing usage and credits",
            "Lead Generation: Invite unlimited customers Customers can preview up to 10 designs Customers can book appointments directly",
            "Add-On: Purchase additional images at a discounted rate (up to 2,000 extra images/month)",
            "Volume top-up: If usage exceeds plan limits, buy extra generations at a discounted rate",
        ]
    };

    const fetchPlans = async () => {
        const data = await dispatch(stripeFetchPlansAPIFn());
        if (data?.meta?.requestStatus === 'fulfilled') {
            const fetchedPlans = data.payload?.data?.plans || [];
            setPlans(fetchedPlans);
            setLoading(false);
        } else {
            console.log("Failed to fetch plans", data);
            setError("Failed to load plans");
            setLoading(false);
        }
    };

    const fetchActiveSubscription = async () => {
        const data = await dispatch(
            stripeActiveSubscriptionsAPIFn()
            // {
            //     "message": "Subscription Fetched Successfully",
            //     "status": "success",
            //     "statusCode": 200,
            //     "data": null
            // }
        );
        if (data?.meta?.requestStatus === 'fulfilled') {
            // setPlans(data)
            console.log("sucess active plan", data)
        }
        if (data?.meta?.requestStatus === 'rejected') {
            console.log("failer", data)
        }
    }

    useEffect(() => {
        fetchPlans()
        fetchActiveSubscription();
    }, [])



    const handleSubscribe = async (plan) => {
        try {
            const response = await dispatch(stripeCheckoutSessionAPIFn({
                priceId: plan.prices.id
            })).unwrap(); // unwrap to get raw payload

            const sessionUrl = response?.data?.url;

            if (sessionUrl) {
                window.location.href = sessionUrl;
            } else {
                alert('Failed to initiate checkout session.');
            }
        } catch (error) {
            console.error('Stripe subscription error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const Wrapflow = [
        "Smart Calendar: View bookings, appointments, and job timelines at a glance",
        "Online Booking: Let clients schedule installs with automated confirmations",
        "One-Click Invoicing: Instantly create  invoices and warranty documents",
        "Work Order System: Auto creates work orders for each appointment",
        "Smart Calculation: Auto-calculate square footage and vinyl needed per job",
        "Inventory Management: Track material levels, get low-stock alerts, and prep for upcoming jobs",
    ]
    const Ultimateplans = [
        "Photo Check-In: Log vehicle condition with photos on arrival",
        "Real-Time Job Tracking: Monitor every job from intake to completion",
        "Customer History: Store wrap records, notes, photos, and warranties",
        "Workflow Automation: Cut wasted time and keep your team focused",
        "Automated Job Alerts: Send SMS updates to customers at every stage"
    ]



    if (loading) return <p>Loading plans...</p>;
    if (error) return <p className="text-red-500">{error}</p>;


    return (
        <>
            <div className="plans-list grid gap-8 grid-cols-1 md:grid-cols-3">
                {Array.isArray(plans) && plans.map((plan, idx) => {
                    const isSecondPlan = idx === 1;
                    const priceId = plan.prices?.id;
                    const planDesc = planDescriptions?.[priceId] || "No description available.";
                    const features = planFeatures?.[priceId] || [];
                    const price = plan.prices?.unit_amount;
                    const currency = plan.prices?.currency?.toUpperCase();
                    const interval = plan.prices?.recurring?.interval || 'one-time';

                    return (
                        <div
                            key={plan.id}
                            className={`plan-card p-4 rounded-lg flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300`}
                            style={{
                                backgroundColor: location === "home" ? 'transparent' : '#fff',
                                color: location === "home" ? '#fff' : '#000',
                                ...(isSecondPlan && plan.images?.length ? {
                                    backgroundImage: `url(${ultimateplanbg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: '#fff',
                                } : {})
                            }}
                        >
                            <div>
                                {/* Plan Name */}
                                <h3 className="text-xl font-bold mb-3">{plan.name}</h3>

                                {/* Plan Description */}
                                <p className="mb-3">{planDesc}</p>

                                {/* Border line only for center plan */}
                                {isSecondPlan && (
                                    <div className="border-b mb-3"></div>
                                )}

                                {/* Features List */}
                                <ul className="my-6 space-y-2">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <IoIosCheckmarkCircle className={` ${isSecondPlan ? "text-white" : location === "home" ? '#fff' : 'text-black'}  mr-2 mt-1.5 text-base flex-shrink-0`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                {/* Price Centered */}
                                <div className="text-center text-base font-Poppins font-semibold mb-6">
                                    ${(price / 100).toFixed(2)} {currency} / {interval}
                                </div>

                                {/* Subscribe Button */}
                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    className="w-full py-3 rounded font-semibold bg-[#ED217B] hover:brightness-110 hover:scale-105 text-white transition"
                                >
                                    Get this plan
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>


            <section className="flex flex-col md:flex-row mt-3 items-stretch text-white bg-center bg-no-repeat bg-cover rounded-2xl justify-center w-full mx-auto py-12 px-4 gap-4" style={{ backgroundImage: `url(${pricebelowSection})` }}>
                {/* Left Column */}
                <div className="flex-1 flex flex-col">
                    <h2 className="text-lg font-bold mb-2">WrapFlow™ Shop Manager</h2>
                    <p className="mb-4">
                        The all-in-one workflow system for high-performing wrap shops.
                    </p>
                    <ul className="space-y-2">
                        {Wrapflow.map((item, index) => {
                            const [title, description] = item.split(":");
                            return (
                                <li key={index} className="flex gap-2">
                                    <IoIosCheckmarkCircle className="text-white mt-0.5 text-xl" />
                                    <span>
                                        <strong>{title}:</strong>{description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Divider */}
                <div className="w-full md:w-2 h-2 md:h-auto bg-gradient-to-b md:bg-gradient-to-b from-[#2E57B7] via-purple-500 to-[#F773AA] " />

                {/* Right Column */}
                <div className="flex-1 flex flex-col justify-start">
                    <h2 className="text-lg font-bold mb-2">Included with Pro — available as an add-on for Basic and Ultimate plans</h2>
                    <ul className="space-y-2">
                        {Ultimateplans.map((item, index) => {
                            const [title, description] = item.split(":");
                            return (
                                <li key={index} className="flex gap-2">
                                    <IoIosCheckmarkCircle className="text-white mt-0.5 text-xl" />
                                    <span>
                                        <strong>{title}:</strong>{description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className='ml-auto text-center mt-3'>
                        <h3 className='text-xl font-Lato font-bold'>$49.99/month</h3>
                        <button className='py-3 mt-1 px-9 rounded font-semibold bg-[#ED217B] hover:brightness-110 hover:scale-105 text-white transition'>
                            Get this Plan
                        </button>
                    </div>
                </div>
            </section>

        </>
    );
};

export default PlansList;
