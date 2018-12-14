import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;