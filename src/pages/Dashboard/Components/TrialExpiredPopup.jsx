import React from 'react';
import { Link } from 'react-router-dom';

const TrialExpiredPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d8] backdrop-blur-sm">
            <div className="bg-[#0b0f1a] text-white p-6 md:p-10 rounded-2xl max-w-lg w-full shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">🚫 Trial Expired</h2>
                <p className="mb-4">
                    Your free trial has ended. To continue accessing premium features, please purchase an add-on plan.
                </p>
                <div className="text-left text-sm mb-4">
                    <p>🔒 What’s locked now:</p>
                    <ul className="list-disc list-inside ml-2">
                        <li>Car wrap visualization tools</li>
                        <li>Custom quote generator</li>
                        <li>Customer and lead management</li>
                    </ul>
                    <p className="mt-2 text-red-400">
                        ⚠️ Without an upgrade, access to these features is restricted.
                    </p>
                </div>
                <p className="text-sm mb-6">Need help? Contact our support team anytime.</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition"
                    >
                        Close
                    </button>
                    <Link
                        to="/Subscription"
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
                    >
                        Upgrade Plan
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrialExpiredPopup;
