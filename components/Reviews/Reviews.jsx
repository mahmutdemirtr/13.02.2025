'use client';
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import testAvatar1 from '@/public/images/test-avatar-1.png';
import testAvatar2 from '@/public/images/test-avatar-2.png';
import testAvatar3 from '@/public/images/test-avatar-3.png';
import testAvatar4 from '@/public/images/test-avatar-4.png';
import testAvatar5 from '@/public/images/test-avatar-5.png';
import testAvatar6 from '@/public/images/test-avatar-6.png';
import ReviewCard from "./ReviewCard";


export default function Reviews() {
  const reviews = [
    {
      name: "Emily Roberts",
      review:
        "At first, I wasn’t sure if it would work, but it really surprised me! Super easy to use and quick results. Totally worth it!",
      rating: 4.0,
      stars: 4,
      image: testAvatar1,
    },
    {
      name: "Ryan Mitchell",
      review:
        "I was blown away by how well this works. It’s like magic! Worth every penny. 🔥",
      rating: 4.0,
      stars: 4,
      image: testAvatar2,
    },
    {
      name: "Sophia Lewis",
      review:
        "I’ve already told all my friends about this! It’s so reliable and easy to use. Absolutely amazing!",
      rating: 5.0,
      stars: 5,
      image: testAvatar3,
    },
    {
      name: "Olivia Knight",
      review:
        "So simple and fast! I finally got to see the stories I was curious about. Totally recommending this to my friends! 👌",
      rating: 3.0,
      stars: 3,
      image: testAvatar4,
    },
    {
      name: "Jake Thompson",
      review:
        "I could view most of the posts I wanted, but I wish there were even more features. Great experience overall!",
      rating: 4.0,
      stars: 4,
      image: testAvatar5,
    },
    {
      name: "Ava Johnson",
      review:
        "Honestly, I didn’t think it would work, but I was wrong! It’s legit and super anonymous. Love it!",
      rating: 5.0,
      stars: 5,
      image: testAvatar6,
    },
  ];

  return (
    <div className="w-full">
      <div className="">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={40}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1.3,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 1.3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4.3,
              spaceBetween: 40,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard
                name={review.name}
                review={review.review}
                stars={review.stars}
                rating={review.rating}
                avaterSrc={review.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}