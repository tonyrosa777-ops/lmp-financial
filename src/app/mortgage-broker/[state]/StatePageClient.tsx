'use client';

// src/app/mortgage-broker/[state]/StatePageClient.tsx
//
// Client wrapper for /mortgage-broker/[state]. Owns chrome copy via
// useTranslation('states'). Per-state structural data (programs, featured
// LOs, code, region, primaryCity) stays in src/data/state-programs.ts —
// programs deliberately remain English in Phase E (W1D scope note).
//
// Translatable per-state field: `blurb` (lookups by slug in states.json).
// State `fullName` stays English in BOTH locales (proper noun). Region label
// translates via the JSON regions map.
//
// COMPLIANCE: per CLAUDE.md, state-specific advertising rules apply per-state
// (MA, NH, ME, RI, CT, FL, CO, VT, TX). Program copy is NOT paraphrased here;
// it's pulled verbatim from state-programs.ts where it sits behind a compliance
// review flag. The compliance disclaimer below the programs grid is also
// rendered from JSON to allow ES localization of the disclaimer chrome —
// the underlying figures and program names stay structural.

import { useTranslation } from '@/hooks/useTranslation';
import { siteConfig } from '@/data/site';
import type { StateInfo } from '@/data/state-programs';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

interface StatePageClientProps {
  info: StateInfo;
}

export default function StatePageClient({ info }: StatePageClientProps) {
  const { t } = useTranslation('states');

  // Translated blurb keyed by slug. Falls back to structural intro on miss.
  const blurbKey = `states.${info.slug}.blurb`;
  const blurb = t(blurbKey);
  const intro = blurb === blurbKey ? info.intro : blurb;

  // Translated region label. Falls back to the structural region string.
  const regionKey = `regions.${info.region}`;
  const region = t(regionKey);
  const regionLabel = region === regionKey ? info.region : region;

  // CTA section headline + button — substitute the state's English fullName
  // (proper noun stays English in both locales).
  const ctaHeadline = t('statePage.labels.ctaSection').replace('{state}', info.name);
  const ctaButton = t('statePage.labels.ctaButton').replace('{state}', info.code);

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
              {regionLabel} · NMLS #{siteConfig.business.nmls}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            {/* Proper noun {info.name} stays English in both locales. */}
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Mortgage broker in {info.name}.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {intro}
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge color="gold">
                {info.programs.length} {t('statePage.labels.specialPrograms')}
              </Badge>
              <Badge color="neutral">
                {featuredLOs.length} {info.code}{' '}
                {t('statePage.labels.loanOfficersInState')}
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
              {info.programs.length} {info.code}{' '}
              {t('statePage.labels.specialPrograms')}
            </p>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('statePage.labels.programsAvailable')} ({info.name}).
            </h2>
            {/* Compliance flag — chrome copy translates; the underlying figures
                stay in state-programs.ts behind their own [COMPLIANCE-REVIEW-PENDING]
                flag. Per CLAUDE.md state-advertising rules, no paraphrase here. */}
            <p className="text-micro text-[var(--text-on-light-muted)] italic mt-3">
              {t('statePage.compliance.figuresFlag')}
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {info.programs.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.05}>
                <Card variant="light" hover={false}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {/* Program names + agencies stay structural English —
                          per CLAUDE.md state-advertising rules they are not
                          paraphrased and are pending per-state compliance review. */}
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
                    {t('statePage.labels.viewAgencyLink')}
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
                {t('statePage.labels.loanOfficersInState')}
              </p>
              <h2 className="font-display text-h2 mt-3 max-w-3xl">
                {info.code} {t('statePage.labels.loanOfficersInState')}.
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
              {ctaHeadline}
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4 max-w-xl mx-auto">
              {t('statePage.labels.ctaSubheadline')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                {ctaButton}
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                {t('statePage.labels.preApprovalCta')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
