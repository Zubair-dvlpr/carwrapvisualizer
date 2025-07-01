import React, { useContext, useEffect, useState } from 'react';

import CreditsAndPlan from './Home/CreditsAndPlan';
import MembersList from './Home/MembersList';
import PersonalInformationForm from './Components/PersonalInformationForm';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { userInfoAPIFn } from '../../redux/features/auth/authFns';
import { stripeActiveSubscriptionsAPIFn, stripeFetchPlansAPIFn } from '../../redux/features/stripe/stripeFns';
import Userdetails from '../../Components/Userdetails';
import DateBooking from '../../Components/DateBooking';

const Profile = () => {
  // const { todayBookings } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [activePlan, setActivePlan] = useState({});
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); // For spinner

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
    fetchAllData();
  }, []);


  return (
    <div className=" grid md:grid-cols-10 grid-cols-1 gap-10">
      <div className='md:col-span-6 col-span-full'>
        <Userdetails />
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
        <DateBooking />
        <MembersList />
      </div>
    </div>
  );
}

export default Profile
