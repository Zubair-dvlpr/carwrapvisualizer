import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png"
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to='/'>
              <img src={logo} alt="" className='w-36' />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-2">
            <Link to="/" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white transition font-medium">Home</Link>
            <Link to="/visualizer" className="text-gray-700  text-sm  py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white capitalize transition font-medium">wrap visualizer	</Link>
            <Link to="#" className="text-gray-700  text-sm  py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white transition font-medium">Contact</Link>
          </nav>

          {/* Right Button */}
          <div className="hidden md:flex  gap-2">
            <Link to="/login" className="bg-transparent border uppercase border-[#ED217B] text-sm text-[#ED217B] px-4 py-2 cursor-pointer font-semibold hover:scale-90 transition">
              login
            </Link>
            <Link to="/signup" className="bg-[#ED217B] uppercase text-sm text-white px-4 py-2 cursor-pointer font-semibold hover:scale-90 transition">
              signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
          <a href="#" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white font-medium">Home</a>
          <a href="#" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white font-medium">About</a>
          <a href="#" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white  font-medium">Contact</a>
          <a href="#" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white  font-medium">INTEGRATE NOW</a>
        </div>
      )}
    </header>
  );
};

export default Header;
