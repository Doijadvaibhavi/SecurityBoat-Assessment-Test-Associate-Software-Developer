import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = ({ totalAmount, onToken }) => {
  const handleToken = (token) => {
    onToken(token);
  };

  return (
    <StripeCheckout
      stripeKey="your-stripe-public-key"
      token={handleToken}
      amount={totalAmount}
      name="Movie Ticket Booking"
      billingAddress
      shippingAddress
    />
  );
};

export default Checkout;
