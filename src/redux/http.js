// Library Imports
import axios from 'axios';

// Local Imports
import { persistor, store } from './store';
import { baseURL } from './constant';
import { logout } from './features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL
});

export const setAuthToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    function (config) {
      return config;
    },
    function (error) {
      console.log('error from https', error);
      if (!navigator.onLine) {
        console.log('No internet connection');
      }
      if (error?.response?.status === 401) {
        const dispatch = store.dispatch;
        dispatch(logout());
        persistor.purge();
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
