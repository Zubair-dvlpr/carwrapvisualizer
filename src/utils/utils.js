import { useSelector } from 'react-redux';
import { setAuthToken } from '../redux/http';
import { persistor, store } from '../redux/store';
import { logout } from '../redux/features/auth/authSlice';

// Authentication Fn
export const useIsAuthenticatedUser = () => {
  const user = useSelector(state => state?.currentUser?.currentUser);
  // console.log(user)
  const token = user?.data?.accessToken;
  if (!token) {
    return false;
  }
  setAuthToken(token);
  return true;
};

export const logoutFn = () => {
  const dispatch = store.dispatch;
  dispatch(logout());
  persistor.purge();
};
