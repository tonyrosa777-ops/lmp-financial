'use client';

/**
 * QuizCTASection — light section, centered mid-page conversion nudge.
 *
 * Different format than the hero CTA + final CTA per Homepage Section
 * Architecture Rule purpose-level dedup: hero pushes pre-approval,
 * final CTA pushes pre-approval; this section pushes the QUIZ specifically
 * (different intent, different funnel).
 *
 * Phase i18n — every display string sourced from `home.quizCTA.*`.
 */

import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function QuizCTASection() {
  const { t } = useTranslation('home');

  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6 text-center">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent-deep)]">
            {t('quizCTA.eyebrow')}
          </p>
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl mx-auto">
            {t('quizCTA.headline')}
          </h2>
          <p className="text-body text-[var(--text-on-light-secondary)] mt-4 max-w-xl mx-auto">
            {t('quizCTA.body')}
          </p>
          <div className="mt-8">
            <Button href="/quiz" size="lg">
              {t('quizCTA.ctaLabel')}
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
