import React, { useEffect, useState } from 'react';

const MakeSelector = ({ selectedYear, onSelect, value }) => {
    const [makes, setMakes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedYear) return;

        setLoading(true);
        fetch(`http://localhost/carApi/getMakes.php?year=${selectedYear}`)
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    setMakes(result.data);
                } else {
                    setError('Failed to load makes');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('API Error');
                setLoading(false);
            });
    }, [selectedYear]);

    if (!selectedYear) return <select className='w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3'>
        <option className=''>
            Select Year First
        </option>
    </select>;
    if (loading) return <select className='w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3'>
         <option className=''>Loading makes...</option>
         </select>;
    if (error) return <p>{error}</p>;

    return (
        <select value={value} onChange={(e) => onSelect(e.target.value)} className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
            <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' value="">Select Make</option>
            {makes.map((make) => (
                <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' key={make.id} value={make.name}>{make.name}</option>
            ))}
        </select>
    );
};

export default MakeSelector;
