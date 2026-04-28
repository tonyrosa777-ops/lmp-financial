/**
 * GET /api/calendly/slots?date=YYYY-MM-DD&loSlug=...&eventTypeUri=...
 *
 * Returns available booking times for the given date. When CALENDLY_API_KEY is
 * NOT set (Phase 1 demo mode), returns deterministic seeded availability so the
 * branded BookingCalendar component renders a real-looking flow at the Tuesday
 * demo with zero credentials wired.
 *
 * Phase 2A wires this up to the real Calendly availability endpoint
 * (https://api.calendly.com/event_type_available_times). Until then, the
 * apiKey check is a placeholder hook so the route keeps the same shape.
 */

import { NextRequest, NextResponse } from 'next/server';

interface Slot {
  startTime: string;
  schedulingUrl?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  // Reserved for Phase 2A wiring — currently informational only.
  // const loSlug = searchParams.get('loSlug');
  // const eventTypeUri = searchParams.get('eventTypeUri');

  if (!date) {
    return NextResponse.json(
      { error: 'date param required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;

  if (apiKey) {
    // [PHASE-2A] Real Calendly availability fetch goes here.
    // The real endpoint requires user URI + organization URI lookup before
    // it can return availability, so we leave this as an explicit TODO and
    // fall through to demo data for now. This is intentional — better to
    // ship working demo data than half-wired live data.
    // TODO Phase 2A: implement event_type_available_times fetch.
  }

  const slots = generateDemoSlots(date);
  return NextResponse.json({ slots, demoMode: true });
}

/**
 * Deterministic seeded availability. Same date always returns the same slots
 * across page loads — a refresh during the demo never causes the picker to
 * mysteriously show different times. 3 to 5 slots between 9am and 4pm,
 * weekday-only typical business hours, lunch hour skipped.
 */
function generateDemoSlots(dateStr: string): Slot[] {
  const hash = [...dateStr].reduce(
    (h, c) => (h * 31 + c.charCodeAt(0)) | 0,
    0
  );
  const seed = Math.abs(hash);
  const slotCount = 3 + (seed % 3); // 3, 4, or 5
  const baseHours = [9, 10, 11, 13, 14, 15, 16]; // skip noon

  const picked: number[] = [];
  for (
    let i = 0;
    picked.length < slotCount && i < baseHours.length * 2;
    i++
  ) {
    const idx = (seed >> (i * 2)) % baseHours.length;
    const hour = baseHours[idx];
    if (!picked.includes(hour)) picked.push(hour);
  }
  picked.sort((a, b) => a - b);

  return picked.map((h) => {
    const dt = new Date(`${dateStr}T${String(h).padStart(2, '0')}:00:00`);
    return { startTime: dt.toISOString() };
  });
}
