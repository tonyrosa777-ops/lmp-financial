'use client';

/**
 * BlogPreviewSection — light section, 3-card preview (STUB).
 *
 * Phase 1F replaces with Sanity CMS-backed real articles. Stub article
 * topics tied to MI §6 AEO targets (state programs, FHA-vs-conventional,
 * wholesale-vs-retail explainer).
 */

import FadeUp from '@/components/animations/FadeUp';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface StubArticle {
  title: string;
  excerpt: string;
  category: string;
}

// [STUB — Phase 1F replaces with Sanity CMS data]
const STUB_ARTICLES: StubArticle[] = [
  {
    title: 'FHA vs Conventional in NH',
    excerpt:
      "When 3.5% down and a 580 score makes more sense than 5% down and 620.",
    category: 'Loan Programs',
  },
  {
    title: 'MassHousing $30K Down Payment Assistance',
    excerpt: 'Income tiers, eligibility, and how it stacks with FHA.',
    category: 'State Programs',
  },
  {
    title: 'Wholesale vs Retail: Why It Matters',
    excerpt: 'What it means when we shop 30+ wholesale lenders for you.',
    category: 'How We Work',
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="section-light-gradient section-pad-base">
      <div className="container-base px-6">
        <FadeUp>
          <p className="text-eyebrow text-[var(--accent-deep)]">Reading Room</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
            State programs, explained.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {STUB_ARTICLES.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.1} className="h-full">
              <Card variant="light" className="h-full">
                <Badge color="gold">{a.category}</Badge>
                <h3 className="font-display text-h3 text-[var(--text-on-light)] mt-3">
                  {a.title}
                </h3>
                <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-2">
                  {a.excerpt}
                </p>
                <p className="text-micro text-[var(--text-on-light-muted)] mt-4 italic">
                  [STUB — Phase 1F: Sanity wiring]
                </p>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
