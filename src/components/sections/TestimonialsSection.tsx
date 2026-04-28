'use client';

/**
 * TestimonialsSection — dark section, 3 featured testimonials + see-all CTA.
 *
 * Renders the first 3 testimonials from siteConfig as a horizontal row.
 * Full /testimonials page (paginated 9 per page × 4 pages = 36) is built
 * separately in Phase 1E.
 *
 * Each card shows: quote, monogram avatar (initial-letter), name, city/state,
 * loan program. Avatars use the gold accent palette per design-system.md §2.
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function TestimonialsSection() {
  const { testimonials } = siteConfig;
  const featured = testimonials.slice(0, 3);

  return (
    <section className="section-dark-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent)]">In Their Words</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 mt-3 max-w-3xl">
            Real borrowers, real closings.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {featured.map((t, i) => (
            <FadeUp key={`${t.name}-${t.city}`} delay={i * 0.1} className="h-full">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-body italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-[var(--primary-deep)] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold">{t.name}</p>
                    <p className="text-micro text-[var(--text-muted)]">
                      {t.city}, {t.state} · {t.program}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" href="/testimonials">
            See all {testimonials.length} testimonials
          </Button>
        </div>
      </div>
    </section>
  );
}
