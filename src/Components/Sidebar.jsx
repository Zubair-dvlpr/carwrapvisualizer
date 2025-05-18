import React, { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaChartBar, FaUsers, FaCogs, FaUser, FaSignOutAlt, FaTimes, FaVideo } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../context/AuthContext';
import HelpIcon from '../assets/icons/HelpIcon';
import HomeIcon from '../assets/icons/HomeIcon';
import CreateVideo from '../assets/icons/CreateVideo';
import BillingIcon from '../assets/icons/BillingIcon';
import MyProjectIcon from '../assets/icons/MyProjectIcon';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const { logout } = useContext(AuthContext);
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen w-64 bg-[#090A1E] text-white flex flex-col transform ${isOpen ? 'translate-x-0 z-20' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
    >
      {/* Close Button (Mobile Mode) */}
      <div className={`p-4 flex ${isOpen ? 'justify-between' : ' justify-center'}  h-[92px] items-center border-b border-gray-700`}>
        <img src={logo} alt="" className='w-42' />
        <button className="md:hidden text-white text-2xl" onClick={() => toggleSidebar(false)}>
          <FaTimes />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all ${isActive
              ? 'bg-gradient-to-r text-white from-[#090A1E] to-[#282C84]'
              : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HomeIcon className="mr-3" fill={isActive ? "#FFFFFF" : "#9B9EB5"} />
              Dashboard
            </>
          )}
        </NavLink>

        <NavLink
          to="/tool"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-[#090A1E] to-[#282C84] text-white' : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <CreateVideo className="mr-3" fill={isActive ? "#FFFFFF" : "#9B9EB5"} />
              Visualizer
            </>
          )}
        </NavLink>

        {/* <NavLink
          to="/myprojects"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-[#090A1E] to-[#282C84] text-white' : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MyProjectIcon className="mr-3" fill={isActive ? "#FFFFFF" : "#9B9EB5"} />
              My Projects
            </>
          )}
        </NavLink> */}

        {/* <NavLink
          to="/Subscription"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-[#090A1E] to-[#282C84] text-white' : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <BillingIcon className="mr-3" fill={isActive ? "#FFFFFF" : "#9B9EB5"} />
              Billing & Subscription
            </>
          )}
        </NavLink> */}
        {/* <NavLink
          to="/VideoDelivery"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg ${isActive ? 'bg-gradient-to-r from-[#090A1E] to-[#282C84] text-white' : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          <FaVideo className="mr-3" /> Video Delivery
        </NavLink> */}

        <NavLink
          to="/SupportHelp"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-[#090A1E] to-[#282C84] text-white' : 'hover:bg-gray-700 text-[#9b9eb5]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HelpIcon className="mr-3" fill={isActive ? "#FFFFFF" : "#9B9EB5"} />
              Support & Help
            </>
          )}
        </NavLink>



      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button onClick={logout} className="flex cursor-pointer items-center w-full p-3 bg-gradient-to-r from-[#090A1E] to-[#282C84]  hover:bg-red-700 rounded">
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
