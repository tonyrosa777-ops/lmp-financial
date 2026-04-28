// src/app/mortgage-broker-[state]/page.tsx
//
// Phase 1F — State Pages Agent (2026-04-27).
//
// Dynamic per-state landing page. One route per licensed state, statically
// generated at build time. Slugs are kebab-case full state names:
// /mortgage-broker-massachusetts, /mortgage-broker-new-hampshire, etc.
//
// The directory name uses the literal-prefix dynamic-segment pattern
// `mortgage-broker-[state]` (Next.js App Router supports static text adjacent
// to a dynamic param in a single segment).
//
// Per market-intelligence.md §6 + §9 Do #2 — state-program operator depth with
// current 2026 figures is one of LMP's highest-leverage AEO wedges.

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  STATE_PROGRAMS,
  type StateInfo,
} from '@/data/state-programs';
import { siteConfig } from '@/data/site';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export function generateStaticParams() {
  return Object.values(STATE_PROGRAMS).map((s) => ({ state: s.slug }));
}

function findStateBySlug(slug: string): StateInfo | undefined {
  return Object.values(STATE_PROGRAMS).find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) return { title: 'State Not Found' };
  return {
    title: `Mortgage Broker in ${info.name} · LMP Financial`,
    description: `LMP Financial is licensed in ${info.name}. ${info.programs.length} state housing-finance programs explained, ${info.featuredLOSlugs.length} loan officers serving ${info.primaryCity} and the broader ${info.region} market.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) notFound();

  const featuredLOs = info.featuredLOSlugs
    .map((slug) => siteConfig.loanOfficers.find((lo) => lo.slug === slug))
    .filter((lo): lo is NonNullable<typeof lo> => lo !== undefined);

  return (
    <>
      {/* Page header — dark, breathing-orb gold halo */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <PhotoBackground src={`/images/states/${info.slug}.jpg`} priority />
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
              {info.region} · NMLS #{siteConfig.business.nmls}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Mortgage broker in {info.name}.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {info.intro}
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge color="gold">
                {info.programs.length} state programs we shop
              </Badge>
              <Badge color="neutral">
                {featuredLOs.length} {info.code} loan officers featured
              </Badge>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* State programs — light section, mesh-drift backdrop */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {info.programs.length} {info.code} state programs
            </p>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              State programs we shop for {info.name} buyers.
            </h2>
            <p className="text-micro text-[var(--text-on-light-muted)] italic mt-3">
              [FIGURES-CURRENT-AS-OF-2026-Q1 · COMPLIANCE-REVIEW-PENDING]
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {info.programs.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.05}>
                <Card variant="light" hover={false}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-h3 text-[var(--text-on-light)]">
                        {p.name}
                      </h3>
                      <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                        {p.agency}
                      </p>
                    </div>
                    <Badge color="gold">{p.type}</Badge>
                  </div>
                  {p.downPaymentAssistance && (
                    <p className="font-mono text-h4 text-[var(--accent-deep)] mt-4">
                      {p.downPaymentAssistance}
                    </p>
                  )}
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {p.eligibility}
                  </p>
                  {p.flag && (
                    <p className="text-micro text-[var(--text-on-light-muted)] italic mt-3">
                      {p.flag}
                    </p>
                  )}
                  <a
                    href={p.agencyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-eyebrow text-[var(--accent-deep)] mt-4 inline-block hover:underline"
                  >
                    Visit {p.agency} →
                  </a>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Featured LOs — dark section */}
      {featuredLOs.length > 0 && (
        <section className="section-dark-gradient section-pad-base">
          <div className="container-base px-6">
            <FadeUp>
              <p className="text-eyebrow text-[var(--accent)]">
                Featured Loan Officers
              </p>
              <h2 className="font-display text-h2 mt-3 max-w-3xl">
                {info.code} loan officers on the LMP team.
              </h2>
              <p className="text-micro text-[var(--text-muted)] italic mt-3">
                [CONFIRM-WITH-CLIENT — per-state LO licensure subset pending]
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {featuredLOs.map((lo, i) => (
                <FadeUp key={lo.slug} delay={i * 0.05}>
                  <Card variant="dark" href={`/team/${lo.slug}`}>
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h4 text-[var(--primary-deep)] font-bold">
                      {lo.name
                        .split(' ')
                        .map((p) => p.charAt(0))
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <h3 className="font-display text-h4 mt-4">{lo.name}</h3>
                    <p className="text-micro text-[var(--text-secondary)] mt-1">
                      {lo.role}
                    </p>
                    <p className="text-micro font-mono text-[var(--accent)] mt-1">
                      NMLS #{lo.nmls}
                    </p>
                    <span className="text-eyebrow text-[var(--accent)] mt-4 inline-block">
                      Schedule with {lo.name.split(' ')[0]} →
                    </span>
                  </Card>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] max-w-2xl mx-auto">
              Ready to start in {info.name}?
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4 max-w-xl mx-auto">
              Take the 5-question quiz or schedule a call. We will match you to
              the right program and the right LO.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
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
    </>
  );
}
