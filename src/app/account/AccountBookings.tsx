'use client';

/**
 * /account → "Your scheduled calls" section.
 *
 * Phase 1J. Client Component that fetches /api/account/bookings (server-side
 * Calendly call by email — see src/app/api/account/bookings/route.ts) on mount
 * and renders a list of upcoming consultations.
 *
 * Demo mode: the API returns deterministic seeded bookings based on a hash of
 * the user's email when CALENDLY_API_KEY is unset, so the demo always shows
 * something (rather than an empty card that looks broken).
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Booking {
  startTime: string; // ISO datetime
  loName: string;
  loSlug: string;
  joinUrl?: string;
  location?: string;
}

interface AccountBookingsProps {
  userEmail: string;
}

export default function AccountBookings({ userEmail }: AccountBookingsProps) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/account/bookings`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setBookings(data.bookings ?? []);
        setDemoMode(Boolean(data.demoMode));
      })
      .catch(() => {
        if (cancelled) return;
        setError('Could not load your consultations. Try refreshing the page.');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userEmail]);

  if (loading) {
    return (
      <Card variant="light" hover={false}>
        <p className="text-body text-[var(--text-on-light-muted)]">
          Loading your consultations...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="light" hover={false}>
        <p className="text-body text-[var(--error)]">{error}</p>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card variant="light" hover={false}>
        <p className="text-body text-[var(--text-on-light-secondary)]">
          You don&apos;t have any upcoming consultations yet.
        </p>
        <p className="text-body-sm text-[var(--text-on-light-muted)] mt-3">
          <Link
            href="/booking"
            className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
          >
            Schedule a call →
          </Link>
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => {
        const start = new Date(b.startTime);
        const dateLabel = start.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
        const timeLabel = start.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return (
          <Card key={b.startTime + b.loSlug} variant="light" hover={false}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-eyebrow text-[var(--accent-deep)]">
                  {dateLabel} · {timeLabel}
                </p>
                <h3 className="font-display text-xl text-[var(--text-on-light)] mt-2">
                  Call with {b.loName}
                </h3>
                {b.location && (
                  <p className="text-body-sm text-[var(--text-on-light-muted)] mt-1">
                    {b.location}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {b.joinUrl && (
                  <a
                    href={b.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                  >
                    Join link
                  </a>
                )}
                <Link
                  href={`/team/${b.loSlug}`}
                  className="text-body-sm text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
                >
                  About {b.loName.split(' ')[0]} →
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
      {demoMode && (
        <p className="text-micro text-[var(--text-on-light-muted)] text-center pt-2">
          <Badge color="neutral">Demo mode</Badge>{' '}
          <span className="ml-2">Showing sample bookings until Calendly is wired in Phase 2A.</span>
        </p>
      )}
    </div>
  );
}
