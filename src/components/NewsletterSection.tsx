'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="bg-[#1A1A1A] text-white py-16 px-4 border-t border-stone-800">
      <div className="max-w-xl mx-auto text-center space-y-6">
        
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <Mail className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Subscribe to our Newsletter
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light">
            Receive exclusive resort offers, seasonal discounts, and special event invitations directly in your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-4 rounded-xl flex items-center justify-center space-x-2 text-xs font-semibold animate-in fade-in duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you for subscribing to Googles Beach Hotel newsletter!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-xs uppercase text-white rounded-xl focus:outline-none focus:border-amber-500 placeholder:text-stone-500"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Subscribe
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
