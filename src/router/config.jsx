import DashboardLayout from '../layout/DashboardLayout';
import DefaultLayout from '../Layout/DefaultLayout';
import CarFillPage from '../pages/CarFillPage/Index';
import ConfirmBooking from '../pages/confirmBooking/confirmBooking';
import Appointment from '../pages/Dashboard/Appointment';
import BillingSubscription from '../pages/Dashboard/BillingSubscription';
import BookingAppointment from '../pages/Dashboard/BookingAppointment';
import Customers from '../pages/Dashboard/Customers';
import Notifications from '../pages/Dashboard/Notifications';
import Overview from '../pages/Dashboard/Overview';
import PricingPlan from '../pages/Dashboard/PricingPlan';
import Profile from '../pages/Dashboard/Profile';
import Settings from '../pages/Dashboard/Settings';
import SupportHelp from '../pages/Dashboard/SupportHelp';
// import VideoDelivery from '../pages/Dashboard/VideoDelivery';
import WorkOrder from '../pages/Dashboard/WorkOrder';
import ErrorPage from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import SucessfullUrl from '../pages/SucessfullUrl';

export const privateRoutes = [
  {
    path: '/dashboard',
    moduleName: 'Overview',
    element: (
      <DashboardLayout>
        <Overview />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/profile',
    moduleName: 'Profile',
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/tool',
    moduleName: 'Tool',
    element: (
      <DashboardLayout>
        <CarFillPage />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/aitool',
    moduleName: 'AI Tool',
    element: (
      <DashboardLayout>
        <CarFillPage />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/Subscription',
    moduleName: 'Billing & Subscription',
    element: (
      <DashboardLayout>
        <BillingSubscription />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/customers',
    moduleName: 'Customers',
    element: (
      <DashboardLayout>
        <Customers />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/appointment',
    moduleName: 'Appointment',
    element: (
      <DashboardLayout>
        <Appointment />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/WorkOrder',
    moduleName: 'Work Order',
    element: (
      <DashboardLayout>
        <WorkOrder />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/BookingAppointment',
    moduleName: 'Booking Appointment',
    element: (
      <DashboardLayout>
        <BookingAppointment />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/Help',
    moduleName: 'Support & Help',
    element: (
      <DashboardLayout>
        <SupportHelp />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/settings',
    moduleName: 'Settings',
    element: (
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/notifications',
    moduleName: 'Notifications',
    element: (
      <DashboardLayout>
        <Notifications />
      </DashboardLayout>
    ),
    child: []
  },
  {
    path: '/pricingPlan',
    moduleName: 'Pricing Plan',
    element: (
      <DashboardLayout>
        <PricingPlan />
      </DashboardLayout>
    ),
    child: []
  }
];

export const publicRoutes = [
  {
    path: '/login',
    moduleName: 'Login',
    element: <Login />
  },
  {
    path: '/SignUp',
    moduleName: 'Sign Up',
    element: <SignUp />
  }
];

export const commonRoutes = [
  {
    path: '/',
    moduleName: 'Home',
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    )
  },
  {
    path: '/confirm-booking',
    moduleName: 'Confirm Booking',
    element: <ConfirmBooking />
  },
  {
    path: '/visualizer',
    moduleName: 'Car Visualizer',
    element: (
      <DefaultLayout>
        <CarFillPage />
      </DefaultLayout>
    )
  },
  {
    path: '/SucessfullUrl',
    moduleName: 'Success Page',
    element: <SucessfullUrl />
  },
  {
    path: '*',
    moduleName: 'Error Page',
    element: <ErrorPage />
  }
];
