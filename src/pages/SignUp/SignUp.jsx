import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import loginbg from '../../assets/images/loginbg.webp';
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { signUpAPIFn } from '../../redux/features/auth/authFns.js';

const SignUp = () => {
  const { animation, setAnimation } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    password: '',
    isBusinessman: false
  });

  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = role => {
    if (role === 'businessman') {
      setFormData({ ...formData, isBusinessman: true });
      setSelectedRole('businessman');
    } else {
      setFormData({ ...formData, isBusinessman: false });
      setSelectedRole('enthusiast');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setAnimation(true);

    const data = await dispatch(
      signUpAPIFn({
        firstName: formData.fname,
        lastName: formData.sname,
        email: formData.email,
        password: formData.password,
        isBusinessman: formData.isBusinessman
      })
    );

    if (data?.meta?.requestStatus === 'fulfilled') {
      localStorage.setItem('showWelcome', 'true');
      setAnimation(false);
      navigate(`/verify-otp?email=${formData.email}`);
    } else {
      setError(data?.payload || 'Signup failed');
      setAnimation(false);
    }
  };

  return (
    <>
      {animation && (
        <div className="absolute w-full bg-[#000000d2] flex justify-center h-screen items-center z-50">
          <img src={loaderGif} alt="Loading..." className="w-36" />
        </div>
      )}

      <div
        className="flex items-center justify-center bg-cover bg-no-repeat bg-center min-h-screen"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="bg-[#ffffff1a] mx-3 border border-white text-white rounded-lg p-7 max-w-[650px] w-full">
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" className="w-44 mx-auto mb-4" />
            </Link>
            <h2 className="text-[32px] font-semibold capitalize mb-2">
              Get Started with Car Wrapvisualizer™
            </h2>
            <p className="text-lg mb-2">
              Join now to unlock full access to wrap visualizers, projects, and studio tools.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-xl font-semibold">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.fname}
                  name="fname"
                  onChange={handleChange}
                  required
                  className="w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white"
                />
              </div>
              <div className="w-1/2">
                <label className="text-xl font-semibold">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.sname}
                  name="sname"
                  onChange={handleChange}
                  required
                  className="w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white"
                />
              </div>
            </div>

            <label className="text-xl font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              className="w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white"
            />

            <label className="text-xl font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              className="w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white"
            />

            {/* ✅ ATTRACTIVE ROLE SELECTION */}
            <div className="mt-6">
              <label className="text-xl font-semibold mb-3 block">I am a...</label>
              <div className="flex gap-6">
                {/* Businessman Card */}
                <div
                  onClick={() => handleRoleSelect('businessman')}
                  className={`cursor-pointer flex-1 border rounded-xl p-5 text-center transition-all duration-300 ${
                    selectedRole === 'businessman'
                      ? 'bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white border-transparent scale-105 shadow-lg'
                      : 'bg-[#ffffff1a] border-gray-400 hover:border-white'
                  }`}
                >
                  <input
                    type="radio"
                    id="businessman"
                    name="role"
                    checked={selectedRole === 'businessman'}
                    readOnly
                    className="hidden"
                  />
                  <label htmlFor="businessman" className="cursor-pointer text-lg font-semibold">
                    👔 Businessman
                  </label>
                </div>

                {/* Enthusiast Card */}
                <div
                  onClick={() => handleRoleSelect('enthusiast')}
                  className={`cursor-pointer flex-1 border rounded-xl p-5 text-center transition-all duration-300 ${
                    selectedRole === 'enthusiast'
                      ? 'bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white border-transparent scale-105 shadow-lg'
                      : 'bg-[#ffffff1a] border-gray-400 hover:border-white'
                  }`}
                >
                  <input
                    type="radio"
                    id="enthusiast"
                    name="role"
                    checked={selectedRole === 'enthusiast'}
                    readOnly
                    className="hidden"
                  />
                  <label htmlFor="enthusiast" className="cursor-pointer text-lg font-semibold">
                    🚗 Enthusiast
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 mt-2 text-center">
                {typeof error === 'string' ? error : error.message || 'An error occurred'}
              </p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer mt-5 bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white py-4 rounded-full hover:opacity-90 transition-all"
            >
              Create My Account
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
