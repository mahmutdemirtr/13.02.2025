'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox"

import outlineCancel from '@/public/images/outline-cancel.svg';
import eyeOpened from '@/public/images/eye-opened.svg';
import eyeClosed from '@/public/images/eye-closed.svg';



import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import paymentMethods from '@/public/images/payment-methods.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function AddCard() {
  const router = useRouter();
  const [cvcInputOpen, setCvcInputOpen] = useState(false);

  const cveEyeHandler = (e) => {
    e.preventDefault();

    setCvcInputOpen(!cvcInputOpen);
  }

  return (
    <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br text-white from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
      <div className='pt-16 px-6'>
        <div className='flex items-center justify-between text-sm pb-10 font-bold'>
          <h4 className='text-xl'>Add New Card</h4>
          <button
            onClick={() => router.back()}
            aria-label="Clear input"
          >
            <Image src={outlineCancel} alt='' height={'auto'} />
          </button>
        </div>
        <div>
          <div>
            {/* Card Number  */}
            <div>
              <label className='font-medium'>Card Number</label>
              <Input
                className='h-[45px] mt-2 outline-none focus-visible:ring-none border-none p-4 py-6 shadow-custom-inner-2'
                placeholder='Enter 12 digit card number'
              />
            </div>
            {/* Validity CVC  */}
            <div className='flex items-end mt-4'>
              <div className='mr-2'>
                <label className='font-medium'>Valid Thru</label>
                <Select className='font-medium bg-white'>
                  <SelectTrigger className="w-[110px] h-[45px] mt-2 text-sm py-4 focus-visible:outline-none rounded-full text-gray-500 bg-white">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="june">June</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                      <SelectItem value="november">November</SelectItem>
                      <SelectItem value="december">December</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select className='font-medium bg-white'>
                  <SelectTrigger className="w-[110px] h-[45px] mt-2 text-sm py-4 focus-visible:outline-none rounded-full text-gray-500 bg-white">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                      <SelectItem value="2030">2030</SelectItem>
                      <SelectItem value="2031">2031</SelectItem>
                      <SelectItem value="2032">2032</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* CVC  */}
              <div className='relative ml-4'>
                <label className='font-medium'>CVC</label>
                <div className='relative'>
                  <Input
                    className='h-[45px] mt-2 outline-none focus-visible:ring-none border-none p-4 py-6 shadow-custom-inner-2'
                    placeholder='CVC'
                    type={cvcInputOpen ? 'text' : 'password'}
                  />
                  <div className='absolute right-4 bottom-1 text-2xl text text-gray-500'>
                    {cvcInputOpen ?
                      <button
                        onClick={(e) => cveEyeHandler(e)}
                      >
                        <Image
                          src={eyeOpened}
                          alt=''
                          className='text-xl'
                          height={'auto'} />
                      </button>
                      :
                      <button
                        onClick={(e) => cveEyeHandler(e)}
                      >
                        <Image
                          src={eyeClosed}
                          alt=''
                          className='text-xl'
                          height={'auto'} />
                      </button>
                    }
                  </div>
                </div>
              </div>


            </div>
            {/* Holder Name  */}
            <div className='mt-4'>
              <label className='font-medium'>Card Holder’s Name</label>
              <Input
                className='h-[45px] mt-2 outline-none focus-visible:ring-none border-none p-4 py-6 shadow-custom-inner-2'
                placeholder='Name on Card'
              />
            </div>
            <div className='mx-4 border-t-2 mt-10 border-dashed'></div>
            <div className='flex justify-between mx-4 mt-10 text-xl'>
              <p>Total</p>
              <p>9.90 $</p>
            </div>
            <div className='flex items-start mt-12 pr-6'>
              <Checkbox
                className='mt-1 mr-2'
              />
              <label>By selecting this payment method, you agree to the monthly automatic deduction of the subscription fee. If you wish to cancel your subscription, please contact us by sending an email</label>
            </div>
            <div className='flex flex-col items-center text-center mt-12'>
              <Button
                variant='white'
                className='w-72 py-6 mt-9'
              >
                Confirm
              </Button>
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
    </div>
  );
}
