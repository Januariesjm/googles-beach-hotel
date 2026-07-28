import React from 'react';
import { Waves, Sparkles } from 'lucide-react';

export default function EcoSection() {
  return (
    <section className="bg-emerald-950 text-white py-16 px-4 relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-700/50 px-4 py-1.5 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-widest">
          <Waves className="w-4 h-4 text-emerald-400" />
          <span>Eco Sustainability Initiative</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-emerald-100">
          Save the Ocean <br className="hidden sm:inline" />
          <span className="italic font-normal text-emerald-300">Stop Plastic Pollution</span>
        </h2>

        <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          We are glad to inform you that Googles Beach Hotel launched a new eco-friendly initiative. We stopped serving single-use plastic bottled water in the rooms and during meals. Fresh purified mineral water is provided in glass bottles in your room and served by glass during meals.
        </p>

        <div className="pt-2 flex justify-center items-center space-x-2 text-xs font-medium text-emerald-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Together we preserve our planet so future generations keep enjoying its natural beauty.</span>
        </div>
      </div>
    </section>
  );
}
