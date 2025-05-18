import React, { useContext, useState } from 'react';
import { Menu } from '@headlessui/react';
import { RiSettings2Line } from 'react-icons/ri';
import { IoNotificationsOutline } from 'react-icons/io5';
import Avatar from '../assets/images/Avatar.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CreditIcon from '../assets/icons/CreditIcon';

const notifications = [
  { id: 1, title: "📩 New Message Received", content: "You have a new message from Alice." },
  { id: 2, title: "🔔 System Update Available", content: "A new system update is ready to install." },
  { id: 3, title: "🎉 New Friend Request", content: "David has sent you a friend request." }
];

const TopNavbar = ({ toggleSidebar }) => {
  const { logout, credits, user } = useContext(AuthContext);
  return (
    <div className="w-full h-[92px] border-l border-[#262A5B] bg-[#090A1E] shadow-md p-4 flex justify-between items-center">

      {/* Left: Hamburger Menu */}
      <div className="flex items-center">
        <button className="md:hidden text-white text-2xl mr-4" onClick={() => toggleSidebar(true)}>
          ☰
        </button>
      </div>

      {/* Right: Icons with Dropdowns */}
      <div className="flex items-center space-x-3 text-white">

        <div className='text-right bg-gradient-to-r p-[1px] from-[#1AE1AB] to-[#712FFF] rounded-lg '>
          <div className='bg-gradient-to-r p-[13px] relative left-[.3px] h-full rounded-lg from-[#082A47] to-[#382344]'>
            <div className="flex items-center gap-1">
              <CreditIcon />
              <p className="text-sm font-medium">Total Credit: {credits}</p>
            </div>
          </div>
        </div>
        {/* Settings */}
        <Link to="../settings" className="cursor-pointer bg-[#712fff1a] p-[14px] rounded-full text-xl">
          <RiSettings2Line />
        </Link>

        {/* Notifications Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="cursor-pointer bg-[#1ae1ab1a] p-[14px] rounded-full text-xl">
            <IoNotificationsOutline />
          </Menu.Button>
          <Menu.Items className="absolute z-50 right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden">
            {notifications.map((notif) => (
              <Menu.Item key={notif.id}>
                {({ active }) => (
                  <Link
                    to="/notifications"
                    // to={`/notifications/${notif.id}`}
                    className={`block px-4 py-2 ${active ? 'bg-gray-200' : ''}`}
                  >
                    {notif.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
            {/* View All Notifications */}
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/notifications"
                  className={`block text-center text-blue-500 px-4 py-2 font-medium ${active ? 'bg-gray-200' : ''}`}
                >
                  View All
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="cursor-pointer flex items-center gap-2 bg-[#050611] p-[8px] rounded-full text-xl">
          <img src={`${`https://api.dicebear.com/6.x/adventurer/svg?seed=male`}`} alt="Avatar" className="w-8 h-8" />
          <span className="text-sm capitalize text-[#9B9EB5]">{user.user.firstName}</span>
          </Menu.Button>
          <Menu.Items className="absolute z-50 right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden">
            <Menu.Item>
              {({ active }) => (
                <Link to="#" className={`block cursor-pointer px-4 py-2 ${active ? 'bg-gray-200' : ''}`}>
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={logout} className={`w-full  cursor-pointer text-left px-4 py-2 text-red-500 ${active ? 'bg-gray-200' : ''}`}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default TopNavbar;
