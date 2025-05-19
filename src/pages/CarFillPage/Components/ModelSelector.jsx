import React, { useEffect, useState } from 'react';

const ModelSelector = ({ selectedYear, selectedMake, onSelect }) => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedYear || !selectedMake) return;

        setLoading(true);
        fetch(`http://localhost/carApi/getModels.php?year=${selectedYear}&make=${encodeURIComponent(selectedMake)}`)
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


    
    if (!selectedYear || !selectedMake) return <select className='border p-2 w-full mt-1'>
        <option className='bg-[#090A1E]'>
           select year and make first
        </option>
    </select>;
    if (loading) return <select className='border p-2 w-full mt-1'>
       <option className='bg-[#090A1E]'> Loading models...</option>
        </select>;
    if (error) return <p>{error}</p>;

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="border p-2 w-full mt-1">
            <option className='bg-[#090A1E]' value="">Select Model</option>
            {models.map((model) => (
                <option className='bg-[#090A1E]' key={model.id} value={model.name}>{model.name}</option>
            ))}
        </select>
    );
};

export default ModelSelector;
