import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const ModelSelector = ({ selectedYear, selectedMake, onSelect, value }) => {
    const { domain } = useContext(AuthContext);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedYear || !selectedMake) return;

        setLoading(true);
        fetch(`${domain}/getModels.php?year=${selectedYear}&make=${encodeURIComponent(selectedMake)}`)
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    setModels(result.data);
                } else {
                    setError('Failed to load models');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('API Error');
                setLoading(false);
            });
    }, [selectedYear, selectedMake]);



    if (!selectedYear || !selectedMake) return <select className='w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3'>
        <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] capitalize'>
            Select Year and Make First
        </option>
    </select>;
    if (loading) return <select className='w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3'>
        <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]'> Loading models...</option>
    </select>;
    if (error) return <p>{error}</p>;

    return (
        <select value={value} onChange={(e) => onSelect(e.target.value)} className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
            <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' value="">Select Model</option>
            {models.map((model) => (
                <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' key={model.id} value={model.name}>{model.name}</option>
            ))}
        </select>
    );
};

export default ModelSelector;
