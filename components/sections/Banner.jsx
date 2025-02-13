'use client';
import React, { useEffect, useState } from 'react';
import * as motion from "motion/react-client";

import Image from 'next/image';

import Navbar from '../nav/Navbar';



import rocket from '@/public/images/rocket.svg';
import eyes from '@/public/images/eyes.svg';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

import crossCircled from '@/public/images/cross-circle.png';
import bannerImage from '@/public/images/banner-mobile.png';
import bannerImageLg from '@/public/images/banner-desktop.png';
import desktopBannerShape1 from '@/public/images/desktop-banner-shape-1.png';
import desktopBannerShape2 from '@/public/images/desktop-banner-shape-2.png';


export default function Banner() {
    const [username, setUsername] = useState('')
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
        <div className='relative pb-4 h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]'>
            {/* <Navbar /> */}
            <div className='flex flex-col h-full lg:flex-row lg:items-center lg:px-8'>
                <div className='lg:w-1/2 h-full flex justify-center items-center text-center lg:items-start lg:text-left flex-col mt-6'>
                    <h4 className='flex gap-1 text-secondary-light text-xl font-bold italic'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                            }}
                        >
                            <Image
                                src={rocket}
                                className=''
                                alt='bg'
                                height='auto'
                            />
                        </motion.div>

                        Unlock the Secrets Now!
                    </h4>

                    <h2 className='text-4xl font-bold py-4 text-white'>Unlock Any Private <br />Instagram Profile </h2>
                    <div className='py lg:flex'>
                        <p className='text-xl text-white'>See Private Profiles—No Tricks,</p>
                        <p className='inline-flex text-xl text-white'>Just Simple Steps!
                            <Image
                                src={eyes}
                                className='ml-2 h-auto w-auto'
                                alt='bg'
                            />
                        </p>
                    </div>
                    <div className='w-3/4 mt-6 lg:flex'>
                        <div className='relative w-full'>
                            <Input
                                type='email'
                                placeholder="@"
                                className='p-6 shadow-lg'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                            <button
                                onClick={() => setUsername('')}
                                className='absolute h-10 w-10 flex items-center justify-end right-4 top-1 mt-px text-primary'
                                aria-label="Clear input"
                            >
                                <Image
                                    src={crossCircled}
                                    alt=''
                                    className='text-xl'
                                    height={'auto'} />
                            </button>
                            {!isMobile &&
                                <>
                                    <Image
                                        src={desktopBannerShape2}
                                        alt=''
                                        height={'auto'}
                                        className='absolute left-0 -bottom-32'
                                    />

                                    <Image
                                        src={desktopBannerShape1}
                                        alt=''
                                        height={'auto'}
                                        className='absolute -right-14 -bottom-32'
                                        />
                                </>
                            }
                        </div>
                        <Link
                            href={`/search?username=${encodeURIComponent(username)}`}
                        >
                            <Button
                                variant='secondary'
                                className='w-full shadow-lg rounded-full mt-4 lg:mt-0 lg:ml-2 lg:h-[50px] p-6 text-lg font-bold hover:bg-primary'
                            >🔓 Unlock Now</Button>
                        </Link>
                    </div>

                </div>
                <div
                    className='w-full lg:w-1/2 flex justify-center'
                >
                    {isMobile ? (
                        <Image
                            src={bannerImage}
                            className='mt-12 pb-6 min-w-3/4 h-auto lg:w-full'
                            alt='banner mobile image'
                            priority // Prioritizes loading this image
                            loading="eager" // Disables lazy loading
                        />
                    ) : (
                        <Image
                            src={bannerImageLg}
                            className='mt-12 pb-6 min-w-3/4 h-auto lg:w-full'
                            alt='banner mobile image'
                            priority // Prioritizes loading this image
                            loading="eager" // Disables lazy loading
                        />
                    )}

                </div>
            </div>
        </div>
    );
}
