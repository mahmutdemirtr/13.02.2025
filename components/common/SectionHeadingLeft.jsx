import { cn } from '@/lib/utils'
import React from 'react'

export default function SectionHeadingLeft({children, subtitle, title, description, className}) {
    return (
        <div className={cn('relative text-left flex flex-col px-4 gap-3 text-primary', className)}>
            <p className='text-secondary text-lg font-bold italic'>{subtitle}</p>
            <h2 className='text-26 font-bold'>{title}</h2>
            <p className='text-lg'>{description}</p>
            {children && children}
        </div>
    )
}
