import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../styles/fundraiserDtl.css';
import { toast } from 'react-toastify';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  let convertDollarIntoCents = parseInt(props.price) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:5200/payment', {
          amount: convertDollarIntoCents,
          id,
        });

        if (response.data.success) {
          toast.success('Your payment was successful');
        } else {
          toast.error('Your payment failed');
        }
      } catch (error) {
        console.log('Error', error);
        toast.error('Your payment failed');
      }
    } else {
      console.log(error.message);
      toast.error('Your payment failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS}></CardElement>
          </div>
        </fieldset>
        <button className="goPayButton">GoPay</button>
      </form>
    </>
  );
}
