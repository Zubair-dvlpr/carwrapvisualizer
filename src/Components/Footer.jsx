import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from "../assets/images/logo.png"
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center  pb-4">
          {/* Logo */}
          <div className="text-xl font-bold mb-4 md:mb-0">
            <Link>
              <img src={logo} alt="" className='w-36' />
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-sm">
          {/* Menu */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-[#959BA9]">
            &copy; {new Date().getFullYear()} Car Wrap Visualizer™ All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
