'use client';

/**
 * HeroSection — Layer 1+2+3 stack per CLAUDE.md Hero Architecture Rule.
 *
 * Extracted verbatim from src/app/page.tsx (Phase 1D inline hero).
 * NO behavioral change: same JSX, same imports, same staggered FadeUp delays
 * (0.1, 0.3, 0.5, 1.4, 1.8s).
 *
 *   Layer 1 — HeroParticles (canvas particle system, full-bleed, z-0)
 *   Layer 2 — KeyringCanvas (right-panel brand canvas)
 *   Layer 3 — Framer Motion staggered text (left panel)
 *
 * The orchestrator replaces the inline hero in page.tsx with `<HeroSection />`
 * in Wave 4. Source of truth for all copy: siteConfig.hero / siteConfig.business.
 */

import { siteConfig } from '@/data/site';
import HeroParticles from '@/components/HeroParticles';
import KeyringCanvas from '@/components/KeyringCanvas';
import FadeUp from '@/components/animations/FadeUp';

export default function HeroSection() {
  const { hero, business, loanOfficers } = siteConfig;

  return (
    <section className="relative min-h-[calc(100vh-96px)] overflow-hidden flex items-start pt-20 md:pt-32 section-dark-gradient">
      {/* Layer 1 — HeroParticles full background, pointer-events-none, z-0 */}
      <HeroParticles />

      {/* Layer 3 wrapper — text + canvas panel, z-10 above particles */}
      <div className="container-wide flex flex-col lg:flex-row items-start gap-12 lg:gap-0 relative z-10 px-6 w-full">
        {/* Left text panel */}
        <div className="w-full lg:w-1/2 lg:pr-12">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              NMLS #{business.nmls} · {business.licensedStates.length} states · {loanOfficers.length} loan officers
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <h1 className="hero-shimmer font-display text-display max-w-2xl mt-4">
              {hero.tagline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mt-6">
              {hero.subheadline}
            </p>
          </FadeUp>
          <FadeUp delay={1.4}>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={hero.ctaPrimary.href}
                className="inline-flex items-center justify-center bg-[var(--accent)] text-[var(--primary-deep)] font-body font-semibold px-7 py-3.5 rounded-[var(--radius-md)] transition-all hover:bg-[var(--accent-deep)] hover:-translate-y-0.5"
              >
                {hero.ctaPrimary.label}
              </a>
              <a
                href={hero.ctaSecondary.href}
                className="inline-flex items-center justify-center bg-transparent text-[var(--accent)] border-[1.5px] border-[var(--accent)] font-body font-semibold px-7 py-3.5 rounded-[var(--radius-md)] transition-colors hover:bg-[rgba(197,165,114,0.08)]"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={1.8}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8 max-w-xl">
              {hero.trustStrip.join(' · ')}
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
    </section>
  );
}
