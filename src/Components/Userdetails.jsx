import React from 'react'
import { useSelector } from 'react-redux';

const Userdetails = () => {
    const user = useSelector(state => state?.currentUser?.currentUser);
    // console.log("BillingSubscription user", user)
    const userName = user?.data?.user?.firstName + " "+  user?.data?.user?.lastName;
    return (
        <div>
            <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Hi, {userName}</h3>
        </div>
    )
}

export default Userdetails
