import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define baseURL and version
const baseURL = 'http://13.51.196.87:8000';
const v = 'api/v1';
const getMakesURL = `${baseURL}/${v}/public/tool/get-makes`;

const MakeSelector = ({ selectedYear, onSelect, value, bgColor }) => {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedYear) return;

    const fetchMakes = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`${getMakesURL}?year=${selectedYear}`);
        setMakes(data?.data?.makes || []);
      } catch (err) {
        console.error('Error fetching makes:', err);
        setError('Failed to load makes');
        setMakes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, [selectedYear]);

  if (!selectedYear) {
    return (
      <select className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option>Select Year First</option>
      </select>
    );
  }

  if (loading) {
    return (
      <select className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option>Loading makes...</option>
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
      <option value="">Select Make</option>
      {makes.map((make, index) => (
        <option key={make?.id || index} value={make?.name || make}>
          {make?.name || make}
        </option>
      ))}
    </select>
  );
};

export default MakeSelector;
