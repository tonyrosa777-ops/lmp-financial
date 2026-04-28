'use client';

/**
 * PainPointsSection — light section, "Three Audiences"-adjacent slot
 * (renamed in homepage rhythm to "Pain Points / Common Pain Points").
 *
 * Renders siteConfig.painPoints as a 3-column card grid (responsive).
 * Each card uses FadeUp with a computed per-index delay so stagger works
 * cleanly without forcing motion.div children inside StaggerContainer.
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';

export default function PainPointsSection() {
  const { painPoints } = siteConfig;

  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent-deep)]">Common Pain Points</p>
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
            We&apos;ve heard every version of this story.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {painPoints.map((pp, i) => (
            <FadeUp key={pp.title} delay={i * 0.08} className="h-full">
              <Card variant="light" className="h-full">
                <span className="text-3xl" aria-hidden="true">{pp.emoji}</span>
                <h3 className="font-display text-h3 text-[var(--text-on-light)] mt-3">
                  {pp.title}
                </h3>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-2">
                  {pp.body}
                </p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
