'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import Loader from '../loading'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation';

import SearchResultsCard from '@/components/search/SearchResultsCard';
import { useInstaData } from '@/components/context/InstaDataContext';
import axiosInstance from '@/lib/axios';

import crossCircled from '@/public/images/cross-circle.png'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryUsername = searchParams.get('username');
  const [username, setUsername] = useState(queryUsername || '');
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useInstaData()

  const storeUsername = (username, router) => {
    axiosInstance.post('/api/store_username/', {
      username: username,
    },)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }


  const scrapeData = () => {
    axiosInstance.get('/api/scrape')
      .then(res => {
        setUserData(() => ({
          posts: res.data.posts,
          followers: res.data.followers,
          following: res.data.following,
          image_url: res.data.profile_image_url,
          full_name: res.data.full_name,
          username: username,
        }))
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    storeUsername(username)
    scrapeData()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#7F73C7] to-[#C097DB]'>
      <div className='max-w-[430px] mx-auto relative pb-4'>      <div className='relative w-3/4 mx-auto py-28'>
        <Input
          type='email'
          placeholder="@"
          className='p-6 shadow-lg'
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              router.push(`/search?username=${encodeURIComponent(username)}`)
            }
          }}
          disabled={loading}
          value={username}
        />
        <button
          onClick={() => setUsername('')}
          aria-label="Clear input"
          className='absolute right-4 top-[calc(50%-10px)] text-primary'>
          <Image
            src={crossCircled}
            alt=''
            className='text-xl'
            height={'auto'} />
        </button>
      </div>
        <div className='flex flex-col gap-4 px-6'>
          {!loading ?
            <>
              <SearchResultsCard userData={userData} />
            </>
            :
            <Loader loadingType='fetchLoader' />
          }
        </div>
      </div>
    </div>
  )
}
