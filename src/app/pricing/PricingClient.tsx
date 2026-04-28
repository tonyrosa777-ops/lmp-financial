'use client';

/**
 * PricingClient — interactive client component for the Optimus internal sales tool.
 *
 * Per CLAUDE.md "Always-Built Features Rule → Pricing Page":
 * - Three fixed tiers — Starter $1,500 / Pro $3,000 / Premium $5,500.
 * - Pro gets the gold "Most Popular" badge. Starter and Premium are anchors.
 * - Client-facing feature names ONLY (Automated Booking Calendar, Lead-Capture
 *   Quiz, Professional Blog, Photo Gallery, Testimonials Showcase, Branded
 *   Merch Shop). Never internal build-side jargon in feature labels.
 * - ROI calculator: 2 sliders (avg commission per loan, loans/month) + tier
 *   chip selector → outputs monthly revenue, break-even days, 12-month ROI.
 * - Comparison chart grouped by category (Foundation / Conversion /
 *   Content & SEO / Commerce / Support).
 * - Tier CTAs open <BookingCalendar /> in a centered modal — never link away.
 * - Forbidden content per CLAUDE.md is enforced.
 *
 * This page is DELETED by the pre-launch auditor before client launch.
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import FadeUp from '@/components/animations/FadeUp';
import BookingCalendar from '@/components/BookingCalendar';

// ---------- Tier data ----------

type TierKey = 'starter' | 'pro' | 'premium';

interface TierFeature {
  label: string;
  included: boolean;
}

interface Tier {
  key: TierKey;
  name: string;
  price: number;
  tagline: string;
  features: TierFeature[];
  highlighted: boolean;
}

const TIERS: Tier[] = [
  {
    key: 'starter',
    name: 'Starter',
    price: 1500,
    tagline: 'Premium foundation. Core pages. Animated hero.',
    highlighted: false,
    features: [
      { label: 'Custom luxury homepage with animated hero', included: true },
      { label: 'About page with founder story', included: true },
      { label: 'Loan programs page (or services for non-mortgage clients)', included: true },
      { label: 'Contact page with form routing', included: true },
      { label: 'FAQ page', included: true },
      { label: 'Custom domain + Vercel deployment', included: true },
      { label: 'Mobile-responsive across all breakpoints', included: true },
      { label: 'Performance optimized (90+ Lighthouse)', included: true },
      { label: 'Automated Booking Calendar', included: false },
      { label: 'Lead-Capture Quiz', included: false },
      { label: 'Professional Blog', included: false },
      { label: 'Photo Gallery', included: false },
      { label: 'Testimonials Showcase', included: false },
      { label: 'Branded Merch Shop', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 3000,
    tagline: 'Everything most clients actually need to convert.',
    highlighted: true,
    features: [
      { label: 'Everything in Starter', included: true },
      { label: 'Automated Booking Calendar (custom-branded, no third-party iframe)', included: true },
      { label: 'Lead-Capture Quiz (scored funnel, archetype results)', included: true },
      { label: 'Professional Blog (article architecture, SEO-ready, AEO-optimized)', included: true },
      { label: 'Photo Gallery (12-16 images, fully branded)', included: true },
      { label: 'Testimonials Showcase (full review page, paginated)', included: true },
      { label: 'Branded Merch Shop', included: false },
      { label: 'Premium tier features', included: false },
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: 5500,
    tagline: 'White-glove launch with commerce + priority support.',
    highlighted: false,
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Branded Merch Shop (Stripe + Printful integration, custom-branded)', included: true },
      { label: 'Priority support and revisions', included: true },
      { label: 'White-glove launch package', included: true },
      { label: 'Multi-language support architecture (when applicable)', included: true },
    ],
  },
];

// ---------- Comparison chart data ----------

interface ComparisonRow {
  feature: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}

interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

const COMPARISON: ComparisonCategory[] = [
  {
    name: 'Foundation',
    rows: [
      { feature: 'Custom luxury homepage with animated hero', starter: true, pro: true, premium: true },
      { feature: 'About / founder story', starter: true, pro: true, premium: true },
      { feature: 'Services / loan programs page', starter: true, pro: true, premium: true },
      { feature: 'Contact + FAQ pages', starter: true, pro: true, premium: true },
      { feature: 'Custom domain + Vercel deploy', starter: true, pro: true, premium: true },
      { feature: 'Mobile-responsive design', starter: true, pro: true, premium: true },
      { feature: 'Performance optimization', starter: true, pro: true, premium: true },
    ],
  },
  {
    name: 'Conversion',
    rows: [
      { feature: 'Automated Booking Calendar', starter: false, pro: true, premium: true },
      { feature: 'Lead-Capture Quiz', starter: false, pro: true, premium: true },
    ],
  },
  {
    name: 'Content & SEO',
    rows: [
      { feature: 'Professional Blog', starter: false, pro: true, premium: true },
      { feature: 'Photo Gallery', starter: false, pro: true, premium: true },
      { feature: 'Testimonials Showcase', starter: false, pro: true, premium: true },
      { feature: 'AEO-optimized content architecture', starter: false, pro: true, premium: true },
    ],
  },
  {
    name: 'Commerce',
    rows: [
      { feature: 'Branded Merch Shop (Stripe + Printful)', starter: false, pro: false, premium: true },
    ],
  },
  {
    name: 'Support',
    rows: [
      { feature: 'Standard support', starter: true, pro: true, premium: true },
      { feature: 'Priority revisions', starter: false, pro: false, premium: true },
      { feature: 'White-glove launch package', starter: false, pro: false, premium: true },
    ],
  },
];

// ---------- Helpers ----------

function formatUSD(value: number): string {
  return value.toLocaleString('en-US');
}

// ---------- Modal ----------

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

function BookingModal({ open, onClose }: BookingModalProps) {
  // ESC key + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a consultation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card variant="dark" hover={false} className="relative p-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-9 h-9 inline-flex items-center justify-center rounded-full bg-[var(--bg-card-dark)] border border-[var(--border-dark)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent-muted)] transition-colors"
          >
            <span aria-hidden="true" className="text-lg leading-none">✕</span>
          </button>
          <div className="p-6 sm:p-8">
            <BookingCalendar />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------- Tier Card ----------

interface TierCardProps {
  tier: Tier;
  onSelect: () => void;
}

function TierCard({ tier, onSelect }: TierCardProps) {
  const isPro = tier.highlighted;

  return (
    <div className="relative h-full flex">
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <Badge color="gold">⭐ Most Popular</Badge>
        </div>
      )}

      <Card
        variant="light"
        hover={false}
        className={[
          'flex flex-col w-full',
          isPro
            ? 'border-2 border-[var(--accent)] shadow-[var(--shadow-xl)] scale-[1.02]'
            : 'border border-[rgba(14,27,51,0.08)]',
        ].join(' ')}
      >
        <div className="flex flex-col gap-2 pb-6 border-b border-[rgba(14,27,51,0.08)]">
          <h3 className="font-display text-h3 text-[var(--text-on-light)]">{tier.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-display text-[var(--text-on-light)]">
              ${formatUSD(tier.price)}
            </span>
          </div>
          <p className="text-body-sm text-[var(--text-on-light-secondary)]">{tier.tagline}</p>
        </div>

        <ul className="flex flex-col gap-3 py-6 flex-1">
          {tier.features.map((f) => (
            <li
              key={f.label}
              className="flex items-start gap-2.5 text-body-sm"
            >
              <span
                aria-hidden="true"
                className={[
                  'mt-0.5 shrink-0 text-base',
                  f.included ? 'text-[var(--accent)]' : 'text-[var(--text-on-light-muted)]',
                ].join(' ')}
              >
                {f.included ? '✅' : '❌'}
              </span>
              <span
                className={
                  f.included
                    ? 'text-[var(--text-on-light)]'
                    : 'text-[var(--text-on-light-muted)] line-through'
                }
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={isPro ? 'primary' : 'secondary'}
          size="lg"
          fullWidth
          onClick={onSelect}
        >
          Get Started
        </Button>
      </Card>
    </div>
  );
}

// ---------- ROI Calculator ----------

interface RoiCalculatorProps {
  onCtaClick: () => void;
}

function RoiCalculator({ onCtaClick }: RoiCalculatorProps) {
  const [avgCommission, setAvgCommission] = useState<number>(3500);
  const [loansPerMonth, setLoansPerMonth] = useState<number>(4);
  const [selectedTier, setSelectedTier] = useState<TierKey>('pro');

  const tierPrice: Record<TierKey, number> = {
    starter: 1500,
    pro: 3000,
    premium: 5500,
  };

  const monthlyRevenue = avgCommission * loansPerMonth;
  const breakEvenDays =
    monthlyRevenue > 0
      ? Math.max(1, Math.ceil((tierPrice[selectedTier] / monthlyRevenue) * 30))
      : 0;
  const twelveMonthROI =
    tierPrice[selectedTier] > 0
      ? Math.round(((monthlyRevenue * 12 - tierPrice[selectedTier]) / tierPrice[selectedTier]) * 100)
      : 0;

  const tierChips: { key: TierKey; label: string }[] = [
    { key: 'starter', label: 'Starter' },
    { key: 'pro', label: 'Pro' },
    { key: 'premium', label: 'Premium' },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Left: inputs */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-eyebrow text-[var(--accent)]">ROI Calculator</p>
          <h2 className="font-display text-h2 mt-3 text-[var(--text-primary)]">
            What&apos;s the ROI?
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3">
            Slide to your numbers. The right tier pays for itself in days, not quarters.
          </p>
        </div>

        {/* Avg commission slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="avg-commission"
              className="text-eyebrow text-[var(--text-secondary)]"
            >
              Average commission per loan
            </label>
            <span className="font-mono text-base text-[var(--accent)]">
              ${formatUSD(avgCommission)}
            </span>
          </div>
          <input
            id="avg-commission"
            type="range"
            min={1500}
            max={8000}
            step={100}
            value={avgCommission}
            onChange={(e) => setAvgCommission(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <div className="flex justify-between text-micro text-[var(--text-muted)] font-mono">
            <span>$1,500</span>
            <span>$8,000</span>
          </div>
        </div>

        {/* Loans per month slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="loans-per-month"
              className="text-eyebrow text-[var(--text-secondary)]"
            >
              Loans per month
            </label>
            <span className="font-mono text-base text-[var(--accent)]">{loansPerMonth}</span>
          </div>
          <input
            id="loans-per-month"
            type="range"
            min={1}
            max={20}
            step={1}
            value={loansPerMonth}
            onChange={(e) => setLoansPerMonth(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <div className="flex justify-between text-micro text-[var(--text-muted)] font-mono">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Tier chip group */}
        <div className="flex flex-col gap-3">
          <p className="text-eyebrow text-[var(--text-secondary)]">Tier</p>
          <div
            role="tablist"
            aria-label="Pricing tier"
            className="grid grid-cols-3 gap-2 p-1 bg-[var(--bg-card-dark)] border border-[var(--border-dark)] rounded-[var(--radius-md)]"
          >
            {tierChips.map((chip) => {
              const active = selectedTier === chip.key;
              return (
                <button
                  key={chip.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedTier(chip.key)}
                  className={[
                    'py-2.5 rounded-[var(--radius-sm)] font-body font-semibold text-sm transition-all',
                    active
                      ? 'bg-[var(--accent)] text-[var(--primary-deep)] shadow-[var(--shadow-glow-gold)]'
                      : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          <p className="text-micro text-[var(--text-muted)]">
            Selected tier price: ${formatUSD(tierPrice[selectedTier])}
          </p>
        </div>
      </div>

      {/* Right: outputs */}
      <Card variant="dark" hover={false} className="flex flex-col gap-6 p-8">
        <div>
          <p className="text-eyebrow text-[var(--accent)]">Your numbers</p>
          <p className="text-body-sm text-[var(--text-secondary)] mt-2">
            Live updates as you slide.
          </p>
        </div>

        <RoiOutput
          label="Monthly revenue"
          value={`$${formatUSD(monthlyRevenue)}`}
          sub="From your loan pipeline alone."
        />
        <RoiOutput
          label="Break-even"
          value={`${breakEvenDays} days`}
          sub={`To pay off ${tierChips.find((c) => c.key === selectedTier)?.label}.`}
        />
        <RoiOutput
          label="12-month ROI"
          value={`${twelveMonthROI}%`}
          sub="Net return on the build over a year."
          accent
        />

        <Button variant="primary" size="md" fullWidth onClick={onCtaClick}>
          Lock in {tierChips.find((c) => c.key === selectedTier)?.label}
        </Button>
      </Card>
    </div>
  );
}

interface RoiOutputProps {
  label: string;
  value: ReactNode;
  sub: string;
  accent?: boolean;
}

function RoiOutput({ label, value, sub, accent = false }: RoiOutputProps) {
  return (
    <div className="flex flex-col gap-1 pb-4 border-b border-[var(--border-dark)] last:border-b-0 last:pb-0">
      <p className="text-eyebrow text-[var(--text-secondary)]">{label}</p>
      <p
        className={[
          'font-display text-h2',
          accent ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]',
        ].join(' ')}
      >
        {value}
      </p>
      <p className="text-micro text-[var(--text-muted)]">{sub}</p>
    </div>
  );
}

// ---------- Comparison Chart ----------

function ComparisonChart() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 bg-[var(--bg-elevated)] z-10">
          <tr className="border-b-2 border-[rgba(14,27,51,0.15)]">
            <th
              scope="col"
              className="py-4 px-4 text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              Feature
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              Starter
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $1,500
              </div>
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--accent)]"
            >
              Pro ⭐
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $3,000
              </div>
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              Premium
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $5,500
              </div>
            </th>
          </tr>
        </thead>

        {COMPARISON.map((category) => (
          <tbody key={category.name}>
            <tr>
              <td
                colSpan={4}
                className="pt-8 pb-3 px-4 font-display text-h4 text-[var(--text-on-light)] border-b border-[rgba(14,27,51,0.1)]"
              >
                {category.name}
              </td>
            </tr>
            {category.rows.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-[rgba(14,27,51,0.06)]"
              >
                <td className="py-3 px-4 text-body-sm text-[var(--text-on-light)]">
                  {row.feature}
                </td>
                <td className="py-3 px-4 text-center">
                  <CheckMark included={row.starter} />
                </td>
                <td className="py-3 px-4 text-center bg-[rgba(197,165,114,0.04)]">
                  <CheckMark included={row.pro} />
                </td>
                <td className="py-3 px-4 text-center">
                  <CheckMark included={row.premium} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

function CheckMark({ included }: { included: boolean }) {
  return included ? (
    <span className="text-[var(--accent)] text-lg" aria-label="Included">
      ✅
    </span>
  ) : (
    <span className="text-[var(--text-on-light-muted)] text-lg" aria-label="Not included">
      ❌
    </span>
  );
}

// ---------- Main client component ----------

export default function PricingClient() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Section 1: Tier cards — light gradient */}
      <section className="relative overflow-hidden section-light-gradient section-pad-base">
        <div className="container-base px-6 relative z-10">
          <FadeUp>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 pt-6 items-stretch">
              {TIERS.map((tier) => (
                <TierCard key={tier.key} tier={tier} onSelect={openModal} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 2: ROI Calculator — dark gradient */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div className="container-base px-6 relative z-10">
          <FadeUp>
            <RoiCalculator onCtaClick={openModal} />
          </FadeUp>
        </div>
      </section>

      {/* Section 3: Comparison chart — light gradient (text-heavy, static OK) */}
      <section className="relative overflow-hidden section-light-gradient section-pad-base">
        <div className="container-base px-6 relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-eyebrow text-[var(--accent)]">Side by side</p>
              <h2 className="font-display text-h2 mt-3 text-[var(--text-on-light)]">
                Every feature, every tier.
              </h2>
              <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
                Pro is most clients&apos; sweet spot — every conversion feature, none of the commerce overhead.
              </p>
            </div>
            <ComparisonChart />
          </FadeUp>
        </div>
      </section>

      {/* Section 4: Final CTA — dark gradient */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div className="container-base px-6 relative z-10 text-center">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent)]">Next step</p>
            <h2 className="hero-shimmer font-display text-h2 mt-3 max-w-2xl mx-auto">
              Ready to start?
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              Pick a tier on the call. Walk away with a build date and a launch plan.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="primary" size="lg" onClick={openModal}>
                Schedule a Consultation
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Booking modal — opens on any tier CTA + final CTA */}
      <BookingModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
