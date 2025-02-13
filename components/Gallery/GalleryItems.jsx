'use client';

import React from 'react';
import GalleryItem from './GalleryItem';

import galImage1 from '@/public/images/gallery-photo-01.png';
import galImage2 from '@/public/images/gallery-photo-02.png';
import galImage3 from '@/public/images/gallery-photo-03.png';
import galImage4 from '@/public/images/gallery-photo-04.png';
import galImage5 from '@/public/images/gallery-photo-05.png';
import galImage6 from '@/public/images/gallery-photo-06.png';

export default function GalleryItems({ isPaid, isUnlocked }) {
  const galleryItemsData = [
    { id: 1, imgSrc: galImage1 },
    { id: 2, imgSrc: galImage2 },
    { id: 3, imgSrc: galImage3 },
    { id: 4, imgSrc: galImage4 },
    { id: 5, imgSrc: galImage5 },
    { id: 6, imgSrc: galImage6 },
  ];

  return (
    <div className="grid grid-cols-3 gap-[2px]">
      {galleryItemsData.map((item, index) => (
        <GalleryItem
          key={item.id}
          id={item.id}
          imgSrc={item.imgSrc}
          isPaid={isPaid}
          isUnlocked={isUnlocked}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
