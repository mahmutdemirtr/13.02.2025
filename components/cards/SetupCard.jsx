import Image from 'next/image'
import React from 'react'

export default function SetupCard({
    index,
    imageSrc,
    title,
    desc
}) {
    return (
        <div className='relative py-6 px-10 text-center'>
            <span className='absolute font-extrabold -top-12 -left-2 lg:left-[20%] opacity-15 text-[128px]'>{index}</span>
            <Image
                src={imageSrc}
                alt='thumb'
                height='auto'
                className='mx-auto'
            />
            <p className='text-xl font-bold py-4'>{title}</p>
            <p>{desc}</p>
        </div>
    )
}
