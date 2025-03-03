'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import galImage1 from '@/public/images/gallery-photo-01.png';
import galImage2 from '@/public/images/gallery-photo-02.png';
import galImage3 from '@/public/images/gallery-photo-03.png';
import galImage4 from '@/public/images/gallery-photo-04.png';
import galImage5 from '@/public/images/gallery-photo-05.png';
import galImage6 from '@/public/images/gallery-photo-06.png';

const galleryImages = {
  1: galImage1,
  2: galImage2,
  3: galImage3,
  4: galImage4,
  5: galImage5,
  6: galImage6,
};

export default function GalleryPage() {
  const { imgId } = useParams();
  const imageSrc = galleryImages[imgId];

  if (!imageSrc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#251033]">
        <h1 className="text-white text-xl">Image not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#251033]">
      <Image
        src={imageSrc}
        alt={`Gallery Image ${imgId}`}
        width={800}
        height={800}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
