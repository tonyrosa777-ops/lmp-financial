/**
 * Posts loader — Sanity-first with seeded JSON fallback.
 *
 * When sanityClient is null (no env vars), reads from seed-posts.json so the
 * /blog index and individual article pages render real content during demo
 * with zero CMS provisioning required.
 *
 * Both branches return the SAME Post[] shape, so consumers (page.tsx,
 * [slug]/page.tsx) are agnostic to the data source.
 *
 * Locale-aware: pass `locale` from the calling page (server-side cookie
 * read via next/headers, or client-side useTranslation()). When locale ===
 * 'es' AND a hand-curated translation exists in src/lib/blog-translations.ts,
 * the post's title/excerpt/body are swapped. Missing ES translations fall
 * back to EN copy and the page component renders the `untranslatedNote`
 * badge from src/locales/es/blog.json.
 */

import { applyBlogTranslation } from '@/lib/blog-translations';
import type { Locale } from '@/lib/i18n';
import { sanityClient } from '../client';
import { POSTS_QUERY, POST_BY_SLUG_QUERY, type Post } from '../queries';
import seedPosts from '../seed-posts.json';

export async function getPosts(locale: Locale = 'en'): Promise<Post[]> {
  const posts = sanityClient
    ? await sanityClient.fetch<Post[]>(POSTS_QUERY)
    : (seedPosts as Post[]);
  return posts.map((p) => applyBlogTranslation(p, locale));
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = 'en',
): Promise<Post | null> {
  const post = sanityClient
    ? await sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug })
    : ((seedPosts as Post[]).find((p) => p.slug === slug) ?? null);
  if (!post) return null;
  return applyBlogTranslation(post, locale);
}
