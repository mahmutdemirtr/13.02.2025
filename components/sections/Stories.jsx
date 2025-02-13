'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';


import storyImage from '@/public/images/story-image.png';
import storyImageLg from '@/public/images/story-image-lg.png';
import storyShape from '@/public/images/story-shape.png';
import storyButtonShape from '@/public/images/story-button-shape.png';
import SectionHeading from '../common/SectionHeading';
import Link from 'next/link';
import SectionHeadingLeft from '../common/SectionHeadingLeft';


export default function Stories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint is 768px
    };

    // Set initial value
    handleResize();

    // Add event listener on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className='flex flex-col relative pt-16 z-10 outline-none w-full overflow-hidden lg:flex-row-reverse lg:items-center'
    >

      <Image
        src={storyShape}
        alt='shape'
        height='auto'
        className='absolute right-0 -top-12 mb-2 -z-10'
      />
      {isMobile ? <SectionHeading
        subtitle='Story Capture'
        title='Tired of Screenshotting Instagram Stories? 😩📸'
        description='Say goodbye to screenshots! 🚫 With our site, you can view, download, and save Instagram stories and pics—100% anonymously and hassle-free. 😎 Save the hassle and keep the memories—view Instagram Stories privately and securely without screenshotting. Enjoy seamless access to the content you love, anytime!'
      >
        <Link
          href={'/'}
        >
          <Button
            variant='white'
            className='inline-block shadow-custom-inner mt-6 w-auto mx-auto px-16 h-16 text-xl'
          >View Stories 🔥</Button>
        </Link>

        <Image
          src={storyButtonShape}
          alt='shape'
          height='auto'
          className='absolute right-8 -bottom-12 mb-2 -z-10'
        />
      </SectionHeading> : <SectionHeadingLeft
        subtitle='Story Capture'
        title='Tired of Screenshotting Instagram Stories? 😩📸'
        description='Say goodbye to screenshots! 🚫 With our site, you can view, download, and save Instagram stories and pics—100% anonymously and hassle-free. 😎 Save the hassle and keep the memories—view Instagram Stories privately and securely without screenshotting. Enjoy seamless access to the content you love, anytime!'
        className='w-1/2 pr-6 relative'
      >
        <Link
          href={'/'}
        >
          <Button
            variant='white'
            className='inline-block shadow-custom-inner mt-6 w-auto mx-auto px-16 h-16 text-xl'
          >View Stories 🔥</Button>
        </Link>

        <Image
          src={storyButtonShape}
          alt='shape'
          height='auto'
          className='absolute left-1/3 -bottom-12 mb-2 -z-10'
        />
      </SectionHeadingLeft>}
      {isMobile ?
        <div className='flex justify-center pt-16'>
          <Image
            src={storyImage}
            alt='shape'
            height='auto'
            className='lg:w-3/4'
          />
        </div>
        :
        <div className='flex justify-center items-center w-1/2'>
          <Image
            src={storyImageLg}
            alt='shape'
            height='auto'
            className='lg:w-3/4'
          />
        </div>
      }

    </div>
  );
}
