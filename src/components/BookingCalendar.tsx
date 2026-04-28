'use client';

/**
 * BookingCalendar — custom-branded inline scheduling calendar for LMP Financial.
 *
 * Per CLAUDE.md Always-Built Features Rule (Inline Booking Calendar) and
 * Conversion Flow Rule: this component looks 100% native to LMP. Calendly is
 * the API under the hood and is NEVER visible to the user. No iframe, no
 * Calendly logo, no Calendly redirect. The user types their info and books in
 * place; the booking POSTs to /api/calendly/book which calls Calendly server-side
 * with CALENDLY_API_KEY (kept off the client).
 *
 * Demo mode: when no CALENDLY_API_KEY is set on the server, /api/calendly/slots
 * returns deterministic seeded availability and /api/calendly/book returns mock
 * success. The calendar must render a real-looking, fully-interactive flow at
 * the Tuesday demo with zero credentials wired.
 *
 * Four-step state machine: date → time → form → confirmed.
 *
 * Tokens consumed: --accent, --bg-card-dark, --border-dark, --primary,
 *                  --primary-deep, --text-primary, --text-secondary, --text-muted,
 *                  --error, --radius-md, --radius-lg.
 */

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { siteConfig } from '@/data/site';

/**
 * Optional prefill payload — typically supplied by the quiz result phase
 * (Phase 1J). Identity fields seed the form-step inputs (still editable);
 * `quizContext` surfaces a small reassurance badge so the user sees their
 * quiz answers carried into the booking, and is forwarded in the booking
 * POST so the LO sees the persona before the call.
 */
export interface BookingCalendarPrefill {
  name?: string;
  email?: string;
  phone?: string;
  smsOptIn?: boolean;
  quizContext?: {
    resultType: string;
    recommendedProgramSlug: string;
    recommendedProgramName: string;
    recommendedLOSlug: string;
  };
}

interface BookingCalendarProps {
  loSlug?: string; // when set, books with this LO (per-LO Calendly URI)
  eventTypeUri?: string; // optional override for direct Calendly URI
  className?: string;
  prefill?: BookingCalendarPrefill;
}

type Step = 'date' | 'time' | 'form' | 'confirmed';

interface Slot {
  startTime: string; // ISO datetime
  schedulingUrl?: string;
}

interface SlotsResponse {
  slots: Slot[];
  demoMode?: boolean;
}

interface BookResponse {
  success: boolean;
  confirmationId?: string;
  demoMode?: boolean;
  error?: string;
}

