import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import TopNavbar from '../Components/TopNavbar';


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (open) => {
    setIsSidebarOpen(open);
  };

  return (
    <div className="flex h-screen relative">
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
        <div className="flex-1 overflow-y-auto p-6 text-white bg-[#050611]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
