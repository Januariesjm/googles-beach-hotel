import React from 'react';
import Image from 'next/image';

export default function StorySection() {
  return (
    <section className="bg-[#F7F3ED] py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left: Aerial Beach Image */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
          <Image
            src="/images/resort-aerial.jpg"
            alt="Googles Beach Hotel Aerial View"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-[0.3em] font-light bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
              Pingwe Lagoon Coastline
            </span>
          </div>
        </div>

        {/* Right: Story Text */}
        <div className="space-y-6 lg:pl-6 text-stone-800">
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-amber-900 font-normal">
            More than a resort
          </h2>

          <div className="space-y-4 text-stone-600 font-light leading-relaxed text-sm sm:text-base">
            <p>
              An authentic, unique, and precious reality. The enchanting location serves as the perfect backdrop to highlight the charm of respecting traditions, accompanied by genuine smiles of ebony and pearl.
            </p>
            <p>
              The essence of pure pleasure is simplicity meticulously carved into the details. The blooming of a sensation of a distant past that binds us because we all come from here.
            </p>
            <p>
              Africa is the mother, Googles Beach Hotel the magical place where we can meet her, walk with her, hand in hand, towards the horizon, where ocean meets pure white coral sand.
            </p>
          </div>

          <div className="pt-4 flex items-center space-x-6">
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-amber-800 block">166</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500">Luxury Units</span>
            </div>
            <div className="h-10 w-[1px] bg-stone-300" />
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-amber-800 block">7</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500">Bars & Dining</span>
            </div>
            <div className="h-10 w-[1px] bg-stone-300" />
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-amber-800 block">5★</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500">Beach Hospitality</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
