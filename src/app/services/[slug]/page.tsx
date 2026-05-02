// src/app/services/[slug]/page.tsx
//
// Dynamic per-program detail page. SSG via generateStaticParams over all 9
// loan programs in siteConfig.loanPrograms. Next.js 16 App Router — `params`
// is a Promise and must be awaited (Next.js 15+ async-params API).
//
// Server wrapper: keeps generateStaticParams + generateMetadata + JSON-LD
// FinancialService schema. All translatable copy + interactive UI lives in
// LoanProgramClient (uses useTranslation('services')).
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
// Phase 1E — Loan-Program Pages Agent. Wave 2B — i18n migration.

import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { serviceSchema, schemaScript } from '@/lib/schema';
import LoanProgramClient from './LoanProgramClient';
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

  return (
    <>
      {/* JSON-LD: Service schema for this loan program. Uses canonical English
          siteConfig data — structured data should not be locale-dependent. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(serviceSchema(program))}
      />
      <LoanProgramClient slug={slug} />
    </>
  );
}
