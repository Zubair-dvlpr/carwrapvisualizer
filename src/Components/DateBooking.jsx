import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { todayAppointmentAPIFn } from '../redux/features/booking/bookingFus';
import BookedAppointments from '../pages/Dashboard/Home/BookedAppointments';
import CustomCalendar from '../pages/Dashboard/Home/CustomCalendar';

const DateBooking = () => {
  const dispatch = useDispatch();
  const [dateloading, setDateloading] = useState(true); // For spinner
  const [todayBookings, setTodayBookings] = useState([]);
  const todayAppointmentfn = async () => {
    setDateloading(true); // Start spinner

    try {
      const data = await dispatch(
        todayAppointmentAPIFn({
          isToday: true
        })
      );

      if (data?.meta?.requestStatus === 'fulfilled') {
        setTodayBookings(data.payload.data); // Load bookings
      } else {
        console.log('❌ Failed:', data);
      }
    } catch (error) {
      console.error('⚠️ Error fetching today’s appointments:', error);
    } finally {
      setDateloading(false); // Stop spinner
    }
  };

  const handleDateSelect = async (selectedDate) => {
    console.log("handleDateSelect", selectedDate)
    setDateloading(true);
    try {
      const data = await dispatch(
        todayAppointmentAPIFn({
          bookingDate: selectedDate // <-- this replaces isToday
        })
      );

      if (data?.meta?.requestStatus === 'fulfilled') {
        setTodayBookings(data.payload.data);
      } else {
        console.log('❌ Failed to fetch appointments for:', selectedDate);
      }
    } catch (error) {
      console.error('⚠️ Error fetching appointments:', error);
    } finally {
      setDateloading(false);
    }
  };

  useEffect(() => {
    if (!todayBookings.length) {
      todayAppointmentfn();
    }
  }, []);
  return (
    <>
      <BookedAppointments data={todayBookings} title='Booked Appointments' loading={dateloading} />
      <CustomCalendar full={true} onDateSelect={handleDateSelect} />
    </>
  )
}

export default DateBooking
