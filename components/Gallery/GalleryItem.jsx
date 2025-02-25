'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DottedLoader from '../ui/DottedLoader';
export default function GalleryItem({ id, isPaid, imgSrc, isFirst, isUnlocked }) {
  // Apply blur effect if the item is not paid and not the first item
  const blurClass = !isPaid && !isFirst ? 'filter blur-sm' : '';

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-lg">
      {isUnlocked ? (
        <Link href={`/profile/123/gallery/${id}`}>
          <Image
            src={imgSrc}
            alt={`Gallery Image ${id}`}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${blurClass}`}
            width={300} // Add width for better performance
            height={300} // Add height for better performance
          />
        </Link>
      ) : (
        <Link href="/start-unlocking">
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <DottedLoader />
          </div>
        </Link>
      )}
    </div>
  );
}
