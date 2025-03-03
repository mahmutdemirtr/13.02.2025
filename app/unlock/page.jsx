'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';
import { setEmail } from '@/features/email/emailSlice'; // Import Redux action
import crossCircled from '@/public/images/cross-circle.png';

export default function Unlock() {
  const router = useRouter();
  const [error, setError] = useState([]);

  // Redux state and dispatch
  const email = useSelector((state) => state.email.email);
  const username = useSelector((state) => state.instaData.username);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    setError([]);
    axiosInstance
      .post('/api/emails/', {
        email: email,
      })
      .then((res) => router.push(`/profile/${username}`))
      .catch((err) => setError(err.response.data.email));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]">
      <div className="max-w-[430px] mx-auto relative pb-4">
        <div className="pt-28">
          <div className="flex flex-col gap-3 italic text-white items-center px-3 text-center">
            <h1 className="text-3xl font-extrabold">Are You Ready? </h1>
            <h4 className="text-lg font-bold">
              Enter Your Email to Unlock the Account 🔓
            </h4>
            <p className="text-base">
              Subscribe now to discover easy and safe ways to view private
              Instagram accounts—100% anonymously and with no hassle. Your privacy
              is our priority! 💌
            </p>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="relative w-3/4 mx-auto">
              <Input
                type="email"
                placeholder="@"
                className="p-6 shadow-lg"
                onChange={(e) => dispatch(setEmail(e.target.value))}
                value={email}
              />
              <button
                onClick={() => dispatch(setEmail(''))}
                aria-label="Clear input"
                className="absolute right-4 top-[calc(50%-10px)] text-primary"
              >
                <Image
                  src={crossCircled}
                  alt=""
                  className="text-xl"
                  height={'auto'}
                />
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <Button
              variant="white"
              className="w-72 py-6 mt-9"
              onClick={handleClick}
            >
              🔓 Unlock Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}