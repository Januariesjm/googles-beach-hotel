import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#121212] text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg uppercase tracking-widest text-white font-bold">
              GOOGLES
            </h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-medium">
              Beach Resort & Spa Zanzibar
            </p>
          </div>
          <p className="font-light text-stone-400 leading-relaxed">
            Experience 5-star luxury Swahili makuti thatched resort hospitality on the pristine shores of Pingwe, Zanzibar.
          </p>
          <div className="flex space-x-3 text-stone-300">
            <a href="#" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-900 rounded-full transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-900 rounded-full transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-900 rounded-full transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-wider text-stone-200 font-semibold border-b border-stone-800 pb-2">
            Navigation
          </h4>
          <ul className="space-y-2 font-light">
            <li><a href="#" className="hover:text-amber-300 transition-colors">Home</a></li>
            <li><a href="#rooms" className="hover:text-amber-300 transition-colors">Accommodations & Suites</a></li>
            <li><a href="#dining" className="hover:text-amber-300 transition-colors">Restaurants & Bars</a></li>
            <li><a href="#reviews" className="hover:text-amber-300 transition-colors">Guest Reviews</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Weddings & Honeymoons</a></li>
          </ul>
        </div>

        {/* Col 3: Resort Info */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-wider text-stone-200 font-semibold border-b border-stone-800 pb-2">
            Resort Info
          </h4>
          <ul className="space-y-2 font-light">
            <li><a href="#" className="hover:text-amber-300 transition-colors">Our Eco Initiative</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">360° Virtual Tour</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Sport & Leisure Center</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">FAQ & Policy</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Private Member Area</a></li>
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm uppercase tracking-wider text-stone-200 font-semibold border-b border-stone-800 pb-2">
            Get in Touch
          </h4>
          <ul className="space-y-2.5 font-light">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Pingwe Beach, Michamvi Peninsula, Zanzibar</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>+255 770 000 123</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>info@googlesbeachhotel.com</span>
            </li>
            <li className="flex items-center space-x-2 pt-2">
              <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-amber-300 font-medium">Affiliated with Travelbook Hotels</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-[#0A0A0A] py-6 px-4 border-t border-stone-850 text-center text-[11px] text-stone-500 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto space-y-2 sm:space-y-0">
        <span suppressHydrationWarning>© {new Date().getFullYear()} Googles Beach Hotel & Spa. All Rights Reserved.</span>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-stone-400">Privacy Policy</Link>
          <span>•</span>
          <Link href="#" className="hover:text-stone-400">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
