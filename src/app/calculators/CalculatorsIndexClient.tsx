'use client';

// /calculators index — translated client component.
// Phase i18n: copy sourced from `calculators` namespace via useTranslation.
// Server page.tsx still owns metadata (English title/description for SSR).

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { useTranslation } from '@/hooks/useTranslation';

interface CalculatorCardConfig {
  emoji: string;
  /** translation key under indexPage.cards */
  key: 'affordability' | 'monthlyPayment' | 'refinance' | 'downPayment' | 'dti';
  href: string;
}

const CALCULATORS: CalculatorCardConfig[] = [
  { emoji: '🏠', key: 'affordability', href: '/calculators/affordability' },
  { emoji: '💰', key: 'monthlyPayment', href: '/calculators/monthly-payment' },
  { emoji: '🔄', key: 'refinance', href: '/calculators/refinance' },
  { emoji: '📊', key: 'downPayment', href: '/calculators/down-payment' },
  { emoji: '📈', key: 'dti', href: '/calculators/dti' },
];

export default function CalculatorsIndexClient() {
  const { t } = useTranslation('calculators');

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing orbs)                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/calculators.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('indexPage.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('indexPage.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('indexPage.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Calculator grid (light)                            */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">
              {t('indexPage.pickATool.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              {t('indexPage.pickATool.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              {t('indexPage.pickATool.body')}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {CALCULATORS.map((calc, idx) => (
              <FadeUp key={calc.key} delay={0.1 + idx * 0.075}>
                <Card variant="light" href={calc.href} className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {calc.emoji}
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {t(`indexPage.cards.${calc.key}.name`)}
                  </h3>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {t(`indexPage.cards.${calc.key}.description`)}
                  </p>
                  <p className="font-mono text-eyebrow text-[var(--accent-deep)] mt-6">
                    {t('indexPage.useCalculatorCta')}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Talk to a real person CTA (dark)                   */}
      {/* ============================================================ */}
      {/* [COMPLIANCE-REVIEW-PENDING] — disclaimer copy below carries the
          [NOT-A-COMMITMENT] flag per CLAUDE.md Compliance Rule. JSON dictionary
          is the source of truth; ES translation must be reviewed by LMP's
          compliance IT firm before going live. */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.07), transparent 65%)',
          }}
        />

        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">
              {t('indexPage.talkToReal.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-primary)] mt-3 max-w-2xl mx-auto">
              {t('indexPage.talkToReal.headline')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              {t('indexPage.talkToReal.body')}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/booking" size="lg">
                {t('indexPage.talkToReal.primary')}
              </Button>
              <Button href="/team" variant="secondary" size="lg">
                {t('indexPage.talkToReal.secondary')}
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8">
              {t('indexPage.talkToReal.disclaimer')}
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
