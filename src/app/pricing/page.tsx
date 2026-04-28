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
  return (
    <>
      {/* Page header — dark gradient */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <div className="container-base px-6 relative z-10 text-center">
          <p className="text-eyebrow text-[var(--accent)]">⬥ Pricing</p>
          <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl mx-auto">
            Three tiers. One website that closes deals.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
            Every site we build ships with the same luxury foundation. Tiers add features that compound conversion. Most clients pick Pro.
          </p>
        </div>
      </section>

      <PricingClient />
    </>
  );
}
