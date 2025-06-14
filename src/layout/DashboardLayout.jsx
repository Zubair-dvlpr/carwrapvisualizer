import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import TopNavbar from '../Components/TopNavbar';
import WelcomeModal from '../Components/WelcomeModal';


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const showWelcome = localStorage.getItem('showWelcome');
    if (showWelcome === 'true') {
      setShowModal(true);
      localStorage.removeItem('showWelcome'); // Remove after showing
    }
  }, []);

  const toggleSidebar = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <div className="flex h-screen relative bg-[#12161F]">
      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for Mobile (When Sidebar is Open) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => toggleSidebar(false)}></div>
      )}

      {/* Right Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar with Toggle Button */}
        <TopNavbar toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto ">
          <div className='bg-white md:p-6 p-4 rounded-4xl min-h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
