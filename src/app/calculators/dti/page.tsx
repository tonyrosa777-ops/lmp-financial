'use client';

// /calculators/dti — Debt-to-Income Calculator
//
// Inputs: gross monthly income, current monthly debts (excl. mortgage), target PITI
// Outputs:
//   front-end DTI = mortgagePayment / income
//   back-end DTI = (mortgagePayment + debts) / income
//   Pass/fail badges per program threshold
//
// Thresholds:
//   FHA: front 31%, back 43% (flex to 50% with comp factors)
//   Conventional: front 28%, back 36% typical / up to 50% extended
//   VA: residual income method (note: VA does not use traditional DTI thresholds)
//   USDA: front 29%, back 41%

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { useTranslation } from '@/hooks/useTranslation';

type Status = 'pass' | 'tight' | 'comp' | 'special';
type ProgramKey = 'fha' | 'conventional' | 'va' | 'usda';

interface ProgramThreshold {
  emoji: string;
  /** Translation key under dti.programs.<key> for name/description/note */
  key: ProgramKey;
  // null = no traditional DTI test (VA residual)
  frontEnd: number | null;
  backEnd: number | null;
  flexBackEnd: number | null;
  isResidual?: boolean;
}

const PROGRAMS: ProgramThreshold[] = [
  {
    emoji: '🔑',
    key: 'fha',
    frontEnd: 31,
    backEnd: 43,
    flexBackEnd: 50,
  },
  {
    emoji: '🏠',
    key: 'conventional',
    frontEnd: 28,
    backEnd: 36,
    flexBackEnd: 50,
  },
  {
    emoji: '🇺🇸',
    key: 'va',
    frontEnd: null,
    backEnd: null,
    flexBackEnd: null,
    isResidual: true,
  },
  {
    emoji: '🌾',
    key: 'usda',
    frontEnd: 29,
    backEnd: 41,
    flexBackEnd: 44,
  },
];

function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

function formatPctValue(n: number): string {
  return `${n.toFixed(1)}%`;
}

type BadgeKey = 'pass' | 'tight' | 'compNeeded' | 'residual' | 'specialProgram';

function evaluateProgram(
  program: ProgramThreshold,
  frontDti: number,
  backDti: number
): { status: Status; badgeKey: BadgeKey } {
  if (program.isResidual) {
    return { status: 'special', badgeKey: 'residual' };
  }
  if (program.frontEnd === null || program.backEnd === null) {
    return { status: 'special', badgeKey: 'specialProgram' };
  }
  const frontPass = frontDti <= program.frontEnd;
  const backPass = backDti <= program.backEnd;
  if (frontPass && backPass) {
    return { status: 'pass', badgeKey: 'pass' };
  }
  const flexPass =
    program.flexBackEnd !== null && backDti <= program.flexBackEnd;
  if (flexPass) {
    return { status: 'comp', badgeKey: 'compNeeded' };
  }
  return { status: 'tight', badgeKey: 'tight' };
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

function StatusBadge({ status, label }: { status: Status; label: string }) {
  if (status === 'pass') return <Badge color="success">{label}</Badge>;
  if (status === 'tight') return <Badge color="error">{label}</Badge>;
  if (status === 'comp') return <Badge color="gold">{label}</Badge>;
  return <Badge color="neutral">{label}</Badge>;
}

export default function DtiCalculatorPage() {
  const { t } = useTranslation('calculators');
  const [monthlyIncome, setMonthlyIncome] = useState(7000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [mortgagePayment, setMortgagePayment] = useState(2500);

  const result = useMemo(() => {
    if (monthlyIncome <= 0) {
      return { frontDti: 0, backDti: 0 };
    }
    const frontDti = (mortgagePayment / monthlyIncome) * 100;
    const backDti = ((mortgagePayment + monthlyDebts) / monthlyIncome) * 100;
    return { frontDti, backDti };
  }, [monthlyIncome, monthlyDebts, mortgagePayment]);

  return (
    <>
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <PhotoBackground src="/images/calculators/dti.jpg" priority />
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
            <p className="text-eyebrow text-[var(--accent)]">{t('dti.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('dti.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('dti.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('shared.yourNumbers')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('shared.slideToAdjustRatios')}
              </p>
              <div className="flex flex-col gap-6">
                <SliderInput
                  label={t('dti.inputs.grossMonthlyIncome')}
                  min={2000}
                  max={30000}
                  step={100}
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('dti.inputs.monthlyDebts')}
                  min={0}
                  max={8000}
                  step={50}
                  value={monthlyDebts}
                  onChange={setMonthlyDebts}
                  format={formatUSD}
                />
                <SliderInput
                  label={t('dti.inputs.mortgagePayment')}
                  min={0}
                  max={10000}
                  step={50}
                  value={mortgagePayment}
                  onChange={setMortgagePayment}
                  format={formatUSD}
                />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div
                  className="rounded-[var(--radius-md)] p-4"
                  style={{ backgroundColor: 'rgba(14,27,51,0.04)' }}
                >
                  <p className="text-eyebrow text-[var(--text-on-light-secondary)]">
                    {t('dti.results.frontEnd')}
                  </p>
                  <p className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                    {formatPctValue(result.frontDti)}
                  </p>
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                    {t('dti.results.frontEndFormula')}
                  </p>
                </div>
                <div
                  className="rounded-[var(--radius-md)] p-4"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(197,165,114,0.10), rgba(197,165,114,0.03))',
                    border: '1.5px solid var(--accent-muted)',
                  }}
                >
                  <p className="text-eyebrow text-[var(--accent-deep)]">
                    {t('dti.results.backEnd')}
                  </p>
                  <p className="font-display text-h2 text-[var(--text-on-light)] mt-2">
                    {formatPctValue(result.backDti)}
                  </p>
                  <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                    {t('dti.results.backEndFormula')}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="light" hover={false} className="h-full">
              <h2 className="font-display text-h3 text-[var(--text-on-light)] mb-2">
                {t('dti.results.byProgramTitle')}
              </h2>
              <p className="text-body-sm text-[var(--text-on-light-secondary)] mb-8">
                {t('dti.results.byProgramSubtitle')}
              </p>

              <div className="flex flex-col gap-4">
                {PROGRAMS.map((program) => {
                  const { status, badgeKey } = evaluateProgram(
                    program,
                    result.frontDti,
                    result.backDti
                  );
                  return (
                    <div
                      key={program.key}
                      className="rounded-[var(--radius-md)] p-4 border border-[rgba(14,27,51,0.10)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl" aria-hidden="true">
                              {program.emoji}
                            </span>
                            <h3 className="font-display text-h4 text-[var(--text-on-light)]">
                              {t(`dti.programs.${program.key}.name`)}
                            </h3>
                          </div>
                          <p className="text-micro text-[var(--text-on-light-muted)] mt-1">
                            {t(`dti.programs.${program.key}.description`)}
                          </p>
                        </div>
                        <StatusBadge
                          status={status}
                          label={t(`dti.badges.${badgeKey}`)}
                        />
                      </div>
                      <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                        {t(`dti.programs.${program.key}.note`)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="font-mono text-micro text-[var(--text-on-light-muted)] mt-6">
                {t('dti.results.compFactorsNote')}
              </p>
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
              {t('dti.disclaimerBody')}
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
              {t('dti.ctaBody')}
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
