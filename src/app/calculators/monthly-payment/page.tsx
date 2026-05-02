'use client';

// /calculators/monthly-payment — Monthly Payment Calculator
//
// Inputs: loan amount, rate, term, annual property tax, annual insurance, PMI rate
// Outputs: P&I, monthly tax, monthly insurance, monthly PMI, total monthly, lifetime interest
//
// Math:
//   PI = loan * r * (1+r)^n / ((1+r)^n - 1)   where r = monthly rate, n = months
//   Tax = annualTax / 12
//   Ins = annualIns / 12
//   PMI = (loan * pmiRate / 100) / 12
//   Total = PI + Tax + Ins + PMI
//   Lifetime interest = (PI * n) - loan
//
// Test case for verification: $375K @ 6.75% / 30yr → P&I ≈ $2,432

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { useTranslation } from '@/hooks/useTranslation';

const TERM_OPTIONS = [15, 20, 30] as const;
type Term = (typeof TERM_OPTIONS)[number];

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

export default function MonthlyPaymentCalculatorPage() {
  const { t } = useTranslation('calculators');
  const [loanAmount, setLoanAmount] = useState(375000);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState<Term>(30);
  const [annualTax, setAnnualTax] = useState(4500);
  const [annualInsurance, setAnnualInsurance] = useState(1200);
  const [pmiRate, setPmiRate] = useState(0.5);

  const result = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const numPayments = term * 12;
    let pi: number;
    if (monthlyRate === 0) {
      pi = loanAmount / numPayments;
    } else {
      const factor = Math.pow(1 + monthlyRate, numPayments);
      pi = (loanAmount * monthlyRate * factor) / (factor - 1);
    }
    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyPmi = (loanAmount * (pmiRate / 100)) / 12;
    const total = pi + monthlyTax + monthlyInsurance + monthlyPmi;
    const lifetimeInterest = pi * numPayments - loanAmount;
    return { pi, monthlyTax, monthlyInsurance, monthlyPmi, total, lifetimeInterest };
  }, [loanAmount, rate, term, annualTax, annualInsurance, pmiRate]);

  return (
    <>
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <PhotoBackground src="/images/calculators/monthly-payment.jpg" priority />
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
            <p className="text-eyebrow text-[var(--accent)]">
              {t('monthlyPayment.eyebrow')}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('monthlyPayment.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('monthlyPayment.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('monthlyPayment.yourLoan')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('shared.slideToAdjust')}
              </p>
              <div className="flex flex-col gap-6">
                <SliderInput
                  label={t('monthlyPayment.inputs.loanAmount')}
                  min={50000}
                  max={1500000}
                  step={5000}
                  value={loanAmount}
                  onChange={setLoanAmount}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('monthlyPayment.inputs.interestRate')}
                  min={3}
                  max={9.5}
                  step={0.125}
                  value={rate}
                  onChange={setRate}
                  format={formatPercent}
                />
                <RadioGroup
                  label={t('monthlyPayment.inputs.loanTerm')}
                  options={TERM_OPTIONS}
                  value={term}
                  onChange={setTerm}
                  format={(v) => `${v} ${t('affordability.inputs.yrs')}`}
                />
                <SliderInput
                  label={t('monthlyPayment.inputs.annualTax')}
                  min={0}
                  max={30000}
                  step={100}
                  value={annualTax}
                  onChange={setAnnualTax}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('monthlyPayment.inputs.annualInsurance')}
                  min={0}
                  max={5000}
                  step={50}
                  value={annualInsurance}
                  onChange={setAnnualInsurance}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('monthlyPayment.inputs.pmiRate')}
                  min={0}
                  max={1.5}
                  step={0.05}
                  value={pmiRate}
                  onChange={setPmiRate}
                  format={formatPercent}
                />
              </div>
            </Card>

            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('monthlyPayment.results.title')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('monthlyPayment.results.subtitle')}
              </p>

              <div
                className="rounded-[var(--radius-lg)] p-6 mb-6"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(197,165,114,0.10), rgba(197,165,114,0.04))',
                  border: '1.5px solid var(--accent-muted)',
                }}
              >
                <p className="text-eyebrow text-[var(--accent-deep)]">
                  {t('monthlyPayment.results.totalMonthly')}
                </p>
                <p className="font-display text-h1 text-[var(--text-on-light)] mt-2">
                  {formatUSD(result.total)}
                </p>
                <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                  {t('monthlyPayment.results.totalMonthlySub')}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <BreakdownRow
                  label={t('monthlyPayment.results.principalAndInterest')}
                  value={formatUSD(result.pi)}
                />
                <BreakdownRow
                  label={t('monthlyPayment.results.propertyTax')}
                  value={formatUSD(result.monthlyTax)}
                />
                <BreakdownRow
                  label={t('monthlyPayment.results.homeInsurance')}
                  value={formatUSD(result.monthlyInsurance)}
                />
                <BreakdownRow
                  label={t('monthlyPayment.results.pmi')}
                  value={formatUSD(result.monthlyPmi)}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-[rgba(14,27,51,0.10)]">
                <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                  {t('monthlyPayment.results.lifetimeInterest')}
                </p>
                <p className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                  {formatUSD(result.lifetimeInterest)}
                </p>
                <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                  {t('monthlyPayment.results.lifetimeInterestSubTemplate').replace(
                    '{term}',
                    String(term),
                  )}
                </p>
              </div>
            </Card>
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
              {t('monthlyPayment.disclaimerBody')}
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
              {t('monthlyPayment.ctaBody')}
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

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-[rgba(14,27,51,0.06)] pb-2">
      <span className="text-body-sm text-[var(--text-on-light-secondary)]">{label}</span>
      <span className="font-mono text-body text-[var(--text-on-light)]">{value}</span>
    </div>
  );
}
