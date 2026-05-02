'use client';

// /calculators/affordability — Affordability Calculator
//
// Inputs: annual income, monthly debts, down payment, interest rate, term, target DTI
// Outputs: max monthly housing payment, max loan amount, max home price
//
// Math:
//   maxPayment = (income / 12) * targetDTI - monthlyDebts
//   loanAmount = maxPayment * (1 - (1 + r)^-n) / r           (standard amortization)
//   maxHomePrice = loanAmount + downPayment
//
// Per CLAUDE.md Compliance Rule: ESTIMATE only, [NOT-A-COMMITMENT] flag visible,
// [COMPLIANCE-REVIEW-PENDING] flag visible. No rate suggestion — user enters rate.

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { useTranslation } from '@/hooks/useTranslation';

const TERM_OPTIONS = [15, 20, 30] as const;
const DTI_OPTIONS = [36, 43, 50] as const;

type Term = (typeof TERM_OPTIONS)[number];
type Dti = (typeof DTI_OPTIONS)[number];

function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

function formatPercent(n: number): string {
  return `${n.toFixed(3).replace(/\.?0+$/, '')}%`;
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
        <span className="font-mono text-h4 text-[var(--text-on-light)] min-w-[120px] text-right">
          {format(value)}
        </span>
      </div>
    </div>
  );
}

interface RadioGroupProps<T extends number> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format: (v: T) => string;
}

function RadioGroup<T extends number>({ label, options, value, onChange, format }: RadioGroupProps<T>) {
  return (
    <div>
      <label className="text-eyebrow text-[var(--text-on-light-secondary)]">{label}</label>
      <div className="flex gap-2 mt-2">
        {options.map((opt) => {
          const isSelected = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={
                'flex-1 px-4 py-3 rounded-[var(--radius-md)] font-mono text-sm font-semibold transition-all border-[1.5px] ' +
                (isSelected
                  ? 'bg-[var(--accent)] text-[var(--primary-deep)] border-[var(--accent)]'
                  : 'bg-transparent text-[var(--text-on-light)] border-[rgba(14,27,51,0.15)] hover:border-[var(--accent)]')
              }
              aria-pressed={isSelected}
            >
              {format(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AffordabilityCalculatorPage() {
  const { t } = useTranslation('calculators');
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(400);
  const [downPayment, setDownPayment] = useState(20000);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState<Term>(30);
  const [dti, setDti] = useState<Dti>(43);

  const result = useMemo(() => {
    const maxPayment = (annualIncome / 12) * (dti / 100) - monthlyDebts;
    if (maxPayment <= 0) {
      return {
        maxPayment: 0,
        loanAmount: 0,
        maxHomePrice: 0,
        debtsTooHigh: true,
      };
    }
    const monthlyRate = rate / 12 / 100;
    const numPayments = term * 12;
    let loanAmount: number;
    if (monthlyRate === 0) {
      loanAmount = maxPayment * numPayments;
    } else {
      loanAmount =
        (maxPayment * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate;
    }
    return {
      maxPayment,
      loanAmount,
      maxHomePrice: loanAmount + downPayment,
      debtsTooHigh: false,
    };
  }, [annualIncome, monthlyDebts, downPayment, rate, term, dti]);

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Page header (dark)                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <PhotoBackground src="/images/calculators/affordability.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('affordability.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('affordability.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('affordability.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Calculator (light)                                 */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* INPUTS */}
            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('shared.yourNumbers')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('shared.slideToAdjust')}
              </p>
              <div className="flex flex-col gap-6">
                <SliderInput
                  label={t('affordability.inputs.annualIncome')}
                  min={40000}
                  max={500000}
                  step={1000}
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('affordability.inputs.monthlyDebts')}
                  min={0}
                  max={5000}
                  step={50}
                  value={monthlyDebts}
                  onChange={setMonthlyDebts}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('affordability.inputs.downPayment')}
                  min={0}
                  max={200000}
                  step={1000}
                  value={downPayment}
                  onChange={setDownPayment}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('affordability.inputs.interestRate')}
                  min={4}
                  max={9}
                  step={0.125}
                  value={rate}
                  onChange={setRate}
                  format={formatPercent}
                />
                <RadioGroup
                  label={t('affordability.inputs.loanTerm')}
                  options={TERM_OPTIONS}
                  value={term}
                  onChange={setTerm}
                  format={(v) => `${v} ${t('affordability.inputs.yrs')}`}
                />
                <RadioGroup
                  label={t('affordability.inputs.targetDti')}
                  options={DTI_OPTIONS}
                  value={dti}
                  onChange={setDti}
                  format={(v) => `${v}%`}
                />
              </div>
            </Card>

            {/* OUTPUTS */}
            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('affordability.results.title')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('affordability.results.subtitle')}
              </p>

              {result.debtsTooHigh ? (
                <div
                  className="rounded-[var(--radius-md)] p-6 border-[1.5px]"
                  style={{
                    backgroundColor: 'rgba(184,84,80,0.08)',
                    borderColor: 'var(--error)',
                  }}
                >
                  <p className="text-eyebrow text-[var(--error)] mb-2">
                    {t('shared.headsUp')}
                  </p>
                  <p className="text-body text-[var(--text-on-light)]">
                    {t('affordability.results.debtsTooHigh')}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-[rgba(14,27,51,0.10)] pb-6">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('affordability.results.maxPayment')}
                    </p>
                    <p className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                      {formatUSD(result.maxPayment)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      {t('affordability.results.maxPaymentSub')}
                    </p>
                  </div>
                  <div className="border-b border-[rgba(14,27,51,0.10)] pb-6">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('affordability.results.maxLoan')}
                    </p>
                    <p className="font-display text-h2 text-[var(--accent-deep)] mt-2">
                      {formatUSD(result.loanAmount)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      {t('affordability.results.maxLoanSubTemplate')
                        .replace('{rate}', formatPercent(rate))
                        .replace('{term}', String(term))}
                    </p>
                  </div>
                  <div>
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      {t('affordability.results.maxHomePrice')}
                    </p>
                    <p className="font-display text-h1 text-[var(--accent-deep)] mt-2">
                      {formatUSD(result.maxHomePrice)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      {t('affordability.results.maxHomePriceSubTemplate').replace(
                        '{downPayment}',
                        formatUSD(downPayment),
                      )}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Disclosure (light)                                 */}
      {/* [COMPLIANCE-REVIEW-PENDING] disclaimer copy below per CLAUDE.md  */}
      {/* Compliance Rule. JSON dictionary is source; ES needs LMP review. */}
      {/* ============================================================ */}
      <section className="section-light-gradient pb-16">
        <div className="container-base px-6">
          <div className="rounded-[var(--radius-md)] p-6 border border-[rgba(14,27,51,0.10)] bg-[var(--bg-card)]">
            <p className="font-mono text-eyebrow text-[var(--accent-deep)] mb-3">
              {t('shared.notACommitment')}
            </p>
            <p className="text-body-sm text-[var(--text-on-light-secondary)]">
              {t('affordability.disclaimerBody')}
            </p>
            <p className="font-mono text-micro text-[var(--text-on-light-muted)] mt-4">
              {t('shared.complianceReviewPending')}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Real number CTA (dark)                             */}
      {/* ============================================================ */}
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
              {t('affordability.ctaBody')}
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
