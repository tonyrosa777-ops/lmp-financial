'use client';

/**
 * MeetTheTeamSection — dark section, LO grid teaser (8 of 22).
 *
 * Each card: monogram avatar, LO name, role, NMLS, language flags. Links to
 * /team/{slug} per CLAUDE.md LMP-specific custom build (per-LO landing page).
 *
 * Language → flag emoji map matches design-system.md §9 emoji shortlist.
 *
 * Phase i18n — eyebrow / headline / "Meet all N loan officers" CTA pulled
 * from `home.meetTheTeam.*`. LO data (name, role, NMLS, slug, languages)
 * stays in siteConfig — `team` namespace owns per-LO bio localization on
 * /team pages.
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

const LANGUAGE_FLAGS: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
};

function flagsFor(languages: string[]): string {
  return languages
    .map((l) => LANGUAGE_FLAGS[l] ?? '')
    .filter(Boolean)
    .join(' ');
}

function initialsFor(name: string): string {
  return name
    .split(' ')
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join('');
}

export default function MeetTheTeamSection() {
  const { loanOfficers } = siteConfig;
  const featured = loanOfficers.slice(0, 8);
  const { t } = useTranslation('home');
  const ctaLabel = t('meetTheTeam.ctaLabelTemplate').replace(
    '{count}',
    String(loanOfficers.length),
  );

  return (
    <section className="section-dark-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent)]">{t('meetTheTeam.eyebrow')}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 mt-3 max-w-3xl">
            {t('meetTheTeam.headline')}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {featured.map((lo, i) => (
            <FadeUp key={lo.slug} delay={i * 0.05} className="h-full">
              <Card variant="dark" href={`/team/${lo.slug}`} className="text-center h-full">
                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-h3 text-[var(--primary-deep)]">
                  {initialsFor(lo.name)}
                </div>
                <h3 className="font-display text-h4 mt-3">{lo.name}</h3>
                <p className="text-micro text-[var(--text-secondary)] mt-1">{lo.role}</p>
                <p className="text-micro font-mono text-[var(--accent)] mt-1">
                  NMLS #{lo.nmls}
                </p>
                {lo.languages.length > 1 && (
                  <p className="text-micro text-[var(--text-muted)] mt-2">
                    {flagsFor(lo.languages)}
                  </p>
                )}
              </Card>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" href="/team">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
