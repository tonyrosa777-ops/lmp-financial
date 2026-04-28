/**
 * Posts loader — Sanity-first with seeded JSON fallback.
 *
 * When sanityClient is null (no env vars), reads from seed-posts.json so the
 * /blog index and individual article pages render real content during demo
 * with zero CMS provisioning required.
 *
 * Both branches return the SAME Post[] shape, so consumers (page.tsx,
 * [slug]/page.tsx) are agnostic to the data source.
 */

import { sanityClient } from '../client';
import { POSTS_QUERY, POST_BY_SLUG_QUERY, type Post } from '../queries';
import seedPosts from '../seed-posts.json';

export async function getPosts(): Promise<Post[]> {
  if (sanityClient) {
    const posts = await sanityClient.fetch<Post[]>(POSTS_QUERY);
    return posts;
  }
  return seedPosts as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (sanityClient) {
    const post = await sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });
    return post;
  }
  const posts = seedPosts as Post[];
  return posts.find((p) => p.slug === slug) ?? null;
}
