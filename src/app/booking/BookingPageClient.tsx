'use client';

// src/app/booking/BookingPageClient.tsx
//
// Client wrapper for the brand-level /booking page chrome. Owns header copy
// + FAQ via useTranslation('booking'). The BookingCalendar component itself
// (under src/components/) keeps its own internal English labels for Phase E
// per the Bilingual Wave 2B scope; a later phase migrates the calendar UI.
//
// Per CLAUDE.md Conversion Flow Rule: calendar embedded inline, never a
// Calendly redirect. Page rhythm: dark hero → light calendar → dark FAQ.

import { useTranslation } from '@/hooks/useTranslation';
import BookingCalendar from '@/components/BookingCalendar';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

interface FaqItem {
  question: string;
  answer: string;
}

export default function BookingPageClient() {
  const { t, ta } = useTranslation('booking');

  // FAQ items live in the JSON dictionary; ta returns undefined on miss so we
  // fall back to an empty list. The list is rendered as <details>.
  const faqItems = ta<FaqItem[]>('faq.items') ?? [];

  return (
    <>
      {/* Page header — dark gradient. */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <PhotoBackground src="/images/pages/booking.jpg" priority />
        <div className="container-base px-6 relative z-10 text-center">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('page.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl mx-auto">
              {t('page.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              {/* [DEMO COPY — pending client review] */}
              {t('page.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Calendar — light gradient. UI labels inside BookingCalendar stay
          English for Phase E; Phase F or a follow-up phase will migrate. */}
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
              {t('faq.headline')}
            </h2>
          </FadeUp>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group bg-[var(--bg-card-dark)] border border-[var(--border-dark)] rounded-[var(--radius-lg)]"
              >
                <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 text-body font-semibold">
                  {item.question}
                  <span
                    className="text-[var(--accent)] flex-shrink-0 transition-transform group-open:rotate-45 text-xl"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-body-sm text-[var(--text-secondary)]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
          <p className="text-micro text-[var(--text-muted)] italic mt-6">
            {/* [DEMO COPY — pending client review] */}
            {t('faq.demoNote')}
          </p>
        </div>
      </section>
    </>
  );
}
