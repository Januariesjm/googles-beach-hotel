import { Room, Restaurant, Review } from '@/types';

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-villa-01',
    name: 'Oceanfront Luxury Villa',
    slug: 'oceanfront-luxury-villa',
    category: 'villas',
    categoryLabel: 'Villas',
    pricePerNight: 680,
    currency: 'USD',
    maxAdults: 4,
    maxChildren: 2,
    description: 'Exclusive beachfront villa featuring a private plunge pool, thatched makuti roof, and handcrafted Zanzibari furnishings.',
    longDescription: 'Our Oceanfront Luxury Villas represent the pinnacle of beach hospitality at Googles Beach Hotel. Set directly on white coral sand, each villa offers absolute privacy, a private veranda overlooking the Indian Ocean, semi-open tropical bathroom with rainfall shower, and authentic Zanzibari carved furniture.',
    size: '125 m²',
    bedType: 'King Four-Poster Canopy Bed',
    images: ['/images/room-villa.jpg', '/images/hero-resort.jpg'],
    amenities: [
      'Private Plunge Pool',
      'Oceanfront Veranda',
      'Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Personal Butler Service',
      'Mini Bar & Espresso Machine',
      'Rainfall Shower & Bathtub',
      '24/7 In-Villa Dining'
    ]
  },
  {
    id: 'room-suite-01',
    name: 'Zanzibar Junior Suite',
    slug: 'zanzibar-junior-suite',
    category: 'junior-suite',
    categoryLabel: 'Junior Suite',
    pricePerNight: 480,
    currency: 'USD',
    maxAdults: 3,
    maxChildren: 1,
    description: 'Spacious air-conditioned suite with panoramic ocean views, private balcony, and traditional Swahili decor.',
    longDescription: 'The Zanzibar Junior Suite combines spacious elegance with traditional Swahili architecture. Built under cool makuti thatch, it features a grand carved four-poster bed draped in mosquito netting, cozy lounge area, and a wooden balcony facing the turquoise lagoon.',
    size: '85 m²',
    bedType: 'Super King Four-Poster Bed',
    images: ['/images/room-suite.jpg', '/images/resort-aerial.jpg'],
    amenities: [
      'Ocean View Balcony',
      'Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Flat-screen Satellite TV',
      'Stocked Mini Bar',
      'Luxury Toiletries',
      'Daily Housekeeping'
    ]
  },
  {
    id: 'room-cottage-01',
    name: 'Garden Cottage',
    slug: 'garden-cottage',
    category: 'cottage',
    categoryLabel: 'Cottage',
    pricePerNight: 390,
    currency: 'USD',
    maxAdults: 2,
    maxChildren: 2,
    description: 'Charming thatched-roof cottage nestled within lush tropical gardens, just steps away from the beach.',
    longDescription: 'Embraced by bougainvillea, coconut palms, and tropical foliage, our Garden Cottages provide a serene retreat. Each unit features traditional African thatched roofs, private shaded veranda, and warm wooden accents.',
    size: '65 m²',
    bedType: 'Queen Four-Poster Bed',
    images: ['/images/hero-resort.jpg', '/images/room-villa.jpg'],
    amenities: [
      'Shaded Garden Veranda',
      'Air Conditioning',
      'Free High-Speed Wi-Fi',
      'In-Room Safe',
      'Tea & Coffee Maker',
      'Private En-Suite Bathroom'
    ]
  },
  {
    id: 'room-poolview-01',
    name: 'Bondeni Pool View Room',
    slug: 'bondeni-pool-view-room',
    category: 'pool-view',
    categoryLabel: 'Pool View',
    pricePerNight: 340,
    currency: 'USD',
    maxAdults: 2,
    maxChildren: 1,
    description: 'Modern tropical room situated around the main swimming pool with direct pool deck access.',
    longDescription: 'Situated in the quiet Bondeni area of the resort, these rooms surround our pristine swimming pool. Step straight from your private terrace onto the pool deck or relax under the palm shade.',
    size: '55 m²',
    bedType: 'King Bed or Twin Beds',
    images: ['/images/bar-swimup.jpg', '/images/room-suite.jpg'],
    amenities: [
      'Direct Pool Access',
      'Private Terrace',
      'Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Satellite TV',
      'Work Desk'
    ]
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'kijiji',
    name: 'Kijiji Restaurant',
    tagline: 'Main Oceanfront Dining',
    description: 'Open for breakfast, lunch, and dinner. The main restaurant features a sea-view terrace serving generous international theme buffets and fresh local Zanzibar specialties.',
    hours: '07:30 AM - 10:00 PM',
    image: '/images/hero-resort.jpg',
    featured: true
  },
  {
    id: 'le-grand-bleu',
    name: 'Le Grand Bleu',
    tagline: 'Romantic Beach Seafood Fine Dining',
    description: 'À la carte dinner restaurant with breathtaking ocean views. Enjoy fresh grilled lobster, seafood skewers, and romantic candlelight dining right on the moonlit white sand.',
    hours: '12:30 PM - 10:30 PM',
    image: '/images/restaurant-grand-bleu.jpg',
    featured: true
  },
  {
    id: 'bondeni-pizzamore',
    name: 'Bondeni PizzaMore',
    tagline: 'Grill & Wood-Fired Pizza',
    description: 'Located inside the Bondeni Pool area. Ideal for authentic Italian wood-fired pizzas, gourmet grill specialties, and fusion dishes.',
    hours: '06:00 PM - 10:00 PM',
    image: '/images/bar-swimup.jpg',
    featured: false
  },
  {
    id: 'masai-village',
    name: 'Masai Village',
    tagline: 'Swahili & Cultural Evenings',
    description: 'Set inside an authentically reproduced African village. Offers traditional Swahili BBQ buffets accompanied by live Masai folklore dance performances.',
    hours: '07:30 PM - 10:30 PM (Wed & Sat)',
    image: '/images/resort-aerial.jpg',
    featured: true
  },
  {
    id: 'paradice',
    name: 'Paradice Bar',
    tagline: 'Beachfront Gelato & Refreshments',
    description: 'Hidden gem nestled near the Main Pool and pristine white sandy beach. Serves artisanal ice cream, fresh tropical juices, and chilled coconut water.',
    hours: '10:00 AM - 07:00 PM',
    image: '/images/hero-resort.jpg',
    featured: false
  },
  {
    id: 'swim-up-bar',
    name: 'Swim-Up Pool Bar',
    tagline: 'In-Pool Tropical Cocktails',
    description: 'Sip exotic long drinks, pina coladas, and craft beers while sitting on submerged underwater stools in the crystal-clear pool.',
    hours: '10:00 AM - 06:00 PM',
    image: '/images/bar-swimup.jpg',
    featured: true
  },
  {
    id: 'zanzi-bar',
    name: 'Zanzi...Bar Lounge',
    tagline: 'Cocktails & Shisha Lounge',
    description: 'Our main cocktail bar and lounge area where evenings come alive with live soft acoustic music, signature mixology, and scenic ocean verandas.',
    hours: '05:00 PM - 01:00 AM',
    image: '/images/restaurant-grand-bleu.jpg',
    featured: false
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-01',
    author: 'Federico C.',
    title: 'Wedding in Paradise',
    comment: 'We had our dream wedding at Googles Beach Hotel. The location was breathtaking, organization was flawless, and the staff treated us like royalty throughout our stay!',
    rating: 5,
    source: 'TripAdvisor Guest'
  },
  {
    id: 'rev-02',
    author: 'Chris M.',
    title: 'Magical Week at Googles Beach Hotel',
    comment: 'Our family spent a week celebrating my mother\'s 80th birthday. Stunning beach location, spotlessly clean rooms, incredible food, and warm Zanzibari hospitality. Highly recommended!',
    rating: 5,
    source: 'Verified Booking Guest'
  },
  {
    id: 'rev-03',
    author: 'Elena & Marcus',
    title: 'Unforgettable Honeymoon Retreat',
    comment: 'The Oceanfront Villa with private pool was heaven. Waking up to the sunrise over the turquoise ocean in Pingwe is a memory we will treasure forever.',
    rating: 5,
    source: 'Luxury Escapes Reviewer'
  }
];
