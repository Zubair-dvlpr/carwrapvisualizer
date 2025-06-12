import React, { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { inProgressAPIFn } from '../../../redux/features/booking/bookingFus';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InProgressTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // State to hold fetched bookings
    const [wrapsData, setWrapsData] = useState([]);
    const [filterCustomer, setFilterCustomer] = useState('');
    const [filterVehicle, setFilterVehicle] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [loading, setLoading] = useState(true);

    const inProgressAppointmentfn = async () => {
        setLoading(true); // Show spinner
        try {
            const data = await dispatch(
                inProgressAPIFn({
                    status: 'inprogress',
                })
            );

            if (data?.meta?.requestStatus === 'fulfilled') {
                const formattedData = (data?.payload?.data || []).map((booking) => {
                    const totalCost =
                        Number(booking?.price || 0) +
                        Number(booking?.ppfCost || 0) +
                        Number(booking?.decalsCost || 0) +
                        Number(booking?.windowTintingCost || 0);

                    return {
                        date: new Date(booking.bookingDate).toISOString().split('T')[0],
                        customer: `${booking.firstName} ${booking.lastName}`,
                        vehicle: `${booking.make} ${booking.model}`,
                        deliveryDate: new Date(booking.completionDate).toISOString().split('T')[0],
                        time: new Date(booking.completionDate).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                        cost: `$${totalCost.toFixed(2)}`,
                        originalBooking: booking
                    };
                });

                setWrapsData(formattedData);
            } else {
                console.error('❌ API request failed:', data);
            }
        } catch (error) {
            console.error('⚠️ Unexpected error in inProgressAppointmentfn:', error);
        } finally {
            setLoading(false); // Hide spinner
        }
    };


    useEffect(() => {
        inProgressAppointmentfn();
    }, []);

    const uniqueCustomers = [...new Set(wrapsData.map(w => w.customer))];
    const uniqueVehicles = [...new Set(wrapsData.map(w => w.vehicle))];
    const uniqueDates = [...new Set(wrapsData.map(w => w.date))];

    const filteredData = wrapsData.filter(wrap => {
        return (
            (filterCustomer === '' || wrap.customer === filterCustomer) &&
            (filterVehicle === '' || wrap.vehicle === filterVehicle) &&
            (filterDate === '' || wrap.date === filterDate)
        );
    });

    return (
        <div className="mt-5">
            <div className="mb-4">
                <h2 className="text-black flex items-center gap-2 font-Lato text-xl font-semibold leading-8">
                    <span className='bg-[#DCE4FF] p-2.5 rounded-full'><FaRegCalendarAlt /></span>
                    In Progress
                </h2>
            </div>
            {/* Filters */}
            <div className="mb-4 flex flex-col sm:flex-row gap-4 flex-wrap">
                <select
                    value={filterCustomer}
                    onChange={e => setFilterCustomer(e.target.value)}
                    className="bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-1"
                >
                    <option value="">All Customers</option>
                    {uniqueCustomers.map((customer, idx) => (
                        <option key={idx} value={customer}>{customer}</option>
                    ))}
                </select>

                <select
                    value={filterVehicle}
                    onChange={e => setFilterVehicle(e.target.value)}
                    className="bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-1"
                >
                    <option value="">All Vehicles</option>
                    {uniqueVehicles.map((vehicle, idx) => (
                        <option key={idx} value={vehicle}>{vehicle}</option>
                    ))}
                </select>

                <select
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    className="border bg-[#F6F9FF] border-[#EEF4FF] focus:outline-0 rounded px-3 py-3"
                >
                    <option className='bg-[#F6F9FF]' value="">All Dates</option>
                    {uniqueDates.map((date, idx) => (
                        <option className='bg-[#F6F9FF]' key={idx} value={date}>{date}</option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#EB227C] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <div className="text-sm text-gray-500 mt-2">Loading In Progress Appointments</div>
                </div>
            ) : (
                // 👇 Only show table after loading finishes
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
                        <tbody className="text-sm text-gray-700">
                            {filteredData.length > 0 ? (
                                filteredData.map((wrap, index) => (
                                    <tr
                                        key={index}
                                        className="border-b cursor-pointer border-[#E1E1E1] hover:bg-gray-50"
                                        onClick={() =>
                                            navigate('/work-order', { state: { booking: wrap.originalBooking } })
                                        }
                                    >
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
            )}

        </div>
    );
};

export default InProgressTable;
