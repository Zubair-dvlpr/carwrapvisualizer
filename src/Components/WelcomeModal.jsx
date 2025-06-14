// components/WelcomeModal.jsx
import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const WelcomeModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090D19] bg-opacity-70">
            <div className="bg-[#12142B] max-w-lg w-full rounded-lg shadow-lg p-6 relative text-white">
                <h2 className="text-2xl font-bold mb-4">Welcome to Your Free Trial of Car Wrap Visualizer</h2>

                <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-start gap-2">
                        <span>You've unlocked 5 free wrap previews - show customers real designs on their exact vehicle.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <IoIosCheckmarkCircle className="text-green-600 text-xl mt-0.5" />
                        <span>Online bookings & smart work orders</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <IoIosCheckmarkCircle className="text-green-600 text-xl mt-0.5" />
                        <span>Customer notifications, history & warranty tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <IoIosCheckmarkCircle className="text-green-600 text-xl mt-0.5" />
                        <span>Built-in CRM for follow-ups & marketing</span>
                    </li>
                </ul>
                <p className="mb-4 text-sm">Start creating or managing your shop – it's all included in your trial.</p>

                <button
                    onClick={onClose}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md"
                >
                    Start Trial
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
