'use client';

// src/app/services/[slug]/LoanProgramClient.tsx
//
// Client wrapper for the per-loan-program detail page. Owns all translatable
// copy via useTranslation('services'). The server page (services/[slug]/page.tsx)
// keeps generateStaticParams + generateMetadata + JSON-LD schema, then renders
// this client component.
//
// Per CLAUDE.md Bilingual Copy Rule: every translatable string lives in
// /src/locales/en/services.json + /src/locales/es/services.json. siteConfig
// remains the structural source (slug + emoji); program-specific name + blurb +
// eligibility come from `t('programs.<slug>.*')`. Section labels, FAQ, document
// checklist, and CTA labels come from `t('detailPage.*')`.

import { siteConfig } from '@/data/site';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

interface LoanProgramClientProps {
  slug: string;
}

export default function LoanProgramClient({ slug }: LoanProgramClientProps) {
  const { t, ta } = useTranslation('services');
  const program = siteConfig.loanPrograms.find((p) => p.slug === slug);
  if (!program) return null;

  const programName = t(`programs.${program.slug}.name`);
  const programBlurb = t(`programs.${program.slug}.blurb`);
  const programEligibility = t(`programs.${program.slug}.eligibility`);

  const documentChecklist =
    ta<string[]>('detailPage.documentChecklist') ?? [];

  // Build FAQ from JSON. The {programName} and {eligibility} placeholders are
  // interpolated below — keep this list in sync with detailPage.faq keys.
  const faqRaw: Array<{ q: string; a: string }> = [
    {
      q: t('detailPage.faq.timeline.q'),
      a: t('detailPage.faq.timeline.a'),
    },
    {
      q: t('detailPage.faq.creditScore.q'),
      a: t('detailPage.faq.creditScore.a'),
    },
    {
      q: t('detailPage.faq.rateLock.q'),
      a: t('detailPage.faq.rateLock.a'),
    },
    {
      q: t('detailPage.faq.giftDownPayment.q'),
      a: t('detailPage.faq.giftDownPayment.a'),
    },
  ];

  const interpolate = (s: string) =>
    s
      .replace(/\{programName\}/g, programName)
      .replace(/\{eligibility\}/g, programEligibility);

  const faq = faqRaw.map(({ q, a }) => ({
    q: interpolate(q),
    a: interpolate(a),
  }));

  const ctaHeadline = interpolate(t('detailPage.ctaHeadline'));

  return (
    <>
      {/* Page header — interior page pattern (pt-32 pb-20). Dark gradient. */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src={`/images/programs/${program.slug}.jpg`} priority />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              <span aria-hidden="true">{program.emoji}</span>{' '}
              {t('detailPage.eyebrowSuffix')}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {programName}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {programBlurb}
            </p>
            <p className="text-micro font-mono text-[var(--accent)] mt-2 italic">
              {t('detailPage.complianceFlag')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Eligibility — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              {t('detailPage.eligibilityHeadline')}
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              {programEligibility}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What you'll need — dark section */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2">
              {t('detailPage.documentsHeadline')}
            </h2>
          </FadeUp>
          <ul className="mt-8 space-y-4">
            {documentChecklist.map((item, i) => (
              <FadeUp key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3 text-body text-[var(--text-secondary)]">
                  <span className="text-[var(--accent)] mt-1" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
          <p className="text-micro text-[var(--text-muted)] italic mt-6">
            {t('detailPage.documentsNote')}
          </p>
        </div>
      </section>

      {/* FAQ — light section. Native <details>/<summary> for zero-JS accordion. */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              {t('detailPage.faqHeadline')}
            </h2>
          </FadeUp>
          <div className="mt-8 space-y-4">
            {faq.map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.05}>
                <details className="group bg-[var(--bg-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
                  <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 text-body font-semibold text-[var(--text-on-light)]">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-[var(--accent)] flex-shrink-0 transition-transform group-open:rotate-45 text-xl"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-body-sm text-[var(--text-on-light-secondary)]">
                    {item.a}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
          <p className="text-micro text-[var(--text-on-light-muted)] italic mt-6">
            {t('detailPage.faqNote')}
          </p>
        </div>
      </section>

      {/* CTA — dark section. Single bottom CTA per Homepage Section Architecture Rule. */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              {ctaHeadline}
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                {t('detailPage.ctaPrimary')}
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                {t('detailPage.ctaSecondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
