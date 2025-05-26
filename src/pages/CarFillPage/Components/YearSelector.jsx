import React, { useEffect, useState } from 'react';

const YearSelector = ({ onSelect, value }) => {
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost/carApi/getYears.php')
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    setYears(result.data);
                } else {
                    setError('Failed to load years');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('API Error');
                setLoading(false);
            });
    }, []);

    if (loading) return <select className='w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3'>
        <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]'>
            Loading years...
        </option>
    </select>;
    if (error) return <p>{error}</p>;

    return (
        <select value={value}  onChange={(e) => onSelect(e.target.value)} className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
            <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' value="">Select Year</option>
            {years.map((year) => (
                <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' key={year} value={year}>{year}</option>
            ))}
        </select>
    );
};

export default YearSelector;
