"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '@/lib/axios';
import outlineCancel from '@/public/images/outline-cancel.svg';
import paymentMethods from '@/public/images/payment-methods.png';

const stripePromise = loadStripe("pk_test_51PDMxxHvA8h6eG8EFRCNngzmZtH3bKsJeLYdZgu9geWYPk0AsdzRuYACz4Aj1XD4rgcyEaFHslO26oFB2MKgtzGF000wZgaXb5");

export default function AddCard() {
  return (
    <Elements stripe={stripePromise}>
      <AddCardForm />
    </Elements>
  );
}

function AddCardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardHolderName, setCardHolderName] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardNumberElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    axiosInstance.post('/api/pay/', {
      payment_method_id: paymentMethod.id,
      card_holder_name: cardHolderName,
    })
      .then(res => {
        console.log(res.data);
        router.push('/');
      })
      .catch(err => setError(err.response?.data?.error || 'Payment failed'));
    setLoading(false);
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br text-white from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
      <div className='pt-16 px-6'>
        <div className='flex items-center justify-between text-sm pb-10 font-bold'>
          <h4 className='text-xl'>Add New Card</h4>
          <button onClick={() => router.back()} aria-label="Close">
            <Image src={outlineCancel} alt='Cancel' height={'auto'} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Card Holder Name */}
          <div>
            <label className='font-medium'>Card Holder’s Name</label>
            <Input
              className='h-[45px] mt-2 p-4 shadow-custom-inner-2'
              placeholder='Name on Card'
              required
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </div>

          {/* Stripe Card Elements */}
          <div>
            <label className='font-medium'>Card Number</label>
            <div className='h-[45px] mt-2 p-4 bg-white rounded-md shadow-custom-inner-2'>
              <CardNumberElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
          </div>

          {/* Expiry Date and CVC */}
          <div className='flex justify-between space-x-4'>
            <div className='flex-1'>
              <label className='font-medium'>Expiry Date</label>
              <div className='h-[45px] mt-2 p-4 bg-white rounded-md shadow-custom-inner-2'>
                <CardExpiryElement options={{ style: { base: { fontSize: '16px' } } }} />
              </div>
            </div>
            <div className='flex-1'>
              <label className='font-medium'>CVC</label>
              <div className='h-[45px] mt-2 p-4 bg-white rounded-md shadow-custom-inner-2'>
                <CardCvcElement options={{ style: { base: { fontSize: '16px' } } }} />
              </div>
            </div>
          </div>
          <div className='flex justify-between mx-4 mt-10 text-xl'>
              <p>Total</p>
              <p>9.90 $</p>
          </div>
          <div className='flex items-start'>
            <Checkbox className='mt-1 mr-2' required />
            <label>
              By selecting this payment method, you agree to the monthly automatic deduction of the subscription fee.
              If you wish to cancel your subscription, please contact us via email.
            </label>
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* Confirm Button */}
          <div className='flex flex-col items-center'>
            <Button type='submit' variant='white' className='w-72 py-6' disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Payment'}
            </Button>
            <p className='my-4 text-primary-dark'>Payment Methods</p>
            <Image src={paymentMethods} alt='Payment Methods' />
            <p className='mt-4 text-[10px] font-medium text-primary-dark'>
              We accept Visa, American Express, Mastercard, Paypal, and Crypto.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}