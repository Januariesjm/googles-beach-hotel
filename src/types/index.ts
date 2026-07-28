export interface Room {
  id: string;
  name: string;
  slug: string;
  category: 'villas' | 'junior-suite' | 'cottage' | 'pool-view';
  categoryLabel: string;
  pricePerNight: number;
  currency: string;
  maxAdults: number;
  maxChildren: number;
  description: string;
  longDescription: string;
  size: string;
  bedType: string;
  images: string[];
  amenities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hours: string;
  image: string;
  featured: boolean;
}

export interface BookingRequest {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  promoCode?: string;
  roomId?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  roomId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  title: string;
  comment: string;
  rating: number;
  source: string;
  link?: string;
}

export interface CheckoutSession {
  sessionId: string;
  bookingReference: string;
  checkoutUrl: string;
  amount: number;
  currency: string;
}
