import React, { useContext } from 'react'
import NewBooking from './Home/NewBooking'
import BookedAppointments from './Home/BookedAppointments'
import CustomCalendar from './Home/CustomCalendar'
import MembersList from './Home/MembersList'
import { Link, useNavigate } from 'react-router-dom'
import InProgressTable from './Components/InProgressTable'
import { AuthContext } from '../../context/AuthContext'

const Appointment = () => {
    const { todayBookings, tomorrowBookings, cancelledBookings } = useContext(AuthContext);
    // console.log(cancelledBookings);
    return (
        <div className="grid md:grid-cols-10 grid-cols-1 gap-10">
            <div className='md:col-span-6 col-span-full'>
                <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Car Wrap Visualizer™</h3>
                <p className='text-[#858585] mt-2.5 text-[12px] '>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
                <div className='flex mt-4  sm:flex-row flex-col items-start justify-start gap-7'>
                    <CustomCalendar full={false} />

                    <Link
                        to="/BookingAppointment"
                        className="bg-[#EB227C] text-white px-8 py-3 rounded-full hover:scale-105 transition"
                    >
                        Book Now
                    </Link>
                </div>
                <InProgressTable />
            </div>
            <div className='md:col-span-4 col-span-full p-4 flex flex-col gap-4 bg-[#F5F5F7] rounded-4xl'>
                <BookedAppointments data={todayBookings} title="Booked Appointments" />
                <BookedAppointments data={tomorrowBookings} title="Tomorrow Appointments" />
                <BookedAppointments data={cancelledBookings} title="Canceled Appointments" />
            </div>
        </div>
    )
}

export default Appointment
