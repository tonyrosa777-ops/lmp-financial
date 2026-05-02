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
 *
 * Phase i18n — section eyebrow/headline + see-all CTA template pulled from
 * `home` namespace. Testimonial bodies remain in siteConfig (the testimonials
 * namespace owns their localization on the /testimonials page).
 */

import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function TestimonialsSection() {
  const { testimonials } = siteConfig;
  const featured = testimonials.slice(0, 3);
  const { t } = useTranslation('home');
  const seeAll = t('testimonials.seeAllTemplate').replace(
    '{count}',
    String(testimonials.length),
  );

  return (
    <section className="section-dark-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent)]">{t('testimonials.eyebrow')}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 mt-3 max-w-3xl">
            {t('testimonials.headline')}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {featured.map((testimonial, i) => (
            <FadeUp key={`${testimonial.name}-${testimonial.city}`} delay={i * 0.1} className="h-full">
              <Card variant="dark" hover={false} className="h-full">
                <p className="text-body italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-muted)] flex items-center justify-center font-display text-[var(--primary-deep)] font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold">{testimonial.name}</p>
                    <p className="text-micro text-[var(--text-muted)]">
                      {testimonial.city}, {testimonial.state} · {testimonial.program}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" href="/testimonials">
            {seeAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
