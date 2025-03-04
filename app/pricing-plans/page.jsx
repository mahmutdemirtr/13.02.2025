'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import doneRing from '@/public/images/done-ring-round.svg';
import paymentMethods from '@/public/images/payment-methods.png';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalMonthCount, setTotalPriceCount } from '@/features/PricingPlan/PricingPlanSlice'; // Import the actions

export default function Pricing() {
  const totalMonthCount = useSelector((state) => state.priceCount.totalMonthCount);
  const totalPriceCount = useSelector((state) => state.priceCount.totalPriceCount);

  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.post("/api/check_subscription/", { email: userData.email })
      .then(res => {
        if (res.data.is_subscribed) {
          router.push("/");  // Redirect home if already subscribed
        }
      })
      .catch(err => console.error("Error checking subscription", err));
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]">
      <div className="max-w-[430px] mx-auto relative pb-4">
        <div className="pt-16 text-white px-6">
          <div>
            <h2 className="flex items-center text-3xl font-extrabold italic mb-2">
              Plans and Pricing
              <Image src={doneRing} alt="icon" className="ml-1" />
            </h2>
            <p className="pl-4 font-medium">
              Choose the plan that best fits your needs. Explore our flexible packages at affordable rates and get started today.
            </p>
          </div>
          <div className="mt-8 px-6">
            <h2 className="inline-block leading-tight text-[60px] font-extrabold">
              {totalPriceCount.toFixed(2)}
              <span className="text-3xl">$/</span>
              <span className="text-lg">mo</span>
            </h2>
            <div className="w-full font-bold text-2xl text-primary">
              <div
                className={`relative flex w-full shadow-custom-shadow-3 rounded-full bg-white font-bold text-2xl text-primary outline-none z-10 after:absolute after:transition after:duration-500 after:top-0 after:bg-primary  after:h-full after:w-1/2 after:-z-10 after:rounded-full after:content-[""] ${
                  totalMonthCount === 1 ? 'after:-left-px' : 'after:-right-px'
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(setTotalMonthCount(1)); // Set month count to 1 (monthly)
                    dispatch(setTotalPriceCount(9.99)); // Set price to 9.99
                  }}
                  className={`w-1/2 py-3 text-center relative rounded-full z-20 ${
                    totalMonthCount === 1 ? 'text-white shadow-lg' : ''
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    dispatch(setTotalMonthCount(12)); // Set month count to 12 (yearly)
                    dispatch(setTotalPriceCount(94.90)); // Set price to 94.90
                  }}
                  className={`w-1/2 py-3 text-center relative rounded-full z-20 ${
                    totalMonthCount === 12 ? 'text-white shadow-lg' : ''
                  }`}
                >
                  Yearly
                  {totalMonthCount === 1 && (
                    <p className="absolute h-5 bg-primary p-1 text-white leading-3 rounded-2xl text-xs right-1/2 -mr-[27px] -bottom-2.5">
                      20% Off
                    </p>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="px-6 mt-12">
            <h4 className="text-2xl font-extrabold mb-6">Why Choose Us?</h4>
            <div className="font-bold flex flex-col gap-3">
              <p>🔒 Complete Privacy – We never share or store your personal data.</p>
              <p>⚡ Instant Access – Unlock the hidden posts and stories immediately after payment.</p>
              <p>🕵️‍♂️ 100% Anonymous – View content without anyone knowing.</p>
              <p>🌍 Trusted by Thousands – Join a large community of satisfied users.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Link
                href={{
                  pathname: '/pricing-plans/add-card',
                  query: { plan: totalMonthCount === 1 ? 'monthly' : 'yearly' },
                }}
              >
                <Button variant="white" className="w-72 py-6 mt-9">
                  Next
                </Button>
              </Link>

              <p className="my-4 text-primary-dark">Payment Methods</p>
              <Image src={paymentMethods} alt="Payment Methods" />
              <p className="mt-4 text-[10px] font-medium text-primary-dark">
                We accept Visa, American Express, Mastercard, Paypal and Crypto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}