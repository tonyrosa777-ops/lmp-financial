'use client';

/**
 * HeroSection — Layer 1+2+3 stack per CLAUDE.md Hero Architecture Rule.
 *
 *   Layer 1 — HeroParticles (canvas particle system, full-bleed, z-0)
 *   Layer 2 — LenderShoppingCanvas (right-panel brand canvas — visualizes the
 *             "we shop 30+ wholesale lenders" moat. Replaced KeyringCanvas
 *             2026-05-02 — the keyring metaphor visualized "home" generically;
 *             the new orbit visualizes LMP's actual differentiator.)
 *   Layer 3 — Framer Motion staggered text (left panel)
 *
 * Stagger delay sequence (left panel, top-down):
 *   0.1  eyebrow
 *   0.3  H1 (hero-shimmer)
 *   0.5  subheadline
 *   1.4  CTAs (primary glow + secondary outline)
 *   1.6  HeroMetricStrip (NEW — rating · reviews · close-time)
 *   1.8  HeroFounderCreditStrip (NEW — 36px Mike avatar + credential line;
 *        replaces the bare monospace trust strip; brings Mike above fold on mobile)
 *   2.0  Founder strip below the hero grid (full bio + portrait + Meet The Team CTA)
 *
 * Phase i18n — display strings sourced from `home` namespace via useTranslation.
 * Trilingual (EN+ES+PT) per CLAUDE.md Bilingual Copy Rule (scope-expanded).
 * Structural data (CTA hrefs, business numbers, LO count) stays in siteConfig.
 */

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import HeroParticles from '@/components/HeroParticles';
import LenderShoppingCanvas from '@/components/LenderShoppingCanvas';
import HeroMetricStrip from '@/components/hero/HeroMetricStrip';
import HeroFounderCreditStrip from '@/components/hero/HeroFounderCreditStrip';
import FadeUp from '@/components/animations/FadeUp';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroSection() {
  const { business, loanOfficers, hero } = siteConfig;
  const { t } = useTranslation('home');

  const eyebrowTemplate = t('hero.eyebrowTemplate');
  // Token replacement: {nmls}, {stateCount}, {loCount}
  const eyebrow = eyebrowTemplate
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length))
    .replace('{loCount}', String(loanOfficers.length));

  const matchCardText = t('hero.canvas.matchCard');

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
                className="cta-primary-glow inline-flex items-center justify-center bg-[var(--accent)] text-[var(--primary-deep)] font-body font-semibold px-8 py-4 rounded-[var(--radius-md)] hover:bg-[var(--accent-deep)] hover:-translate-y-0.5"
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
          <FadeUp delay={1.6}>
            <div className="mt-8">
              <HeroMetricStrip />
            </div>
          </FadeUp>
          <FadeUp delay={1.8}>
            <div className="mt-6">
              <HeroFounderCreditStrip />
            </div>
          </FadeUp>
        </div>

        {/* Right canvas panel — Layer 2 LenderShoppingCanvas */}
        <div
          className="w-full lg:w-1/2 relative pointer-events-none mt-12 lg:mt-0"
          style={{ height: 'clamp(340px, 50vw, 540px)' }}
        >
          <LenderShoppingCanvas matchCardText={matchCardText} />
        </div>
      </div>

      {/* Founder strip — full bio + real portrait + Meet The Team CTA.
          Mike's portrait now resolves from /public/team/mike-comerford.jpg
          (real headshot, optimized JPG, 400x400 source — next/image serves it
          at the rendered size and at the 36px size used by the credit strip
          above). Replaces the [ASSET-PENDING] initials disk. */}
      <FadeUp delay={2.0}>
        <div className="container-wide relative z-10 px-6 mt-16 pt-12 border-t border-[var(--border-dark)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <Image
                src="/team/mike-comerford.jpg"
                alt={t('hero.founderStrip.altText')}
                width={96}
                height={96}
                priority
                className="rounded-full object-cover ring-2 ring-[var(--accent)]/60 ring-offset-2 ring-offset-[var(--primary)]"
              />
            </div>

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
