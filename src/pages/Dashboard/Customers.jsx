import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { completedAppointmentAPIFn } from '../../redux/features/booking/bookingFus';

const Customers = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);



  const fetchCompletedAppointment = async () => {
    try {
      const data = await dispatch(
        completedAppointmentAPIFn({ status: "completed" })
      );

      if (data?.meta?.requestStatus === "fulfilled") {
        const appointments = data.payload?.data || [];
        const formatted = appointments.map(item => ({
          date: new Date(item.createdAt).toLocaleDateString(),
          customer: `${item.firstName} ${item.lastName}`,
          vehicle: `${item.make} ${item.model}`,
          color: item.wrapColor || "-",
          phone: item.phone,
          email: item.email,
          serviceDate: new Date(item.completionDate).toLocaleDateString(),
          warranty: "-", // Update if warranty logic exists
          type: item.isQuoted ? "Quoted" : "Booked",
          invoice: item._id?.slice(-6).toUpperCase(), // Last 6 of ID as invoice #
        }));
        setCustomers(formatted);
      } else {
        console.error("Failed to fetch appointments", data);
      }
    } catch (error) {
      console.error("Error fetching completed appointments:", error);
    }
  };

  useEffect(() => {
    fetchCompletedAppointment();
  }, [])
  
  return (
    <div className="">
      {/* Top Section: Heading + Search */}
      <h2 className='font-Lato text-2xl font-semibold leading-9'>Car Wrap Visualizer™</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <div>
          <h2 className="font-Lato text-3xl font-bold leading-9">Customers</h2>
          <p className="text-gray-600 mt-1">Client will receive a text message and email confirming the appointment </p>
        </div>
        <input
          type="text"
          placeholder="Search customers..."
          className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB227C]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg shadow border border-[#E1E1E1]">
        <table className="min-w-full table-auto rounded-lg overflow-hidden">
          <thead style={{ backgroundColor: '#EB227C' }} className="text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left  min-w-[150px]">Wrap Color</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left  min-w-[150px]">Service Date</th>
              <th className="px-4 py-2 text-left">Warranty</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Invoice</th>
            </tr>
          </thead>
          <tbody className="text-sm  text-gray-700">
            {customers
              .filter((c) =>
                Object.values(c).some((value) =>
                  value.toLowerCase().includes(search.toLowerCase())
                )
              )
              .map((c, index) => (
                <tr key={index} className="border-b border-[#E1E1E1] hover:bg-gray-50">
                  <td className="px-4 py-4">{c.date}</td>
                  <td className="px-4 py-4">{c.customer}</td>
                  <td className="px-4 py-4">{c.vehicle}</td>
                  <td className="px-4 py-4">{c.color}</td>
                  <td className="px-4 py-4">{c.phone}</td>
                  <td className="px-4 py-4">{c.email}</td>
                  <td className="px-4 py-4">{c.serviceDate}</td>
                  <td className="px-4 py-4">{c.warranty}</td>
                  <td className="px-4 py-4">{c.type}</td>
                  <td className="px-4 py-4">{c.invoice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
