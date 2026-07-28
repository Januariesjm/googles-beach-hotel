'use client';

import React, { useState } from 'react';
import { REVIEWS_DATA } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const review = REVIEWS_DATA[currentIndex];

  return (
    <section id="reviews" className="bg-[#F5F0EB] py-24 px-4 sm:px-6 lg:px-8 text-stone-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800">
            Guest Testimonials
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl text-stone-900 font-normal">
            Your Experience
          </h2>
          <p className="text-stone-600 text-sm font-light">
            Discover what our guests write about their stays at Googles Beach Hotel & Spa.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200/80 relative text-center max-w-3xl mx-auto space-y-6">
          <Quote className="w-12 h-12 text-amber-500/30 mx-auto" />

          {/* Stars */}
          <div className="flex justify-center space-x-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <h3 className="font-serif text-2xl font-bold text-stone-900">
            &ldquo;{review.title}&rdquo;
          </h3>

          <p className="text-stone-600 font-light text-sm sm:text-base leading-relaxed italic max-w-2xl mx-auto">
            &ldquo;{review.comment}&rdquo;
          </p>

          <div className="pt-4 border-t border-stone-100">
            <span className="font-serif font-bold text-stone-900 block">{review.author}</span>
            <span className="text-xs text-amber-800 uppercase tracking-widest">{review.source}</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center absolute inset-y-1/2 left-4 right-4 -translate-y-1/2 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-2.5 rounded-full bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-700 shadow-md transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-2.5 rounded-full bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-700 shadow-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
