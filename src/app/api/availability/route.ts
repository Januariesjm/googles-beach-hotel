import { NextResponse } from 'next/server';
import { ROOMS_DATA } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, adults = 2, children = 0, promoCode } = body;

    // Filter available rooms based on occupancy capacity
    const totalOccupants = Number(adults) + Number(children);
    const availableRooms = ROOMS_DATA.filter(room => (room.maxAdults + room.maxChildren) >= totalOccupants);

    let discountPercentage = 0;
    if (promoCode && promoCode.trim().toUpperCase() === 'PARADISE15') {
      discountPercentage = 15;
    } else if (promoCode && promoCode.trim().toUpperCase() === 'GOOGLES20') {
      discountPercentage = 20;
    }

    return NextResponse.json({
      success: true,
      query: { checkIn, checkOut, adults, children, promoCode },
      discountPercentage,
      availableCount: availableRooms.length,
      rooms: availableRooms.map(room => ({
        ...room,
        discountedPrice: discountPercentage > 0 
          ? Math.round(room.pricePerNight * (1 - discountPercentage / 100))
          : room.pricePerNight
      }))
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid availability request payload' },
      { status: 400 }
    );
  }
}
