import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getModelsAPIFn } from '../../../redux/features/Studio/studioFus';

const ModelSelector = ({ selectedYear, selectedMake, onSelect, value }) => {
    const dispatch = useDispatch();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedYear || !selectedMake) return;

        const fetchModels = async () => {
            setLoading(true);
            setError('');
            const response = await dispatch(getModelsAPIFn({ year: selectedYear, make: selectedMake }));

            if (response?.meta?.requestStatus === 'fulfilled') {
                const data = response.payload?.data?.models || [];
                setModels(data);
            } else {
                setError(response.payload || 'Failed to fetch models');
                setModels([]);
            }
            setLoading(false);
        };

        fetchModels();
    }, [selectedYear, selectedMake, dispatch]);

    if (!selectedYear || !selectedMake) {
        return (
            <select className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
                <option>Select Year and Make First</option>
            </select>
        );
    }

    if (loading) {
        return (
            <select className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
                <option>Loading models...</option>
            </select>
        );
    }

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <select
            value={value}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3"
        >
            <option value="">Select Model</option>
            {models.map((model) => (
                <option key={model.id} value={model.name}>
                    {model.name}
                </option>
            ))}
        </select>
    );
};

export default ModelSelector;
