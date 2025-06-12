import React, { useContext, useEffect, useState } from 'react';

import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
import NewBooking from './Home/NewBooking';
import BookedAppointments from './Home/BookedAppointments';
import CustomCalendar from './Home/CustomCalendar';
import MembersList from './Home/MembersList';
import PersonalInformationForm from './Components/PersonalInformationForm';
import { AuthContext } from '../../context/AuthContext';
import { canceledAppointmentAPIFn, todayAppointmentAPIFn, tomorrowAppointmentAPIFn } from '../../redux/features/booking/bookingFus';
import { useDispatch } from 'react-redux';
import { userInfoAPIFn } from '../../redux/features/auth/authFns';
import { stripeActiveSubscriptionsAPIFn, stripeFetchPlansAPIFn } from '../../redux/features/stripe/stripeFns';

const Profile = () => {
  // const { todayBookings } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [todayBookings, setTodayBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [activePlan, setActivePlan] = useState({});
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); // For spinner
  const todayAppointmentfn = async () => {
    setLoading(true); // Start spinner

    try {
      const data = await dispatch(
        todayAppointmentAPIFn({
          isToday: true,
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
      setLoading(false); // Stop spinner
    }
  };

  const fetchUserInfo = async () => {

    const data = await dispatch(userInfoAPIFn());

    if (data?.meta?.requestStatus === 'fulfilled') {
      setUserInfo(data?.payload?.data?.user);

      // console.log('canceled Appointment ', data);
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
    const fetchAllData = async () => {
      try {
        setLoading(true); // Start loading indicator

        const [userRes, planRes, subRes] = await Promise.all([
          dispatch(userInfoAPIFn()),
          dispatch(stripeFetchPlansAPIFn()),
          dispatch(stripeActiveSubscriptionsAPIFn()),
        ]);

        // User Info
        if (userRes?.meta?.requestStatus === 'fulfilled') {
          setUserInfo(userRes?.payload?.data?.user);
        } else {
          console.error('Failed to fetch user info:', userRes);
        }

        // Plans
        if (planRes?.meta?.requestStatus === 'fulfilled') {
          setPlans(planRes?.payload?.data?.plans || []);
        } else {
          console.error('Failed to fetch plans:', planRes);
        }

        // Active Subscription
        if (subRes?.meta?.requestStatus === 'fulfilled') {
          setActivePlan(subRes?.payload?.data);
        } else {
          console.error('Failed to fetch active subscription:', subRes);
        }

      } catch (error) {
        console.error('Unexpected error while fetching data:', error);
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    

    todayAppointmentfn();
    fetchAllData();
  }, []);


  return (
    <div className=" grid md:grid-cols-10 grid-cols-1 gap-10">
      <div className='md:col-span-6 col-span-full'>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, Auto Labs</h3>
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
        <CreditsAndPlan
          userInfo={userInfo}
          activePlan={activePlan}
          plans={plans}
          isLoading={loading}
        />
        <PersonalInformationForm userInfo={userInfo} />
      </div>
      <div className='md:col-span-4 col-span-full p-4 flex flex-col gap-4 bg-[#F5F5F7] rounded-4xl'>

        <BookedAppointments title='Booked Appointments' data={todayBookings} loading={loading} />
        <CustomCalendar full={true} />
        <MembersList />
      </div>
    </div>
  );
}

export default Profile
