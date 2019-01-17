import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';

class CheckoutWrapper extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_U7iQdEpUOAA2xXZxJtFZlwaj">
        <div className="example">
          <Elements>
            <Checkout />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutWrapper;