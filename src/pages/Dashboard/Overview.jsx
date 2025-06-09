
import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
import NewBooking from './Home/NewBooking';
import BookedAppointments from './Home/BookedAppointments';
import CustomCalendar from './Home/CustomCalendar';
import MembersList from './Home/MembersList';
import { useEffect, useState } from 'react';
import { stripeVerifySessionAPIFn } from '../../redux/features/stripe/stripeFns';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { canceledAppointmentAPIFn, todayAppointmentAPIFn, tomorrowAppointmentAPIFn } from '../../redux/features/booking/bookingFus';


const Overview = () => {
  const dispatch = useDispatch();
  const [todayBookings, setTodayBookings] = useState([]);
  const [params, setParams] = useSearchParams();
  const sessionId = params.get('session_id');
  console.log(sessionId)
  const verifySession = async () => {
    const data = await dispatch(
      stripeVerifySessionAPIFn({
        sessionId: sessionId
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log("sucess active plan", data)
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log("failer", data)
    }
  }


  const todayAppointmentfn = async () => {
    const data = await dispatch(
      todayAppointmentAPIFn({
        isToday: true
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      setTodayBookings(data.payload.data); // Correct
      // console.log("today Appointment", todayBookings)
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log("failer", data)
    }
  }

  const tomorrowAppointmentfn = async () => {
    const data = await dispatch(
      tomorrowAppointmentAPIFn({
        isTomorrow: true
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log("tomorrow Appointment", data)
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log("failer", data)
    }
  }

  const canceledAppointmentfn = async () => {
    const data = await dispatch(
      canceledAppointmentAPIFn({
        status: "cancelled"
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log("canceled Appointment ", data)
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log("failer", data)
    }
  }

  useEffect(() => {
    if (sessionId) {
      verifySession()
    }
    todayAppointmentfn();
    tomorrowAppointmentfn();
    canceledAppointmentfn();
  }, [])

  


  return (
    <div className=" grid md:grid-cols-10 grid-cols-1 gap-10">
      <div className=' md:col-span-6 col-span-full'>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, Auto Labs</h3>
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
        <CreditsAndPlan />
        <MyWrap />
        <NewBooking />
      </div>
      <div className='md:col-span-4 col-span-full flex flex-col gap-4 p-4 bg-[#F5F5F7] rounded-4xl'>
        <BookedAppointments data={todayBookings} title="Booked Appointments" />
        <CustomCalendar full={true} />
        <MembersList />
      </div>
    </div>
  );
};

export default Overview;
