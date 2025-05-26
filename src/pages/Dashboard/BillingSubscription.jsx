import React from 'react';
import PlansList from './PlansList';

const BillingSubscription = () => {


  return (
    <div className="">
      <div className=''>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, Auto Labs</h3>
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
