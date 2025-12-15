import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import newlogo from "../assets/images/newlogo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
      const currentUser = JSON.parse(persistRoot?.currentUser || "{}");
      if (currentUser?.currentUser?.data?.user?._id) {
        setIsLoggedIn(true);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="fixed w-full sm:mx-0 top-4 z-[999] ">
      <div className="max-w-7xl mx-auto rounded-full bg-black px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={newlogo} alt="logo" className="w-20" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link to="/" className="text-white hover:text-pink-500 transition">Home</Link>
            <Link to="/explore" className="text-white hover:text-pink-500">Explore</Link>
            <Link to="/wrap-shops" className="text-black bg-white py-2 px-1 rounded-sm hover:text-pink-500 transition">Wrap Shop</Link>
            <Link to="/blog" className="text-white hover:text-pink-500 transition">Blog</Link>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full border border-pink-500 text-white hover:bg-pink-500 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4">
          <Link to="/" className="block text-white">Home</Link>
          <Link to="/explore" className="block text-white ">Explore</Link>
          <Link to="/wrap-shops" className="block text-black bg-white rounded-sm px-1 py-2">Wrap Shop</Link>
          <Link to="/blog" className="block text-white">Blog</Link>

          <div className="pt-4 space-y-3">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="block text-center py-2 rounded-full border border-pink-500 text-pink-500"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center py-2 rounded-full border border-pink-500 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-center py-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
