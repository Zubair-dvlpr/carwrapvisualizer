import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsAuthenticatedUser } from '../utils/utils';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { commonRoutes, privateRoutes, publicRoutes } from './config';

const Router = () => {
  return (
    <Routes>
      <Route
        path='*'
        element={useIsAuthenticatedUser() ? <Navigate to='/dashboard' /> : <Navigate to='/' />}
      />
      <Route element={<PrivateRoutes />}>
        {/* {privateRoutes?.map((route, index) =>
          route.child ? (
            route?.child?.map((childRoute, index) => (
              <>
                <Route path={route.path} element={route.element} key={index} />
                <Route path={childRoute.path} element={childRoute.element} key={index} />
              </>
            ))
          ) : (
            <Route path={route.path} element={route.element} key={index} />
          )
        )}
      </Route> */}
        {privateRoutes?.map((route, index) => (
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
