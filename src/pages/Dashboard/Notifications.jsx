import React, { useState } from "react";
import { useParams } from "react-router-dom";

const notifications = [
  { id: 1, title: "📩 New Message Received", content: "You have a new message from Alice." },
  { id: 2, title: "🔔 System Update Available", content: "A new system update is ready to install." },
  { id: 3, title: "🎉 New Friend Request", content: "David has sent you a friend request." }
];

const Notifications = () => {
  const { id } = useParams();
  const [selectedNotification, setSelectedNotification] = useState(
    notifications.find((notif) => notif.id === parseInt(id)) || notifications[0]
  );

  return (
    <div className="flex max-w-6xl mx-auto mt-10 bg-[#090A1E] text-white rounded-lg shadow-lg overflow-hidden">
      
      {/* Left Sidebar: Notification Titles */}
      <div className="w-1/3 border-r border-[#262A5B] p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.map((notif) => (
            <li
              key={notif.id}
              onClick={() => setSelectedNotification(notif)}
              className={`cursor-pointer px-4 py-2 mb-2 rounded-lg transition-all ${
                selectedNotification.id === notif.id ? "bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white" : "hover:bg-[#1ae1ab1a]"
              }`}
            >
              {notif.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content: Full Notification View */}
      <div className="w-2/3 p-6">
        <h3 className="text-xl font-semibold mb-4">{selectedNotification.title}</h3>
        <p className="text-gray-300">{selectedNotification.content}</p>
      </div>
    </div>
  );
};

export default Notifications;
