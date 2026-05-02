// src/app/quiz/page.tsx
//
// Quiz page — server wrapper. Mounts the client-side <QuizClient /> inside
// the standard 2-section page header (dark hero header + light body section)
// per CLAUDE.md Homepage Section Architecture Rule (alternating tones).
//
// The header H1 carries the .hero-shimmer treatment per CLAUDE.md Hero
// Architecture Rule (heading-shimmer applies to every page H1, not just home).

import type { Metadata } from 'next';
import PhotoBackground from '@/components/PhotoBackground';
import QuizClient, { QuizHeader } from './QuizClient';

// Metadata stays English — page-level <title>/<meta description> render at
// request time before client locale resolves; ES locale users get translated
// in-page UI via QuizHeader + QuizClient. Future: SSR locale-aware metadata.
export const metadata: Metadata = {
  title: 'Find Your Loan Path | LMP Financial',
  description:
    '5 questions, 3 minutes. We match you to the right loan program and the right loan officer based on your situation, your state, and your timeline.',
};

export default function QuizPage() {
  return (
    <>
      {/* Page header — dark gradient with shimmer H1 (translated copy via QuizHeader) */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <PhotoBackground src="/images/pages/quiz.jpg" priority />
        <QuizHeader />
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
