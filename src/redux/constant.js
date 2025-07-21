// StaggingBaseURLS
export const baseURL = 'https://prod.carwrapvisualizer.com';
// export const baseURL = 'http://localhost:8000';

const v = 'api/v1';

// EndPoints
export const endPoints = {
  /*********************** Auth End Points Start *************************/
  login: `${baseURL}/${v}/auth/login`,
  forgotPasswordRequest: `${baseURL}/${v}/auth/forgot-password-request`,
  signup: `${baseURL}/${v}/auth/sign-up`,
  verifyOtp: `${baseURL}/${v}/auth/verify-otp`,
  resendOtp: `${baseURL}/${v}/auth/resend-otp`,
  userInfo: `${baseURL}/${v}/auth/user-info`,
  userUpdate: `${baseURL}/${v}/auth/update-user`,
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
  deleteShopManUser: `${baseURL}/${v}/auth/delete-user`,
  resetPasswordRequest: `${baseURL}/${v}/auth/reset-password-request`,
  resetPassword: `${baseURL}/${v}/auth/reset-password`,
  usersList: `${baseURL}/${v}/auth/users-list`,
  updateBooking: `${baseURL}/${v}/auth/users-list`,
  getPublicBooking: `${baseURL}/${v}/public/get-booking`,
  updateBookingStatus: `${baseURL}/${v}/public/update-booking-status`,
  updateBookingDetails: `${baseURL}/${v}/user/booking`,
  uploadBookingImgsAPIFn: `${baseURL}/${v}/user/images/upload-booking`
};
