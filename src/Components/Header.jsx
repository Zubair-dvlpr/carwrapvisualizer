import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    try {
      const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
      const currentUser = JSON.parse(persistRoot?.currentUser || '{}');
      const user = currentUser?.currentUser?.data?.user;

      if (user && user._id) {
        setIsLoggedIn(true);
        setUserName(`${user.firstName} ${user.lastName}`);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to='/'>
              <img src={logo} alt="Logo" className='w-36' />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-2">
            <Link to="/" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white transition font-medium">Home</Link>
            <a href="#howitWorks" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white cursor-pointer transition font-medium">How it Works</a>
            <a href="#ourBenefits" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white cursor-pointer transition font-medium">Our Benefits</a>
            <a href="#faq" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white cursor-pointer transition font-medium">FAQ</a>
            <Link to="/contact" className="text-gray-700 text-sm py-3 px-4 hover:bg-[#ED217B] duration-500 hover:text-white transition font-medium">Contact</Link>
          </nav>

          {/* Right Button */}
          <div className="hidden md:flex gap-2 items-center">
            {isLoggedIn ? (
              <Link to="/dashboard" className="text-sm border py-3 px-4 transition-all hover:bg-[#ED217B] text-[#ED217B] hover:text-white border-[#ED217B]  font-semibold">
                {userName}
              </Link>
            ) : (
              <>
                <Link to="/login" className="bg-transparent border uppercase border-[#ED217B] text-sm text-[#ED217B] px-4 py-2 cursor-pointer font-semibold hover:scale-90 transition">
                  login
                </Link>
                <Link to="/signup" className="bg-[#ED217B] uppercase text-sm text-white px-4 py-2 cursor-pointer font-semibold hover:scale-90 transition">
                  signup
                </Link>
              </>
            )}
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
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-md">
          <Link to="/" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">Home</Link>
          <a href="#howitWorks" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">How it Works</a>
          <a href="#ourBenefits" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">Our Benefits</a>
          <a href="#faq" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">FAQ</a>
          <Link to="/contact" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">Contact</Link>
          {isLoggedIn ? (
            <Link to="/dashboard" className="block border border-[#ED217B] text-gray-700 font-medium">{userName}</Link>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">login</Link>
              <Link to="/signup" className="block text-gray-700 hover:bg-[#ED217B] hover:text-white capitalize font-medium">signup</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
