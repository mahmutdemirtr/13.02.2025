'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

import profilePic from '@/public/images/profile-thumb.png';
import infoAltFill from '@/public/images/info-alt-fill.svg';
import iconGallery from '@/public/images/icon-gallery.svg';
import iconVideo from '@/public/images/icon-video.svg';
import iconMarks from '@/public/images/icon-marks.svg';
import GalleryItems from '@/components/Gallery/GalleryItems';

import { useInstaData, isPaid, isUnlocked } from '@/components/context/InstaDataContext';
import axiosInstance from '@/lib/axios';
import Loader from '../loading';

export default function Page() {
    const { userData, setUserData } = useInstaData();
    const [activeTab, setActiveTab] = useState('gallery');
    const [loading, setLoading] = useState(false);  
    const hasMounted = useRef(false);

    const scrapeData = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/api/scrape');
            setUserData({
                posts: res.data.posts,
                followers: res.data.followers,
                following: res.data.following,
                image_url: res.data.profile_image_url,
                full_name: res.data.full_name,
                username: res.data.username,
            });
        } catch (error) {
            console.error("Scrape Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userData || Object.keys(userData).length === 0) {
            scrapeData();
        }
    }, []);      

    if (loading) {
        return (
            <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
                <div className='flex flex-col gap-4 px-6 py-10'>
                    <Loader loadingType='fetchLoader'/>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]'>
            <div className='max-w-[430px] mx-auto relative pb-4'>
                <div className='flex flex-col gap-6 pt-16 px-5'>
                    <div className='w-full flex justify-center rounded-lg'>
                    <Image
                        src={userData?.image_url || profilePic}
                        alt='profile pic'
                        height={120}
                        width={120}
                        className="rounded-full"
                    />

                    </div>
                    <div className='flex flex-col'>
                        <h4 className='text-2xl font-extrabold'>{userData?.full_name || "Loading..."}</h4>
                        <p className='font-bold'>@{userData?.username || "..."}</p>
                    </div>
                    <div className='flex justify-between text-lg px-2'>
                        <button><span className='font-bold'>{userData?.posts || 0}</span> posts</button>
                        <button><span className='font-bold'>{userData?.followers || 0}</span> followers</button>
                        <button><span className='font-bold'>{userData?.following || 0}</span> following</button>
                    </div>
                    <div className='relative w-1/2 font-bold italic mx-auto text-center'>
                        <p>would you like to know who's also looked for this profile?</p>
                        <Image
                            src={infoAltFill}
                            alt='icon'
                            height={'auto'}
                            className='absolute -right-5 -top-2'
                        />
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className='w-full flex justify-between items-center p-0.5 mt-4'>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'gallery' ? 'border-black' : 'border-theme-gray'} text-center`}
                    >
                        <Image src={iconGallery} alt='icon' height={'auto'} />
                    </button>
                    <button
                        onClick={() => setActiveTab('video')}
                        className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'video' ? 'border-black' : 'border-theme-gray'} text-center`}
                    >
                        <Image src={iconVideo} alt='icon' height={'auto'} />
                    </button>
                    <button
                        onClick={() => setActiveTab('marks')}
                        className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'marks' ? 'border-black' : 'border-theme-gray'} text-center`}
                    >
                        <Image src={iconMarks} alt='icon' height={'auto'} />
                    </button>
                </div>

                <GalleryItems isPaid={isPaid} isUnlocked={isUnlocked} />
            </div>
        </div>
    );
}
