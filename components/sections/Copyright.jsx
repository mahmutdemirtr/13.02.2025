import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import goArrowUpLeft from '@/public/images/go-up-left.svg'


export default function Copyright() {
  return (
    <div className='lg:flex lg:justify-between bg-primary p-6 text-center text-lg font-thin text-white'>
      <p>© Copywriting 2024. All Rights Reserved</p>
      <Link
        href={'/'}
        className='flex justify-center items-center mt-2'
      >Terms And Condition
        <Image
          src={goArrowUpLeft}
          className=''
          alt='bg'
          height='auto'
        />
      </Link>
    </div>
  )
}
