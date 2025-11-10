import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsAuthenticatedUser } from '../utils/utils';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { commonRoutes, privateRoutes, publicRoutes } from './config';
import { useSelector } from 'react-redux';

const Router = () => {
  const user = useSelector(state => state?.currentUser?.currentUser);
  // Define restricted routes for enthusiast users
  const enthusiastAllowedPaths = [
    '/dashboard',
    '/profile',
    '/tool',          // Studio
    '/subscription',  // Plans
  ];
  // Filter only allowed routes for enthusiast
  const enthusiastRoutes = privateRoutes.filter(route =>
    enthusiastAllowedPaths.includes(route.path)
  );
  console.log("check current user login ", user);
  const role = user?.data?.user?.role?.role;

  const shopmanRoutes = [...privateRoutes].filter(item => item.path != "/subscription")

  // Dynamic routing logic by role
  let dynamicRoutes;
  if (role === "shop-man") {
    dynamicRoutes = shopmanRoutes;
  } else if (role === "enthusiast") {
    dynamicRoutes = enthusiastRoutes;
  } else {
    dynamicRoutes = privateRoutes; // default (admins, etc.)
  }

  // const dynamicRoutes = role === "shop-man" ?  shopmanRoutes : privateRoutes;

  return (
    <Routes>
      <Route
        path='*'
        element={useIsAuthenticatedUser() ? <Navigate to='/dashboard' /> : <Navigate to='/' />}
      />
      <Route element={<PrivateRoutes />}>
        {dynamicRoutes?.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Route>
      <Route element={<PublicRoutes />}>
        {publicRoutes.map((route, index) => {
          return <Route path={route.path} element={route.element} key={index} />;
        })}
      </Route>

      {/* common routs */}
      {commonRoutes.map((route, index) => {
        return <Route path={route.path} element={route.element} key={index} />;
      })}
    </Routes>
  );
};

export default Router;