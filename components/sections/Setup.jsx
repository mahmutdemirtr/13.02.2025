'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

import setupShape from '@/public/images/setup-shape.png'
import setupShapeLg from '@/public/images/setup-shape-lg.png'
import setupButtonShape from '@/public/images/setup-button-shape.png'
import setupImage1 from '@/public/images/setup-step-1.png'
import setupImage2 from '@/public/images/setup-step-2.png'
import setupImage3 from '@/public/images/setup-step-3.png'
import SetupCard from '../cards/SetupCard';


export default function Setup() {
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

    const setups = [
        {
            title: 'Enter the Username of the Private Account',
            description: `If the account is in our system, we'll instantly show you photos and videos from their profile. 📸`,
            image: setupImage1
        }, {
            title: 'Answer a Few Questions',
            description: `If the account isn't found, our AI-powered system will ask a few questions to help fine-tune the search and give you better results. 🤖`,
            image: setupImage2
        }, {
            title: 'Enjoy Viewing the Account!',
            description: `Sit back, relax, and enjoy viewing their private content, all anonymously. 😎`,
            image: setupImage3
        },
    ];
    return (
        <div
            className='relative pt-16 lg:pt-32 z-10 outline-none'
        >
            {isMobile ? <Image
                src={setupShape}
                alt='shape'
                height='auto'
                className='absolute left-0 -top-12 lg:top-0 -z-10'
            /> : <Image
                src={setupShapeLg}
                alt='shape'
                height='auto'
                className='absolute left-0 top-0 -z-10'
            />}


            <SectionHeading
                subtitle='5 Min Setup'
                title='Unlock Instagram Profile in 3 Simple Steps 😊✨'
                description='Works on iPhone & Android!⏱️📱 Quick & Hassle-Free 😍'
            >
                <div className={`${ !isMobile ? 'flex mt-6' : '' }`}>
                    {setups && setups.map((setup, index) => (
                        <SetupCard
                            key={index}
                            index={index + 1}
                            title={setup.title}
                            desc={setup.description}
                            imageSrc={setup.image}
                        />
                    ))}
                </div>
                <Button
                    variant='white'
                    className='inline-block shadow-custom-inner mt-6 w-auto mx-auto px-16 h-16 text-xl'
                >Start Now 🚀</Button>
                <Image
                    src={setupButtonShape}
                    alt='shape'
                    height='auto'
                    className='absolute right-12 lg:right-[35%] -bottom-12  -z-10'
                />
            </SectionHeading>
        </div>
    );
}
