import React from "react";
import Navbar from "./Navbar";
import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const fetchClientSecret = useCallback(() => {
      // Create a Checkout Session
      return fetch("http://localhost:5001/create-checkout-session", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
    <>
     <Navbar/>
     <div id="checkout" className="stripPaymentBody">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

    </>
     
    )
  }

  export default CheckoutForm;