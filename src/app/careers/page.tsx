// /careers — Loan Officer Recruiting Funnel
//
// Audience 3 of Mike's three-headed monster (per CLAUDE.md operating principle 2 +
// initial-business-data.md Section 9A). First-class conversion page for LO recruits.
// Brian Walsh is the named recruiter contact (per IBD §10 + market-intelligence.md §9).
//
// Server wrapper — owns metadata. Translatable chrome lives in CareersPageClient
// (uses useTranslation('careers')). SMS opt-in disclaimer + broker disclosure
// remain VERBATIM ENGLISH in BOTH locales per CLAUDE.md Compliance Rule.

import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers — Loan Officers',
  description:
    'More book. More tools. More money. 220-275 bps comp range, in-person Lowell training, bilingual marketing assets, 30-plus wholesale lenders. Talk to Brian Walsh.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
