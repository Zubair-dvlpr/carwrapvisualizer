import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
import MembersList from './Home/MembersList';
import { useContext, useEffect, useState } from 'react';
import {
  stripeActiveSubscriptionsAPIFn,
  stripeFetchPlansAPIFn,
  stripeVerifySessionAPIFn
} from '../../redux/features/stripe/stripeFns';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userInfoAPIFn } from '../../redux/features/auth/authFns';
import InProgressTable from './Components/InProgressTable';
import { AuthContext } from '../../context/AuthContext';
import { updateUser } from '../../redux/features/auth/authSlice';
import Userdetails from '../../Components/Userdetails';
import DateBooking from '../../Components/DateBooking';

const Overview = () => {
  const dispatch = useDispatch();
  // const { setAddon } = useContext(AuthContext);
  const [params, setParams] = useSearchParams();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [subscribedPlanData, setSubscribedPlanData] = useState(null);

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
      const planDetails = data?.payload?.data?.data; // { name, price, credits }
      setSubscribedPlanData(planDetails);
      setShowSuccessPopup(true); // Show the popup
      console.log('sucess active plan', data);
      const info = await dispatch(userInfoAPIFn());
      if (info?.meta?.requestStatus === 'fulfilled') {
        await dispatch(
          updateUser({
            accountType: info?.payload?.data?.user?.accountType,
            addon: info?.payload?.data?.user?.addonInfo
          })
        );
      }
      setParams({});
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
          dispatch(stripeActiveSubscriptionsAPIFn())
        ]);

        if (userRes?.meta?.requestStatus === 'fulfilled') {
          // console.log('userRes', userRes);
          setUserInfo(userRes?.payload?.data?.user);
          // setAddon(userRes?.payload?.data?.user.accountType);
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
    fetchAllData();
  }, []);

  return (
    <>
      {showSuccessPopup && subscribedPlanData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-[#000000d8] backdrop-blur-sm">
          <div className="bg-[#0b0f1a] text-white p-6 md:p-10 rounded-2xl max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold  mb-4">✅ Welcome to Car Wrap Visualizer™</h2>
            <p className=" mb-4">
              You’ve successfully subscribed to the <strong>{subscribedPlanData.name}</strong> plan at

              <strong> ${subscribedPlanData.price}</strong>/month.

            </p>
            {/* <p className=" mb-4">
              🎉 You now have <strong>{subscribedPlanData.credits}</strong> wrap credits to start generating stunning visuals for your customers.
            </p> */}
            <div className="text-left text-sm mb-4">
              <p>🚀 What you can do now:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Generate hyper-realistic vehicle wrap renders</li>
                <li>Send branded quotes instantly</li>
                <li>Manage leads, customers, and wrap history in one place</li>
              </ul>
              {/* <p className="mt-2">
                💼 Add CRM anytime for <strong>$49.99/month</strong> — includes follow-up automation, marketing tools, and warranty tracking.
              </p> */}
            </div>
            <p className="text-sm  mb-6">Need help? Contact our support team anytime.</p>
            <div className='flex justify-center'>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer px-6 py-2 rounded-full transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='grid md:grid-cols-10 grid-cols-1 gap-10'>
        <div className='md:col-span-6 col-span-full'>
          <Userdetails />
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
          <DateBooking /> 
          {!userInfo.parentId && <MembersList />}
        </div>
      </div>
    </>
  );
};

export default Overview;
