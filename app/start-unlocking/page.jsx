import Image from 'next/image';
import React from 'react';

import startUnlockImage from '@/public/images/start-unlock-image.png'
import startUnlockShape from '@/public/images/start-unlock-shape.png'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function page() {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#FFE6E6] to-[#E1AFD1]'>
            <div className='max-w-[430px] mx-auto relative pb-4'>
                <div className='text-primary text-center pt-24 md:pt-14 px-4'>
                    <h2 className='text-3xl font-extrabold pb-4'>You’re Just a Few Steps Away! 🔓✨</h2>
                    <p className='text-base'>We haven’t unlocked this account before, but with a few quick answers, our AI can help you get access! Just answer the next few questions, and we’ll handle the rest. Ready to go? 🤖</p>
                </div>
                <div className='flex justify-center pt-10 md:pt-6 pb-2'>
                    <Image
                        src={startUnlockImage}
                        alt='Cover'
                        height='auto'
                    />
                </div> 
                <div className='flex justify-center'>
                   <Image
                        src={startUnlockShape}
                        alt='Shape'
                        height='auto'
                        className=''
                    />
                </div>
                <div className='relative flex justify-center z-10 mt-8 md:mt-6'>
                    <Link
                        href={'/unlock-steps'}
                        className='w-10/12'
                    >
                        <Button
                            variant='blue'
                            className='w-full'
                        >
                            Start Unlocking 🔓
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
