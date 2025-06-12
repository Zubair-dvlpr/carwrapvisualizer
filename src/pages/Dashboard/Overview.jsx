import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
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
import InProgressTable from './Components/InProgressTable';

const Overview = () => {
  const dispatch = useDispatch();
  const [todayBookings, setTodayBookings] = useState([]);
  const [params, setParams] = useSearchParams();
  const sessionId = params.get('session_id');
  const [loading, setLoading] = useState(true); // For spinner
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
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [userRes, planRes, subRes] = await Promise.all([
          dispatch(userInfoAPIFn()),
          dispatch(stripeFetchPlansAPIFn()),
          dispatch(stripeActiveSubscriptionsAPIFn()),
        ]);

        if (userRes?.meta?.requestStatus === 'fulfilled') {
          setUserInfo(userRes?.payload?.data?.user);
        } else {
          console.error('User info fetch failed:', userRes);
        }

        if (planRes?.meta?.requestStatus === 'fulfilled') {
          setPlans(planRes.payload?.data?.plans || []);
        } else {
          console.error('Plans fetch failed:', planRes);
        }

        if (subRes?.meta?.requestStatus === 'fulfilled') {
          setActivePlan(subRes?.payload?.data);
        } else {
          console.error('Subscription fetch failed:', subRes);
        }
      } catch (error) {
        // This catches any unexpected error (e.g., thrown by dispatch or JS runtime errors)
        console.error('An error occurred while fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifySession();
    }

    todayAppointmentfn();
    fetchAllData();
  }, []);





  return (
    <div className='grid md:grid-cols-10 grid-cols-1 gap-10'>
      <div className='md:col-span-6 col-span-full'>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C] capitalize'>Hi, {userInfo?.firstName} {userInfo?.lastName}</h3>
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>
          Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview,
          and approve wraps with precision.
        </p>
        <CreditsAndPlan
          userInfo={userInfo}
          activePlan={activePlan}
          plans={plans}
          isLoading={loading}
        />
        <MyWrap />
        <InProgressTable />
      </div>
      <div className='md:col-span-4 col-span-full flex flex-col gap-4 p-4 bg-[#F5F5F7] rounded-4xl'>
        <BookedAppointments data={todayBookings} title='Booked Appointments' loading={loading} />
        <CustomCalendar full={true} />
        <MembersList />
      </div>
    </div>
  );
};

export default Overview;
