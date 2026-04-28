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
            <p className="text-eyebrow text-[var(--accent)]">Affordability Calculator</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              How much home can I afford?
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Enter your income, monthly debts, and target DTI. We will run the same
              amortization math your lender will. The number you see is the ceiling, not
              the recommendation.
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
                Your numbers
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                Slide to adjust. Estimates update live.
              </p>
              <div className="flex flex-col gap-6">
                <SliderInput
                  label="Annual income"
                  min={40000}
                  max={500000}
                  step={1000}
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  format={formatUSD}
                />
                <SliderInput
                  label="Monthly debts (car, student loans, credit cards)"
                  min={0}
                  max={5000}
                  step={50}
                  value={monthlyDebts}
                  onChange={setMonthlyDebts}
                  format={formatUSD}
                />
                <SliderInput
                  label="Down payment available"
                  min={0}
                  max={200000}
                  step={1000}
                  value={downPayment}
                  onChange={setDownPayment}
                  format={formatUSD}
                />
                <SliderInput
                  label="Interest rate"
                  min={4}
                  max={9}
                  step={0.125}
                  value={rate}
                  onChange={setRate}
                  format={formatPercent}
                />
                <RadioGroup
                  label="Loan term"
                  options={TERM_OPTIONS}
                  value={term}
                  onChange={setTerm}
                  format={(v) => `${v} yrs`}
                />
                <RadioGroup
                  label="Target back-end DTI"
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
                What it means
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                Estimate based on the inputs you entered.
              </p>

              {result.debtsTooHigh ? (
                <div
                  className="rounded-[var(--radius-md)] p-6 border-[1.5px]"
                  style={{
                    backgroundColor: 'rgba(184,84,80,0.08)',
                    borderColor: 'var(--error)',
                  }}
                >
                  <p className="text-eyebrow text-[var(--error)] mb-2">Heads up</p>
                  <p className="text-body text-[var(--text-on-light)]">
                    Your current debts exceed the target DTI threshold. Reduce monthly
                    debts or increase income to get an estimate. A loan officer can also
                    walk through compensating factors.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="border-b border-[rgba(14,27,51,0.10)] pb-6">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      Max monthly housing payment
                    </p>
                    <p className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                      {formatUSD(result.maxPayment)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      Income times target DTI, minus current debts.
                    </p>
                  </div>
                  <div className="border-b border-[rgba(14,27,51,0.10)] pb-6">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      Max loan amount
                    </p>
                    <p className="font-display text-h2 text-[var(--accent-deep)] mt-2">
                      {formatUSD(result.loanAmount)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      Loan supported by that payment at {formatPercent(rate)} for{' '}
                      {term} years.
                    </p>
                  </div>
                  <div>
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      Max home price
                    </p>
                    <p className="font-display text-h1 text-[var(--accent-deep)] mt-2">
                      {formatUSD(result.maxHomePrice)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                      Loan amount plus your down payment of {formatUSD(downPayment)}.
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
      {/* ============================================================ */}
      <section className="section-light-gradient pb-16">
        <div className="container-base px-6">
          <div className="rounded-[var(--radius-md)] p-6 border border-[rgba(14,27,51,0.10)] bg-[var(--bg-card)]">
            <p className="font-mono text-eyebrow text-[var(--accent-deep)] mb-3">
              [NOT-A-COMMITMENT]
            </p>
            <p className="text-body-sm text-[var(--text-on-light-secondary)]">
              These numbers are estimates. Actual rates, terms, and approval depend on
              your full file: credit, income documentation, assets, property, and program
              guidelines. Talk to a loan officer for a real quote.
            </p>
            <p className="font-mono text-micro text-[var(--text-on-light-muted)] mt-4">
              [COMPLIANCE-REVIEW-PENDING]
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
              Want a real number?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              Fifteen minutes with a loan officer turns the estimate into a pre-approval
              letter you can hand a realtor.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-8">
              <Button href="/booking" size="lg">
                Get Pre-Approved
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
