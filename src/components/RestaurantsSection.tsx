'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RESTAURANTS_DATA } from '@/lib/data';
import { Clock, Utensils } from 'lucide-react';

export default function RestaurantsSection() {
  const [activeId, setActiveId] = useState<string>('le-grand-bleu');

  return (
    <section id="dining" className="bg-[#171717] py-24 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Gastronomy & Mixology
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white font-normal">
            Restaurants & Bars
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Indulge in 7 unique dining experiences — from romantic seafood fine dining on the moonlit beach to authentic Swahili Masai BBQ performances.
          </p>
        </div>

        {/* Desktop Accordion (Expandable Columns) */}
        <div className="hidden lg:flex h-[520px] gap-3 rounded-3xl overflow-hidden shadow-2xl p-2 bg-stone-900 border border-stone-800">
          {RESTAURANTS_DATA.map((venue) => {
            const isActive = activeId === venue.id;

            return (
              <div
                key={venue.id}
                onMouseEnter={() => setActiveId(venue.id)}
                onClick={() => setActiveId(venue.id)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex flex-col justify-end p-6 ${
                  isActive ? 'flex-[3.5]' : 'flex-[1]'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover object-center filter brightness-90 hover:brightness-100 transition-all duration-500"
                />
                
                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
                    : 'bg-black/60 hover:bg-black/40'
                }`} />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-500 text-stone-950 p-1.5 rounded-lg">
                      <Utensils className="w-4 h-4" />
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                      {venue.tagline}
                    </span>
                  </div>

                  <h3 className={`font-serif font-bold transition-all duration-300 ${
                    isActive ? 'text-2xl sm:text-3xl text-white' : 'text-lg text-stone-200'
                  }`}>
                    {venue.name}
                  </h3>

                  {isActive && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-lg">
                        {venue.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-xs text-amber-200 font-mono bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full inline-block">
                        <Clock className="w-3.5 h-3.5 inline text-amber-400" />
                        <span>Hours: {venue.hours}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {RESTAURANTS_DATA.map((venue) => (
            <div key={venue.id} className="relative h-80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-end p-6 group">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                  {venue.tagline}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {venue.name}
                </h3>
                <p className="text-xs text-stone-300 font-light line-clamp-2">
                  {venue.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
