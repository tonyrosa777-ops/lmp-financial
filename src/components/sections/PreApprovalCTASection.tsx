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
 *
 * Phase i18n — display strings sourced from `home.preApprovalCTA.*`. Token
 * replacement on `bodyTemplate` injects loCount + stateCount from siteConfig.
 */

import { siteConfig } from '@/data/site';
import HeroParticles from '@/components/HeroParticles';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function PreApprovalCTASection() {
  const { business, loanOfficers } = siteConfig;
  const { t } = useTranslation('home');

  const body = t('preApprovalCTA.bodyTemplate')
    .replace('{loCount}', String(loanOfficers.length))
    .replace('{stateCount}', String(business.licensedStatesLong.length));

  return (
    <section className="relative overflow-hidden section-dark-gradient section-pad-loose">
      <HeroParticles />

      <div className="container-base px-6 text-center relative z-10">
        <FadeUp>
          <h2 className="hero-shimmer font-display text-h1 max-w-3xl mx-auto">
            {t('preApprovalCTA.headline')}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-4">
            {body}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button href="/booking" size="lg">
              {t('preApprovalCTA.ctaPrimary.label')}
            </Button>
            <Button href="/quiz" variant="secondary" size="lg">
              {t('preApprovalCTA.ctaSecondary.label')}
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
