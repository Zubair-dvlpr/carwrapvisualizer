import React, { useEffect, useState } from 'react';

const MakeSelector = ({ selectedYear, onSelect }) => {
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

    if (!selectedYear) return <select className='border p-2 w-full mt-1'>
        <option className='bg-[#090A1E]'>
            Select Year First
        </option>
    </select>;
    if (loading) return <select className='border p-2 w-full mt-1'>
         <option className='bg-[#090A1E]'>Loading makes...</option>
         </select>;
    if (error) return <p>{error}</p>;

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="border p-2 w-full mt-1">
            <option className='bg-[#090A1E]' value="">Select Make</option>
            {makes.map((make) => (
                <option className='bg-[#090A1E]' key={make.id} value={make.name}>{make.name}</option>
            ))}
        </select>
    );
};

export default MakeSelector;
