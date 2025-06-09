import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CustomCalendar.css'; // For custom styles
import { AuthContext } from '../../../context/AuthContext';

const CustomCalendar = ({ full }) => {
  console.log(full)
  const [value, setValue] = useState(new Date());
  const { setSelectedDate, bookingsByDate } = useContext(AuthContext);
  const handleChange = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("❌ Invalid date selected:", date);
      return;
    }

    setValue(date);
    setSelectedDate(date); // Send to context
  };

  return (
    <div className={`p-6 ${full ? 'w-full' : 'md:max-w-md max-w-full'}  bg-white rounded-2xl shadow`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-Lato">Today</span>
      </div>

      <Calendar
        onChange={handleChange}
        value={value}
        prevLabel={null}
        nextLabel={null}
        navigationLabel={({ date, label }) => (
          <div className="text-center font-semibold text-pink-600">{label}</div>
        )}
        tileClassName={({ date, view }) => {
          if (
            value instanceof Date &&
            date.toDateString() === value.toDateString()
          ) {
            return 'selected-date';
          }
          return '';
        }}
      />
    </div>
  );
};

export default CustomCalendar;
