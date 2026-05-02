import type { Metadata } from 'next';
import CalculatorsIndexClient from './CalculatorsIndexClient';

// /calculators — INDEX (Phase 1F rebuild, Phase i18n migration)
//
// Section rhythm:
//   1. Hero               → dark   → intent (run the numbers)
//   2. Calculator grid    → light  → education (5 native calculators)
//   3. Real number CTA    → dark   → conversion (talk to a real person)
//
// Per CLAUDE.md LMP-Specific Custom Builds + Conversion Flow Rule + Compliance Rule:
//   - No third-party rates.now embeds anywhere
//   - Estimates only — never commitments
//   - Each calculator carries a [NOT-A-COMMITMENT] flag
//
// Phase i18n: display copy lives in `src/locales/<locale>/calculators.json`
// (indexPage.* keys). CalculatorsIndexClient renders the page body via
// useTranslation('calculators'). Metadata stays English (SSR before locale
// resolves; future: locale-aware metadata via cookie).

export const metadata: Metadata = {
  title: 'Mortgage Calculators',
  description:
    'Native mortgage calculators built for real conversations: affordability, monthly payment, refinance, down payment, and DTI. Fast, AEO-ready, branded for LMP Financial.',
};

export default function CalculatorsPage() {
  return <CalculatorsIndexClient />;
}
