import Image from 'next/image'
import React from 'react'

import star from '@/public/images/star.svg';

export default function ReviewCard({
    name,
    review,
    stars,
    rating,
    avaterSrc
}) {
    return (
        <div className="relative w-full mt-4 mx-auto border border-primary bg-white px-12 text-primary py-4 rounded-3xl">
            <div className="">
                <p className='text-lg italic font-bold'>{name}</p>
                <p className='text-md pl-8 pt-2'>{review}</p>
            </div>
            <div className="flex items-center justify-end">
                <div className="flex items-center pr-6">
                    {[...Array(stars)].map((_, i) => (
                        <Image key={i} src={star} alt="star" height='auto' />
                    ))}
                </div>
                <div className="font-bold">{Number(rating).toFixed(1)}</div>
            </div>
            <Image
                src={avaterSrc}
                alt="avatar"
                className="absolute top-6 -left-12 z-20" />
        </div>
    )
}
