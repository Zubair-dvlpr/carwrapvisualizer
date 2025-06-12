import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import loginbg from '../../assets/images/loginbg.webp';
import loaderGif from '../../assets/loading.gif';
import { useDispatch } from 'react-redux';
import { loginUserAPIFn } from '../../redux/features/auth/authFns.js';
const Login = () => {
  const dispatch = useDispatch();
  const { animation, setAnimation } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setAnimation(true);

    try {
      const data = await dispatch(
        loginUserAPIFn({
          email,
          password
        })
      );

      if (data?.meta?.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      } else if (data?.meta?.requestStatus === 'rejected') {
        setError(data?.payload || 'Login failed'); // <- Show server error message
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setAnimation(false);
    }
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
            <h2 className='text-[32px] font-semibold capitalize mb-4'>
              Welcome to Car Wrap Visualizer™
            </h2>
            <p className='text-lg mb-4'>Log In to access your dashboard and start visualizing wraps instantly.</p>
          </div>
          <form onSubmit={handleLogin} className=' space-y-4'>
            <label className='text-xl font-semibold' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter Email Address'
              value={email}
              name='email'
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full p-4 mt-4 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
            />
            <label className='text-xl font-semibold' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              name='password'
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full p-4   mt-4 border bg-[#ffffff1a] rounded-md focus:ring focus:ring-white'
            />
            {error && <p className='text-red-500'>{error}</p>}
            <button
              type='submit'
              className='w-full cursor-pointer font-[Apercu] mt-6 bg-gradient-to-r from-[#1AE1AB] to-[#712FFF] text-white py-4 rounded-full hover:bg-blue-600'
            >
              Enter Studio
            </button>
          </form>
          {/* Already have an account? */}
          <p className='text-center capitalize mt-4'>
            If you don't have an account{' '}
            <Link to='/signup' className='text-blue-400 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
