import React, { useEffect, useState } from 'react';

const YearSelector = ({ onSelect }) => {
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

    if (loading) return <select className='border p-2 w-full mt-1'>
        <option>
            Loading years...
        </option>
    </select>;
    if (error) return <p>{error}</p>;

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="border p-2 w-full mt-1">
            <option value="">Select Year</option>
            {years.map((year) => (
                <option className='bg-[#090A1E]' key={year} value={year}>{year}</option>
            ))}
        </select>
    );
};

export default YearSelector;
