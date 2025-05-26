import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import ultimateplanbg from '../../assets/images/ultimateplanbg.png'
const PlansList = () => {
    const { user } = useContext(AuthContext);
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

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('http://localhost/carApi/plans.php');
                const data = await response.json();

                if (data.success) {
                    setPlans(data.plans);
                } else {
                    setError('Failed to load plans');
                }
            } catch (err) {
                setError('Error fetching plans: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleSubscribe = async (plan) => {
        if (!user) {
            alert("Please login first.");
            return;
        }
        setProcessingPlanId(plan.id);
        try {
            const response = await fetch('http://localhost/carApi/create-checkout-session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.user.id,
                    priceId: plan.id,
                }),
            });
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to create checkout session');
                setProcessingPlanId(null);
            }
        } catch (error) {
            alert('Error: ' + error.message);
            setProcessingPlanId(null);
        }
    };

    if (loading) return <p>Loading plans...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="plans-list grid gap-8 grid-cols-1 md:grid-cols-3">
            {plans.map((plan, idx) => {
                // Determine if this is the second plan (index 1)
                const isSecondPlan = idx === 1;
                return (
                    <div
                        key={plan.id}
                        className={`plan-card  p-4 rounded-lg flex flex-col justify-between
                            ${plan.id === user.user.currentPlan ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl transition-shadow duration-300'}
                        `}
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            ...(isSecondPlan && plan.complete_item?.product?.images?.length
                                ? {
                                    backgroundImage: `url(${ultimateplanbg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: '#fff',
                                }
                                : {}
                            )
                        }}
                    >
                        <div>
                            {/* Plan Name */}
                            <h3 className="text-xl font-bold mb-3">{plan.product_name}</h3>

                            {/* Plan Description */}
                            <p className="mb-3">{planDescriptions[plan.id] || "Plan description goes here."}</p>
                            {isSecondPlan && (
                                <div className='border-b mb-3'></div>
                            )}
                            {/* Features List */}
                            <ul className="my-6 space-y-2">
                                {(planFeatures[plan.id] || []).map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <IoIosCheckmarkCircle className={` ${isSecondPlan ? "text-white" : "text-black"}  mr-2 mt-1.5 text-base flex-shrink-0`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            {/* Price Centered */}
                            <div className="text-center text-base font-Poppins font-semibold mb-6">
                                ${(plan.unit_amount / 100).toFixed(2)} {plan.currency.toUpperCase()} / {plan.interval || 'one-time'}
                            </div>

                            {/* Subscribe Button */}
                            <button
                                disabled={processingPlanId === plan.id || plan.id === user.user.currentPlan}
                                onClick={() => handleSubscribe(plan)}
                                className={`w-full py-3 rounded cursor-pointer font-semibold
                                ${plan.id === user.user.currentPlan
                                        ? 'bg-gray-400 cursor-not-allowed text-black'
                                        : 'bg-[#ED217B] hover:brightness-110 hover:scale-105 text-white'}
                                transition`}
                            >
                                {plan.id === user.user.currentPlan ? 'Active Plan' : processingPlanId === plan.id ? 'Processing...' : 'Get this plan'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PlansList;
