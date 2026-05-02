// /partners — Realtor Referral Funnel
//
// Audience 2 of Mike's three-headed monster (per CLAUDE.md operating principle 2 +
// initial-business-data.md Section 9A). First-class conversion page, NOT footer-buried.
//
// Server wrapper — owns metadata. Translatable chrome lives in PartnersPageClient
// (uses useTranslation('partners')). SMS opt-in disclaimer + broker disclosure
// remain VERBATIM ENGLISH in BOTH locales per CLAUDE.md Compliance Rule.

import type { Metadata } from 'next';
import PartnersPageClient from './PartnersPageClient';

export const metadata: Metadata = {
  title: 'Realtor Partners',
  description:
    'Send your buyers to a mortgage broker who closes on time, communicates weekly, and shows up at the closing table. RESPA-compliant co-marketing kits at no cost. 14-day average close.',
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
