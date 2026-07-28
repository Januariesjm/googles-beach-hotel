import { NextResponse } from 'next/server';
import { ROOMS_DATA } from '@/lib/data';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      roomId, 
      guestName, 
      guestEmail, 
      guestPhone, 
      checkIn, 
      checkOut, 
      adults, 
      children, 
      paymentMethod = 'card' 
    } = body;

    const room = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
    const bookingRef = `GBH-${Math.floor(100000 + Math.random() * 900000)}`;

    // Calculate dates & nights
    const start = new Date(checkIn || Date.now());
    const end = new Date(checkOut || Date.now() + 86400000 * 3);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const totalAmount = room.pricePerNight * nights;

    // Create booking in database (or graceful fallback)
    const bookingData = {
      booking_reference: bookingRef,
      room_id: room.id,
      room_name: room.name,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone || '+255770000000',
      check_in: checkIn,
      check_out: checkOut,
      nights,
      adults: Number(adults) || 2,
      children: Number(children) || 0,
      total_amount: totalAmount,
      currency: room.currency,
      payment_status: 'pending',
      payment_method: paymentMethod,
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from('bookings').insert([bookingData]);
    } catch {
      // Supabase unconfigured fallback
    }

    return NextResponse.json({
      success: true,
      bookingReference: bookingRef,
      amount: totalAmount,
      currency: room.currency,
      paymentStatus: 'initiated',
      checkoutUrl: `/checkout/confirm?ref=${bookingRef}&amount=${totalAmount}&currency=${room.currency}&method=${paymentMethod}`,
      message: `Payment session initialized for booking ${bookingRef}`
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process payment checkout request' },
      { status: 500 }
    );
  }
}
