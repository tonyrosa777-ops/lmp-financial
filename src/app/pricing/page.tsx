import type { Metadata } from 'next';
import PricingClient from './PricingClient';

/**
 * Pricing Page — INTERNAL OPTIMUS SALES TOOL.
 *
 * Per CLAUDE.md "Always-Built Features Rule → Pricing Page": this page is the
 * Optimus internal sales tool. It ships in every build, is visually flagged in
 * the navigation with the amber ⬥ marker, and is DELETED before launch by the
 * pre-launch auditor. It is never crawled, never indexed, never linked from
 * an external surface.
 *
 * robots: noindex, nofollow — explicitly hidden from search engines.
 */

export const metadata: Metadata = {
  title: '⬥ Pricing — Internal Sales Tool',
  description:
    'Optimus website tier pricing. Internal sales tool — deleted before launch.',
  robots: { index: false, follow: false },
};

export default function PricingPage() {
  // Header section is rendered inside PricingClient so the page-level eyebrow,
  // H1, and subheadline translate via useTranslation('pricing'). page.tsx
  // remains a Server Component for metadata.
  return <PricingClient />;
}
