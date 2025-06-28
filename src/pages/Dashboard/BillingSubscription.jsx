import React from 'react';
import PlansList from './PlansList';
import { useSelector } from 'react-redux';
import Userdetails from '../../Components/Userdetails';

const BillingSubscription = () => {
  const user = useSelector(state => state?.currentUser?.currentUser);
  console.log("BillingSubscription user", user)
  const userName = user?.data?.user?.firstName + user?.data?.user?.lastName;
  return (
    <div className="">
      <div className=''>
        <Userdetails />
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
      </div>
      <div className=''>
        <h2 className='text-2xl font-Lato font-bold my-4'>Subscriptions</h2>
        <PlansList />
      </div>
    </div>
  );
};

export default BillingSubscription;
