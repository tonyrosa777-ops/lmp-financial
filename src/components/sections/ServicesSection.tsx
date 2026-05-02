'use client';

/**
 * ServicesSection — dark section, 9 loan-program cards.
 *
 * Each card links to /services/{slug}. Eligibility line uses font-mono per
 * design-system.md §3 (mono for license numbers + structured-data labels).
 *
 * Phase i18n — eyebrow / headline / "Learn more" pulled from `home` namespace.
 * Loan-program data (name, blurb, eligibility, slug, emoji) stays in
 * siteConfig — services-namespace localization handled at /services pages,
 * not in this homepage teaser.
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';
import { useTranslation } from '@/hooks/useTranslation';

export default function ServicesSection() {
  const { loanPrograms } = siteConfig;
  const { t } = useTranslation('home');

  // Headline reads "Nine programs. 9 ways home." — count is part of the
  // translated string in both EN/ES (count-of-9 is fixed by the loanPrograms
  // catalog and won't change without a copy update). No token replacement.
  const headline = t('loanPrograms.headline');

  return (
    <section className="section-dark-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent)]">
            {t('loanPrograms.eyebrow')}
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 mt-3 max-w-3xl">
            {headline}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {loanPrograms.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.05} className="h-full">
              <Card variant="dark" href={`/services/${p.slug}`} className="h-full">
                <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
                <h3 className="font-display text-h3 mt-3">{p.name}</h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-2">{p.blurb}</p>
                <p className="text-micro text-[var(--text-muted)] mt-3 font-mono">
                  {p.eligibility}
                </p>
                <span className="text-eyebrow text-[var(--accent)] mt-4 inline-block">
                  {t('loanPrograms.learnMore')}
                </span>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
