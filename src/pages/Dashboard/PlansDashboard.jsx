// src/SubscriptionPlans.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';


const plans = [
    {
        id: 1,
        name: "Premium Plan",
        price: "$19.99/month",
        priceId: "price_1RQUcF2NiBmr6ASCm2JMTvf5.",
    },
    // Add more plans here if needed
];

const SubscriptionPlans = () => {
    const { user, domain } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan) => {
        setLoading(true);
        try {
            const response = await fetch(`${domain}/create-checkout-session.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.user.id,
                    priceId: plan.priceId,
                }),
            });
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;  // Redirect Stripe Checkout page
            } else {
                alert('Failed to start checkout');
                setLoading(false);
            }
        } catch (error) {
            alert('Error: ' + error.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.price}</p>
                    <button
                        onClick={() => handleSubscribe(plan)}
                        disabled={loading}
                        className={`w-full py-2 rounded-md text-white font-semibold transition ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Processing...' : 'Subscribe'}
                    </button>
                </div>
            ))}
        </div>

    );
};

export default SubscriptionPlans;
