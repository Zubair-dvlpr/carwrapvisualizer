import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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


  // useEffect(() => {
  //   if (user) {
  //     const fetchUserData = async () => {
  //       const apiUrl = `https://api.theugcmachine.com/voices/`;

  //       try {
  //         const response = await fetch(apiUrl, {
  //           method: 'GET',
  //           headers: {
  //             'Authorization': `Bearer ${user.token}`,
  //             'Content-Type': 'application/json',
  //           },
  //         });

  //         const data = await response.json();

  //         if (data.success) {
  //           // setCredits(data.user.credits)
  //           console.log("voice API Response:", data); // Log the API response
  //         } else {
  //           console.log("Failed to fetch user data:", data);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchUserData();
  //   }
  // }, []); // Re-run when the user is set or updated


  // Fetch user data after user is set
  useEffect(() => {
    if (user) {
      console.log(user)
      const fetchUserData = async () => {
        const apiUrl = `http://localhost/carApi/user.php`;

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
            console.log("User API Response:", data.user.credits); // Log the API response
          } else {
            console.log("Failed to fetch user data:", data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [animation]); // Re-run when the user is set or updated


  const login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch("http://localhost/carApi/login.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Set user data in state
            localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
            resolve(userData); // Resolve with user data
          } else {
            const errorData = await response.json();
            reject(errorData.message || "Invalid email or password");
          }
        } catch (error) {
          reject("Error connecting to the server.");
        }
      }, 1000);
    });
  };

  const signup = async ({ fname, sname, email, password }) => {
    try {
      const response = await fetch("http://localhost/carApi/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fname, sname }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      } else {
        throw new Error(data.message || "Something went wrong. Try again later.");
      }
    } catch (error) {
      throw new Error(error.message || "Error connecting to the server.");
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
        console.log("Project data submitted:", projectData);
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

  return (
    <AuthContext.Provider value={{ user, credits, login, signup, logout, loading, submitProject, animation, setAnimation, projects, setProjects, selectedProject, setSelectedProject, handleProjectClick }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;