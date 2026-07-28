'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, Baby, Key, Search } from 'lucide-react';
import { BookingRequest } from '@/types';

interface HeroProps {
  onCheckAvailability: (query: BookingRequest) => void;
}

export default function Hero({ onCheckAvailability }: HeroProps) {
  const [checkIn, setCheckIn] = useState('2026-08-10');
  const [checkOut, setCheckOut] = useState('2026-08-15');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      promoCode
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-16 text-white overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-resort.jpg"
          alt="Googles Beach Resort Zanzibar"
          fill
          priority
          className="object-cover object-center transform scale-105 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-black/50" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-auto mb-12 space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs uppercase tracking-[0.3em] font-medium animate-pulse">
          Paradise Found in Zanzibar
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md">
          Googles Beach Hotel
        </h1>
        <p className="text-sm sm:text-lg text-stone-200 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
          Experience luxury Swahili Makuti thatched villas, pristine white sand beaches, and world-class oceanfront dining.
        </p>
      </div>

      {/* Floating Booking Widget */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 w-full">
        <form 
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-stone-800 shadow-2xl border border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          
          {/* Dates Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Check In / Out
            </label>
            <div className="grid grid-cols-2 gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs font-medium text-stone-800 focus:outline-none cursor-pointer"
              />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs font-medium text-stone-800 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Adults */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              Adults
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full bg-stone-100 p-2.5 text-xs font-semibold text-stone-800 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5 text-amber-600" />
              Children
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full bg-stone-100 p-2.5 text-xs font-semibold text-stone-800 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
              ))}
            </select>
          </div>

          {/* Promo Code */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-600" />
              Promo Code
            </label>
            <input
              type="text"
              placeholder="e.g. GOOGLES20"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full bg-stone-100 p-2.5 text-xs font-semibold text-stone-800 uppercase rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:normal-case placeholder:font-normal placeholder:text-stone-400"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold uppercase tracking-widest text-xs p-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Check Rates</span>
            </button>
          </div>

        </form>
      </div>

    </section>
  );
}
