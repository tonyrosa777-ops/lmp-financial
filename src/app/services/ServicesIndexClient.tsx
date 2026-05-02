'use client';

// src/app/services/ServicesIndexClient.tsx
//
// Client wrapper for the Loan Programs index. Owns all translatable copy via
// useTranslation('services'). The server page (services/page.tsx) keeps the
// `metadata` export and renders this client component.
//
// Per CLAUDE.md Bilingual Copy Rule: every translatable string lives in
// /src/locales/en/services.json + /src/locales/es/services.json. siteConfig
// remains the structural source of truth (slug + emoji); the per-program
// `name`, `blurb`, and `eligibility` come from `t('programs.<slug>.*')`.

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export default function ServicesIndexClient() {
  const { t } = useTranslation('services');

  return (
    <>
      {/* Local keyframe for the breathing orb — kept inline so the page is
          self-contained and globals.css stays focused on universal tokens. */}
      <style>{`
        @keyframes breathe-orb {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathe-orb { animation: none !important; opacity: 0.7; }
        }
      `}</style>

      {/* Page header — interior page pattern (pt-32 pb-20).
          Dark gradient + ambient breathing orb (CSS-only). */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/services.jpg" priority />
        <div
          aria-hidden="true"
          className="breathe-orb absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.12), transparent 60%)',
            animation: 'breathe-orb 12s ease-in-out infinite',
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

      {/* Programs grid — light section (alternation rhythm) */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.loanPrograms.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.05}>
                <Card variant="light" href={`/services/${p.slug}`}>
                  <span className="text-3xl" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-3">
                    {t(`programs.${p.slug}.name`)}
                  </h2>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-2">
                    {t(`programs.${p.slug}.blurb`)}
                  </p>
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-3 font-mono">
                    {t(`programs.${p.slug}.eligibility`)}
                  </p>
                  <span className="text-eyebrow text-[var(--accent-deep)] mt-4 inline-block">
                    {t('sectionLabels.learnMore')}
                  </span>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — dark section. One CTA block at the bottom per
          Homepage Section Architecture Rule (purpose-level dedup). */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              {t('indexPage.ctaSection.headline')}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              {t('indexPage.ctaSection.body')}
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
