'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ROOMS_DATA } from '@/lib/data';
import { Room } from '@/types';
import { Users, Maximize, CheckCircle2, ChevronRight } from 'lucide-react';

interface RoomsSectionProps {
  onSelectRoom: (room: Room) => void;
}

export default function RoomsSection({ onSelectRoom }: RoomsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRooms = selectedCategory === 'all' 
    ? ROOMS_DATA 
    : ROOMS_DATA.filter(r => r.category === selectedCategory);

  return (
    <section id="rooms" className="bg-[#FDFBF7] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal">
            Our Rooms & Suites
          </h2>
          <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto font-light">
            Each accommodation is crafted under authentic Zanzibari makuti thatch with air-conditioned comfort and private verandas.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Accommodations' },
              { id: 'villas', label: 'Villas' },
              { id: 'junior-suite', label: 'Junior Suite' },
              { id: 'cottage', label: 'Cottage' },
              { id: 'pool-view', label: 'Pool View' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-md'
                    : 'bg-stone-200/70 text-stone-600 hover:bg-stone-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredRooms.map((room) => (
            <div 
              key={room.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#1A1A1A]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wider">
                  From ${room.pricePerNight} <span className="font-light text-[10px]">/ night</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-amber-500/90 text-stone-950 font-semibold px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider">
                  {room.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-light">
                    {room.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-stone-100 pt-4">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      Up to {room.maxAdults} Adults
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-amber-700" />
                      {room.size}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-amber-600" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectRoom(room)}
                  className="w-full mt-2 bg-[#1A1A1A] hover:bg-amber-600 text-white font-bold uppercase tracking-widest text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>More Info & Book</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
