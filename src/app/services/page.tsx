// src/app/services/page.tsx
//
// Loan Programs index. Server wrapper — owns the metadata export and the
// FinancialService schema. Interactive translatable UI lives in
// ServicesIndexClient (uses useTranslation('services')).
//
// Per CLAUDE.md Homepage Section Architecture Rule: dark/light alternation, gradient
// backgrounds (no flat solids), interior page header pattern (pt-32 pb-20), ambient
// breathing-orb effect (NOT full hero canvas — interior page).
//
// Phase 1E — Loan-Program Pages Agent. Wave 2B — i18n migration.

import type { Metadata } from 'next';
import ServicesIndexClient from './ServicesIndexClient';

export const metadata: Metadata = {
  title: 'Loan Programs',
  description:
    '9 mortgage programs, shopped across 30+ wholesale lenders. FHA, VA, Jumbo, USDA, First-Time Buyer, Reverse, Interest-Only, ARM, Fixed-Rate. Available in MA, NH, ME, RI, CT, FL, CO, VT, TX.',
};

export default function ServicesPage() {
  return <ServicesIndexClient />;
}