const DOW_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function BookingCalendar({
  loSlug,
  eventTypeUri,
  className,
  prefill,
}: BookingCalendarProps) {
  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(prefill?.name ?? '');
  const [email, setEmail] = useState(prefill?.email ?? '');
  const [phone, setPhone] = useState(prefill?.phone ?? '');
  const [smsOptIn, setSmsOptIn] = useState(prefill?.smsOptIn ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Find LO if loSlug provided — used for header, confirmed-state copy.
  const lo = loSlug
    ? siteConfig.loanOfficers.find((l) => l.slug === loSlug)
    : null;

  // Generate next 14 calendar days. Weekends visible but disabled.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // Fetch slots when a date is selected.
  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    setError(null);
    const dateStr = selectedDate.toISOString().split('T')[0];
    const params = new URLSearchParams({ date: dateStr });
    if (loSlug) params.set('loSlug', loSlug);
    if (eventTypeUri) params.set('eventTypeUri', eventTypeUri);

    fetch(`/api/calendly/slots?${params.toString()}`)
      .then((r) => r.json() as Promise<SlotsResponse>)
      .then((data) => {
        setSlots(data.slots ?? []);
        setDemoMode(Boolean(data.demoMode));
        setStep('time');
      })
      .catch(() => setError('Could not load times. Please try again.'))
      .finally(() => setLoading(false));
  }, [selectedDate, loSlug, eventTypeUri]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTime) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/calendly/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: selectedTime,
          name,
          email,
          phone,
          smsOptIn,
          loSlug,
          eventTypeUri,
          quizContext: prefill?.quizContext,
        }),
      });
      const data = (await res.json()) as BookResponse;
      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Booking failed');
      }
      setDemoMode(Boolean(data.demoMode));
      setStep('confirmed');
    } catch {
      setError('Booking failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    setError(null);
    if (step === 'time') {
      setStep('date');
      setSelectedDate(null);
      setSlots([]);
    } else if (step === 'form') {
      setStep('time');
      setSelectedTime(null);
    }
  }

  return (
    <Card variant="dark" hover={false} className={className}>
      {/* Header — title shifts by step. Single H3 for the whole flow. */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-eyebrow text-[var(--accent)]">
            {lo ? `Schedule with ${lo.name.split(' ')[0]}` : 'Schedule a call'}
          </p>
          <h3 className="font-display text-h3 mt-2">
            {step === 'date' && 'Pick a day'}
            {step === 'time' && 'Pick a time'}
            {step === 'form' && 'Your details'}
            {step === 'confirmed' && "You're booked"}
          </h3>
        </div>
        {(step === 'time' || step === 'form') && (
          <Button variant="tertiary" size="sm" onClick={handleBack}>
            ← Back
          </Button>
        )}
      </div>

      {error && (
        <p className="mb-4 text-body-sm text-[var(--error)]" role="alert">
          {error}
        </p>
      )}

      {/* STEP 1 — date picker. 14 days, weekends disabled. */}
      {step === 'date' && (
        <>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((d) => {
              const dow = DOW_LABELS[d.getDay()];
              const isWeekend = d.getDay() === 0 || d.getDay() === 6;
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={isWeekend}
                  onClick={() => setSelectedDate(d)}
                  className={`p-3 rounded-[var(--radius-md)] border text-center transition-all ${
                    isWeekend
                      ? 'border-[var(--border-dark)] opacity-30 cursor-not-allowed'
                      : 'border-[var(--border-dark)] hover:border-[var(--accent)] hover:bg-[rgba(197,165,114,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]'
                  }`}
                  aria-label={d.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                >
                  <span className="block text-micro font-mono text-[var(--text-muted)]">
                    {dow}
                  </span>
                  <span className="block text-h4 font-display mt-1">
                    {d.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-micro text-[var(--text-muted)] mt-4">
            Weekends are out of the office. Pick a weekday and we&apos;ll show available times.
          </p>
        </>
      )}

      {/* STEP 2 — time picker. */}
      {step === 'time' && (
        <>
          {loading && (
            <p className="text-body-sm text-[var(--text-secondary)]">
              Loading times...
            </p>
          )}
          {!loading && slots.length === 0 && (
            <p className="text-body-sm text-[var(--text-secondary)]">
              No times available that day. Try another date.
            </p>
          )}
          {!loading && slots.length > 0 && (
            <>
              <p className="text-body-sm text-[var(--text-secondary)] mb-3">
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map((s) => {
                  const time = new Date(s.startTime).toLocaleTimeString(
                    'en-US',
                    {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }
                  );
                  return (
                    <button
                      key={s.startTime}
                      type="button"
                      onClick={() => {
                        setSelectedTime(s.startTime);
                        setStep('form');
                      }}
                      className="p-3 rounded-[var(--radius-md)] border border-[var(--border-dark)] hover:border-[var(--accent)] hover:bg-[rgba(197,165,114,0.08)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* STEP 3 — borrower details + SMS opt-in (verbatim disclaimer). */}
      {step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quiz-context reassurance: only when the quiz routed the user here. */}
          {prefill?.quizContext && (
            <div
              className="rounded-[var(--radius-md)] border border-[rgba(197,165,114,0.25)] bg-[rgba(197,165,114,0.08)] p-4 text-body-sm"
              role="note"
            >
              <p className="text-eyebrow text-[var(--accent)] mb-1">
                From your quiz
              </p>
              <p className="text-[var(--text-primary)]">
                Recommended program:{' '}
                <span className="font-semibold">
                  {prefill.quizContext.recommendedProgramName}
                </span>
                {lo && (
                  <>
                    {' '}
                    · Best fit:{' '}
                    <span className="font-semibold">{lo.name}</span>
                  </>
                )}
              </p>
              <p className="text-[var(--text-muted)] text-micro mt-1">
                We&apos;ll bring this context into the call so you don&apos;t have to repeat yourself.
              </p>
            </div>
          )}
          <Input
            name="name"
            label="Full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="phone"
            label="Phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="flex items-start gap-3 text-body-sm text-[var(--text-secondary)] cursor-pointer">
            <input
              type="checkbox"
              checked={smsOptIn}
              onChange={(e) => setSmsOptIn(e.target.checked)}
              className="mt-1 flex-shrink-0 accent-[var(--accent)]"
            />
            {/* Verbatim per CLAUDE.md Compliance Rule. Never paraphrased. */}
            <span>{siteConfig.compliance.smsOptInDisclaimer}</span>
          </label>
          <Button type="submit" loading={submitting} fullWidth>
            {submitting ? 'Booking...' : 'Confirm booking'}
          </Button>
          {selectedTime && (
            <p className="text-micro text-[var(--text-muted)] text-center">
              Booking for{' '}
              {new Date(selectedTime).toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          )}
        </form>
      )}

      {/* STEP 4 — confirmed. */}
      {step === 'confirmed' && (
        <div className="text-center py-8">
          <span className="text-4xl" aria-hidden="true">
            🎉
          </span>
          <h4 className="font-display text-h3 mt-4">You&apos;re booked.</h4>
          <p className="text-body text-[var(--text-secondary)] mt-2">
            Confirmation email on the way.{' '}
            {lo
              ? `${lo.name.split(' ')[0]} will call you at the scheduled time.`
              : "We'll call you at the scheduled time."}
          </p>
          <p className="text-micro text-[var(--text-muted)] mt-4">
            Need to reschedule? Reply to the confirmation email.
          </p>
        </div>
      )}

      {/* Footer status row. */}
      <div className="mt-6 pt-6 border-t border-[var(--border-dark)] flex items-center gap-2">
        <Badge color="neutral">{demoMode ? 'Demo mode' : 'Live booking'}</Badge>
        <span className="text-micro text-[var(--text-muted)]">
          {demoMode
            ? 'Sample availability for preview.'
            : 'Live availability.'}
        </span>
      </div>
    </Card>
  );
}
