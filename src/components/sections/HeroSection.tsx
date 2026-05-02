'use client';

/**
 * HeroSection — Layer 1+2+3 stack per CLAUDE.md Hero Architecture Rule.
 *
 * Extracted verbatim from src/app/page.tsx (Phase 1D inline hero).
 * NO behavioral change to layers 1-3: same JSX, same imports, same staggered
 * FadeUp delays (0.1, 0.3, 0.5, 1.4, 1.8s).
 *
 *   Layer 1 — HeroParticles (canvas particle system, full-bleed, z-0)
 *   Layer 2 — KeyringCanvas (right-panel brand canvas)
 *   Layer 3 — Framer Motion staggered text (left panel)
 *
 * Phase 1G — Founder strip subsection added below the hero grid, INSIDE the
 * same <section> so it shares the dark gradient + HeroParticles backdrop.
 * Folds the former AboutSection into the hero to resolve the L-L adjacency
 * with StatsSection. FadeUp delay 2.0 — arrives after the trust strip (1.8).
 *
 * Phase i18n — display strings sourced from `home` namespace via useTranslation.
 * Structural data (CTA hrefs, business numbers, LO count) stays in siteConfig.
 */

import Link from 'next/link';
import { siteConfig } from '@/data/site';
import HeroParticles from '@/components/HeroParticles';
import KeyringCanvas from '@/components/KeyringCanvas';
import FadeUp from '@/components/animations/FadeUp';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroSection() {
  const { business, loanOfficers, hero } = siteConfig;
  const { t, ta } = useTranslation('home');

  const trustStrip = ta<string[]>('hero.trustStrip') ?? hero.trustStrip;
  const eyebrowTemplate = t('hero.eyebrowTemplate');
  // Token replacement: {nmls}, {stateCount}, {loCount}
  const eyebrow = eyebrowTemplate
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length))
    .replace('{loCount}', String(loanOfficers.length));

  return (
    <section className="relative min-h-[calc(100vh-96px)] overflow-hidden flex flex-col items-stretch pt-20 md:pt-32 section-dark-gradient">
      {/* Layer 1 — HeroParticles full background, pointer-events-none, z-0 */}
      <HeroParticles />

      {/* Layer 3 wrapper — text + canvas panel, z-10 above particles */}
      <div className="container-wide flex flex-col lg:flex-row items-start gap-12 lg:gap-0 relative z-10 px-6 w-full">
        {/* Left text panel */}
        <div className="w-full lg:w-1/2 lg:pr-12">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              {eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <h1 className="hero-shimmer font-display text-display max-w-2xl mt-4">
              {t('hero.tagline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mt-6">
              {t('hero.subheadline')}
            </p>
          </FadeUp>
          <FadeUp delay={1.4}>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={hero.ctaPrimary.href}
                className="inline-flex items-center justify-center bg-[var(--accent)] text-[var(--primary-deep)] font-body font-semibold px-7 py-3.5 rounded-[var(--radius-md)] transition-all hover:bg-[var(--accent-deep)] hover:-translate-y-0.5"
              >
                {t('hero.ctaPrimary.label')}
              </a>
              <a
                href={hero.ctaSecondary.href}
                className="inline-flex items-center justify-center bg-transparent text-[var(--accent)] border-[1.5px] border-[var(--accent)] font-body font-semibold px-7 py-3.5 rounded-[var(--radius-md)] transition-colors hover:bg-[rgba(197,165,114,0.08)]"
              >
                {t('hero.ctaSecondary.label')}
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={1.8}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              {trustStrip.join(' · ')}
            </p>
          </FadeUp>
        </div>

        {/* Right canvas panel — Layer 2 KeyringCanvas */}
        <div
          className="w-full lg:w-1/2 relative pointer-events-none mt-12 lg:mt-0"
          style={{ height: 'clamp(340px, 50vw, 540px)' }}
        >
          <KeyringCanvas />
        </div>
      </div>

      {/* Founder strip — Phase 1G. Folds former AboutSection content into hero. */}
      <FadeUp delay={2.0}>
        <div className="container-wide relative z-10 px-6 mt-16 pt-12 border-t border-[var(--border-dark)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Initials disk — Mike Comerford. Real portrait Phase 1G asset sweep. */}
            <div className="lg:col-span-2">
              <div className="w-20 h-20 rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h3 text-[var(--primary-deep)] font-bold mx-auto lg:mx-0">
                MC
              </div>
              <p className="text-micro text-[var(--text-muted)] mt-2 text-center lg:text-left italic">
                [ASSET-PENDING — Mike portrait]
              </p>
            </div>

            {/* Founder paragraph + link to /team */}
            <div className="lg:col-span-10">
              <p className="text-eyebrow text-[var(--accent)]">{t('hero.founderStrip.eyebrow')}</p>
              {/* [DEMO COPY — pending client review] */}
              <p className="text-body text-[var(--text-secondary)] mt-3 max-w-3xl">
                {t('hero.founderStrip.body')}
              </p>
              {/* [DEMO COPY — pending client review] */}
              <Link
                href="/team"
                className="text-eyebrow text-[var(--accent)] mt-4 inline-block hover:text-[var(--accent-light)] transition-colors"
              >
                {t('hero.founderStrip.linkLabel')}
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
