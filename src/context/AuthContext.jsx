import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // live domain http://34.106.73.252/backend 
  const domain = "http://localhost/carApi/";
  const localhost = "http://localhost/carApi/";

  const navigate = useNavigate();
  const [credits, setCredits] = useState();
  const [user, setUser] = useState(() => {
    // Initialize from localStorage on first load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  // Load user from localStorage when the app is reloaded
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data from localStorage
    }
    setLoading(false); // Stop loading after checking localStorage
  }, []);



  // Fetch user data afterddd user is set
  useEffect(() => {
    if (user) {
      console.log(user)
      const fetchUserData = async () => {
        const apiUrl = `${domain}/user.php`;
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.user.token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.success) {
            setCredits(data.user.credits)
            // console.log("User API Response:", data.user.credits); // Log the API response
          } else {
            console.log("Failed to fetch user data:", data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []); // Re-run when the user is set or updated


  // const login = async ({ email, password }) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(async () => {
  //       try {
  //         const response = await fetch(`${domain}/login.php`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email,
  //             password,
  //           }),
  //         });

  //         if (response.ok) {
  //           const userData = await response.json();
  //           setUser(userData); // Set user data in state
  //           localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
  //           resolve(userData); // Resolve with user data
  //         } else {
  //           const errorData = await response.json();
  //           reject(errorData.message || "Invalid email or password");
  //         }
  //       } catch (error) {
  //         reject("Error connecting to the server.");
  //       }
  //     }, 1000);
  //   });
  // };

  // const signup = async ({ fname, sname, email, password }) => {
  //   try {
  //     const response = await fetch(`${domain}/signup.php`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password, fname, sname }),
  //     });

  //     const data = await response.json();

  //     if (response.ok && data.success) {
  //       setUser(data);
  //       localStorage.setItem("user", JSON.stringify(data));
  //       return data;
  //     } else {
  //       throw new Error(data.message || "Something went wrong. Try again later.");
  //     }
  //   } catch (error) {
  //     throw new Error(error.message || "Error connecting to the server.");
  //   }
  // };
  // new login function
  const login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch("http://13.51.196.87:8000/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setUser(data); // Update this if needed based on actual returned structure
            localStorage.setItem("user", JSON.stringify(data));
            resolve(data);
          } else {
            reject(data.message || "Invalid email or password");
          }
        } catch (error) {
          reject(error.message || "Error connecting to the server.");
        }
      }, 1000);
    });
  };



  const signup = async ({ fname, sname, email, password }) => {
    try {
      const response = await fetch("http://13.51.196.87:8000/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: sname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      } else {
        throw new Error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      throw new Error(error.message || "Error connecting to the signup server.");
    }
  };




  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login"); // Use navigate hook to redirect to login page
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // New function to submit project data
  const submitProject = async (projectData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate an API call
        // console.log("Project data submitted:", projectData);
        // Simulate a successful response
        resolve({ success: true, message: "Project submitted successfully!" });
      }, 1000);
    });
  };

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (projectId) => {
    const selected = projects.find((proj) => proj.id === projectId);
    setSelectedProject(selected);
  };

  const [todayBookings, setTodayBookings] = useState([]);
  const [tomorrowBookings, setTomorrowBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingsByDate, setBookingsByDate] = useState([]);

  const fetchBookingsByDate = async (date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`; // "YYYY-MM-DD"

      const res = await axios.get(`${domain}/booking/bookings-by-date.php?date=${formattedDate}`);
      setTodayBookings(res.data.bookings || []);

      console.log("Original date object:", date);
      console.log("Correct formatted date:", formattedDate);
    } catch (err) {
      console.error("Error fetching bookings by date:", err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBookingsByDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTodayBookings = async () => {
    try {
      // Format the current date in user's local timezone as YYYY-MM-DD
      const localDate = new Date().toLocaleDateString("sv-SE"); // sv-SE gives "YYYY-MM-DD"

      const response = await fetch(`${domain}/booking/todayBookings.php?date=${localDate}`);
      const data = await response.json();

      if (data.success) {
        setTodayBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchTomorrowBookings = async () => {
    try {

      const response = await fetch(`${domain}/booking/tomorrowBookings.php`);
      const data = await response.json();
      if (data.success) {
        setTomorrowBookings(data.data);
        // console.log(data);
      } else {
        console.error("Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchCancelledBookings = async () => {
    try {

      const response = await fetch(`${domain}/booking/CancelledBooking.php`);
      const data = await response.json();
      if (data.success) {
        setCancelledBookings(data.data);
        console.log(data);
      } else {
        console.error("Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    fetchTodayBookings();
    fetchTomorrowBookings();
    fetchCancelledBookings();
  }, []);




  return (
    <AuthContext.Provider value={{ user, credits, login, signup, logout, loading, animation, setAnimation, handleProjectClick, todayBookings, domain, tomorrowBookings, cancelledBookings, selectedDate, setSelectedDate, bookingsByDate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;