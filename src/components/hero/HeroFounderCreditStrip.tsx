'use client';

/**
 * HeroFounderCreditStrip — replaces the bare monospace trust strip.
 *
 * Renders a 36px circular Mike portrait + a credential line with token-
 * replaced business numbers. Brings Mike above the fold on mobile (the larger
 * founder portrait below the hero grid lands ~50-100px below fold on 390px,
 * which means at first impression on mobile NO human is visible — bad on a
 * brand whose product IS the relationship).
 *
 * The 36px avatar uses the SAME source file as the larger founder portrait
 * (/public/team/mike-comerford.jpg) — next/image handles serving it at two
 * sizes from one source automatically.
 *
 * The credential line is locale-aware via `home.creditStrip.credentialLine`
 * with token replacement (NMLS, state count, LO count) sourced from siteConfig.
 *
 * EN/PT/ES locale chips were intentionally MIGRATED OUT of this strip into
 * the nav-level LanguageToggle — the toggle IS the language indicator.
 */

import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroFounderCreditStrip() {
  const { business, loanOfficers } = siteConfig;
  const { t } = useTranslation('home');

  const template = t('hero.creditStrip.credentialLine');
  const credentialLine = template
    .replace('{nmls}', business.nmls)
    .replace('{stateCount}', String(business.licensedStates.length))
    .replace('{loCount}', String(loanOfficers.length));

  const altText = t('hero.founderStrip.altText');
  const ariaLabel = t('hero.creditStrip.ariaLabel');

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-row items-center gap-3 flex-wrap"
    >
      <Image
        src="/team/mike-comerford.jpg"
        alt={altText}
        width={36}
        height={36}
        priority
        className="rounded-full object-cover ring-1 ring-[var(--accent)]/40 flex-shrink-0"
      />
      <p className="font-mono text-micro text-[var(--text-muted)] leading-snug max-w-xl">
        {credentialLine}
      </p>
    </div>
  );
}
