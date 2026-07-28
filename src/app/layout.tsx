import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Googles Beach Hotel & Spa Zanzibar | Official Website',
  description: 'Experience 5-star luxury Swahili makuti thatched villas, pristine white sand beaches, and world-class oceanfront fine dining at Googles Beach Hotel in Zanzibar.',
  keywords: ['Googles Beach Hotel', 'Zanzibar resort', 'luxury beach hotel', 'Pingwe Zanzibar', 'makuti villa'],
  openGraph: {
    title: 'Googles Beach Hotel & Spa Zanzibar',
    description: 'Experience 5-star luxury beachfront villas and dining in Zanzibar.',
    images: ['/images/hero-resort.jpg']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-amber-500 selection:text-stone-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
