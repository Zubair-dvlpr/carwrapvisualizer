import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Public API base
const baseURL = 'https://carwrapvisualizer-backend-52873ccc984d.herokuapp.com';
const v = 'api/v1';
const getModelsURL = `${baseURL}/${v}/public/tool/get-models`;

const ModelSelector = ({ selectedYear, selectedMake, onSelect, value, bgColor }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedYear || !selectedMake) return;

    const fetchModels = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`${getModelsURL}?year=${selectedYear}&make=${encodeURIComponent(selectedMake)}`);
        setModels(data?.data?.models || []);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load models');
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedYear, selectedMake]);

  if (!selectedYear || !selectedMake) {
    return (
      <select className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option>Select Year and Make First</option>
      </select>
    );
  }

  if (loading) {
    return (
      <select className={`w-full ${bgColor ? 'bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'} focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option>Loading models...</option>
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
      <option value="">Select Model</option>
      {models.map((model, index) => (
        <option key={model?.id || index} value={model?.name || model}>
          {model?.name || model}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;
