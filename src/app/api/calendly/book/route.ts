/**
 * POST /api/calendly/book
 *
 * Submits a booking. When CALENDLY_API_KEY is NOT set (Phase 1 demo mode),
 * logs the booking server-side and returns mock success so the branded
 * BookingCalendar component completes its full flow at the Tuesday demo.
 *
 * Phase 2A wires this up to the real Calendly scheduling endpoint and routes
 * the lead into Bonzo (or the n8n replacement, pending Tuesday confirmation
 * with Mike). Until then, the logged payload is the audit trail.
 */

import { NextRequest, NextResponse } from 'next/server';

interface BookRequestBody {
  startTime?: string;
  name?: string;
  email?: string;
  phone?: string;
  smsOptIn?: boolean;
  loSlug?: string;
  eventTypeUri?: string;
}

export async function POST(request: NextRequest) {
  let body: BookRequestBody;
  try {
    body = (await request.json()) as BookRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { startTime, name, email, phone, smsOptIn, loSlug, eventTypeUri } =
    body;

  if (!startTime || !name || !email) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing required fields: startTime, name, email',
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;

  if (apiKey) {
    // [PHASE-2A] Real Calendly booking submission + Bonzo/n8n lead routing.
    // TODO Phase 2A: POST to Calendly scheduled_events, then forward to CRM.
  }

  // Demo mode: log + mock success. The console line is the demo audit trail.
  console.log('[BookingCalendar demo mode] Booking received:', {
    startTime,
    name,
    email,
    phone,
    smsOptIn: Boolean(smsOptIn),
    loSlug: loSlug ?? null,
    eventTypeUri: eventTypeUri ?? null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    confirmationId: `demo-${Date.now()}`,
    demoMode: true,
  });
}
