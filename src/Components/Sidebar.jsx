import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import dashboardIcon from '../assets/icons/dashboard.svg';
import Profile from '../assets/icons/profile.svg';
import Studio from '../assets/icons/studio.svg';
import Appointments from '../assets/icons/Appointments.svg';
import Customers from '../assets/icons/Customers.svg';
import Subscription from '../assets/icons/Subscription.svg';
import Help from '../assets/icons/Help.svg';
import logoutIocn from '../assets/icons/logout.svg';
import logo from '../assets/images/logo.png';
import { logoutFn } from '../utils/utils';

// Full menu (default)
const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
  { name: 'Profile', path: '/profile', icon: Profile },
  { name: 'Studio', path: '/tool', icon: Studio },
  { name: 'Appointments', path: '/appointment', icon: Appointments },
  { name: 'Subscription', path: '/subscription', icon: Subscription },
  { name: 'Customers', path: '/customers', icon: Customers },
  { name: 'Leads', path: '/leads', icon: Customers },
  { name: 'Help', path: '/help', icon: Help },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const user = useSelector(state => state?.currentUser?.currentUser);
  const accountType = user?.data?.user?.accountType;
  const role = user?.data?.user?.role?.role;

  // 🧩 Define excluded paths for specific user types
  const excludedShopManPaths = ['/subscription'];
  const excludedAccountPaths = ['/appointment', '/customers', '/leads'];

  let finalRoutes = [...menuItems];

  // 🧠 ROLE-BASED MENU LOGIC
  if (role === 'enthusiast') {
    // Enthusiast users: Only show Dashboard, Profile, Studio, Plans
    finalRoutes = menuItems.filter(item =>
      ['/dashboard', '/profile', '/tool', '/subscription'].includes(
        item.path.toLowerCase()
      )
    );
  } else if (role === 'shop-man' && accountType === 'free') {
    finalRoutes = menuItems.filter(
      item =>
        !excludedShopManPaths.includes(item.path.toLowerCase()) &&
        !excludedAccountPaths.includes(item.path.toLowerCase())
    );
  } else if (role === 'shop-man') {
    finalRoutes = menuItems.filter(
      item => !excludedShopManPaths.includes(item.path.toLowerCase())
    );
  } else if (accountType === 'free') {
    finalRoutes = menuItems.filter(
      item => !excludedAccountPaths.includes(item.path.toLowerCase())
    );
  }

  // Handle click outside sidebar (mobile)
  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen w-64 bg-[#12161F] text-white flex flex-col transform ${
        isOpen ? 'translate-x-0 z-20' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
    >
      {/* Header */}
      <div
        className={`p-4 flex ${
          isOpen ? 'justify-between' : 'justify-center'
        } h-[92px] items-center`}
      >
        <img src={logo} alt='' className='max-w-42' />
        <button
          className='md:hidden text-white text-2xl'
          onClick={() => toggleSidebar(false)}
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 overflow-y-scroll hide-scrollbar space-y-1'>
        {finalRoutes.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-4 rounded-full transition-all ${
                isActive ? 'text-white bg-[#ED217B]' : 'hover:bg-[#ED217B]'
              }`
            }
          >
            <img src={item.icon} alt='' className='mr-2' />
            {item.name}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={logoutFn}
          className='flex cursor-pointer items-center w-full p-4 rounded-full transition-all hover:bg-[#ED217B]'
        >
          <img src={logoutIocn} alt='' className='mr-2' /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
