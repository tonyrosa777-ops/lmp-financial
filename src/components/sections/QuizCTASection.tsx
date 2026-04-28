'use client';

/**
 * QuizCTASection — light section, centered mid-page conversion nudge.
 *
 * Different format than the hero CTA + final CTA per Homepage Section
 * Architecture Rule purpose-level dedup: hero pushes pre-approval,
 * final CTA pushes pre-approval; this section pushes the QUIZ specifically
 * (different intent, different funnel).
 */

import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';

export default function QuizCTASection() {
  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6 text-center">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent-deep)]">
            Not Sure Where to Start?
          </p>
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl mx-auto">
            Three minutes. Five questions. The right loan officer.
          </h2>
          <p className="text-body text-[var(--text-on-light-secondary)] mt-4 max-w-xl mx-auto">
            Tell us a little about your situation. We&apos;ll match you to the right program
            and the right LO.
          </p>
          <div className="mt-8">
            <Button href="/quiz" size="lg">
              Take the Quiz
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
