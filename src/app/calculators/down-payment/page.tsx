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

const CLOSING_COST_RATE = 0.03;

interface ProgramSpec {
  emoji: string;
  name: string;
  slug: string;
  rate: number; // 0..1
  note: string;
  programLink: string;
}

const PROGRAMS: ProgramSpec[] = [
  {
    emoji: '🔑',
    name: 'FHA',
    slug: 'fha',
    rate: 0.035,
    note: '3.5% down. 580+ credit. Primary residence only.',
    programLink: '/services/fha',
  },
  {
    emoji: '🇺🇸',
    name: 'VA',
    slug: 'va',
    rate: 0,
    note: '0% down. Eligible veterans, active duty, and qualifying spouses.',
    programLink: '/services/va',
  },
  {
    emoji: '🌾',
    name: 'USDA',
    slug: 'usda',
    rate: 0,
    note: '0% down. Property must be in USDA-eligible geography. Income limits apply.',
    programLink: '/services/usda',
  },
  {
    emoji: '🏠',
    name: 'Conventional 5%',
    slug: 'fixed-rate',
    rate: 0.05,
    note: '5% down. PMI required until 20% equity. Standard credit qualifying.',
    programLink: '/services/fixed-rate',
  },
  {
    emoji: '🏛️',
    name: 'Conventional 20%',
    slug: 'fixed-rate-20',
    rate: 0.2,
    note: '20% down. No PMI. The cleanest conventional path when reserves allow.',
    programLink: '/services/fixed-rate',
  },
  {
    emoji: '💎',
    name: 'Jumbo (10%)',
    slug: 'jumbo',
    rate: 0.1,
    note: 'Above $766,550 conforming limit. Stronger credit and reserve requirements.',
    programLink: '/services/jumbo',
  },
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
            <p className="text-eyebrow text-[var(--accent)]">Down Payment</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              How much do I need down?
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Six programs, side by side. The number depends on the program. The
              program depends on your file. Both depend on a real conversation.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          {/* Single full-width input row */}
          <Card variant="light" hover={false} className="mb-10">
            <SliderInput
              label="Home price"
              min={100000}
              max={2500000}
              step={5000}
              value={homePrice}
              onChange={setHomePrice}
              format={formatUSD}
            />
            <p className="text-micro text-[var(--text-on-light-muted)] mt-4">
              Drag the slider. Down payment thresholds and total cash to close update
              live for every program.
            </p>
          </Card>

          {/* Program cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map((row, idx) => (
              <FadeUp key={row.name} delay={0.05 + idx * 0.05}>
                <Card variant="light" hover={false} className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {row.emoji}
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-3">
                    {row.name}
                  </h3>
                  <div className="mt-5 pb-5 border-b border-[rgba(14,27,51,0.10)]">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      Down payment
                    </p>
                    <p className="font-display text-h2 text-[var(--accent-deep)] mt-1">
                      {formatUSD(row.downPayment)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                      Total cash to close (est.)
                    </p>
                    <p className="font-display text-h4 text-[var(--text-on-light)] mt-1">
                      {formatUSD(row.totalCash)}
                    </p>
                    <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                      Down payment + ~3% closing costs.
                    </p>
                  </div>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-5">
                    {row.note}
                  </p>
                  {row.programLink && (
                    <a
                      href={row.programLink}
                      className="inline-block mt-5 font-mono text-eyebrow text-[var(--accent-deep)] hover:underline"
                    >
                      Learn about {row.name} →
                    </a>
                  )}
                </Card>
              </FadeUp>
            ))}
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
              These numbers are estimates. Closing costs vary by state, property, and
              program (often 2 to 5% of price). Down payment minimums shown are program
              floors; many borrowers benefit from putting more down to lower PMI or
              improve rate. Talk to a loan officer to model your specific scenario.
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
              State down-payment assistance programs (MassHousing, NHHFA, MaineHousing,
              CHFA, RIHousing, TSAHC, and more) can reduce these numbers further. We
              know which ones you qualify for.
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
