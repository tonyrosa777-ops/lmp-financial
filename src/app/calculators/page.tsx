import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

// /calculators — INDEX (Phase 1F rebuild, replacing the Phase 1E stub)
//
// Section rhythm:
//   1. Hero               → dark   → intent (run the numbers)
//   2. Calculator grid    → light  → education (5 native calculators)
//   3. Real number CTA    → dark   → conversion (talk to a real person)
//
// All five linked calculators are fully native. Per CLAUDE.md
// LMP-Specific Custom Builds + Conversion Flow Rule + Compliance Rule:
//   - No third-party rates.now embeds anywhere
//   - Estimates only — never commitments
//   - Each calculator carries a [NOT-A-COMMITMENT] flag

export const metadata: Metadata = {
  title: 'Mortgage Calculators',
  description:
    'Native mortgage calculators built for real conversations: affordability, monthly payment, refinance, down payment, and DTI. Fast, AEO-ready, branded for LMP Financial.',
};

interface CalculatorCard {
  emoji: string;
  name: string;
  description: string;
  href: string;
  cta: string;
}

const CALCULATORS: CalculatorCard[] = [
  {
    emoji: '🏠',
    name: 'Affordability',
    description:
      'How much home can I afford? Income, debts, and DTI math.',
    href: '/calculators/affordability',
    cta: 'Use calculator →',
  },
  {
    emoji: '💰',
    name: 'Monthly Payment',
    description:
      'Principal + interest + tax + insurance + PMI breakdown.',
    href: '/calculators/monthly-payment',
    cta: 'Use calculator →',
  },
  {
    emoji: '🔄',
    name: 'Refinance',
    description:
      'Current loan vs new loan. Breakeven months. Lifetime savings.',
    href: '/calculators/refinance',
    cta: 'Use calculator →',
  },
  {
    emoji: '📊',
    name: 'Down Payment',
    description:
      'FHA, VA, USDA, Conventional thresholds side-by-side.',
    href: '/calculators/down-payment',
    cta: 'Use calculator →',
  },
  {
    emoji: '📈',
    name: 'DTI',
    description:
      'Front-end and back-end debt-to-income, with lender thresholds.',
    href: '/calculators/dti',
    cta: 'Use calculator →',
  },
];

export default function CalculatorsPage() {
  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark, breathing orbs)                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/calculators.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Calculators</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Run the numbers.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Five calculators, native to lmpfinancial.com, fast on mobile, and grounded
              in the same wholesale-lender math we use every day. Estimates today, real
              numbers from a loan officer when you are ready.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Calculator grid (light)                            */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">Pick a Tool</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Five calculators. One source of truth.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-6 max-w-2xl">
              Each calculator runs the same amortization, DTI, and threshold math your
              lender will run. The output is an estimate. The conversation that follows is
              where the real number gets built.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {CALCULATORS.map((calc, idx) => (
              <FadeUp key={calc.name} delay={0.1 + idx * 0.075}>
                <Card variant="light" href={calc.href} className="h-full">
                  <div className="text-4xl" aria-hidden="true">
                    {calc.emoji}
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {calc.name}
                  </h3>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {calc.description}
                  </p>
                  <p className="font-mono text-eyebrow text-[var(--accent-deep)] mt-6">
                    {calc.cta}
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Talk to a real person CTA (dark)                   */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.07), transparent 65%)',
          }}
        />

        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">Talk To A Real Person</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-primary)] mt-3 max-w-2xl mx-auto">
              The calculator is the start. The loan officer is the answer.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              Calculators are estimates, not commitments. Real rates, real terms, and a
              real approval start with a 15-minute call. Pick a time that works.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/booking" size="lg">
                Get Pre-Approved
              </Button>
              <Button href="/team" variant="secondary" size="lg">
                Meet the Team
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="font-mono text-micro text-[var(--text-muted)] mt-8">
              [NOT-A-COMMITMENT] Calculators output estimates only. Actual rates, terms,
              and approval determined at application. [COMPLIANCE-REVIEW-PENDING]
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
