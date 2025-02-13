import { cn } from '@/lib/utils'
import React from 'react'

export default function SectionHeading({children, subtitle, title, description, className}) {
    return (
        <div className={cn('relative flex flex-col text-center px-6 gap-4 text-primary', className)}>
            <p className='text-secondary text-lg font-bold italic'>{subtitle}</p>
            <h2 className='text-26 font-bold px-6'>{title}</h2>
            <p className='text-lg px-14'>{description}</p>
            {children && children}
        </div>
    )
}
