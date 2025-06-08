import React, { useEffect, useState } from 'react';

const ConfirmBooking = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const persistRootRaw = localStorage.getItem('persist:root');
      if (persistRootRaw) {
        const persistRoot = JSON.parse(persistRootRaw); // ✅ parse once

        const currentUserRaw = persistRoot?.currentUser; // This is still a string
        if (currentUserRaw) {
          const currentUser = JSON.parse(currentUserRaw); // ✅ parse nested string
          const userData = currentUser?.currentUser?.data?.user;
          if (userData) setUser(userData);
        }
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  const handleAccept = () => {
    alert('Booking Accepted');
    // Add API call or logic here
  };

  const handleReject = () => {
    alert('Booking Rejected');
    // Add API call or logic here
  };

  if (!user) {
    return <p className="text-white">Loading user info...</p>;
  }

  return (
    <div className="p-6">
      <table className="w-full text-left text-white border border-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border border-white">Field</th>
            <th className="p-3 border border-white">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-3 border border-white">First Name</td><td className="p-3 border border-white">{user.firstName}</td></tr>
          <tr><td className="p-3 border border-white">Last Name</td><td className="p-3 border border-white">{user.lastName}</td></tr>
          <tr><td className="p-3 border border-white">Email</td><td className="p-3 border border-white">{user.email}</td></tr>
          <tr><td className="p-3 border border-white">Credits</td><td className="p-3 border border-white">{user.credits}</td></tr>
          <tr><td className="p-3 border border-white">Login Count</td><td className="p-3 border border-white">{user.loginCount}</td></tr>
          <tr><td className="p-3 border border-white">Last Login</td><td className="p-3 border border-white">{new Date(user.lastLogin).toLocaleString()}</td></tr>
        </tbody>
      </table>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleAccept}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
