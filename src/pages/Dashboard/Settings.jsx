import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Settings = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    password: "",  // New Password (empty by default)
  });

  const [message, setMessage] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    if (!user) {
      console.error("User is not available in localStorage");
      return;
    }

    const fetchUserData = async () => {
      const apiUrl = `https://api.theugcmachine.com/user/`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success && data.user) {
          // Populate form with the fetched user data
          setFormData({
            fname: data.user.firstName,
            sname: data.user.lastName,
            email: data.user.email,
            password: "",  // Password field remains empty for user input
          });
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Create the payload with updated data
    const updatedUser = { 
      firstName: formData.fname, 
      lastName: formData.sname, 
      email: formData.email, 
      password: formData.password || undefined // If password is empty, backend should ignore it
    };
  
    try {
      const apiUrl = "https://api.theugcmachine.com/user/"; // Correct PUT endpoint
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setMessage("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        logout();
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile.");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#090A1E] text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Account Settings</h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-lg font-medium">First Name</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="w-full p-4 mt-2 border bg-[#ffffff1a] rounded-md text-white"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Last Name</label>
            <input
              type="text"
              name="sname"
              value={formData.sname}
              onChange={handleChange}
              className="w-full p-4 mt-2 border bg-[#ffffff1a] rounded-md text-white"
              placeholder="Enter Last Name"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 mt-2 border bg-[#ffffff1a] rounded-md text-white"
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label className="text-lg font-medium">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 mt-2 border bg-[#ffffff1a] rounded-md text-white"
            placeholder="Enter New Password"
          />
        </div>

        {message && <p className="text-green-400 text-sm">{message}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white text-lg font-semibold rounded-full"
        >
          Update Profile
        </button>
      </form>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={logout}
          className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
