'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import doneRing from '@/public/images/done-ring-round.svg';
import paymentMethods from '@/public/images/payment-methods.png';
import Link from 'next/link';



export default function Pricing() {
    const [activePlan, setActivePlan] = useState('monthly');

    return (
        <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
            <div className='pt-16 text-white px-6'>
                <div>
                    <h2 className='flex items-center text-3xl font-extrabold italic mb-2'>
                        Plans and Pricing
                        <Image
                            src={doneRing}
                            alt='icon'
                            className='ml-1'
                        />
                    </h2>
                    <p className='pl-4 font-medium'>Choose the plan that best fits your needs. Explore our flexible packages at affordable rates and get started today.</p>
                </div>
                <div className='mt-8 px-6'>
                    <h2 className='inline-block leading-tight text-[60px] font-extrabold'>
                        {activePlan === 'monthly' ? '9.90' : '94.90'}
                        <span className='text-3xl'>$/</span>
                        <span className='text-lg'>mo</span></h2>
                    <div
                        className='w-full font-bold text-2xl text-primary'
                    >
                        <div
                            className={`relative flex w-full shadow-custom-shadow-3 rounded-full bg-white font-bold text-2xl text-primary outline-none z-10 after:absolute after:transition after:duration-500 after:top-0 after:bg-primary  after:h-full after:w-1/2 after:-z-10 after:rounded-full after:content-[""] ${activePlan === 'monthly' ? 'after:-left-px' : 'after:-right-px'}`}
                        >
                            <button
                                onClick={() => setActivePlan('monthly')}
                                className={`w-1/2 py-3 text-center relative rounded-full z-20 ${activePlan === 'monthly' ? 'text-white shadow-lg' : ''}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setActivePlan('yearly')}
                                className={`w-1/2 py-3 text-center relative rounded-full z-20 ${activePlan === 'yearly' ? 'text-white shadow-lg' : ''}`}
                            >
                                Yearly
                                {activePlan === 'monthly' && <p className='absolute h-5 bg-primary p-1 text-white leading-3 rounded-2xl text-xs right-1/2 -mr-[27px] -bottom-2.5'>20% Off</p>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='px-6 mt-12'>
                    <h4 className='text-2xl font-extrabold mb-6'>Why Choose Us?</h4>
                    <div className='font-bold flex flex-col gap-3'>
                        <p>🔒 Complete Privacy – We never share or store your personal data.</p>
                        <p>⚡ Instant Access – Unlock the hidden posts and stories immediately after payment.</p>
                        <p>🕵️‍♂️ 100% Anonymous – View content without anyone knowing.</p>
                        <p>🌍 Trusted by Thousands – Join a large community of satisfied users.</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <Link
                            href={'/pricing-plans/add-card'}
                        >
                            <Button
                                variant='white'
                                className='w-72 py-6 mt-9'
                            >
                                Next
                            </Button>
                        </Link>

                        <p className='my-4 text-primary-dark'>Payment Methods</p>
                        <Image
                            src={paymentMethods}
                            alt='Payment Methods'
                        />
                        <p className='mt-4 text-[10px] font-medium text-primary-dark'>We accept Visa, American Express, Mastercard, Paypal and Crypto</p>
                    </div>
                </div>
            </div>
        </div>
    );
}