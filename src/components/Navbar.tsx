'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, CloudSun, Lock, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1A1A1A]/95 backdrop-blur-md py-3 shadow-lg text-white' 
            : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Hamburger & Weather */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 group cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <div className="hidden md:flex items-center space-x-2 text-xs uppercase tracking-widest font-light text-white/90">
              <span>ZANZIBAR, 27°</span>
              <CloudSun className="w-4 h-4 text-amber-400 inline-block" />
            </div>
          </div>

          {/* Center: Resort Logo */}
          <Link href="/" className="flex flex-col items-center text-center group">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-7 h-7 text-amber-300 group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10 C35 30 20 40 20 60 C20 75 35 90 50 90 C65 90 80 75 80 60 C80 40 65 30 50 10 Z M50 35 C42 45 40 55 50 75 C60 55 58 45 50 35 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="50" cy="55" r="8" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-serif tracking-[0.25em] text-sm sm:text-lg uppercase font-semibold text-white">
              GOOGLES
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-200/90 font-light">
              Beach Resort & Spa Zanzibar
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link 
              href="/signin"
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all text-white cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-full max-w-md bg-[#181818] text-white p-8 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-300 border-r border-stone-800">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-800">
                <div className="flex items-center space-x-3">
                  <Sun className="w-6 h-6 text-amber-400" />
                  <span className="font-serif text-lg tracking-wider text-amber-100">Googles Beach Hotel</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Our Rooms & Suites', href: '#rooms' },
                  { name: 'Restaurants & Bars', href: '#dining' },
                  { name: 'Sign In', href: '/signin' },
                  { name: 'Create Account', href: '/signup' },
                  { name: 'Guest Reviews', href: '#reviews' },
                  { name: 'Contact & Location', href: '#footer' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-light tracking-wide text-stone-300 hover:text-amber-300 transition-colors py-1.5 border-b border-stone-800/50"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Languages:</span>
                <span className="text-amber-200 font-semibold">EN</span> | <span>DE</span> | <span>FR</span>
              </div>
              <span>Pingwe, Zanzibar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
