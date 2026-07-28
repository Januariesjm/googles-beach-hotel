'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import AuthProvider from '@/components/AuthProvider';

function SignInContent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMsg(`Welcome back, ${data.user.name || 'Valued Guest'}!`);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setErrorMsg(data.message || 'Invalid email or password');
      }
    } catch {
      setErrorMsg('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Direct Google OAuth login handler
  const directGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: tokenResponse.access_token })
        });
        const data = await response.json();
        if (data.success) {
          setSuccessMsg(`Signed in with Google as ${data.user.name}!`);
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      } catch {
        setErrorMsg('Google authentication failed.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setErrorMsg('Google Sign-In failed or was cancelled.')
  });

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background Resort Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-resort.jpg"
          alt="Googles Beach Hotel"
          fill
          className="object-cover opacity-20 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md bg-[#1F1F1F]/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center text-xs text-amber-400 hover:text-amber-300 transition-colors gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Googles Beach Hotel</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <svg className="w-10 h-10 text-amber-400" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10 C35 30 20 40 20 60 C20 75 35 90 50 90 C65 90 80 75 80 60 C80 40 65 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="55" r="8" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
            Sign In to Your Account
          </h1>
          <p className="text-stone-400 text-xs font-light">
            Access your reservations, exclusive member rates, and 24/7 guest concierge.
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="bg-rose-950/80 border border-rose-600/60 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Direct Google OAuth Login */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => directGoogleLogin()}
            disabled={isLoading}
            className="w-full bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign in directly with Google Account</span>
          </button>

          <div className="hidden">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ credential: credentialResponse.credential })
                  });
                }
              }}
              onError={() => setErrorMsg('Google Sign-In failed')}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <div className="flex-1 h-[1px] bg-stone-800" />
          <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-widest">Or with Email</span>
          <div className="flex-1 h-[1px] bg-stone-800" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="guest@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 p-3 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 placeholder:text-stone-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Password
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email address.'); }} className="text-[11px] text-amber-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 p-3 pr-10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 placeholder:text-stone-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 text-stone-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase tracking-widest text-xs p-3.5 rounded-xl transition-all cursor-pointer shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-stone-400 pt-2 border-t border-stone-800">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="text-amber-400 font-semibold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <AuthProvider>
      <SignInContent />
    </AuthProvider>
  );
}
