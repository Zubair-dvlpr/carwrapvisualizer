// src/StripeProvider.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RQUAw2NiBmr6ASCH3xb9IrLh6svZ5piCckR51tzzOCtRstVb3zBmU8kIk1A1vB9aCXWBCtAI0RZwIl9yuf8pntH003tVHyojP');

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
