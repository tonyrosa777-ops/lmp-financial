import type { Metadata } from 'next';
import FaqClient from './FaqClient';

// /faq — Frequently Asked Questions
//
// Phase 1E (Static Pages Bundle Agent) + Bilingual migration.
// Server wrapper — exports metadata only. Interactive UI + translation hooks
// live in FaqClient (Client Component).

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'How pre-approval works. What documents you need. FHA vs Conventional. Why a broker beats a bank. Twelve common questions, honestly answered.',
};

export default function FAQPage() {
  return <FaqClient />;
}
