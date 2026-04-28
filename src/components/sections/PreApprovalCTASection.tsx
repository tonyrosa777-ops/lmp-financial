'use client';

/**
 * PreApprovalCTASection — dark section, final closing CTA at homepage bottom.
 *
 * Reuses Layer 1 HeroParticles for ambient luxury echo of the hero, satisfying
 * the "no flat solid backgrounds" rule and reinforcing the conversion bookend.
 *
 * Per CLAUDE.md Homepage Section Architecture Rule: there is exactly ONE final
 * CTA section. Both buttons funnel to conversion (pre-approval primary,
 * quiz secondary).
 */

import { siteConfig } from '@/data/site';
import HeroParticles from '@/components/HeroParticles';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';

export default function PreApprovalCTASection() {
  const { business, loanOfficers } = siteConfig;

  return (
    <section className="relative overflow-hidden section-dark-gradient section-pad-loose">
      <HeroParticles />

      <div className="container-base px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="hero-shimmer font-display text-h1 max-w-3xl mx-auto">
            Get Pre-Approved.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-4">
            One application. {loanOfficers.length} loan officers. {business.licensedStatesLong.length} states.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button href="/booking" size="lg">
              Get Pre-Approved
            </Button>
            <Button href="/quiz" variant="secondary" size="lg">
              Take the Quiz
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
