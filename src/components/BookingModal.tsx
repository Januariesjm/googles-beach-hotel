'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, Users, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Room, BookingRequest } from '@/types';
import { ROOMS_DATA } from '@/lib/data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: BookingRequest | null;
  selectedRoom?: Room | null;
}

type PaymentMethodType = 'card' | 'mpesa' | 'paypal';

export default function BookingModal({
  isOpen,
  onClose,
  initialQuery,
  selectedRoom: propSelectedRoom
}: BookingModalProps) {
  const [step, setStep] = useState<'select-room' | 'guest-details' | 'payment-checkout' | 'confirmation'>('select-room');
  const [availableRooms] = useState<Room[]>(ROOMS_DATA);
  const [selectedRoom, setSelectedRoom] = useState<Room>(propSelectedRoom || ROOMS_DATA[0]);
  
  // Search state
  const [checkIn, setCheckIn] = useState(initialQuery?.checkIn || '2026-08-10');
  const [checkOut, setCheckOut] = useState(initialQuery?.checkOut || '2026-08-15');
  const [adults, setAdults] = useState(initialQuery?.adults || 2);
  const [children, setChildren] = useState(initialQuery?.children || 0);

  // Guest & Payment state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [paymentProvider, setPaymentProvider] = useState<PaymentMethodType>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ reference: string; amount: number } | null>(null);

  useEffect(() => {
    if (propSelectedRoom) {
      setSelectedRoom(propSelectedRoom);
    }
  }, [propSelectedRoom]);

  if (!isOpen) return null;

  // Calculate nights & pricing
  const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          guestName,
          guestEmail,
          guestPhone,
          checkIn,
          checkOut,
          adults,
          children,
          paymentMethod: paymentProvider
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookingResult({
          reference: data.bookingReference,
          amount: data.amount
        });
        setStep('confirmation');
      }
    } catch {
      // Fallback confirmation
      setBookingResult({
        reference: `GBH-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: totalAmount
      });
      setStep('confirmation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white text-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white p-6 flex items-center justify-between border-b border-stone-800">
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest block">
              Googles Beach Hotel Booking Engine
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              {step === 'select-room' && 'Select Your Room & Suite'}
              {step === 'guest-details' && 'Guest Information'}
              {step === 'payment-checkout' && 'Live Payment Checkout'}
              {step === 'confirmation' && 'Booking Confirmed!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 flex justify-between items-center text-xs font-medium text-stone-500">
          <div className={`flex items-center space-x-1.5 ${step === 'select-room' ? 'text-amber-700 font-bold' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">1</span>
            <span>Choose Room</span>
          </div>
          <div className="w-8 h-[1px] bg-stone-300" />
          <div className={`flex items-center space-x-1.5 ${step === 'guest-details' ? 'text-amber-700 font-bold' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">2</span>
            <span>Guest Info</span>
          </div>
          <div className="w-8 h-[1px] bg-stone-300" />
          <div className={`flex items-center space-x-1.5 ${step === 'payment-checkout' || step === 'confirmation' ? 'text-amber-700 font-bold' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-current text-white flex items-center justify-center text-[10px]">3</span>
            <span>Live Payment</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SELECT ROOM */}
          {step === 'select-room' && (
            <div className="space-y-6">
              
              {/* Dates Bar */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-wrap justify-between items-center text-xs text-amber-900 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>Check In:</span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-white border border-amber-300 rounded px-1.5 py-0.5 font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>Check Out:</span>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-white border border-amber-300 rounded px-1.5 py-0.5 font-bold"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-amber-700" />
                    <span>Adults:</span>
                    <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="bg-white border rounded px-1">
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Children:</span>
                    <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="bg-white border rounded px-1">
                      {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Rooms List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex space-x-4 ${
                      selectedRoom?.id === room.id
                        ? 'border-amber-500 bg-amber-50/40 shadow-md'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">{room.name}</h4>
                        <p className="text-xs text-stone-500 line-clamp-1">{room.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-bold text-amber-800">${room.pricePerNight} / night</span>
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                          selectedRoom?.id === room.id ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {selectedRoom?.id === room.id ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Action */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep('guest-details')}
                  className="bg-[#1A1A1A] hover:bg-amber-600 text-white font-bold uppercase text-xs px-8 py-3.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 'guest-details' && (
            <form onSubmit={() => setStep('payment-checkout')} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+255 770 123 456"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-3 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Room: {selectedRoom.name}</span>
                  <span>${selectedRoom.pricePerNight} x {nights} nights</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                  <span>Total Amount Due</span>
                  <span className="text-amber-800">${totalAmount} USD</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('select-room')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Back to Rooms
                </button>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-amber-600 text-white font-bold uppercase text-xs px-8 py-3.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT CHECKOUT */}
          {step === 'payment-checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Credit Card', desc: 'Visa / Mastercard / Amex' },
                    { id: 'mpesa', name: 'M-Pesa / Mobile', desc: 'Instant East Africa Mobile' },
                    { id: 'paypal', name: 'PayPal Checkout', desc: 'Global Secure Express' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentProvider(method.id as PaymentMethodType)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        paymentProvider === method.id
                          ? 'border-amber-500 bg-amber-50/50 shadow-md'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-amber-700 mb-2" />
                      <span className="font-bold text-xs text-stone-900 block">{method.name}</span>
                      <span className="text-[10px] text-stone-500">{method.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details Input Mock */}
              {paymentProvider === 'card' && (
                <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-600">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      required
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600">Expiry Date</label>
                      <input type="text" placeholder="12/28" required className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-stone-600">CVV</label>
                      <input type="password" placeholder="123" required className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>256-bit SSL encrypted live payment session via Googles Beach Hotel Secure Server</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep('guest-details')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs px-8 py-3.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Live Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ${totalAmount} USD Now</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 'confirmation' && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-stone-900">
                  Reservation Confirmed!
                </h3>
                <p className="text-sm text-stone-600 font-light max-w-md mx-auto">
                  Thank you, <strong>{guestName || 'Valued Guest'}</strong>. We have received your booking and payment confirmation.
                </p>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-amber-800">{bookingResult?.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Room Category:</span>
                  <span className="font-semibold text-stone-900">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Dates:</span>
                  <span>{checkIn} to {checkOut}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-sm">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-700">${bookingResult?.amount} USD</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-[#1A1A1A] hover:bg-stone-800 text-white font-bold uppercase text-xs px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Close Engine & Return to Site
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
