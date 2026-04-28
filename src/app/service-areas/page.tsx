// src/app/service-areas/page.tsx
//
// Phase 1F — State Pages Agent (2026-04-27).
//
// 9-state index page. Cards are grouped by region and link to the dynamic
// per-state page at /mortgage-broker-[slug]. Bottom CTA is a "we are growing"
// nudge that links to /contact for state requests.
//
// Per market-intelligence.md §9 Avoid #3 — do not over-index on Lowell. The
// footprint is 9 states. This page makes that visible.

import type { Metadata } from 'next';
import {
  STATE_PROGRAMS,
  STATES_BY_REGION,
  REGION_ORDER,
} from '@/data/state-programs';
import { siteConfig } from '@/data/site';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export const metadata: Metadata = {
  title: 'Service Areas · LMP Financial',
  description:
    'LMP Financial is licensed in 9 states: Massachusetts, New Hampshire, Maine, Rhode Island, Connecticut, Vermont, Florida, Colorado, and Texas. Explore state housing-finance programs, DPA stacks, and the loan officers who serve each market.',
};

export default function ServiceAreasPage() {
  const totalStates = siteConfig.business.licensedStates.length;
  const totalPrograms = Object.values(STATE_PROGRAMS).reduce(
    (sum, s) => sum + s.programs.length,
    0
  );

  return (
    <>
      {/* Page header — dark, breathing-orb halo */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <PhotoBackground src="/images/pages/service-areas.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              {totalStates} states · {siteConfig.loanOfficers.length} loan
              officers · NMLS #{siteConfig.business.nmls}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Where we work.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              We are licensed in nine states across New England, the Mountain
              West, Texas, and Florida. Pick yours below for the state housing
              programs we shop, the loan officers who serve that market, and a
              direct path to pre-approval.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge color="gold">
                {totalPrograms} state programs documented
              </Badge>
              <Badge color="neutral">
                Programs current as of 2026-Q1 [verify per-state]
              </Badge>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Region groups — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6">
          {REGION_ORDER.map((region, regionIdx) => {
            const stateCodes = STATES_BY_REGION[region];
            const states = stateCodes.map((code) => STATE_PROGRAMS[code]);
            return (
              <div
                key={region}
                className={regionIdx > 0 ? 'mt-20' : 'mt-0'}
              >
                <FadeUp>
                  <div className="flex items-baseline justify-between flex-wrap gap-3">
                    <h2 className="font-display text-h2 text-[var(--text-on-light)]">
                      {region}
                    </h2>
                    <p className="text-micro font-mono text-[var(--text-on-light-muted)]">
                      {states.length} state{states.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {states.map((info, i) => (
                    <FadeUp key={info.code} delay={i * 0.05}>
                      <Card
                        variant="light"
                        href={`/mortgage-broker/${info.slug}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-eyebrow text-[var(--accent-deep)]">
                              {info.region}
                            </p>
                            <h3 className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                              {info.name}
                            </h3>
                          </div>
                          <Badge color="gold">{info.code}</Badge>
                        </div>
                        <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-4">
                          {info.programs.length} state program
                          {info.programs.length === 1 ? '' : 's'} · We work{' '}
                          {info.primaryCity}
                        </p>
                        <span className="text-eyebrow text-[var(--accent-deep)] mt-4 inline-block">
                          Explore {info.name} programs →
                        </span>
                      </Card>
                    </FadeUp>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA — dark, "we're growing" */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">We are growing.</p>
            <h2 className="font-display text-h2 mt-3 max-w-2xl mx-auto">
              Tell us where you would want LMP next.
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              We add states deliberately, with the right loan officers and the
              right state-program depth. If your state is not on the list yet,
              tell us. It informs where we go next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/contact" size="lg">
                Request your state
              </Button>
              <Button href="/booking" variant="secondary" size="lg">
                Get Pre-Approved
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
