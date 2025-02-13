import React from 'react'
import SectionHeading from '../common/SectionHeading';
import Reviews from '../Reviews/Reviews';

export default function Testimonial() {
  return (
    <div
      className='relative pt-16 z-10 outline-none'
    >

      <SectionHeading
        subtitle='Testimonials'
        title='What Our Users Say About Us 👤💬'
        description={`Hear Directly From Those We've Helped ⭐💬`}
        className={'lg:mb-10'}
      >

      </SectionHeading>
      <Reviews />
    </div>
  );
}
