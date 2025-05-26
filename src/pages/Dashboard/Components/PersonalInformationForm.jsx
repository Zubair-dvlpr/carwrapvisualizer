import React from 'react';

const PersonalInformationForm = () => {
  return (
    <div className="border-[#E1E1E1] mt-4 bg-[#F5F5F7] p-5 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>

      {/* Form */}
      <form className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <input
              type="text"
              placeholder="Enter your region"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business
            </label>
            <input
              type="text"
              placeholder="Enter your business"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business
            </label>
            <input
              type="text"
              placeholder="Enter your business"
              className="w-full bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-[#EB227C] text-white px-8 py-4 rounded-full hover:scale-105 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
