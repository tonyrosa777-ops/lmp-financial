/**
 * /blog — Reading Room index. Phase 1G: Sanity-wired with seeded JSON fallback.
 *
 * Data source: src/sanity/lib/posts.ts → getPosts(). When env vars are set,
 * fetches from Sanity via GROQ. When not set (demo state), reads seed-posts.json.
 *
 * Server wrapper — owns the metadata export. Translatable chrome lives in
 * BlogIndexClient (uses useTranslation('blog')). Article fields (title,
 * excerpt, category) stay structural — they come from Sanity per-article;
 * Phase F handles full article-body bilingual content.
 */

import type { Metadata } from 'next';
import { getPosts } from '@/sanity/lib/posts';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Reading Room',
  description:
    'State programs, loan-program comparisons, and how the wholesale-broker model works. Written by LMP loan officers.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogIndexClient posts={posts} />;
}
