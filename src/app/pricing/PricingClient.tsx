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
import { useTranslation } from '@/hooks/useTranslation';

// ---------- Tier data ----------
//
// Tier keys, prices, and per-feature included flags are NOT translatable —
// they're product-config. Tier name, tagline, feature labels, and comparison
// row labels translate via the `pricing` namespace. Prices stay numeric.

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

const TIER_PRICES: Record<TierKey, number> = {
  starter: 1500,
  pro: 3000,
  premium: 5500,
};

// Inclusion masks per tier. Index aligns with the i18n features array order.
// Truth-table is the single source of which features are in/out at each tier.
const TIER_INCLUSION: Record<TierKey, boolean[]> = {
  // Starter: 8 included foundation rows + 6 not-included conversion/content/commerce rows
  starter: [
    true, true, true, true, true, true, true, true,
    false, false, false, false, false, false,
  ],
  // Pro: 6 included rows + 2 not-included (commerce + premium-tier)
  pro: [true, true, true, true, true, true, false, false],
  // Premium: 5 included rows
  premium: [true, true, true, true, true],
};

const TIER_HIGHLIGHTED: Record<TierKey, boolean> = {
  starter: false,
  pro: true,
  premium: false,
};

const TIER_KEYS: TierKey[] = ['starter', 'pro', 'premium'];

// ---------- Comparison chart data ----------
//
// Categories + per-row inclusion are product-config. Labels (category name,
// row feature label) translate. The arrays here align by index with
// pricing.json comparison.categories.<key>.rows.

type CategoryKey = 'foundation' | 'conversion' | 'contentSeo' | 'commerce' | 'support';

interface ComparisonRow {
  feature: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
}

interface ComparisonCategory {
  key: CategoryKey;
  name: string;
  rows: ComparisonRow[];
}

const CATEGORY_KEYS: CategoryKey[] = [
  'foundation',
  'conversion',
  'contentSeo',
  'commerce',
  'support',
];

// Per-category, per-row inclusion. Index aligns with the translated rows array.
const CATEGORY_INCLUSION: Record<
  CategoryKey,
  Array<{ starter: boolean; pro: boolean; premium: boolean }>
