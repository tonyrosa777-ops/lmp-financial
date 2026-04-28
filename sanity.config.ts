/**
 * Sanity Studio config — mounted at /studio.
 *
 * Studio renders only when NEXT_PUBLIC_SANITY_PROJECT_ID is set in the env.
 * Without env vars, the /studio route renders a graceful "not configured"
 * notice (see src/app/studio/[[...tool]]/page.tsx).
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'lmp-financial',
  title: 'LMP Financial Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
