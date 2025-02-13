'use client';

import SubmitLoader from '@/components/loader/SubmitLoader';
import { Checkbox } from '@/components/ui/checkbox-lg';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useEmail } from '@/components/context/EmailContext';
import axiosInstance from '@/lib/axios';

export default function page() {
    const router = useRouter();
    const { email } = useEmail();

    const [renderSubmitLoader, setRenderSubmitLoader] = useState(false);
    const [step, setStep] = useState(1);
    const [stepDataStore, setStepDataStore] = useState({
        gender: '',
        age: '',
        instaActivity: '',
        device: '',
        platform: ''
    });

    let stepperWidth = (step / 5) * 100;

    const stepData = [
        {
            stepCount: 1,
            title: 'Are they male or female?',
            field: 'gender',
            options: [
                'Male 👨',
                'Female 👩',
                'Other 🌈',
                'Not sure 🤔'
            ]
        },
        {
            stepCount: 2,
            title: 'How old are they?',
            field: 'age',
            options: [
                'Under 18 👶',
                '18-24 🎓',
                '25-34 👔',
                '35+ 🎉'
            ]
        },
        {
            stepCount: 3,
            title: 'How often do you think they are active on Instagram?',
            field: 'instaActivity',
            options: [
                'Daily 📅',
                'Weekly 📆',
                'Monthly 🌙',
                'Rarely 🌵'
            ]
        },
        {
            stepCount: 4,
            title: 'What device do they use for Instagram?',
            field: 'device',
            options: [
                'iPhone 📱',
                'Android phone 🤖',
                'Tablet 📲',
                'Not sure 🤷'
            ]
        },
        {
            stepCount: 5,
            title: 'Which platform do they use most after Instagram?',
            field: 'platform',
            options: [
                'TikTok 🎶',
                'Snapchat 👻',
                'Facebook 📘'
            ]
        },
    ];

    const currentStep = stepData.find((data) => data.stepCount === step);

    const handleOptionChange = (option) => {
        // Update the corresponding field in stepDataStore
        setStepDataStore((prev) => ({
            ...prev,
            [currentStep.field]: option
        }));
    };

    const handleNextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            setRenderSubmitLoader(true);
        }
    };

    useEffect(() => {
        if (renderSubmitLoader && step === 5) {
            console.log(stepDataStore)
            axiosInstance.post('/api/surveys/', {
                email: email,
                gender: stepDataStore.gender,
                age: stepDataStore.age,
                insta_activity: stepDataStore.instaActivity,
                device_used: stepDataStore.device,
                most_used_app_after_insta: stepDataStore.platform,
            })
                .then((res) => router.push('/profile'))
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [renderSubmitLoader, stepDataStore, email, router]);

    const renderOptions = currentStep.options.map((option) => (
        <div
            key={option}
            className='w-full flex justify-between items-center min-h-16 px-4 shadow-md rounded-lg mt-6 font-extrabold text-lg italic bg-white'
            onClick={() => {
                handleOptionChange(option);
                handleNextStep();
            }}
        >
            <label>{option}</label>
            <Checkbox checked={stepDataStore[currentStep.field] === option} />
        </div>
    ));

    return (
        <>
            {renderSubmitLoader ? <SubmitLoader onComplete={() => router.push('/profile')} />
                : <div className='max-w-[767px] mx-auto relative py-16 px-6 bg-gradient-to-br from-[#FFE6E6] to-[#E1AFD1] min-h-screen w-full'>
                    <div className='px-6 text-primary'>
                        <div>
                            <h4 className='text-2xl font-bold italic text-center mb-4'>Step {step} of 5</h4>
                            <div className='relative h-2 flex justify-between w-full rounded-full bg-[#CC9FBD] shadow'>
                                <div
                                    style={{ width: `${stepperWidth}%` }}
                                    className={`absolute left-0 top-0 z-20 h-full rounded-full ease-linear duration-500 bg-gradient-to-r from-[#AD88C6] to-[#7469B6]`}>
                                </div>
                                <div className='relative w-1/5'>
                                    <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-light'></span>
                                </div>
                                <div className='relative w-1/5'>
                                    <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-light'></span>
                                </div>
                                <div className='relative w-1/5'>
                                    <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-light'></span>
                                </div>
                                <div className='relative w-1/5'>
                                    <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-light'></span>
                                </div>
                                <div className='relative w-1/5'>
                                    <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-light'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-12 px-2 text-primary'>
                        <h2 className='text-2xl px-6 font-extrabold italic text-center mb-8'>{currentStep.title}</h2>
                        <div className='flex flex-col'>
                            <div>{renderOptions}</div>
                        </div>
                    </div>
                </div>}
        </>
    );
}
