import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userUpdateAPIFn } from '../../../redux/features/auth/authFns';

const PersonalInformationForm = ({ userInfo }) => {
  console.log("Personal Information Form", userInfo);
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  // Add these new state variables
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    region: '',
    city: '',
    businessName: '',
    businessAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch country list on mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await axios.get('https://countriesnow.space/api/v0.1/countries');
        if (!res.data.error) {
          setCountries(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Prefill form with user data
  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        phoneNumber: userInfo.phoneNumber || '',
        country: userInfo.country || '',
        city: userInfo.city || '',
        businessName: userInfo.businessName || '',
        businessAddress: userInfo.businessAddress || '',
      }));

      // If user has a country selected, fetch its cities
      if (userInfo.country) {
        fetchCities(userInfo.country);
      }
    }
  }, [userInfo]);

  // Fetch cities by country
  const fetchCities = async (countryName) => {
    setLoadingCities(true);
    try {
      const res = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/cities',
        { country: countryName },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (!res.data.error) {
        setCities(res.data.data);
      } else {
        setCities([]);
      }
    } catch (err) {
      console.error('Error fetching cities:', err);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        city: '' // reset city
      }));
      fetchCities(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
              disabled={loadingCountries}
            >
              {loadingCountries ? (
                <option value="">Loading countries...</option>
              ) : (
                <>
                  <option value="">Select Country</option>
                  {countries.map((item) => (
                    <option key={item.iso2} value={item.country}>
                      {item.country}
                    </option>
                  ))}
                </>
              )}
            </select>

          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!cities.length || loadingCities}
              className="w-full rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
            >
              {loadingCities ? (
                <option value="">Loading cities...</option>
              ) : (
                <>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </>
              )}
            </select>

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

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#EB227C] text-white px-8 py-4 rounded-full transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {loading ? 'Updating...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationForm;
