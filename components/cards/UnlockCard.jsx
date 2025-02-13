import React from 'react'

export default function UnlockCard({title}) {
    return (
        <div
            key={option}
            className='w-full flex justify-between items-center min-h-16 px-4 shadow-md rounded-lg mt-6 font-extrabold text-lg italic bg-white'
        >
            <label>{option}</label>
            <Checkbox />
        </div>
        );
}
