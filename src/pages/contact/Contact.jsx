import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here (API call or console log)
        console.log("Form Data:", formData);
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="max-w-3xl sm:mx-auto p-6 bg-white mx-2 shadow-md rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        rows="4"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-6 py-4 rounded-md transition"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
