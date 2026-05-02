'use client';

/**
 * StatsSection — light section, 5-stat numerical proof bar.
 *
 * Stat values render via CountUp where the value is a clean number (with
 * optional currency prefix or unit suffix). Mixed/decimal values like "4.9/5"
 * render as plain text (CountUp does not handle awkward formats well).
 *
 * Parse rules:
 *   "9"        → CountUp end={9}
 *   "22"       → CountUp end={22}
 *   "$10,662"  → literal (CountUp would lose the comma).
 *   "14 days"  → CountUp end={14} suffix=" days"
 *   "4.9/5"    → literal text
 *
 * Phase i18n — eyebrow / headline / per-stat label/flag pulled from
 * `home` namespace. Stat numeric value strings come from the translated
 * array as well so suffix words like "days" / "días" localize correctly.
 */

import type { Stat } from '@/data/site';
import { siteConfig } from '@/data/site';
import FadeUp from '@/components/animations/FadeUp';
import CountUp from '@/components/animations/CountUp';
import { useTranslation } from '@/hooks/useTranslation';

interface ParsedStat {
  mode: 'countup' | 'literal';
  end?: number;
  prefix?: string;
  suffix?: string;
  literal?: string;
}

function parseStatValue(value: string): ParsedStat {
  // "$10,662" — currency with thousands separator. CountUp can't render commas;
  // render literal so the formatting stays intact.
  if (/^\$[\d,]+$/.test(value) && value.includes(',')) {
    return { mode: 'literal', literal: value };
  }
  // "$10662" or "$10" — currency without thousands separator → CountUp.
  const currencyMatch = value.match(/^\$(\d+)$/);
  if (currencyMatch) {
    return { mode: 'countup', end: Number(currencyMatch[1]), prefix: '$' };
  }
  // "14 days" or "5 minutes" — number + space + unit suffix → CountUp.
  const numUnitMatch = value.match(/^(\d+)(\s+\D.*)$/);
  if (numUnitMatch) {
    return { mode: 'countup', end: Number(numUnitMatch[1]), suffix: numUnitMatch[2] };
  }
  // Pure integer — "9", "22" → CountUp.
  if (/^\d+$/.test(value)) {
    return { mode: 'countup', end: Number(value) };
  }
  // Anything with slash, decimal, or other format → literal (e.g. "4.9/5").
  return { mode: 'literal', literal: value };
}

function StatValue({ stat }: { stat: Stat }) {
  const parsed = parseStatValue(stat.value);
  if (parsed.mode === 'countup' && typeof parsed.end === 'number') {
    return (
      <CountUp
        end={parsed.end}
        prefix={parsed.prefix ?? ''}
        suffix={parsed.suffix ?? ''}
      />
    );
  }
  return <>{parsed.literal ?? stat.value}</>;
}

export default function StatsSection() {
  const { t, ta } = useTranslation('home');
  const stats = ta<Stat[]>('stats.items') ?? siteConfig.stats;

  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent-deep)]">{t('stats.eyebrow')}</p>
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
            {t('stats.headline')}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mt-12">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">
                  {s.emoji}
                </span>
                <p className="font-display text-display text-[var(--text-on-light)]">
                  <StatValue stat={s} />
                </p>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-2">
                  {s.label}
                </p>
                {s.flag && (
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-1 italic">
                    {s.flag}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
