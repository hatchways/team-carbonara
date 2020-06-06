import React, { useState } from 'react';
import useStylesCheckout from './stylesCheckout';
import { Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Checkout.css';

function Checkout({ user, setUser }) {
  const classes = useStylesCheckout();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  function stripePaymentMethodHandler(paymentMethod) {
    setLoading(true);

    fetch(`/api/subscription/${user.sub}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        payment_method: paymentMethod.id,
      }),
    })
      .then((res) => res.json())
      .then((subscription) => {
        setLoading(false);
        const { latest_invoice } = subscription;
        const { payment_intent } = latest_invoice;

        if (payment_intent) {
          const { client_secret, status } = payment_intent;

          if (status === 'requires_action') {
            stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                // Display error message in your UI.
                // The card was declined (i.e. insufficient funds, card has expired, etc)
                setErrors(result.error);
              } else {
                // Show a success message to your customer
                setSuccess(true);
              }
            });
          } else {
            //render subscription status on client side
            const updatedUser = user;
            updatedUser.subscriber = true;
            setUser(updatedUser);

            // No additional information was needed
            // Show a success message to your customer
            setSuccess(true);
          }
        }
      });
  }

  async function handleCheckout(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    await stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: user.email,
        },
      })
      .then((result) => {
        const { paymentMethod, error } = result;
        if (!error) {
          stripePaymentMethodHandler(paymentMethod);
        }
        setErrors(error);
      });
  }

  return (
    <main className={classes.checkoutContainer}>
      <form onSubmit={handleCheckout}>
        <Paper elevation={6} className={classes.checkout}>
          <div className={classes.checkoutText}>
            <Typography align="center" variant="h4">
              Subscription
            </Typography>
            <Typography align="center" variant="body1">
              Complete the form below to subscribe to our premium plan.
            </Typography>
            {success ? (
              <Typography align="center" className={classes.successMessage} variant="h6" color="primary">
                Thank you! You are subscribed.
              </Typography>
            ) : null}
          </div>
          {errors ? (
            <Typography align="center" color="error">
              {errors.message}
            </Typography>
          ) : (
            <p> </p>
          )}
          <div className={classes.cardForm}>
            <label>Enter Card Information</label>
            <div className={classes.cardInput}>
              <CardElement
                className="card-Element"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <div className={classes.loaderContainer}>
              <CircularProgress size={38} className={classes.loader} />
            </div>
          ) : (
            <Button
              disabled={!stripe || isLoading === true}
              size="large"
              variant="contained"
              className={classes.submitBtn}
              type="submit"
            >
              Checkout
            </Button>
          )}
        </Paper>
      </form>
    </main>
  );
}

export default Checkout;
