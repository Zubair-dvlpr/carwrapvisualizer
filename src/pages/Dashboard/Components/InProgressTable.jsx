import React, { useState } from 'react';
import { FaCalendarAlt, FaRegCalendarAlt } from 'react-icons/fa';

const InProgressTable = () => {
    // Initial data with new columns: deliveryDate, time, cost
    const wrapsData = [
        {
            date: '2025-05-20',
            customer: 'John Doe',
            vehicle: 'Tesla Model 3',
            deliveryDate: '2025-06-20',
            time: '10:00 AM',
            cost: '$1500',
        },
        {
            date: '2025-05-19',
            customer: 'Jane Smith',
            vehicle: 'Ford Mustang',
            deliveryDate: '2025-06-19',
            time: '11:30 AM',
            cost: '$1200',
        },
        {
            date: '2025-05-18',
            customer: 'Alice Johnson',
            vehicle: 'BMW X5',
            deliveryDate: '2025-06-18',
            time: '02:45 PM',
            cost: '$1800',
        },
    ];

    // State for filters
    const [filterCustomer, setFilterCustomer] = useState('');
    const [filterVehicle, setFilterVehicle] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // Get unique values for selects (customers, vehicles, dates)
    const uniqueCustomers = [...new Set(wrapsData.map(w => w.customer))];
    const uniqueVehicles = [...new Set(wrapsData.map(w => w.vehicle))];
    const uniqueDates = [...new Set(wrapsData.map(w => w.date))];

    // Filtered data based on filters
    const filteredData = wrapsData.filter(wrap => {
        return (
            (filterCustomer === '' || wrap.customer === filterCustomer) &&
            (filterVehicle === '' || wrap.vehicle === filterVehicle) &&
            (filterDate === '' || wrap.date === filterDate)
        );
    });

    return (
        <div className="mt-5">
            {/* Heading */}
            <div className="mb-4">
                <h2 className="text-black flex items-center gap-2 font-Lato text-xl font-semibold leading-8">
                    <span className='bg-[#DCE4FF] p-2.5 rounded-full'><FaRegCalendarAlt /></span>
                    In Progress
                </h2>
            </div>

            {/* Filters */}
            <div className="mb-4 flex gap-4 flex-wrap">
                {/* Customer Filter */}
                <select
                    value={filterCustomer}
                    onChange={e => setFilterCustomer(e.target.value)}
                    className="bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-1"
                >
                    <option value="">All Customers</option>
                    {uniqueCustomers.map((customer, idx) => (
                        <option key={idx} value={customer}>
                            {customer}
                        </option>
                    ))}
                </select>

                {/* Vehicle Filter */}
                <select
                    value={filterVehicle}
                    onChange={e => setFilterVehicle(e.target.value)}
                    className="bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-1"
                >
                    <option value="">All Vehicles</option>
                    {uniqueVehicles.map((vehicle, idx) => (
                        <option key={idx} value={vehicle}>
                            {vehicle}
                        </option>
                    ))}
                </select>

                {/* Date Filter */}
                <select
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    className="border bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-3"
                >
                    <option className='bg-[#F6F9FF]' value="">All Dates</option>
                    {uniqueDates.map((date, idx) => (
                        <option className='bg-[#F6F9FF]' key={idx} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table with rounded corners */}
            <div className="overflow-x-auto rounded-lg shadow border border-[#E1E1E1]">
                <table className="min-w-full table-auto rounded-lg overflow-hidden">
                    <thead style={{ backgroundColor: '#EB227C' }} className="text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Vehicle</th>
                            <th className="px-4 py-3 text-left">Delivery Date</th>
                            <th className="px-4 py-3 text-left">Time</th>
                            <th className="px-4 py-3 text-left">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm  text-gray-700">
                        {filteredData.length > 0 ? (
                            filteredData.map((wrap, index) => (
                                <tr key={index} className="border-b border-[#E1E1E1] hover:bg-gray-50">
                                    <td className="px-4 py-3">{wrap.date}</td>
                                    <td className="px-4 py-3">{wrap.customer}</td>
                                    <td className="px-4 py-3">{wrap.vehicle}</td>
                                    <td className="px-4 py-3">{wrap.deliveryDate}</td>
                                    <td className="px-4 py-3">{wrap.time}</td>
                                    <td className="px-4 py-3">{wrap.cost}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InProgressTable;
