import { NextResponse } from 'next/server';
import { ROOMS_DATA } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let rooms = ROOMS_DATA;

  if (category && category !== 'all') {
    rooms = rooms.filter(room => room.category === category);
  }

  return NextResponse.json({
    success: true,
    count: rooms.length,
    data: rooms
  });
}
