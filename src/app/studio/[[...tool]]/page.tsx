/**
 * /studio route — Sanity Studio mount point with graceful fallback.
 *
 * Render mode 1: configured — when NEXT_PUBLIC_SANITY_PROJECT_ID is set, the
 *   route shows a "Studio loading" placeholder. Wiring the actual NextStudio
 *   component requires a separate 'use client' wrapper that imports
 *   `next-sanity/studio` and the `sanity.config.ts` — this is intentionally
 *   stubbed in Phase 1G to avoid client-bundle bloat when the env vars are
 *   not provisioned.
 * Render mode 2: not configured — graceful notice with provisioning steps.
 *
 * To enable Studio: set NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET
 * in .env.local, then drop in a <NextStudio config={config} /> wrapper here.
 */

import type { Metadata } from 'next';
import { sanityConfig } from '@/sanity/client';

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!sanityConfig) {
    return (
      <main className="min-h-screen flex items-center justify-center section-dark-gradient pt-32 pb-20 px-6">
        <div className="container-narrow text-center">
          <p className="text-eyebrow text-[var(--accent)]">Sanity Studio</p>
          <h1 className="hero-shimmer font-display text-h1 mt-3">
            Studio not configured.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mt-6 max-w-xl mx-auto">
            Set{' '}
            <code className="font-mono text-[var(--accent)]">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{' '}
            and{' '}
            <code className="font-mono text-[var(--accent)]">
              NEXT_PUBLIC_SANITY_DATASET
            </code>{' '}
            in your environment to enable content editing.
          </p>
          <p className="text-micro text-[var(--text-muted)] mt-6 italic">
            [PHASE-1G STUB — provision Sanity at sanity.io and add env vars to .env.local]
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center section-dark-gradient pt-32 pb-20 px-6">
      <div className="container-narrow text-center">
        <h1 className="font-display text-h2">Studio loading...</h1>
        <p className="text-body text-[var(--text-secondary)] mt-4">
          [Phase 1G+ — wire NextStudio component when project ID is set]
        </p>
      </div>
    </main>
  );
}
