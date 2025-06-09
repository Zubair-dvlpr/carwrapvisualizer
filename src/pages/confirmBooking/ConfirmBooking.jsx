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

  const upateBookingStatus = async status => {
    setLoading(true);
    const data = await dispatch(
      updateBookingStatusAPIFn({
        bookingId: token,
        status: status
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      setLoading(false);
      console.log('sucess active plan', data);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
      setLoading(false);
    }
  };

  const fetchBookingDetails = async () => {
    setLoading(true);
    const data = await dispatch(
      getPublicBookingAPIFn({
        _id: token
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      setBookingData(data?.payload?.data);
      setLoading(false);
      console.log('sucess active plan', data);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      setLoading(false);
      console.log('failer', data);
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
    <div className='p-6'>
      <table className='w-full text-left text-white border border-white'>
        <thead>
          <tr className='bg-gray-800'>
            <th className='p-3 border border-white'>Field</th>
            <th className='p-3 border border-white'>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-3 border border-white'>First Name</td>
            <td className='p-3 border border-white'>{bookingData?.firstName}</td>
          </tr>
          <tr>
            <td className='p-3 border border-white'>Last Name</td>
            <td className='p-3 border border-white'>{bookingData?.lastName}</td>
          </tr>
          <tr>
            <td className='p-3 border border-white'>Email</td>
            <td className='p-3 border border-white'>{bookingData?.email}</td>
          </tr>
          <tr>
            <td className='p-3 border border-white'>Credits</td>
            <td className='p-3 border border-white'>{bookingData?.credits}</td>
          </tr>
          <tr>
            <td className='p-3 border border-white'>Login Count</td>
            <td className='p-3 border border-white'>{bookingData?.loginCount}</td>
          </tr>
          <tr>
            <td className='p-3 border border-white'>Last Login</td>
            <td className='p-3 border border-white'>
              {new Date(bookingData?.lastLogin).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='mt-6 flex gap-4'>
        {bookingData?.status === 'pending' ? (
          <p className='text-white text-lg'>Booking Already Acepted</p>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ConfirmBooking;
