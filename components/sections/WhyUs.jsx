import React from 'react'
import Image from 'next/image';
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react"


import SectionHeadingLeft from '../common/SectionHeadingLeft';

import whyUsImage from '@/public/images/why-us.png';

export default function WhyUs() {
    return (
        <div
            className='relative lg:flex pt-16 z-10 outline-none'
        >
            <div className='lg:w-1/2'>
                <SectionHeadingLeft
                    subtitle='Easy & Secure'
                    title='Why Choose Us? 🤩 🙌'
                    description='Experience secure, anonymous access—your privacy is our priority.  Unlock private Instagram profiles effortlessly with our trusted platform.'
                    className={'mb-5'}
                >
                </SectionHeadingLeft>
                <div className='text-lg text-primary px-4'>
                    <p className='mb-5'>{`🔒 Complete Privacy – We never share or store your personal data.`}</p>
                    <p className='mb-5'>{`⚡ Instant Access – Unlock the hidden posts and stories immediately after payment.`}</p>
                    <p className='mb-5'>{`🕵️‍♂️ 100% Anonymous – View content without anyone knowing.`}</p>
                    <p className='mb-5'>{`🌍 Trusted by Thousands – Join a large community of satisfied users.`}</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='flex justify-center lg:text-center lg:w-1/2'
                >
                    <Image
                        src={whyUsImage}
                        alt='Why Us'
                        height='auto'
                        priority // Prioritizes loading this image
                        loading="eager" // Disables lazy loading
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
