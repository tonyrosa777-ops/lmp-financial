// src/app/testimonials/page.tsx
//
// /testimonials — Always-Built Testimonials Page (CLAUDE.md Always-Built Features Rule).
// 36 testimonials, paginated 9 per page × 4 pages, 3-col × 3-row grid.
// Server wrapper — metadata only. Interactive UI lives in TestimonialsClient.
//
// Phase 1E — Testimonials Index Agent.

import type { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description: `${siteConfig.testimonials.length} real-borrower reviews across 9 states. FHA, VA, Jumbo, USDA, Reverse — every program, every state we operate in.`,
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
