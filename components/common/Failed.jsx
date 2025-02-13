import Image from 'next/image'
import React from 'react'
import crossLg from '@/public/images/cross-lg.png';

export default function Failed() {
    return (
        <div className='relative pb-4 bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
            <div className='h-screen flex flex-col items-center justify-center text-white text-lg'>
                <Image
                    src={crossLg}
                    alt='icon'
                />
                <p className='font-bold mt-6'>Your order is failed</p>
            </div>
        </div>
    );
}