import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userUpdateAPIFn } from '../../../redux/features/auth/authFns';

const PersonalInformationForm = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    city: '',
    region: '',
    businessName: '',
    businessAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Prefill form with userInfo on mount/update
  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        phoneNumber: userInfo.phoneNumber || '',
        city: userInfo.city || '',
        region: userInfo.region || '',
        businessName: userInfo.businessName || '',
        businessAddress: userInfo.businessAddress || '',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await dispatch(userUpdateAPIFn(formData));
      if (response?.meta?.requestStatus === 'fulfilled') {
        setSuccessMsg('Information updated successfully.');
      } else {
        setErrorMsg(response?.error?.message || 'Failed to update information.');
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[#E1E1E1] mt-4 bg-[#F5F5F7] p-5 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>

      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Enter your region"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
          <input
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            placeholder="Enter your business address"
            className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#EB227C] text-white px-8 py-4 rounded-full transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {loading ? 'Updating...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
