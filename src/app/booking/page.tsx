/**
 * /booking — Brand-level scheduling page.
 *
 * Hosts the custom-branded BookingCalendar component as the page's primary
 * conversion surface. Per CLAUDE.md Conversion Flow Rule, the calendar is
 * inline (no Calendly redirect, no iframe). Per Always-Built Features Rule,
 * BookingCalendar lives here, on each /team/[lo-slug] page (per-LO Calendly),
 * AND as a homepage teaser section.
 *
 * Page structure: dark hero → light calendar section → dark FAQ → footer.
 * Alternation honors the Homepage Section Architecture Rule.
 */

import type { Metadata } from 'next';
import BookingCalendar from '@/components/BookingCalendar';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export const metadata: Metadata = {
  title: 'Schedule a Call',
  description:
    "Pick a time. Our team will call you to walk through your situation, talk through programs, and answer questions. Free, no commitment.",
};

const FAQ_ITEMS = [
  {
    q: 'What should I expect on the call?',
    a: 'A 30-minute conversation. We talk through your situation, your goals, what programs might fit. No commitment, no pitch.',
  },
  {
    q: 'What documents should I have ready?',
    a: 'Nothing required for the first call. If you want a soft pre-approval estimate during the call, have your most recent pay stub and a sense of your credit score handy.',
  },
  {
    q: 'Will this affect my credit score?',
    a: 'Not for the call. We do a soft pull only if you ask for a pre-approval estimate, and only with your written consent.',
  },
  {
    q: 'Can I reschedule?',
    a: 'Yes. Reply to the confirmation email or pick a new time on this page.',
  },
];

export default function BookingPage() {
  return (
    <>
      {/* Page header — dark gradient. */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <PhotoBackground src="/images/pages/booking.jpg" priority />
        <div className="container-base px-6 relative z-10 text-center">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Get Pre-Approved</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl mx-auto">
              Pick a time. We&apos;ll call.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              {/* [DEMO COPY — pending client review] */}
              Free 30-minute call. No pressure. No commitment. We&apos;ll walk through your situation and talk through which programs fit.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Calendar — light gradient. */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <BookingCalendar />
        </div>
      </section>

      {/* FAQ — dark gradient. */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl">
              {/* [DEMO COPY — pending client review] */}
              A few common questions
            </h2>
          </FadeUp>
          <div className="mt-8 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group bg-[var(--bg-card-dark)] border border-[var(--border-dark)] rounded-[var(--radius-lg)]"
              >
                <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 text-body font-semibold">
                  {item.q}
                  <span
                    className="text-[var(--accent)] flex-shrink-0 transition-transform group-open:rotate-45 text-xl"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-body-sm text-[var(--text-secondary)]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <p className="text-micro text-[var(--text-muted)] italic mt-6">
            {/* [DEMO COPY — pending client review] */}
            Demo copy pending client review.
          </p>
        </div>
      </section>
    </>
  );
}
