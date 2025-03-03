'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../loading';
import { Input } from '@/components/ui/input';
import SearchResultsCard from '@/components/search/SearchResultsCard';
import axiosInstance from '@/lib/axios';
import crossCircled from '@/public/images/cross-circle.png';
import { setUserData, setUsername as setReduxUsername } from '@/features/instaData/instaDataSlice'; // Renamed Redux action

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const queryUsername = searchParams.get('username');
  const [localUsername, setLocalUsername] = useState(queryUsername || ''); // Renamed local state
  const [loading, setLoading] = useState(true);

  // Redux state and dispatch
  const userData = useSelector((state) => state.instaData.userData);
  const dispatch = useDispatch();

  // Store username in the backend
  const storeUsername = (username) => {
    axiosInstance
      .post('/api/store_username/', {
        username: username,
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(setReduxUsername(username)); // Use renamed Redux action
      })
      .catch((err) => console.error(err));
  };

  // Scrape data from the backend
  const scrapeData = () => {
    axiosInstance
      .get('/api/scrape')
      .then((res) => {
        // Update Redux state with the new user data
        dispatch(
          setUserData({
            posts: res.data.posts,
            followers: res.data.followers,
            following: res.data.following,
            image_url: res.data.profile_image_url,
            full_name: res.data.full_name,
            username: localUsername, // Use localUsername here
          })
        );
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // Fetch data on component mount
  useEffect(() => {
    if (localUsername) {
      storeUsername(localUsername);
      scrapeData();
    }
  }, []); // Add localUsername as a dependency

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]">
      <div className="max-w-[430px] mx-auto relative pb-4">
        <div className="relative w-3/4 mx-auto py-28">
          <Input
            type="email"
            placeholder="@"
            className="p-6 shadow-lg"
            onChange={(e) => setLocalUsername(e.target.value)} // Use local state updater
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                setLoading(true);
                storeUsername(localUsername); // Use localUsername
                scrapeData();
              }
            }}
            disabled={loading}
            value={localUsername} // Use localUsername
          />
          <button
            onClick={() => setLocalUsername('')} // Use local state updater
            aria-label="Clear input"
            className="absolute right-4 top-[calc(50%-10px)] text-primary"
          >
            <Image src={crossCircled} alt="" className="text-xl" height={'auto'} />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6">
          {!loading ? (
            <>
              <SearchResultsCard userData={userData} />
            </>
          ) : (
            <Loader loadingType="fetchLoader" />
          )}
        </div>
      </div>
    </div>
  );
}