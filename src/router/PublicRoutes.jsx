// Library Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//Local Imports
import { useIsAuthenticatedUser } from '../utils/utils';

const PublicRoutes = () => {
  return useIsAuthenticatedUser() ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoutes;
