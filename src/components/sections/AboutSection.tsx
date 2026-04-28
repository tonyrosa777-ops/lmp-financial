'use client';

/**
 * AboutSection — light section, 2-column layout.
 *
 * Left: founder story written in Mike voice (~140 words, [DEMO COPY] flagged).
 * Right: portrait placeholder with [ASSET-PENDING] callout (real asset Phase 1G).
 *
 * Reference voice: design-system.md §7 voice anchor — "Built like a Lowell
 * handshake, runs like Stripe." References: 22 LOs, 9 states, Lowell HQ,
 * shopping 30+ wholesale lenders.
 *
 * NOTE: /about is not yet built. Section CTA points to /team for now.
 */

import { siteConfig } from '@/data/site';
import SlideIn from '@/components/animations/SlideIn';
import Button from '@/components/ui/Button';

export default function AboutSection() {
  const { business, loanOfficers } = siteConfig;

  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left">
            <p className="text-eyebrow text-[var(--accent-deep)]">About {business.name}</p>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
              Built like a Lowell handshake.
            </h2>

            {/* [DEMO COPY — pending client review] — Mike voice, ~140 words. */}
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6">
              We started LMP Financial in Lowell because borrowers in our neighborhood, in
              Brockton, in Cape Coral, in Denver deserved a broker who shops the market for
              them. Not a bank pushing one product, not a call-center reading from a script.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              Today we are {loanOfficers.length} loan officers across {business.licensedStatesLong.length} licensed states,
              shopping 30-plus wholesale lenders on every file we touch. We are independent
              on purpose. We answer Saturday calls. We come to closings. And we still believe
              the best mortgage is the one you understand cold by the time you sign for it.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              That is the LMP promise. Lowell handshake. Stripe execution.
            </p>
            {/* [DEMO COPY — pending client review] */}

            <div className="mt-8">
              <Button href="/team" variant="secondary">
                Meet the team
              </Button>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            {/* Portrait placeholder — Mike Comerford. Real asset Phase 1G. */}
            <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-[var(--bg-card-dark)] border border-[var(--border-dark-strong)] flex items-center justify-center">
              <span className="text-eyebrow text-[var(--text-muted)] text-center px-6">
                [ASSET-PENDING — Mike portrait]
              </span>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
