/**
 * GET /api/account/bookings
 *
 * Returns the authed user's upcoming consultations from Calendly (filtered by
 * their email). Powers the "Your scheduled calls" section of the Borrower
 * Portal at /account.
 *
 * Demo mode: when CALENDLY_API_KEY is unset, returns 1–2 seeded bookings
 * deterministic on the user's email so the demo always shows something.
 *
 * Phase 2A wires this to the real Calendly endpoint
 * (`https://api.calendly.com/scheduled_events?invitee_email=...`). Calendly
 * requires a user-level token (org-wide if Mike has org admin). Until then,
 * the apiKey check is a placeholder hook so the route keeps the same shape.
 *
 * Auth: requires a session. Returns 401 otherwise.
 */

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { siteConfig } from '@/data/site';

interface Booking {
  startTime: string;
  loName: string;
  loSlug: string;
  joinUrl?: string;
  location?: string;
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const email = session.user.email;

  if (apiKey) {
    // [PHASE-2A] Real Calendly fetch:
    //   GET https://api.calendly.com/scheduled_events?invitee_email={email}&status=active
    //   Returns array of events; map each to { startTime, loName (from event_memberships), joinUrl, location }
    // TODO Phase 2A: implement after Mike confirms org-token vs per-LO-token strategy.
  }

  // Demo mode: 1–2 seeded bookings keyed off the email hash. Always shows
  // something so the portal never looks empty during demo.
  const bookings = generateDemoBookings(email);
  return NextResponse.json({ bookings, demoMode: true });
}

/**
 * Deterministic demo bookings. Hash the email; pick an LO from siteConfig
 * (rotates across the 22-LO roster), and project a meeting 5–9 days out.
 * Most users get 1 booking; ~25% get 2 (so the multi-booking layout is also
 * exercised at the demo).
 */
function generateDemoBookings(email: string): Booking[] {
  const hash = [...email].reduce(
    (h, c) => (h * 31 + c.charCodeAt(0)) | 0,
    0
  );
  const seed = Math.abs(hash);
  const officers = siteConfig.loanOfficers;
  if (officers.length === 0) return [];

  const count = seed % 4 === 0 ? 2 : 1;
  const out: Booking[] = [];

  for (let i = 0; i < count; i++) {
    const lo = officers[(seed + i * 7) % officers.length];
    const daysOut = 5 + ((seed >> (i * 3)) % 5); // 5–9 days from now
    const hour = 9 + ((seed >> (i * 5)) % 7); // 9–15
    const dt = new Date();
    dt.setDate(dt.getDate() + daysOut);
    dt.setHours(hour, 0, 0, 0);

    out.push({
      startTime: dt.toISOString(),
      loName: lo.name,
      loSlug: lo.slug,
      location: '15-minute Zoom intro call',
    });
  }

  // Sort by start time so the soonest call appears first.
  out.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return out;
}
