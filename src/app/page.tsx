'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OverviewSection from '@/components/OverviewSection';
import StorySection from '@/components/StorySection';
import RoomsSection from '@/components/RoomsSection';
import RestaurantsSection from '@/components/RestaurantsSection';
import EcoSection from '@/components/EcoSection';
import ReviewsSection from '@/components/ReviewsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import LiveSupportWidget from '@/components/LiveSupportWidget';
import { Room, BookingRequest } from '@/types';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeBookingQuery, setActiveBookingQuery] = useState<BookingRequest | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleOpenBooking = (query?: BookingRequest) => {
    if (query) {
      setActiveBookingQuery(query);
    }
    setIsBookingOpen(true);
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero & Interactive Booking Bar */}
      <Hero onCheckAvailability={(query) => handleOpenBooking(query)} />

      {/* Resort Overview Intro & Floral Crest */}
      <OverviewSection />

      {/* "More Than a Resort" Cultural Story */}
      <StorySection />

      {/* Rooms & Suites Catalog */}
      <RoomsSection onSelectRoom={handleSelectRoom} />

      {/* 7 Restaurants & Bars Interactive Accordion */}
      <RestaurantsSection />

      {/* Save the Ocean Eco Sustainability Initiative */}
      <EcoSection />

      {/* Guest Reviews & TripAdvisor Ratings */}
      <ReviewsSection />

      {/* Newsletter Signup */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Floating 24h Live Support & Rates Widget */}
      <LiveSupportWidget onOpenBooking={() => handleOpenBooking()} />

      {/* Booking & Live Payment Modal Engine */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialQuery={activeBookingQuery}
        selectedRoom={selectedRoom}
      />

    </main>
  );
}
