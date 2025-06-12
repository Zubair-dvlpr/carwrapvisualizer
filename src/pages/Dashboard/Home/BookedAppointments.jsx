import React from 'react';
import { FaBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const BookedAppointments = ({ title, data = [],  loading = false  }) => {
  const navigate = useNavigate();
  const hasData = Array.isArray(data) && data.length > 0;

  const handleBookingClick = booking => {
    try {
      console.log('📦 Navigating with booking:', booking);
      navigate('/work-order', { state: { booking } });
    } catch (error) {
      console.error('⚠️ Error navigating to WorkOrder:', error);
    }
  };

  return (
    <div className='p-6 border border-[#E1E1E1] rounded-[20px] bg-white w-full'>
      {/* Header Row */}
      <div className='flex items-center space-x-4 mb-4'>
        <div className='text-pink-600 bg-[#DCE4FF] p-2 rounded-full'>
          <FaBell className='text-xl' />
        </div>
        <div>
          <h2 className='text-lg font-semibold text-black'>{title}</h2>
        </div>
      </div>

      {/* View All Row */}
      <div className='text-sm text-gray-600'>
        {loading ? (
          <div className='flex justify-center py-8'>
            <div className="w-6 h-6 border-4 border-pink-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : hasData ? (
          <div className='space-y-4'>
            {data.map((booking, index) => (
              <div
                key={index}
                onClick={() => handleBookingClick(booking)}
                className='p-3 cursor-pointer bg-[#F9FAFB] rounded-lg border border-gray-200'
              >
                <div className='font-semibold text-black'>
                  Name : {booking.firstName} {booking.lastName}
                </div>
                <div className='text-xs text-gray-500'>
                  {booking.year} {booking.make} {booking.model}
                </div>
                <div className='text-xs text-gray-500'>
                  <strong>Brand:</strong> {booking.brand}
                </div>
                <div className='text-xs text-gray-500'>
                  <strong>Wrap:</strong> {booking.wrapColor}
                </div>
                <div className='text-xs text-gray-500'>
                  <strong>Booking Date:</strong> {booking.bookingDate}
                </div>
                <div className='text-xs text-gray-500'>
                  <strong>Completion Date:</strong> {booking.completionDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex items-center space-x-2 mt-2'>
            <span className='h-2 w-2 rounded-full bg-[#9CD323] inline-block'></span>
            <span>No Booked Appointments</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookedAppointments;
