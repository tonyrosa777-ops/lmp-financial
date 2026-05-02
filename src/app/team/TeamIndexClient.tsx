'use client';

// src/app/team/TeamIndexClient.tsx
//
// Client wrapper for the Team index page. Owns all translatable copy via
// useTranslation('team'). The server page (team/page.tsx) keeps the
// `metadata` export and renders this client component.
//
// Per CLAUDE.md Bilingual Copy Rule: every translatable string lives in
// /src/locales/en/team.json + /src/locales/es/team.json. siteConfig remains the
// structural source of truth (slug, name, NMLS, languages). Per-LO `title`
// (role) and `bio` come from `t('officers.<slug>.title' | '.bio')`.
//
// Per CLAUDE.md Compliance Rule: NMLS number is rendered for every LO in BOTH
// locales (regulatory requirement). State licensure rendering uses the
// per-LO `stateLicensure` array — never implicates a state the LO is not
// licensed in regardless of locale.

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export default function TeamIndexClient() {
  const { t } = useTranslation('team');
  const { loanOfficers } = siteConfig;

  return (
    <>
      {/* Page header — dark gradient, breathing orb ambient */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/team.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              {t('indexPage.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('indexPage.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('indexPage.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* LO grid — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          {/* Filter UI placeholder — Phase 1F functional. Visual stub for demo. */}
          <FadeUp>
            <div className="mb-12 flex flex-wrap gap-3 items-center">
              <span className="text-eyebrow text-[var(--text-on-light-secondary)]">
                {t('indexPage.filterLabel')}
              </span>
              <Badge color="gold">{t('indexPage.filterAllStates')}</Badge>
              <Badge color="neutral">{t('indexPage.filterAllLanguages')}</Badge>
              <span className="text-micro text-[var(--text-on-light-muted)] italic ml-2">
                [Phase 1F — interactive filters]
              </span>
            </div>
          </FadeUp>

          {/* 22-LO grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loanOfficers.map((lo, i) => {
              // LO name: structural (English in both locales — proper noun).
              // Role/title: translated.
              // NMLS: regulatory, displayed in BOTH locales (compliance).
              // Bio first-sentence preview: translated.
              const loTitle = t(`officers.${lo.slug}.title`);
              const loBio = t(`officers.${lo.slug}.bio`);
              const bioFirstSentence = loBio.split('.')[0] + '.';
              const firstName = lo.name.split(' ')[0];

              return (
                <FadeUp key={lo.slug} delay={i * 0.03}>
                  <Card
                    variant="light"
                    href={`/team/${lo.slug}`}
                    className="text-center h-full flex flex-col"
                  >
                    {/* Photo placeholder — circular initials */}
                    <div className="w-24 h-24 mx-auto rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h3 text-[var(--primary-deep)] font-bold">
                      {lo.name
                        .split(' ')
                        .map((p) => p.charAt(0))
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <h2 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                      {lo.name}
                    </h2>
                    <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-1">
                      {loTitle}
                    </p>
                    <p className="text-micro font-mono text-[var(--accent-deep)] mt-2">
                      {t('loPage.labels.nmlsPrefix')}
                      {lo.nmls}
                    </p>
                    {lo.languages.length > 1 && (
                      <p
                        className="text-micro text-[var(--text-on-light-muted)] mt-2"
                        aria-label={`Languages: ${lo.languages.join(', ')}`}
                      >
                        {lo.languages
                          .map((l) =>
                            l === 'en'
                              ? '🇺🇸'
                              : l === 'es'
                                ? '🇪🇸'
                                : l === 'pt'
                                  ? '🇧🇷'
                                  : ''
                          )
                          .filter(Boolean)
                          .join(' ')}
                      </p>
                    )}
                    <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3 line-clamp-3 flex-1">
                      {bioFirstSentence}
                    </p>
                    <span className="text-eyebrow text-[var(--accent-deep)] mt-4">
                      {t('indexPage.scheduleWithPrefix')} {firstName} →
                    </span>
                  </Card>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              {t('indexPage.ctaSection.headline')}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              {t('indexPage.ctaSection.subheadline')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/quiz" size="lg">
                {t('indexPage.ctaSection.ctaPrimary')}
              </Button>
              <Button href="/booking" variant="secondary" size="lg">
                {t('indexPage.ctaSection.ctaSecondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

    </>
  );
}
