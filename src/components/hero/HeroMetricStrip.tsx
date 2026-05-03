'use client';

/**
 * HeroMetricStrip — 3-stat trust proof row.
 *
 * Sits between the CTAs (FadeUp delay 1.4) and the founder credential strip
 * (FadeUp delay 1.8) — owns delay 1.6.
 *
 * Three metrics: rating · reviews · close-time.
 *
 * COMPLIANCE GATE (CLAUDE.md Compliance Rule, non-negotiable): each value
 * displayed here MUST be substantiated before production launch (Zillow /
 * Google / Experience.com export, internal close-time data). Until that
 * substantiation lands:
 *   - Both ES and PT locale `_compliance_flags` arrays list these claims
 *   - Pre-launch-auditor blocks production ship if metric values appear
 *     without a verified source.
 *
 * Source values resolve from the active locale's `home.metricStrip.*`
 * namespace via useTranslation, so EN/ES/PT all flow the same way.
 */

import { useTranslation } from '@/hooks/useTranslation';

interface MetricCell {
  emoji: string;
  value: string;
  label: string;
}

export default function HeroMetricStrip() {
  const { t } = useTranslation('home');

  const cells: MetricCell[] = [
    {
      emoji: t('hero.metricStrip.rating.emoji'),
      value: t('hero.metricStrip.rating.value'),
      label: t('hero.metricStrip.rating.label'),
    },
    {
      emoji: t('hero.metricStrip.reviews.emoji'),
      value: t('hero.metricStrip.reviews.value'),
      label: t('hero.metricStrip.reviews.label'),
    },
    {
      emoji: t('hero.metricStrip.speed.emoji'),
      value: t('hero.metricStrip.speed.value'),
      label: t('hero.metricStrip.speed.label'),
    },
  ];

  return (
    <ul
      className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:divide-x sm:divide-[var(--accent-muted)]/30"
      aria-label="Trust metrics"
    >
      {cells.map((cell, i) => (
        <li
          key={i}
          className="flex items-center gap-3 sm:px-5 sm:first:pl-0 sm:last:pr-0"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {cell.emoji}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl text-[var(--accent)] font-semibold">
              {cell.value}
            </span>
            <span className="text-micro text-[var(--text-secondary)]">
              {cell.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
