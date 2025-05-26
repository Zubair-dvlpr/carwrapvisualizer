import React from 'react';

const wrapsData = [
  {
    date: '2025-05-20',
    name: 'John Doe',
    vehicle: 'Tesla Model 3',
    phone: '123-456-7890',
    color: 'Red',
    checkIn: '10:00 AM',
  },
  {
    date: '2025-05-19',
    name: 'Jane Smith',
    vehicle: 'Ford Mustang',
    phone: '987-654-3210',
    color: 'Blue',
    checkIn: '11:30 AM',
  },
  {
    date: '2025-05-18',
    name: 'Alice Johnson',
    vehicle: 'BMW X5',
    phone: '555-123-4567',
    color: 'Black',
    checkIn: '02:45 PM',
  },
];

const NewBooking = () => {
  return (
    <div className="mt-5">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-black font-Lato text-xl font-semibold leading-8">My Wraps</h2>
        <span className="text-gray-500 text-sm">Generate New Wrap</span>
      </div>

      {/* Table with rounded corners */}
      <div className="overflow-x-auto rounded-lg shadow border border-[#E1E1E1]">
        <table className="min-w-full table-auto rounded-lg overflow-hidden">
          <thead style={{ backgroundColor: '#EB227C' }} className="text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Check-in</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-[#F5F5F7] text-gray-700">
            {wrapsData.map((wrap, index) => (
              <tr key={index} className="border-b border-[#E1E1E1] hover:bg-gray-50">
                <td className="px-4 py-2">{wrap.date}</td>
                <td className="px-4 py-2">{wrap.name}</td>
                <td className="px-4 py-2">{wrap.vehicle}</td>
                <td className="px-4 py-2">{wrap.phone}</td>
                <td className="px-4 py-2">{wrap.color}</td>
                <td className="px-4 py-2">{wrap.checkIn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewBooking;
