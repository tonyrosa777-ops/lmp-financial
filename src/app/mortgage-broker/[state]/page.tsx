// src/app/mortgage-broker/[state]/page.tsx
//
// Phase 1F — State Pages Agent (2026-04-27).
//
// Dynamic per-state landing page. One route per licensed state, statically
// generated at build time. Slugs are kebab-case full state names:
// /mortgage-broker/massachusetts, /mortgage-broker/new-hampshire, etc.
//
// Server wrapper — owns generateStaticParams + generateMetadata. Translatable
// chrome lives in StatePageClient (uses useTranslation('states')). Per-state
// program data stays structural in src/data/state-programs.ts (programs
// deliberately remain English in Phase E).
//
// COMPLIANCE: per CLAUDE.md, state-specific advertising rules apply per-state
// (MA, NH, ME, RI, CT, FL, CO, VT, TX). Program copy is not paraphrased.

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  STATE_PROGRAMS,
  type StateInfo,
} from '@/data/state-programs';
import StatePageClient from './StatePageClient';

export function generateStaticParams() {
  return Object.values(STATE_PROGRAMS).map((s) => ({ state: s.slug }));
}

function findStateBySlug(slug: string): StateInfo | undefined {
  return Object.values(STATE_PROGRAMS).find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) return { title: 'State Not Found' };
  return {
    title: `Mortgage Broker in ${info.name} · LMP Financial`,
    description: `LMP Financial is licensed in ${info.name}. ${info.programs.length} state housing-finance programs explained, ${info.featuredLOSlugs.length} loan officers serving ${info.primaryCity} and the broader ${info.region} market.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const info = findStateBySlug(state);
  if (!info) notFound();

  return <StatePageClient info={info} />;
}
