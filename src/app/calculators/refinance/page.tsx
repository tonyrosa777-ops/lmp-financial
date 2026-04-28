'use client';

// /calculators/refinance — Refinance Calculator
//
// Inputs: current balance, current rate, current term remaining, new rate, new term,
//         closing costs, roll closing costs into loan? (toggle)
// Outputs: current monthly P&I, new monthly P&I, monthly savings, breakeven months,
//          10-year savings
//
// Math:
//   PI(loan, rate, years) = loan * r * (1+r)^n / ((1+r)^n - 1)
//   newLoanAmount = balance + (rollClosingCosts ? closingCosts : 0)
//   savings = currentPI - newPI
//   breakeven = closingCosts / savings   (only if savings > 0)
//   tenYrSavings = savings * 120 - (rollClosingCosts ? 0 : closingCosts)

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';

const NEW_TERM_OPTIONS = [15, 20, 30] as const;
type NewTerm = (typeof NEW_TERM_OPTIONS)[number];

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

function calcPI(loan: number, ratePct: number, years: number): number {
  if (loan <= 0 || years <= 0) return 0;
  const r = ratePct / 12 / 100;
  const n = years * 12;
  if (r === 0) return loan / n;
  const factor = Math.pow(1 + r, n);
  return (loan * r * factor) / (factor - 1);
}

