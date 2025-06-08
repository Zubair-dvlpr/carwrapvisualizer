import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMakesAPIFn } from '../../../redux/features/Studio/studioFus';

const MakeSelector = ({ selectedYear, onSelect, value, bgColor }) => {
    const dispatch = useDispatch();
    const [makes, setMakes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedYear) return;

        const fetchMakes = async () => {
            setLoading(true);
            setError('');
            const response = await dispatch(getMakesAPIFn(selectedYear));
            if (response?.meta?.requestStatus === 'fulfilled') {
                const data = response.payload?.data || response.payload;
                // console.log(data.makes)
                setMakes(data.makes);
            } else {
                setError(response.payload || 'Failed to fetch makes');
                setMakes([]);
            }
            setLoading(false);
        };

        fetchMakes();
    }, [selectedYear, dispatch]);

    if (!selectedYear) {
        return (
            <select className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
                <option>Select Year First</option>
            </select>
        );
    }

    if (loading) {
        return (
            <select className="w-full bg-[#F6F9FF] focus:outline-0 focus:border focus:border-[#EEF4FF] rounded-md p-3">
                <option>Loading makes...</option>
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
