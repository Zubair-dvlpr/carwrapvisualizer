import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
import NewBooking from './Home/NewBooking';
import BookedAppointments from './Home/BookedAppointments';
import CustomCalendar from './Home/CustomCalendar';
import MembersList from './Home/MembersList';
import { useEffect, useState } from 'react';
import {
  stripeActiveSubscriptionsAPIFn,
  stripeFetchPlansAPIFn,
  stripeVerifySessionAPIFn
} from '../../redux/features/stripe/stripeFns';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  canceledAppointmentAPIFn,
  todayAppointmentAPIFn,
  tomorrowAppointmentAPIFn
} from '../../redux/features/booking/bookingFus';
import { userInfoAPIFn } from '../../redux/features/auth/authFns';

const Overview = () => {
  const dispatch = useDispatch();
  const [todayBookings, setTodayBookings] = useState([]);
  const [params, setParams] = useSearchParams();
  const sessionId = params.get('session_id');

  // STATES
  const [userInfo, setUserInfo] = useState({});
  const [activePlan, setActivePlan] = useState({});
  const [plans, setPlans] = useState([]);

  const verifySession = async () => {
    const data = await dispatch(
      stripeVerifySessionAPIFn({
        sessionId: sessionId
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log('sucess active plan', data);
      setParams({});
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

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
      console.log('failer', data);
    }
  };

  const tomorrowAppointmentfn = async () => {
    const data = await dispatch(
      tomorrowAppointmentAPIFn({
        isTomorrow: true
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log('tomorrow Appointment', data);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

  const canceledAppointmentfn = async () => {
    const data = await dispatch(
      canceledAppointmentAPIFn({
        status: 'cancelled'
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      // setPlans(data)
      console.log('canceled Appointment ', data);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

  const fetchUserInfo = async () => {
    const data = await dispatch(userInfoAPIFn());

    if (data?.meta?.requestStatus === 'fulfilled') {
      setUserInfo(data?.payload?.data?.user);
      console.log('canceled Appointment ', data);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

  const fetchActiveSubscription = async () => {
    const data = await dispatch(stripeActiveSubscriptionsAPIFn());
    if (data?.meta?.requestStatus === 'fulfilled') {
      console.log('Active subscription:', data);
      setActivePlan(data?.payload?.data);
      // You can handle active subscription data here if needed
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

  const fetchPlans = async () => {
    const data = await dispatch(stripeFetchPlansAPIFn());
    if (data?.meta?.requestStatus === 'fulfilled') {
      setPlans(data.payload?.data?.plans || []);
    }
    if (data?.meta?.requestStatus === 'rejected') {
      console.log('failer', data);
    }
  };

  useEffect(() => {
    if (sessionId) {
      verifySession();
    }
    todayAppointmentfn();
    fetchUserInfo();
    fetchActiveSubscription();
    fetchPlans();
  }, []);

  console.log('userImfoo', userInfo);
  console.log('activePlan', activePlan);

  return (
    <div className=' grid md:grid-cols-10 grid-cols-1 gap-10'>
      <div className=' md:col-span-6 col-span-full'>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, Auto Labs</h3>
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>
          Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview,
          and approve wraps with precision.
        </p>
        <CreditsAndPlan userInfo={userInfo} activePlan={activePlan} plans={plans} />
        <MyWrap />
        <NewBooking />
      </div>
      <div className='md:col-span-4 col-span-full flex flex-col gap-4 p-4 bg-[#F5F5F7] rounded-4xl'>
        <BookedAppointments data={todayBookings} title='Booked Appointments' />
        <CustomCalendar full={true} />
        <MembersList />
      </div>
    </div>
  );
};

export default Overview;
