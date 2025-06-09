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
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAnimation(true); // Start loading

    const data = await dispatch(
      signUpAPIFn({
        firstName: formData.fname,
        lastName: formData.sname,
        email: formData.email,
        password: formData.password
      })
    );
    if (data?.meta?.requestStatus === 'fulfilled') {
      navigate('/login'); // Redirect to Dashboard
      setAnimation(false); // Stop loading
    }
    if (data?.meta?.requestStatus === 'rejected') {
      setError(err);
      setAnimation(false); // Stop loading
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google Sign Up Feature Coming Soon!');
  };

  return (
    <>
      {animation && (
        <div className='absolute w-full  bg-[#000000d2] flex justify-center h-screen items-center'>
          <img src={loaderGif} alt='Loading...' className='w-36' />
        </div>
      )}
      <div
        className='flex items-center justify-center bg-cover bg-no-repeat bg-center min-h-screen'
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className='bg-[#ffffff1a] mx-3 border border-white text-white rounded-lg p-7 max-w-[650px] w-full'>
          <div className=''>
            <Link to='/'>
              <img src={logo} alt='Logo' className='w-44 mx-auto mb-8' />
            </Link>
            <h2 className='text-[32px] font-semibold capitalize mb-4 Aspekta-650'>
              Ready to use Car Wrap Visualizer
            </h2>
            <p className='text-base mb-2'>Enter your details to create an account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <div className='flex gap-4'>
              <div>
                <label className='text-xl font-semibold' htmlFor='fname'>
                  First Name
                </label>
                <input
                  type='text'
                  placeholder='Enter First Name'
                  value={formData.fname}
                  name='fname'
                  onChange={handleChange}
                  required
                  className='w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
                />
              </div>

              <div>
                <label className='text-xl font-semibold' htmlFor='sname'>
                  Last Name
                </label>
                <input
                  type='text'
                  placeholder='Enter Last Name'
                  value={formData.sname}
                  name='sname'
                  onChange={handleChange}
                  required
                  className='w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
                />
              </div>
            </div>

            <label className='text-xl font-semibold' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter Email Address'
              value={formData.email}
              name='email'
              onChange={handleChange}
              required
              className='w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
            />

            <label className='text-xl font-semibold' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
              className='w-full p-4 mt-3 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
            />

            {error && (
              <p className='text-red-500'>
                {typeof error === 'string' ? error : error.message || 'An error occurred'}
              </p>
            )}
            {success && <p className='text-green-400'>{success}</p>}

            <button
              type='submit'
              className='w-full cursor-pointer mt-2 bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white py-4 rounded-full hover:bg-blue-600'
            >
              CREATE ACCOUNT
            </button>
          </form>

          {/* <div className="mt-4 text-center">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex justify-center items-center gap-2 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-300"
            >
              <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>
          </div> */}

          <p className='text-center mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-400 hover:underline'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
