'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';


import { Button } from '../ui/button';
import SectionHeading from '../common/SectionHeading';

import innerLeftShape from '@/public/images/inner-circle-left-shape.png';
import innerLeftShapeLg from '@/public/images/inner-circle-left-shape-lg.png';
import innerRightShape from '@/public/images/inner-circle-right-shape.png';
import innerRightShapeLg from '@/public/images/inner-circle-right-shape-lg.png';


export default function InnerCircles() {
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
            className='relative lg:pb-16 pt-16 z-10 outline-none w-full'
        >
            {
                !isMobile ?
                    <> <Image
                        src={innerLeftShapeLg}
                        alt='shape'
                        height='auto'
                        className='w-56 absolute left-0 top-0 -z-10'
                    />
                        <Image
                            src={innerRightShapeLg}
                            alt='shape'
                            height='auto'
                            className='w-56 absolute right-0 top-0 -z-10'
                        />
                    </> :
                    <> <Image
                        src={innerLeftShape}
                        alt='shape'
                        height='auto'
                        className='absolute left-0 top-16 mt-2 -z-10'
                    />
                        <Image
                            src={innerRightShape}
                            alt='shape'
                            height='auto'
                            className='absolute right-0 bottom-24 mb-2 -z-10'
                        />
                    </>
            }

            <div className='lg:w-4/6 lg:mx-auto'>
                <SectionHeading
                    subtitle='Inner Circles'
                    title='Wonder What They’re Posting Privately? 🤔'
                    description='Discover private Instagram stories and posts—no need to ask for follows! 👀 Get the full view instantly, 100% anonymously. Unlock access to hidden moments and see what you’ve been curious about, completely under the radar. Experience the freedom to view private posts with no notifications or alerts sent. Stay in the know while keeping your identity discreet and secure.'
                >
                    <Link href={'/'}>
                        <Button
                            variant='white'
                            className='inline-block shadow-custom-inner mt-6 w-auto mx-auto px-16 h-16 text-xl'
                        >See It Now 👀</Button>
                    </Link>
                </SectionHeading>
            </div>
        </div>
    );
}
