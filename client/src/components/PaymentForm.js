import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
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

  let convertPropsToNumber = parseInt(props.price);
  let convertCurrentAmountToNumber = parseInt(props.currentAmount);
  let convertBackersToNumber = parseInt(props.backers);
  let convertDollarIntoCents = parseInt(props.price) * 100;

  let today = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/payment', {
          amount: convertDollarIntoCents,
          id,
        });

        if (response.data.success) {
          toast.success('Your payment was successful');
          await fetch(`http://localhost:5200/fundraiser/change/${props.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              currentAmount:
                convertPropsToNumber + convertCurrentAmountToNumber,
              backers: convertBackersToNumber + 1,
            }),
          }).then((response) => response.json());
          await fetch(`http://localhost:5200/fundraiser/find/${props.id}`)
            .then((response) => response.json())
            .then((actualResponse) => props.setFundraiser(actualResponse));
          await fetch(
            `http://localhost:5200/fundraiser/prevDonation/add/${props.id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prevDonations: [
                  ...props.previousDonations,
                  {
                    sender: props.name,
                    amount: props.price,
                    date: today,
                  },
                ],
              }),
            }
          ).then((response) => response.json());
          await fetch(
            `http://localhost:5200/fundraiser/prevDonation/get/${props.id}`
          )
            .then((response) => response.json())
            .then((actualResponse) =>
              props.setPreviousDonations(actualResponse)
            );
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
