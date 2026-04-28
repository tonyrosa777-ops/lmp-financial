// src/app/quiz/page.tsx
//
// Quiz page — server wrapper. Mounts the client-side <QuizClient /> inside
// the standard 2-section page header (dark hero header + light body section)
// per CLAUDE.md Homepage Section Architecture Rule (alternating tones).
//
// The header H1 carries the .hero-shimmer treatment per CLAUDE.md Hero
// Architecture Rule (heading-shimmer applies to every page H1, not just home).

import type { Metadata } from 'next';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
  title: 'Find Your Loan Path | LMP Financial',
  description:
    '5 questions, 3 minutes. We match you to the right loan program and the right loan officer based on your situation, your state, and your timeline.',
};

export default function QuizPage() {
  return (
    <>
      {/* Page header — dark gradient with shimmer H1 */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <div className="container-base px-6 relative z-10 text-center">
          <p className="text-eyebrow text-[var(--accent)]">Find Your Loan Path</p>
          <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl mx-auto">
            Three minutes. Five questions. The right loan officer.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-[var(--text-secondary)] text-lg">
            We will type your situation, recommend the loan program that fits, and
            put you on the calendar with the loan officer best suited for it.
          </p>
        </div>
      </section>

      {/* Quiz body — light gradient section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <QuizClient />
        </div>
      </section>
    </>
  );
}