export default function RefinanceCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState(325000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [currentTermRemaining, setCurrentTermRemaining] = useState(25);
  const [newRate, setNewRate] = useState(6.25);
  const [newTerm, setNewTerm] = useState<NewTerm>(30);
  const [closingCosts, setClosingCosts] = useState(5000);
  const [rollClosingCosts, setRollClosingCosts] = useState(true);

  const result = useMemo(() => {
    const currentMonthly = calcPI(currentBalance, currentRate, currentTermRemaining);
    const newLoanAmount = currentBalance + (rollClosingCosts ? closingCosts : 0);
    const newMonthly = calcPI(newLoanAmount, newRate, newTerm);
    const monthlySavings = currentMonthly - newMonthly;
    const breakeven = monthlySavings > 0 ? closingCosts / monthlySavings : null;
    const tenYrSavings =
      monthlySavings * 120 - (rollClosingCosts ? 0 : closingCosts);
    return {
      currentMonthly,
      newMonthly,
      newLoanAmount,
      monthlySavings,
      breakeven,
      tenYrSavings,
      noBenefit: monthlySavings <= 0,
    };
  }, [
    currentBalance,
    currentRate,
    currentTermRemaining,
    newRate,
    newTerm,
    closingCosts,
    rollClosingCosts,
  ]);

  return (
    <>
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
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
            <p className="text-eyebrow text-[var(--accent)]">Refinance</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Should I refinance?
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Current loan vs new loan. Real break-even math, ten-year savings, and a
              clear answer when the numbers do not pencil.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                Your loans
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                Current loan on the left. New loan on the right.
              </p>
              <div className="flex flex-col gap-6">
                <p className="font-mono text-eyebrow text-[var(--accent-deep)]">Current loan</p>
                <SliderInput
                  label="Current balance"
                  min={50000}
                  max={1500000}
                  step={5000}
                  value={currentBalance}
                  onChange={setCurrentBalance}
                  format={formatUSD}
                />
                <SliderInput
                  label="Current rate"
                  min={3}
                  max={9}
                  step={0.125}
                  value={currentRate}
                  onChange={setCurrentRate}
                  format={formatPercent}
                />
                <SliderInput
                  label="Current term remaining (years)"
                  min={5}
                  max={30}
                  step={1}
                  value={currentTermRemaining}
                  onChange={setCurrentTermRemaining}
                  format={(v) => `${v} yrs`}
                />

                <div className="border-t border-[rgba(14,27,51,0.10)] my-2" />

                <p className="font-mono text-eyebrow text-[var(--accent-deep)]">New loan</p>
                <SliderInput
                  label="New rate"
                  min={3}
                  max={9}
                  step={0.125}
                  value={newRate}
                  onChange={setNewRate}
                  format={formatPercent}
                />
                <RadioGroup
                  label="New term"
                  options={NEW_TERM_OPTIONS}
                  value={newTerm}
                  onChange={setNewTerm}
                  format={(v) => `${v} yrs`}
                />
                <SliderInput
                  label="Closing costs"
                  min={0}
                  max={20000}
                  step={250}
                  value={closingCosts}
                  onChange={setClosingCosts}
                  format={formatUSD}
                />

                <label className="flex items-center gap-3 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rollClosingCosts}
                    onChange={(e) => setRollClosingCosts(e.target.checked)}
                    className="w-5 h-5 accent-[var(--accent-deep)] cursor-pointer"
                  />
                  <span className="text-body-sm text-[var(--text-on-light)]">
                    Roll closing costs into the new loan
                  </span>
                </label>
              </div>
            </Card>

            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                The math
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                Side by side, with the answer at the bottom.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-[var(--radius-md)] p-4 border border-[rgba(14,27,51,0.10)]"
                  style={{ backgroundColor: 'rgba(14,27,51,0.03)' }}
                >
                  <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                    Current
                  </p>
                  <p className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                    {formatUSD(result.currentMonthly)}
                  </p>
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                    /mo P&amp;I
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-md)] p-4"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(197,165,114,0.12), rgba(197,165,114,0.04))',
                    border: '1.5px solid var(--accent-muted)',
                  }}
                >
                  <p className="text-eyebrow text-[var(--accent-deep)]">New</p>
                  <p className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                    {formatUSD(result.newMonthly)}
                  </p>
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                    /mo P&amp;I
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {result.noBenefit ? (
                  <div
                    className="rounded-[var(--radius-md)] p-6 border-[1.5px]"
                    style={{
                      backgroundColor: 'rgba(212,169,60,0.08)',
                      borderColor: 'var(--warning)',
                    }}
                  >
                    <p className="text-eyebrow text-[var(--warning)] mb-2">Heads up</p>
                    <p className="text-body-sm text-[var(--text-on-light)]">
                      Refinancing at the rates you have entered would not lower your
                      monthly payment. Consider whether you are optimizing for term
                      length or cash-out instead. A loan officer can model alternatives.
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="rounded-[var(--radius-lg)] p-6"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(92,138,111,0.12), rgba(92,138,111,0.04))',
                        border: '1.5px solid var(--success)',
                      }}
                    >
                      <p className="text-eyebrow text-[var(--success)]">
                        Monthly savings
                      </p>
                      <p className="font-display text-h1 text-[var(--text-on-light)] mt-2">
                        {formatUSD(result.monthlySavings)}
                      </p>
                      <p className="text-micro text-[var(--text-on-light-muted)] mt-2">
                        Per month, every month, for the life of the new loan.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                          Break-even
                        </p>
                        <p className="font-display text-h3 text-[var(--text-on-light)] mt-2">
                          {result.breakeven !== null
                            ? `${Math.ceil(result.breakeven)} mo`
                            : '—'}
                        </p>
                        <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                          Closing costs recovered.
                        </p>
                      </div>
                      <div>
                        <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                          10-year savings
                        </p>
                        <p className="font-display text-h3 text-[var(--accent-deep)] mt-2">
                          {formatUSD(result.tenYrSavings)}
                        </p>
                        <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                          Net of closing costs.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {rollClosingCosts && (
                <p className="text-micro text-[var(--text-on-light-muted)] mt-6">
                  New loan amount with closing costs rolled in:{' '}
                  {formatUSD(result.newLoanAmount)}.
                </p>
              )}
            </Card>
          </div>
        </div>
      </section>

      <section className="section-light-gradient pb-16">
        <div className="container-base px-6">
          <div className="rounded-[var(--radius-md)] p-6 border border-[rgba(14,27,51,0.10)] bg-[var(--bg-card)]">
            <p className="font-mono text-eyebrow text-[var(--accent-deep)] mb-3">
              [NOT-A-COMMITMENT]
            </p>
            <p className="text-body-sm text-[var(--text-on-light-secondary)]">
              These numbers are estimates. Actual rates, terms, and approval depend on
              your full file. Refinancing resets the amortization schedule, which can
              change lifetime interest paid even when monthly payment drops. Talk to a
              loan officer for the full picture.
            </p>
            <p className="font-mono text-micro text-[var(--text-on-light-muted)] mt-4">
              [COMPLIANCE-REVIEW-PENDING]
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
              Want a real number?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              We will shop your refi to multiple wholesale lenders and bring back the
              numbers that actually clear closing.
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
