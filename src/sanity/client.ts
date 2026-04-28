/**
 * Sanity client — Phase 1G scaffold.
 *
 * Returns a configured Sanity client ONLY when env vars are present:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET (defaults to 'production')
 *
 * If NEXT_PUBLIC_SANITY_PROJECT_ID is missing, sanityClient is null and the
 * blog falls back to seeded JSON (see src/sanity/lib/posts.ts). This keeps the
 * demo functional with zero CMS provisioning.
 */

import { createClient, type SanityClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-10-01';

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

export const sanityConfig = projectId
  ? { projectId, dataset, apiVersion }
  : null;
