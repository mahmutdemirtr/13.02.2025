'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DottedLoader from '../ui/DottedLoader';

export default function GalleryItem({ id, isPaid, imgSrc, isFirst, isUnlocked }) {
  const blurClass = !isPaid && !isFirst ? 'filter blur-sm' : '';

  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      {isUnlocked ? (
        <Link href={`/profile/123/gallery/${id}`}>
          <Image
            src={imgSrc}
            alt={`Gallery Image ${id}`}
            className={`w-full h-full object-cover ${blurClass}`}
          />
        </Link>
      ) : (
        <Link href="/start-unlocking">
          <div className="relative w-full h-full flex items-center justify-center bg-theme-gray">
            <DottedLoader />
          </div>
        </Link>
      )}
    </div>
  );
}
