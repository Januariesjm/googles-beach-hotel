import React from 'react';

export default function OverviewSection() {
  return (
    <section className="bg-[#FDFBF7] py-20 px-4 text-stone-800 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Flower Crest Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-stone-300 flex items-center justify-center p-4 bg-white shadow-sm">
            <svg className="w-12 h-12 text-amber-700" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10 C35 30 20 40 20 60 C20 75 35 90 50 90 C65 90 80 75 80 60 C80 40 65 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M35 50 C45 35 55 35 65 50 C55 65 45 65 35 50 Z" fill="currentColor" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Text Paragraph */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-700 leading-relaxed font-light">
            “Googles Beach Resort & Spa offers an enviable range of accommodation options: 166 spacious air-conditioned units with beautifully furnished verandas, built under African makuti thatch, all decorated in a traditional Zanzibari style which lends a note of authenticity to your stay.”
          </p>
        </div>

        {/* Label */}
        <div>
          <span className="font-serif tracking-[0.25em] text-sm uppercase font-semibold text-stone-900 block">
            Googles Beach Resort & Spa
          </span>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-medium">
            Pingwe • Zanzibar Island
          </span>
        </div>

      </div>
    </section>
  );
}
