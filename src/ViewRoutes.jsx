import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import ErrorPage from './pages/Error';
import CarFillPage from './pages/CarFillPage/Index';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


import { AuthContext } from './context/AuthContext';
import Overview from './pages/Dashboard/Overview';
import Reports from './pages/Dashboard/Reports';
import Analytics from './pages/Dashboard/Analytics';
import Users from './pages/Dashboard/Users';
import Settings from './pages/Dashboard/Settings';
import Profile from './pages/Dashboard/Profile';
import DashboardLayout from './layout/DashboardLayout';
import DefaultLayout from './Layout/DefaultLayout';
// import Login from './pages/Login/Login';
// import NewProject from './pages/Dashboard/NewProject';
import MyProjects from './pages/Dashboard/MyProjects';
import BillingSubscription from './pages/Dashboard/BillingSubscription';
import SupportHelp from './pages/Dashboard/SupportHelp';
import VideoDelivery from './pages/Dashboard/VideoDelivery';
// import SignUp from './pages/SignUp/SignUp';
import Notifications from './pages/Dashboard/Notifications';
// import Waiting from './pages/Waiting/Waiting';
import PricingPlan from './pages/Dashboard/PricingPlan';
import { useContext } from 'react';
import SucessfullUrl from './pages/SucessfullUrl';
import Customers from './pages/Dashboard/Customers';
import BookAppointment from './pages/Dashboard/WorkOrder';
import Appointment from './pages/Dashboard/Appointment';
import WorkOrder from './pages/Dashboard/WorkOrder';
import BookingAppointment from './pages/Dashboard/BookingAppointment';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};
const ViewRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout> <Home /> </DefaultLayout>} />
      <Route path="/visualizer" element={<DefaultLayout> <CarFillPage /> </DefaultLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/SucessfullUrl" element={<SucessfullUrl />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><Overview /></DashboardLayout></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><DashboardLayout><Profile /></DashboardLayout></PrivateRoute>} />
      <Route path="/tool" element={<PrivateRoute><DashboardLayout><CarFillPage /></DashboardLayout></PrivateRoute>} />
      <Route path="/aitool" element={<PrivateRoute><DashboardLayout><CarFillPage /></DashboardLayout></PrivateRoute>} />
      {/* <Route path="/NewProject" element={<PrivateRoute><DashboardLayout><NewProject /></DashboardLayout></PrivateRoute>} /> */}
      <Route path="/myprojects" element={<PrivateRoute><DashboardLayout><MyProjects /></DashboardLayout></PrivateRoute>} />
      <Route path="/Subscription" element={<PrivateRoute><DashboardLayout><BillingSubscription /></DashboardLayout></PrivateRoute>} />
      <Route path="/customers" element={<PrivateRoute><DashboardLayout><Customers /></DashboardLayout></PrivateRoute>} />
      <Route path="/appointment" element={<PrivateRoute><DashboardLayout><Appointment /></DashboardLayout></PrivateRoute>} />
      <Route path="/WorkOrder" element={<PrivateRoute><DashboardLayout><WorkOrder /></DashboardLayout></PrivateRoute>} />
      <Route path="/BookingAppointment" element={<PrivateRoute><DashboardLayout><BookingAppointment /></DashboardLayout></PrivateRoute>} />
      <Route path="/VideoDelivery" element={<PrivateRoute><DashboardLayout><VideoDelivery /></DashboardLayout></PrivateRoute>} />
      <Route path="/Help" element={<PrivateRoute><DashboardLayout><SupportHelp /></DashboardLayout></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><DashboardLayout><Settings /></DashboardLayout></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><DashboardLayout><Notifications /></DashboardLayout></PrivateRoute>} />
      <Route path="/pricingPlan" element={<PrivateRoute><DashboardLayout><PricingPlan /></DashboardLayout></PrivateRoute>} />


      {/* Redirect Unknown Routes */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default ViewRoutes;
