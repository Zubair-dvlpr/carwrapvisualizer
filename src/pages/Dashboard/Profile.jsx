import React, { useContext } from 'react';

import MyWrap from './Home/MyWraps';
import CreditsAndPlan from './Home/CreditsAndPlan';
import NewBooking from './Home/NewBooking';
import BookedAppointments from './Home/BookedAppointments';
import CustomCalendar from './Home/CustomCalendar';
import MembersList from './Home/MembersList';
import PersonalInformationForm from './Components/PersonalInformationForm';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { todayBookings } = useContext(AuthContext);
  return (
    <div className=" grid md:grid-cols-10 grid-cols-1 gap-10">
      <div className='md:col-span-6 col-span-full'>
        <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, Auto Labs</h3>
        <p className='text-[#858585] mt-2.5 text-[12px] max-w-[516px]'>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
        <CreditsAndPlan />
        <PersonalInformationForm />
      </div>
      <div className='md:col-span-4 col-span-full p-4 flex flex-col gap-4 bg-[#F5F5F7] rounded-4xl'>

        <BookedAppointments data={todayBookings} />
        <CustomCalendar full={true} />
        <MembersList />
      </div>
    </div>
  );
}

export default Profile
