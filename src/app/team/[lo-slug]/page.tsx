// src/app/team/[lo-slug]/page.tsx
//
// Per-LO landing page. SSG via generateStaticParams over all 22 loan officers
// in siteConfig.loanOfficers. Next.js 16 App Router — `params` is a Promise
// and must be awaited.
//
// Server wrapper: keeps generateStaticParams + generateMetadata + JSON-LD
// Person schema (NMLS as PropertyValue identifier per CLAUDE.md SCHEMA_TYPE).
// All translatable copy + interactive UI lives in LoanOfficerClient (uses
// useTranslation('team')).
//
// Phase 1F — Team Page Agent. Wave 2B — i18n migration.

import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { personSchema, schemaScript } from '@/lib/schema';
import LoanOfficerClient from './LoanOfficerClient';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return siteConfig.loanOfficers.map((lo) => ({ 'lo-slug': lo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'lo-slug': string }>;
}): Promise<Metadata> {
  const { 'lo-slug': slug } = await params;
  const lo = siteConfig.loanOfficers.find((l) => l.slug === slug);
  if (!lo) return { title: 'Loan Officer Not Found' };
  return {
    title: `${lo.name} · NMLS #${lo.nmls}`,
    description: `${lo.role} at LMP Financial. ${lo.bio.split('.')[0]}.`,
  };
}

export default async function LoanOfficerPage({
  params,
}: {
  params: Promise<{ 'lo-slug': string }>;
}) {
  const { 'lo-slug': slug } = await params;
  const lo = siteConfig.loanOfficers.find((l) => l.slug === slug);
  if (!lo) notFound();

  return (
    <>
      {/* JSON-LD: Person schema (NMLS as PropertyValue identifier).
          Uses canonical English siteConfig data — structured data is locale-
          independent for SEO consistency. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(personSchema(lo))}
      />
      <LoanOfficerClient slug={slug} />
    </>
  );
}
