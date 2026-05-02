'use client';

// /calculators/down-payment — Down Payment Calculator
//
// Inputs: home price
// Outputs: program-by-program down payment minimum + total cash to close (DP + 3% closing)
//
// Programs:
//   FHA: 3.5%
//   VA: 0% (eligibility note)
//   USDA: 0% (geographic note)
//   Conventional 5%: 5%
//   Conventional 20%: 20%
//   Jumbo: 10%

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { useTranslation } from '@/hooks/useTranslation';

const CLOSING_COST_RATE = 0.03;

type DownPaymentProgramKey = 'fha' | 'va' | 'usda' | 'conv5' | 'conv20' | 'jumbo';

interface ProgramSpec {
  emoji: string;
  /** Translation key under downPayment.programs.<key> for name/note */
  key: DownPaymentProgramKey;
  slug: string;
  rate: number; // 0..1
  programLink: string;
}

const PROGRAMS: ProgramSpec[] = [
  { emoji: '🔑', key: 'fha', slug: 'fha', rate: 0.035, programLink: '/services/fha' },
  { emoji: '🇺🇸', key: 'va', slug: 'va', rate: 0, programLink: '/services/va' },
  { emoji: '🌾', key: 'usda', slug: 'usda', rate: 0, programLink: '/services/usda' },
  { emoji: '🏠', key: 'conv5', slug: 'fixed-rate', rate: 0.05, programLink: '/services/fixed-rate' },
  { emoji: '🏛️', key: 'conv20', slug: 'fixed-rate-20', rate: 0.2, programLink: '/services/fixed-rate' },
  { emoji: '💎', key: 'jumbo', slug: 'jumbo', rate: 0.1, programLink: '/services/jumbo' },
];

function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}

function SliderInput({ label, min, max, step, value, onChange, format }: SliderInputProps) {
  return (
    <div>
      <label className="text-eyebrow text-[var(--text-on-light-secondary)]">{label}</label>
      <div className="flex items-center gap-4 mt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[var(--accent-deep)]"
          aria-label={label}
        />
        <span className="font-mono text-h4 text-[var(--text-on-light)] min-w-[140px] text-right">
          {format(value)}
        </span>
      </div>
    </div>
  );
}

export default function DownPaymentCalculatorPage() {
  const { t } = useTranslation('calculators');
  const [homePrice, setHomePrice] = useState(475000);

  const rows = useMemo(() => {
    const closingCosts = homePrice * CLOSING_COST_RATE;
    return PROGRAMS.map((p) => {
      const downPayment = homePrice * p.rate;
      const totalCash = downPayment + closingCosts;
      return {
        ...p,
        downPayment,
        totalCash,
      };
    });
  }, [homePrice]);

  return (
    <>
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <PhotoBackground src="/images/calculators/down-payment.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('downPayment.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('downPayment.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('downPayment.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          {/* Single full-width input row */}
          <Card variant="light" hover={false} className="mb-10">
            <SliderInput
              label={t('downPayment.inputs.homePrice')}
              min={100000}
              max={2500000}
              step={5000}
              value={homePrice}
              onChange={setHomePrice}
              format={formatUSD}
            />
            <p className="text-micro text-[var(--text-on-light-muted)] mt-4">
              {t('downPayment.inputs.homePriceSub')}
            </p>
          </Card>

          {/* Program cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((row, idx) => {
              const programName = t(`downPayment.programs.${row.key}.name`);
              return (
                <FadeUp key={row.key} delay={0.05 + idx * 0.05}>
                  <Card variant="light" hover={false} className="h-full">
                    <div className="text-4xl" aria-hidden="true">
                      {row.emoji}
                    </div>
                    <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                      {programName}
                    </h3>
                    <div className="mt-5 pb-5 border-b border-[rgba(14,27,51,0.10)]">
                      <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                        {t('downPayment.results.downPayment')}
                      </p>
                      <p className="font-display text-h2 text-[var(--accent-deep)] mt-1">
                        {formatUSD(row.downPayment)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                        {t('downPayment.results.totalCashToClose')}
                      </p>
                      <p className="font-display text-h4 text-[var(--text-on-light)] mt-1">
                        {formatUSD(row.totalCash)}
                      </p>
                      <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                        {t('downPayment.results.totalCashSub')}
                      </p>
                    </div>
                    <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-5">
                      {t(`downPayment.programs.${row.key}.note`)}
                    </p>
                    {row.programLink && (
                      <a
                        href={row.programLink}
                        className="inline-block mt-5 font-mono text-eyebrow text-[var(--accent-deep)] hover:underline"
                      >
                        {t('downPayment.results.learnAboutTemplate').replace(
                          '{programName}',
                          programName,
                        )}
                      </a>
                    )}
                  </Card>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* [COMPLIANCE-REVIEW-PENDING] disclaimer copy below per CLAUDE.md
          Compliance Rule. JSON dictionary is source; ES needs LMP review. */}
      <section className="section-light-gradient pb-16">
        <div className="container-base px-6">
          <div className="rounded-[var(--radius-md)] p-6 border border-[rgba(14,27,51,0.10)] bg-[var(--bg-card)]">
            <p className="font-mono text-eyebrow text-[var(--accent-deep)] mb-3">
              {t('shared.notACommitment')}
            </p>
            <p className="text-body-sm text-[var(--text-on-light-secondary)]">
              {t('downPayment.disclaimerBody')}
            </p>
            <p className="font-mono text-micro text-[var(--text-on-light-muted)] mt-4">
              {t('shared.complianceReviewPending')}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.07), transparent 65%)',
          }}
        />
        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-primary)] max-w-2xl mx-auto">
              {t('shared.wantRealNumber')}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              {t('downPayment.ctaBody')}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-8">
              <Button href="/booking" size="lg">
                {t('shared.getPreApproved')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
