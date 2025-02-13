'use client';

import React, { useState } from 'react'
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'

import axiosInstance from '@/lib/axios';
import { useEmail } from '@/components/context/EmailContext';
import { useRouter } from 'next/navigation';


import crossCircled from '@/public/images/cross-circle.png'


export default function Unlock() {
    const { email, setEmail } = useEmail()
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        axiosInstance.post('/api/emails/', {
            email: email,
        })
        .then(res => router.push('/unlock-steps'))
        .catch(err => console.error(err))
    }

    return (
        <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
            <div className='pt-28'>
                <div className='flex flex-col gap-3 italic text-white items-center px-3 text-center'>
                    <h1 className='text-3xl font-extrabold'>Are You Ready? </h1>
                    <h4 className='text-lg font-bold'>Enter Your Email to Unlock the Account 🔓</h4>
                    <p className='text-base'>Subscribe now to discover easy and safe ways to view private Instagram accounts—100% anonymously and with no hassle. Your privacy is our priority! 💌</p>
                </div>
                <div className='flex flex-col items-center mt-8'>
                    <div className='relative w-3/4 mx-auto'>
                        <Input
                            type='email'
                            placeholder="@"
                            className='p-6 shadow-lg'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button
                            onClick={() => setEmail('')}
                            aria-label="Clear input"
                            className='absolute right-4 top-[calc(50%-10px)] text-primary'>
                            <Image
                                src={crossCircled}
                                alt=''
                                className='text-xl'
                                height={'auto'} />
                        </button>
                    </div>
                    <Button
                        variant='white'
                        className='w-72 py-6 mt-9'
                        onClick={handleClick}
                    >
                        🔓 Unlock Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
