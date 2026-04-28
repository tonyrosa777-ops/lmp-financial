// src/app/services/[slug]/page.tsx
//
// Dynamic per-program detail page. SSG via generateStaticParams over all 9
// loan programs in siteConfig.loanPrograms. Next.js 16 App Router — `params`
// is a Promise and must be awaited (Next.js 15+ async-params API).
//
// Compliance: every page renders [COMPLIANCE-REVIEW-PENDING] flag visibly per
// CLAUDE.md Compliance Rule. All program-specific copy needs LMP IT firm
// signoff before publish. FAQ + document checklist marked [DEMO COPY].
//
// Section rhythm (purpose-level dedup + dark/light alternation):
//   1. Page header             → dark  → topical intro
//   2. Eligibility             → light → education
//   3. What you'll need        → dark  → process / preparation
//   4. Common questions (FAQ)  → light → objection handling
//   5. CTA                     → dark  → conversion (single bottom CTA)
//
// Phase 1E — Loan-Program Pages Agent.

import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { serviceSchema, schemaScript } from '@/lib/schema';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return siteConfig.loanPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = siteConfig.loanPrograms.find((p) => p.slug === slug);
  if (!program) return { title: 'Loan Program Not Found' };
  return {
    title: program.name,
    description: program.blurb,
  };
}

export default async function LoanProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = siteConfig.loanPrograms.find((p) => p.slug === slug);
  if (!program) notFound();

  // [DEMO COPY — pending client review]. Document checklist may vary by program;
  // LMP IT firm signoff required before publish per CLAUDE.md Compliance Rule.
  const documentChecklist = [
    'Government-issued ID',
    'Most recent two pay stubs',
    'Two years of W-2s or tax returns',
    'Two months of bank statements',
    'Most recent mortgage statement (refinance only)',
  ];

  // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
  const faq = [
    {
      q: `What's the typical timeline for a ${program.name}?`,
      a: `From application to closing, most files clear in 14 to 30 days. We anchor specific timelines once we shop your file across our wholesale lender bench.`,
    },
    {
      q: `What credit score do I need?`,
      a: `${program.eligibility}. We can talk through alternatives if your file sits below those thresholds.`,
    },
    {
      q: `Can I lock my rate?`,
      a: `Yes. Rate locks are part of the loan estimate process. We walk through the lock window and any associated cost before you commit.`,
    },
    {
      q: `Can I use a gift for my down payment?`,
      a: `Yes for most programs. We'll walk through the documentation needed (gift letter, sourced bank deposits) when we sit down.`,
    },
  ];

  return (
    <>
      {/* JSON-LD: Service schema for this loan program */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(serviceSchema(program))}
      />

      {/* Page header — interior page pattern (pt-32 pb-20). Dark gradient. */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src={`/images/programs/${program.slug}.jpg`} priority />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              <span aria-hidden="true">{program.emoji}</span> Loan Program
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {program.name}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {program.blurb}
            </p>
            <p className="text-micro font-mono text-[var(--accent)] mt-2 italic">
              [COMPLIANCE-REVIEW-PENDING]
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Eligibility — light section */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              Eligibility
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] mt-4">
              {program.eligibility}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What you'll need — dark section */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2">What you&apos;ll need</h2>
          </FadeUp>
          <ul className="mt-8 space-y-4">
            {documentChecklist.map((item, i) => (
              <FadeUp key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3 text-body text-[var(--text-secondary)]">
                  <span className="text-[var(--accent)] mt-1" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              </FadeUp>
            ))}
          </ul>
          <p className="text-micro text-[var(--text-muted)] italic mt-6">
            [DEMO COPY — pending client review. Document checklist may vary by
            program.]
          </p>
        </div>
      </section>

      {/* FAQ — light section. Native <details>/<summary> for zero-JS accordion. */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <FadeUp>
            <h2 className="font-display text-h2 text-[var(--text-on-light)]">
              Common questions
            </h2>
          </FadeUp>
          <div className="mt-8 space-y-4">
            {faq.map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.05}>
                <details className="group bg-[var(--bg-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
                  <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 text-body font-semibold text-[var(--text-on-light)]">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-[var(--accent)] flex-shrink-0 transition-transform group-open:rotate-45 text-xl"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-body-sm text-[var(--text-on-light-secondary)]">
                    {item.a}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
          <p className="text-micro text-[var(--text-on-light-muted)] italic mt-6">
            [COMPLIANCE-REVIEW-PENDING — all program-specific copy needs LMP IT
            firm signoff before publish.]
          </p>
        </div>
      </section>

      {/* CTA — dark section. Single bottom CTA per Homepage Section Architecture Rule. */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              Ready to start with a {program.name}?
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                Get Pre-Approved
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                Take the Quiz
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
