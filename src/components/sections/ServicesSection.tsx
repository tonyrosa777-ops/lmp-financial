'use client';

/**
 * ServicesSection — dark section, 9 loan-program cards.
 *
 * Each card links to /services/{slug}. Eligibility line uses font-mono per
 * design-system.md §3 (mono for license numbers + structured-data labels).
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';

export default function ServicesSection() {
  const { loanPrograms } = siteConfig;

  return (
    <section className="section-dark-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent)]">Loan Programs</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 mt-3 max-w-3xl">
            Nine programs. {loanPrograms.length} ways home.
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
                  Learn more →
                </span>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