> = {
  foundation: [
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
    { starter: true, pro: true, premium: true },
  ],
  conversion: [
    { starter: false, pro: true, premium: true },
    { starter: false, pro: true, premium: true },
  ],
  contentSeo: [
    { starter: false, pro: true, premium: true },
    { starter: false, pro: true, premium: true },
    { starter: false, pro: true, premium: true },
    { starter: false, pro: true, premium: true },
  ],
  commerce: [{ starter: false, pro: false, premium: true }],
  support: [
    { starter: true, pro: true, premium: true },
    { starter: false, pro: false, premium: true },
    { starter: false, pro: false, premium: true },
  ],
};

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
  const { t } = useTranslation('pricing');

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
      aria-label={t('modal.ariaLabel')}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('modal.closeBackdropAria')}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card variant="dark" hover={false} className="relative p-0">
          <button
            type="button"
            onClick={onClose}
            aria-label={t('modal.closeAria')}
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
  const { t } = useTranslation('pricing');
  const isPro = tier.highlighted;

  return (
    <div className="relative h-full flex">
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <Badge color="gold">{t('tiers.popularBadge')}</Badge>
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
          {t('tiers.ctaButton')}
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
  const { t } = useTranslation('pricing');
  const [avgCommission, setAvgCommission] = useState<number>(3500);
  const [loansPerMonth, setLoansPerMonth] = useState<number>(4);
  const [selectedTier, setSelectedTier] = useState<TierKey>('pro');

  const monthlyRevenue = avgCommission * loansPerMonth;
  const breakEvenDays =
    monthlyRevenue > 0
      ? Math.max(1, Math.ceil((TIER_PRICES[selectedTier] / monthlyRevenue) * 30))
      : 0;
  const twelveMonthROI =
    TIER_PRICES[selectedTier] > 0
      ? Math.round(((monthlyRevenue * 12 - TIER_PRICES[selectedTier]) / TIER_PRICES[selectedTier]) * 100)
      : 0;

  // Tier chip labels translate via tiers.<key>.name. Order is product-config.
  const tierChips: { key: TierKey; label: string }[] = TIER_KEYS.map((key) => ({
    key,
    label: t(`tiers.${key}.name`),
  }));
  const selectedTierLabel = tierChips.find((c) => c.key === selectedTier)?.label ?? '';

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Left: inputs */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-eyebrow text-[var(--accent)]">{t('roi.eyebrow')}</p>
          <h2 className="font-display text-h2 mt-3 text-[var(--text-primary)]">
            {t('roi.headline')}
          </h2>
          <p className="text-body text-[var(--text-secondary)] mt-3">
            {t('roi.body')}
          </p>
        </div>

        {/* Avg commission slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="avg-commission"
              className="text-eyebrow text-[var(--text-secondary)]"
            >
              {t('roi.labels.avgCommission')}
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
              {t('roi.labels.loansPerMonth')}
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
          <p className="text-eyebrow text-[var(--text-secondary)]">{t('roi.labels.tier')}</p>
          <div
            role="tablist"
            aria-label={t('roi.tierAriaLabel')}
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
            {t('roi.labels.tierPriceTemplate').replace(
              '{price}',
              formatUSD(TIER_PRICES[selectedTier]),
            )}
          </p>
        </div>
      </div>

      {/* Right: outputs */}
      <Card variant="dark" hover={false} className="flex flex-col gap-6 p-8">
        <div>
          <p className="text-eyebrow text-[var(--accent)]">{t('roi.outputs.eyebrow')}</p>
          <p className="text-body-sm text-[var(--text-secondary)] mt-2">
            {t('roi.outputs.subtitle')}
          </p>
        </div>

        <RoiOutput
          label={t('roi.outputs.monthlyRevenue')}
          value={`$${formatUSD(monthlyRevenue)}`}
          sub={t('roi.outputs.monthlyRevenueSub')}
        />
        <RoiOutput
          label={t('roi.outputs.breakEven')}
          value={`${breakEvenDays} ${t('roi.outputs.breakEvenDays')}`}
          sub={t('roi.outputs.breakEvenSubTemplate').replace('{tierName}', selectedTierLabel)}
        />
        <RoiOutput
          label={t('roi.outputs.twelveMonthRoi')}
          value={`${twelveMonthROI}%`}
          sub={t('roi.outputs.twelveMonthRoiSub')}
          accent
        />

        <Button variant="primary" size="md" fullWidth onClick={onCtaClick}>
          {t('roi.lockInTemplate').replace('{tierName}', selectedTierLabel)}
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
  const { t, ta } = useTranslation('pricing');

  // Build categories from translated row labels + product-config inclusion masks.
  const categories: ComparisonCategory[] = CATEGORY_KEYS.map((catKey) => {
    const rowLabels = ta<string[]>(`comparison.categories.${catKey}.rows`) ?? [];
    const inclusion = CATEGORY_INCLUSION[catKey];
    const rows: ComparisonRow[] = rowLabels.map((label, idx) => ({
      feature: label,
      starter: inclusion[idx]?.starter ?? false,
      pro: inclusion[idx]?.pro ?? false,
      premium: inclusion[idx]?.premium ?? false,
    }));
    return {
      key: catKey,
      name: t(`comparison.categories.${catKey}.name`),
      rows,
    };
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead className="sticky top-0 bg-[var(--bg-elevated)] z-10">
          <tr className="border-b-2 border-[rgba(14,27,51,0.15)]">
            <th
              scope="col"
              className="py-4 px-4 text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              {t('comparison.headers.feature')}
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              {t('comparison.headers.starter')}
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $1,500
              </div>
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--accent)]"
            >
              {t('comparison.headers.pro')}
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $3,000
              </div>
            </th>
            <th
              scope="col"
              className="py-4 px-4 text-center text-eyebrow text-[var(--text-on-light-secondary)]"
            >
              {t('comparison.headers.premium')}
              <div className="font-mono text-sm text-[var(--text-on-light)] mt-1 normal-case tracking-normal">
                $5,500
              </div>
            </th>
          </tr>
        </thead>

        {categories.map((category) => (
          <tbody key={category.key}>
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
  const { t } = useTranslation('pricing');
  return included ? (
    <span className="text-[var(--accent)] text-lg" aria-label={t('tiers.includedAria')}>
      ✅
    </span>
  ) : (
    <span className="text-[var(--text-on-light-muted)] text-lg" aria-label={t('tiers.notIncludedAria')}>
      ❌
    </span>
  );
}

// ---------- Main client component ----------

export default function PricingClient() {
  const { t, ta } = useTranslation('pricing');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Assemble tiers from translation namespace + product-config (price, included masks).
  // Feature labels translate; included flags are static product config aligned by index.
  const tiers: Tier[] = TIER_KEYS.map((key) => {
    const featureLabels = ta<string[]>(`tiers.${key}.features`) ?? [];
    const inclusion = TIER_INCLUSION[key];
    return {
      key,
      name: t(`tiers.${key}.name`),
      price: TIER_PRICES[key],
      tagline: t(`tiers.${key}.tagline`),
      highlighted: TIER_HIGHLIGHTED[key],
      features: featureLabels.map((label, idx) => ({
        label,
        included: inclusion[idx] ?? false,
      })),
    };
  });

  return (
    <>
      {/* Page header — dark gradient (moved here from page.tsx so the headline,
          eyebrow, and sub translate via useTranslation('pricing')) */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <div className="container-base px-6 relative z-10 text-center">
          <p className="text-eyebrow text-[var(--accent)]">{t('page.eyebrow')}</p>
          <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl mx-auto">
            {t('page.headline')}
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
            {t('page.subheadline')}
          </p>
        </div>
      </section>

      {/* Section 1: Tier cards — light gradient */}
      <section className="relative overflow-hidden section-light-gradient section-pad-base">
        <div className="container-base px-6 relative z-10">
          <FadeUp>
            <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 pt-6 items-stretch">
              {tiers.map((tier) => (
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
              <p className="text-eyebrow text-[var(--accent)]">{t('comparison.eyebrow')}</p>
              <h2 className="font-display text-h2 mt-3 text-[var(--text-on-light)]">
                {t('comparison.headline')}
              </h2>
              <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
                {t('comparison.body')}
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
            <p className="text-eyebrow text-[var(--accent)]">{t('finalCta.eyebrow')}</p>
            <h2 className="hero-shimmer font-display text-h2 mt-3 max-w-2xl mx-auto">
              {t('finalCta.headline')}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
              {t('finalCta.body')}
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="primary" size="lg" onClick={openModal}>
                {t('finalCta.primary')}
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
