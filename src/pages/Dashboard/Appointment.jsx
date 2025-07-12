import React, { useContext, useEffect, useState } from 'react'
import BookedAppointments from './Home/BookedAppointments'
import CustomCalendar from './Home/CustomCalendar'
import { Link } from 'react-router-dom'
import InProgressTable from './Components/InProgressTable'
import { useDispatch, useSelector } from 'react-redux'
import { canceledAppointmentAPIFn, todayAppointmentAPIFn, tomorrowAppointmentAPIFn } from '../../redux/features/booking/bookingFus'
import TrialExpiredPopup from './Components/TrialExpiredPopup'

const Appointment = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.currentUser?.currentUser);
    const [showTrialPopup, setShowTrialPopup] = useState(false);

    const [todayBookings, setTodayBookings] = useState([]);
    const [tomorrowBookings, setTomorrowBookings] = useState([]);
    const [canceledBookings, setCanceledBookings] = useState([]);
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

    const tomorrowAppointmentfn = async () => {
        try {
            const data = await dispatch(tomorrowAppointmentAPIFn({ isTomorrow: true }));
            if (data?.meta?.requestStatus === 'fulfilled') {
                setTomorrowBookings(data.payload.data);
                // console.log("✅ Tomorrow's Appointments:", data.payload.data);
            } else {
                console.error("❌ Failed to fetch tomorrow's appointments:", data);
                // alert('Failed to fetch tomorrow’s appointments.');
            }
        } catch (error) {
            console.error("🔥 Error in tomorrowAppointmentfn:", error);
        }
    };

    const canceledAppointmentfn = async () => {
        try {
            const data = await dispatch(canceledAppointmentAPIFn({ status: "cancelled" }));
            if (data?.meta?.requestStatus === 'fulfilled') {
                setCanceledBookings(data.payload.data);
                console.log("✅ Canceled Appointments:", data.payload.data);
            } else {
                console.error("❌ Failed to fetch canceled appointments:", data);
                // alert('Failed to fetch canceled appointments.');
            }
        } catch (error) {
            console.error("🔥 Error in canceledAppointmentfn:", error);
        }
    };

    useEffect(() => {

        const trialExpired =
            user?.data?.user?.accountType === 'addon_access_trials' &&
            user?.data?.user?.isTrialPeriodExpired === true;

        if (trialExpired) {
            setShowTrialPopup(true);
        }

        todayAppointmentfn();
        tomorrowAppointmentfn();
        canceledAppointmentfn();
    }, []);

    const handleDateSelect = async (selectedDate) => {
        console.log("handleDateSelect", selectedDate)
        setLoading(true);
        try {
            const data = await dispatch(
                todayAppointmentAPIFn({
                    bookingDate: selectedDate
                })
            );

            if (data?.meta?.requestStatus === 'fulfilled') {
                setLoading(false);
                setTodayBookings(data.payload.data);
            } else {
                console.log('❌ Failed to fetch appointments for:', selectedDate);
            }
        } catch (error) {
            console.error('⚠️ Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    // console.log(cancelledBookings);
    return (
        <div className="grid md:grid-cols-10 grid-cols-1 gap-10">
            <div className='md:col-span-6 col-span-full'>
                <h3 className='text-2xl font-semibold leading-9 text-[#2C2C2C]'>Car Wrap Visualizer™</h3>
                <p className='text-[#858585] mt-2.5 text-[12px] '>Welcome to the Car Wrap Visualizer™ — Streamline your vehicle branding: design, preview, and approve wraps with precision.</p>
                <div className='flex mt-4  sm:flex-row flex-col items-start justify-start gap-7'>
                    <CustomCalendar full={false} onDateSelect={handleDateSelect} />

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
                <BookedAppointments data={todayBookings} title="Booked Appointments" loading={loading} />
                <BookedAppointments data={tomorrowBookings} title="Tomorrow Appointments" loading={loading} />
                <BookedAppointments data={canceledBookings} title="Canceled Appointments" loading={loading} />
            </div>

            {/* Popup if trial expired */}
            {showTrialPopup && <TrialExpiredPopup onClose={() => setShowTrialPopup(false)} />}

        </div>
    )
}

export default Appointment
