import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // live domain http://34.106.73.252/backend
  const domain = 'http://localhost/carApi/';
  const localhost = 'http://localhost/carApi/';

  const navigate = useNavigate();
  const [credits, setCredits] = useState();
  const [user, setUser] = useState(() => {
    // Initialize from localStorage on first load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  // Load user from localStorage when the app is reloaded
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data from localStorage
    }
    setLoading(false); // Stop loading after checking localStorage
  }, []);
  


  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [todayBookings, setTodayBookings] = useState([]);
  const [tomorrowBookings, setTomorrowBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsByDate, setBookingsByDate] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        credits,


        loading,
        animation,
        setAnimation,
        todayBookings,
        domain,
        tomorrowBookings,
        cancelledBookings,
        selectedDate,
        setSelectedDate,
        bookingsByDate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
