import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { stripeVerifySessionAPIFn } from '../../redux/features/stripe/stripeFns';
import {
  getPublicBookingAPIFn,
  updateBookingStatusAPIFn
} from '../../redux/features/booking/bookingFus';
import { Amination } from '../../Components/shared/Animation';

const ConfirmBooking = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(decodeURIComponent(location.search));
  const token = queryParams.get('token');

  // STATES
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateBookingStatus = async (status) => {
    try {
      setLoading(true);
      const data = await dispatch(
        updateBookingStatusAPIFn({
          bookingId: token,
          status: status,
        })
      );

      if (data?.meta?.requestStatus === 'fulfilled') {
        console.log('✔️ Booking confirmed:', data);
      } else {
        console.error('❌ Booking status update failed:', data);
      }
    } catch (error) {
      console.error('⚠️ Unexpected error in updateBookingStatus:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const data = await dispatch(
        getPublicBookingAPIFn({
          _id: token,
        })
      );

      if (data?.meta?.requestStatus === 'fulfilled') {
        setBookingData(data?.payload?.data);
        console.log('📦 Booking details fetched:', data);
      } else {
        console.error('❌ Failed to fetch booking details:', data);
      }
    } catch (error) {
      console.error('⚠️ Unexpected error in fetchBookingDetails:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) {
      fetchBookingDetails();
    }
  }, []);

  if (loading) {
    return <Amination />;
  }

  return (
    <div className='max-w-7xl mx-auto py-7'>
      <table className='w-full max-w-3xl mx-auto text-left text-white border border-white'>
        <thead>
          <tr className='bg-gray-800'>
            <th className='p-3 border border-white'>Field</th>
            <th className='p-3 border border-white'>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className='p-3 border border-white'>First Name</td><td className='p-3 border border-white'>{bookingData?.firstName}</td></tr>
          <tr><td className='p-3 border border-white'>Last Name</td><td className='p-3 border border-white'>{bookingData?.lastName}</td></tr>
          <tr><td className='p-3 border border-white'>Email</td><td className='p-3 border border-white'>{bookingData?.email}</td></tr>
          <tr><td className='p-3 border border-white'>Phone</td><td className='p-3 border border-white'>{bookingData?.phone}</td></tr>
          <tr><td className='p-3 border border-white'>Booking Date</td><td className='p-3 border border-white'>{new Date(bookingData?.bookingDate).toLocaleDateString()}</td></tr>
          <tr><td className='p-3 border border-white'>Completion Date</td><td className='p-3 border border-white'>{new Date(bookingData?.completionDate).toLocaleDateString()}</td></tr>
          <tr><td className='p-3 border border-white'>Year</td><td className='p-3 border border-white'>{bookingData?.year}</td></tr>
          <tr><td className='p-3 border border-white'>Make</td><td className='p-3 border border-white'>{bookingData?.make}</td></tr>
          <tr><td className='p-3 border border-white'>Model</td><td className='p-3 border border-white'>{bookingData?.model}</td></tr>
          <tr><td className='p-3 border border-white'>Brand</td><td className='p-3 border border-white'>{bookingData?.brand}</td></tr>
          <tr><td className='p-3 border border-white'>Wrap Color</td><td className='p-3 border border-white'>{bookingData?.wrapColor}</td></tr>
          <tr><td className='p-3 border border-white'>Price</td><td className='p-3 border border-white'>${bookingData?.price}</td></tr>
          <tr><td className='p-3 border border-white'>PPF Cost</td><td className='p-3 border border-white'>${bookingData?.ppfCost}</td></tr>
          <tr><td className='p-3 border border-white'>Decals Cost</td><td className='p-3 border border-white'>${bookingData?.decalsCost}</td></tr>
          <tr><td className='p-3 border border-white'>Window Tinting Cost</td><td className='p-3 border border-white'>${bookingData?.windowTintingCost}</td></tr>
          <tr><td className='p-3 border border-white'>Front Tint %</td><td className='p-3 border border-white'>{bookingData?.frontPercentage}%</td></tr>
          <tr><td className='p-3 border border-white'>Rear Tint %</td><td className='p-3 border border-white'>{bookingData?.rearPercentage}%</td></tr>
          <tr><td className='p-3 border border-white'>Additional Total</td><td className='p-3 border border-white'>${bookingData?.additionalTotal}</td></tr>
          <tr><td className='p-3 border border-white'>Customer Total</td><td className='p-3 border border-white'>${bookingData?.customerTotal}</td></tr>
          <tr><td className='p-3 border border-white'>Notes</td><td className='p-3 border border-white'>{bookingData?.notes}</td></tr>
          <tr><td className='p-3 border border-white'>VIP</td><td className='p-3 border border-white'>{bookingData?.vip}</td></tr>
          <tr><td className='p-3 border border-white'>Repeat Customer</td><td className='p-3 border border-white'>{bookingData?.repeatCustomer}</td></tr>
          <tr><td className='p-3 border border-white'>Dealership</td><td className='p-3 border border-white'>{bookingData?.dealership}</td></tr>
          <tr><td className='p-3 border border-white'>Is Quoted</td><td className='p-3 border border-white'>{bookingData?.isQuoted ? 'Yes' : 'No'}</td></tr>
          <tr><td className='p-3 border border-white'>Created At</td><td className='p-3 border border-white'>{new Date(bookingData?.createdAt).toLocaleString()}</td></tr>
          <tr><td className='p-3 border border-white'>Updated At</td><td className='p-3 border border-white'>{new Date(bookingData?.updatedAt).toLocaleString()}</td></tr>
        </tbody>
      </table>

      <div className='mt-6 max-w-3xl mx-auto flex justify-center  gap-8'>
        {bookingData?.status === 'accepted' || bookingData?.status === 'cancelled' ? (
          <p className='text-white text-lg'>Booking Already {bookingData?.status}</p>
        ) : (
          <>
            <button
              onClick={() => upateBookingStatus('accepted')}
              className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer'
            >
              Accept
            </button>
            <button
              onClick={() => upateBookingStatus('cancelled')}
              className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer'
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmBooking;
