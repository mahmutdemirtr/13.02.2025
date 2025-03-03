'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import profilePic from '@/public/images/profile-thumb.png';
import infoAltFill from '@/public/images/info-alt-fill.svg';
import iconGallery from '@/public/images/icon-gallery.svg';
import iconVideo from '@/public/images/icon-video.svg';
import iconMarks from '@/public/images/icon-marks.svg';
import GalleryItems from '@/components/Gallery/GalleryItems';
import axiosInstance from '@/lib/axios';
import Loader from '../../loading';
import { setUserData } from '@/features/instaData/instaDataSlice'; // Import Redux action

export default function Profile() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [loading, setLoading] = useState(false);

  // Redux state and dispatch
  const userData = useSelector((state) => state.instaData.userData);
  const isPaid = useSelector((state) => state.instaData.isPaid);
  const isUnlocked = useSelector((state) => state.instaData.isUnlocked);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router

  console.log(userData)
  // Fetch data from the backend
  const scrapeData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/scrape');
      dispatch(
        setUserData({
          posts: res.data.posts,
          followers: res.data.followers,
          following: res.data.following,
          image_url: res.data.profile_image_url,
          full_name: res.data.full_name,
          username: res.data.username,
        })
      );
    } catch (error) {
      console.error('Scrape Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      scrapeData();
    }
  }, []);

  // Redirect to '/start-unlocking' if isPaid is false after 5 seconds
  useEffect(() => {
    if (!isUnlocked) {
      const redirectTimer = setTimeout(() => {
        router.push('/start-unlocking'); // Redirect to '/start-unlocking'
      }, 5000); // 5000 milliseconds = 5 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(redirectTimer);
    }
  }, [isPaid, router]); // Add isPaid and router as dependencies

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]">
        <div className="flex flex-col gap-4 px-6 py-10">
          <Loader loadingType="fetchLoader" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]">
      <div className="max-w-[430px] mx-auto relative pb-4">
        <div className="flex flex-col gap-6 pt-16 px-5">
          <div className="w-full flex justify-center">
            <div className="relative w-[126px] h-[126px] rounded-full bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[3px]">
              {/* Profile Image Inside Gradient Border */}
              <Image
                src={userData?.image_url || profilePic}
                alt="profile pic"
                height={120}
                width={120}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-2xl font-extrabold">
              {userData?.full_name || 'Loading...'}
            </h4>
            <p className="font-bold">@{userData?.username || '...'}</p>
          </div>
          <div className="flex justify-between text-lg px-2">
            <button>
              <span className="font-bold">{userData?.posts || 0}</span> posts
            </button>
            <button>
              <span className="font-bold">{userData?.followers || 0}</span>{' '}
              followers
            </button>
            <button>
              <span className="font-bold">{userData?.following || 0}</span>{' '}
              following
            </button>
          </div>
          <div className="relative w-1/2 font-bold italic mx-auto text-center">
            <p>would you like to know who's also looked for this profile?</p>
            <Image
              src={infoAltFill}
              alt="icon"
              height={'auto'}
              className="absolute -right-5 -top-2"
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="w-full flex justify-between items-center p-0.5 mt-4">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'gallery' ? 'border-black' : 'border-theme-gray'
              } text-center`}
          >
            <Image src={iconGallery} alt="icon" height={'auto'} />
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'video' ? 'border-black' : 'border-theme-gray'
              } text-center`}
          >
            <Image src={iconVideo} alt="icon" height={'auto'} />
          </button>
          <button
            onClick={() => setActiveTab('marks')}
            className={`w-1/3 flex justify-center items-center h-12 border-b transition-colors ${activeTab === 'marks' ? 'border-black' : 'border-theme-gray'
              } text-center`}
          >
            <Image src={iconMarks} alt="icon" height={'auto'} />
          </button>
        </div>

        <GalleryItems isPaid={isPaid} isUnlocked={isUnlocked} />
      </div>
    </div>
  );
}