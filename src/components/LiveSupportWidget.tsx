'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Search, Send, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

interface LiveSupportWidgetProps {
  onOpenBooking: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function LiveSupportWidget({ onOpenBooking }: LiveSupportWidgetProps) {
  const [showBubble, setShowBubble] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Jambo & Welcome to paradise! 🌴 I am Amina, your 24h Googles Beach Hotel concierge. How can I assist your Zanzibar stay today?',
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'How do I book airport transfer?',
    'What is included in All-Inclusive?',
    'Check room availability & rates',
    'Spa & Excursion bookings'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate automated smart concierge response
    setTimeout(() => {
      let botReply = 'Thank you for contacting Googles Beach Hotel concierge! Our 24/7 team is ready to assist you.';
      const lower = query.toLowerCase();

      if (lower.includes('transfer') || lower.includes('airport')) {
        botReply = 'Private airport transfers between Abeid Amani Karume International Airport (ZNZ) and Googles Beach Hotel take ~55 minutes. We arrange private luxury SUVs for $60 USD per vehicle.';
      } else if (lower.includes('all-inclusive') || lower.includes('dining') || lower.includes('food')) {
        botReply = 'Our All-Inclusive plan covers breakfast, lunch, and dinner at Kijiji Restaurant, unlimited soft drinks, cocktails at Swim-Up Bar & Zanzi...Bar, plus complimentary water sports!';
      } else if (lower.includes('rate') || lower.includes('room') || lower.includes('book')) {
        botReply = 'Our room rates start from USD 340/night for Bondeni Pool View up to USD 680/night for Oceanfront Luxury Villas. Would you like me to open the booking engine for you?';
      } else if (lower.includes('spa') || lower.includes('excursion') || lower.includes('tour')) {
        botReply = 'We offer Stone Town spice tours, Jozani Forest monkey safaris, sunset dhow cruises, and holistic oceanfront spa massages. You can reserve directly at the front desk or via WhatsApp!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Bottom Right Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
        
        {/* Floating "Check Rates / From USD 340.00" Pill */}
        <button
          onClick={onOpenBooking}
          className="pointer-events-auto bg-[#1A1A1A] hover:bg-stone-800 text-white font-semibold px-5 py-2.5 rounded-full shadow-2xl border border-stone-700 flex items-center space-x-2 text-xs uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer group"
        >
          <span>From USD 340.00</span>
          <Search className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Support Tooltip Bubble & Avatar Container */}
        <div className="relative flex items-center space-x-2 pointer-events-auto">
          
          {/* Welcome Speech Bubble */}
          {showBubble && !isChatOpen && (
            <div className="relative bg-white text-stone-800 px-4 py-3 rounded-2xl shadow-xl border border-stone-200 text-xs font-medium max-w-xs animate-in fade-in slide-in-from-right-4 duration-300 flex items-center space-x-2">
              <button
                onClick={() => setShowBubble(false)}
                className="absolute -top-2 -left-2 bg-stone-200 hover:bg-stone-300 text-stone-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                aria-label="Dismiss message"
              >
                ✕
              </button>
              <div>
                <p className="font-bold text-stone-900">Welcome to paradise!</p>
                <p className="text-stone-600">24h live support – Ask us anything 🌴</p>
              </div>
              {/* Arrow Triangle pointing to avatar */}
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
            </div>
          )}

          {/* Concierge Avatar Button with Badge */}
          <button
            onClick={() => {
              setIsChatOpen(true);
              setShowBubble(false);
            }}
            className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-2xl hover:scale-110 transition-transform cursor-pointer focus:outline-none ring-4 ring-black/10"
            aria-label="Open 24h Support Chat"
          >
            <Image
              src="/images/concierge-avatar.jpg"
              alt="Googles Beach Hotel Live Support"
              fill
              className="object-cover"
            />
            {/* Red Notification Badge */}
            <span className="absolute top-0 right-0 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              1
            </span>
          </button>

        </div>

      </div>

      {/* Interactive 24h Live Concierge Chat Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="w-full sm:max-w-md bg-white text-stone-800 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[520px] max-h-[90vh]">
            
            {/* Chat Drawer Header */}
            <div className="bg-[#1A1A1A] text-white p-4 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400">
                  <Image src="/images/concierge-avatar.jpg" alt="Amina Concierge" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">Amina • 24h Concierge</h4>
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Online & Ready to Help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="https://wa.me/255770000123"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-full transition-colors flex items-center gap-1 text-[11px] font-semibold"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#1A1A1A] text-white rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 opacity-60 ${
                      msg.sender === 'user' ? 'text-stone-300' : 'text-stone-500'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Quick Prompts */}
              <div className="pt-2">
                <p className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 text-[11px] px-2.5 py-1 rounded-full transition-all cursor-pointer text-left shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask us anything about Googles Beach Hotel..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-stone-100 border border-stone-200 p-2.5 text-xs text-stone-800 rounded-xl focus:outline-none focus:border-amber-500 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 p-2.5 rounded-xl transition-all shadow-md cursor-pointer flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Direct WhatsApp Call Footer Banner */}
            <div className="bg-stone-100 py-2 px-4 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-emerald-600" />
                Direct Desk: +255 770 000 123
              </span>
              <a href="https://wa.me/255770000123" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold hover:underline">
                Open WhatsApp
              </a>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
