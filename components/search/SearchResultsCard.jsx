import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

import searchResultThumb from '@/public/images/search-result-thumb.png';
import searchResultLock from '@/public/images/search-result-lock.svg';
import Link from 'next/link';


export default function SearchResultsCard({ userData }) {
    return (
        <Link
            href={'/unlock'}
            className='min-w-[340px] flex shadow-xl items-center justify-between rounded-xl text-md p-2.5 text-primary bg-white'>
            <Image
                src={userData.image_url}
                height={60}
                width={60}
                alt='thumb'
                className='rounded-full border border-primary'
            />
            <div>
                <h4 className='font-bold italic'>{userData.full_name}</h4>
                <p>@{userData.username}</p>
            </div>
            <Image
                src={searchResultLock}
                height='auto'
                alt='icon'
                className='w'
            />
            <Button
                variant={'blueView'}
            >view</Button>
        </Link>
    )
}
