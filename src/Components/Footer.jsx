import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import newlogo from "../assets/images/newlogo.png";
import ShapeDivider from "./ShapeDivider";
const Footer = () => {
  return (
    <footer className="relative bg-[#12161F] text-white">
      <ShapeDivider color="#12161F" />

      <div className="relative max-w-7xl mx-auto px-6 pt-2 pb-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <img src={newlogo} alt="Car Wrap Visualizer" className="w-20" />
            <p className="text-sm text-white">
              © {new Date().getFullYear()}         Car Wrap Visualizer™  All rights reserved
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-white">
              <a href="#" className="hover:text-pink-500 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Our Company</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
              <li><Link to="/explore" className="hover:text-pink-500">Explore</Link></li>
              <li><Link to="/wrap-shops" className="hover:text-pink-500">Wrap Shops</Link></li>
              <li><Link to="/blog" className="hover:text-pink-500">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-pink-500">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Get to Know More</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><Link to="/terms" className="hover:text-pink-500"> Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link to="/login" className="hover:text-pink-500">Login</Link></li>
              <li><Link to="/signup" className="hover:text-pink-500">Register</Link></li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-base text-white md:text-right">

          </div>

        </div>

        {/* Bottom Line */}
        {/* <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          Built for wrap shops & car enthusiasts worldwide 🚗
        </div> */}

      </div>
    </footer>
  );
};

export default Footer;
