import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticatedUser } from '../utils/utils';

// Local Imports

const PrivateRoutes = () => {
  return useIsAuthenticatedUser() ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
