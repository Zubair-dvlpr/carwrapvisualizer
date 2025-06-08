import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { getYearsAPIFn } from '../../../redux/features/Studio/studioFus';

const YearSelector = ({ onSelect, value, bgColor }) => {
    const dispatch = useDispatch();
    // const { domain } = useContext(AuthContext);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const fetchYears = async () => {
        const data = await dispatch(
            getYearsAPIFn()
        );
        if (data?.meta?.requestStatus === 'fulfilled') {
            // console.log("API RAW Response:", data.payload.data.years);
            setYears(data.payload.data.years); // <-- is `data.payload.data` really an array?
            setLoading(false);
        }
        if (data?.meta?.requestStatus === 'rejected') {
            console.log("failer", data)
        }
    }

    useEffect(() => {
        fetchYears();
    }, [])

    if (loading) return <select className={`w-full ${bgColor ? ' bg-[#F6F9FF]' : 'bg-[#2B2C2C] text-white'}  focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
        <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]'>
            Loading years...
        </option>
    </select>;
    if (error) return <p>{error}</p>;

    return (
        <select value={value} onChange={(e) => onSelect(e.target.value)} className={`w-full  bg-[#F6F9FF]  focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3`}>
            <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' value="">Select Year</option>
            {Array.isArray(years) && years.map((year) => (
                <option className='bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF]' key={year} value={year}>{year}</option>
            ))}
        </select>
    );
};

export default YearSelector;
