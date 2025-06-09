// StaggingBaseURLS
export const baseURL = 'http://localhost:8000';

const v = 'api/v1';

// EndPoints
export const endPoints = {
  /*********************** Auth End Points Start *************************/
  login: `${baseURL}/${v}/auth/login`,
  signup: `${baseURL}/${v}/auth/sign-up`,
  userInfo: `${baseURL}/${v}/auth/user-info`,
  fetchPlans: `${baseURL}/${v}/user/stripe/get-plans`,
  activeSubscription: `${baseURL}/${v}/user/stripe/subscriptions`,
  checkoutSession: `${baseURL}/${v}/user/stripe/checkout-session`,
  verifySession: `${baseURL}/${v}/user/stripe/verify-session`,
  getYears: `${baseURL}/${v}/user/tool/get-years`,
  getMakes: `${baseURL}/${v}/user/tool/get-makes`,
  getModels: `${baseURL}/${v}/user/tool/get-models`,
  generateCarImage: `${baseURL}/${v}/user/tool/generate-car-image`,
  bookingAppointment: `${baseURL}/${v}/user/booking`,
  appointmentDetail: `${baseURL}/${v}/user/booking/all`,
  addNewUser: `${baseURL}/${v}/auth/add-user`,
  usersList: `${baseURL}/${v}/auth/users-list`,
  updateBooking: `${baseURL}/${v}/auth/users-list`,
  getPublicBooking: `${baseURL}/${v}/public/get-booking`,
  updateBookingStatus: `${baseURL}/${v}/public/update-booking-status`,
  updateBookingDetails: `${baseURL}/${v}/user/booking`
};
