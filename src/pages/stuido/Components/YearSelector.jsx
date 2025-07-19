import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define new baseURL and version
const baseURL = 'https://carwrapvisualizer-backend-52873ccc984d.herokuapp.com';
const v = 'api/v1';
const getYearsURL = `${baseURL}/${v}/public/tool/get-years`;

const YearSelector = ({ onSelect, value, bgColor }) => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchYears = async () => {
    try {
      const { data } = await axios.get(getYearsURL);
      setYears(data?.data?.years || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching years:', err);
      setError('Failed to load years');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  if (loading) {
    return (
      <select className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option>Loading years...</option>
      </select>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <select
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}
    >
      <option value="">Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
