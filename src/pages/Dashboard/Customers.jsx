import React, { useState } from 'react';

const Customers = () => {
  const [search, setSearch] = useState('');

  const customers = [
    {
      date: '2025-05-01',
      customer: 'John Doe',
      vehicle: 'Tesla Model 3',
      color: 'Matte Black',
      phone: '123-456-7890',
      email: 'john@example.com',
      serviceDate: '2025-05-05',
      warranty: '2 Years',
      type: 'Full Wrap',
      invoice: '#INV001',
    },
    {
      date: '2025-05-02',
      customer: 'Jane Smith',
      vehicle: 'Ford Mustang',
      color: 'Gloss Red',
      phone: '987-654-3210',
      email: 'jane@example.com',
      serviceDate: '2025-05-06',
      warranty: '1 Year',
      type: 'Partial Wrap',
      invoice: '#INV002',
    },
    {
      date: '2025-05-03',
      customer: 'Mike Johnson',
      vehicle: 'Chevy Camaro',
      color: 'Chrome Silver',
      phone: '555-123-4567',
      email: 'mike@example.com',
      serviceDate: '2025-05-07',
      warranty: '3 Years',
      type: 'Full Wrap',
      invoice: '#INV003',
    },
    {
      date: '2025-05-04',
      customer: 'Emily Davis',
      vehicle: 'BMW X5',
      color: 'Matte Blue',
      phone: '222-333-4444',
      email: 'emily@example.com',
      serviceDate: '2025-05-08',
      warranty: '2 Years',
      type: 'Roof Wrap',
      invoice: '#INV004',
    },
    {
      date: '2025-05-05',
      customer: 'Chris Brown',
      vehicle: 'Audi A4',
      color: 'Gloss White',
      phone: '444-555-6666',
      email: 'chris@example.com',
      serviceDate: '2025-05-09',
      warranty: '1 Year',
      type: 'Stripe Wrap',
      invoice: '#INV005',
    },
    {
      date: '2025-05-06',
      customer: 'Sara Lee',
      vehicle: 'Mercedes C-Class',
      color: 'Carbon Fiber',
      phone: '111-222-3333',
      email: 'sara@example.com',
      serviceDate: '2025-05-10',
      warranty: '3 Years',
      type: 'Interior Wrap',
      invoice: '#INV006',
    },
    {
      date: '2025-05-07',
      customer: 'Tom Hardy',
      vehicle: 'Nissan GTR',
      color: 'Gloss Green',
      phone: '777-888-9999',
      email: 'tom@example.com',
      serviceDate: '2025-05-11',
      warranty: '1 Year',
      type: 'Full Wrap',
      invoice: '#INV007',
    },
    {
      date: '2025-05-08',
      customer: 'Lucy Hale',
      vehicle: 'Mazda CX-5',
      color: 'Satin Purple',
      phone: '666-777-8888',
      email: 'lucy@example.com',
      serviceDate: '2025-05-12',
      warranty: '2 Years',
      type: 'Hood Wrap',
      invoice: '#INV008',
    },
    {
      date: '2025-05-09',
      customer: 'Jason Lee',
      vehicle: 'Hyundai Sonata',
      color: 'Gloss Orange',
      phone: '333-444-5555',
      email: 'jason@example.com',
      serviceDate: '2025-05-13',
      warranty: '2 Years',
      type: 'Roof Wrap',
      invoice: '#INV009',
    },
    {
      date: '2025-05-10',
      customer: 'Olivia Moore',
      vehicle: 'Kia Sportage',
      color: 'Chrome Gold',
      phone: '123-123-1234',
      email: 'olivia@example.com',
      serviceDate: '2025-05-14',
      warranty: '1 Year',
      type: 'Stripe Wrap',
      invoice: '#INV010',
    },
    {
      date: '2025-05-11',
      customer: 'Derek White',
      vehicle: 'Honda Accord',
      color: 'Matte Grey',
      phone: '321-321-4321',
      email: 'derek@example.com',
      serviceDate: '2025-05-15',
      warranty: '3 Years',
      type: 'Interior Wrap',
      invoice: '#INV011',
    },
  ];

  return (
    <div className="">
      {/* Top Section: Heading + Search */}
      <h2 className='font-Lato text-2xl font-semibold leading-9'>Car Wrap Visualizer™</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <div>
          <h2 className="font-Lato text-2xl font-semibold leading-9">Customers</h2>
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
              <th className="px-4 py-2 text-left">Wrap Color</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Service Date</th>
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
