/**
 * /blog/[slug] — Reading Room article detail. Phase 1G: Sanity-wired with
 * seeded JSON fallback.
 *
 * Server wrapper. Owns generateStaticParams + generateMetadata. Translatable
 * chrome (byline labels, CTA labels, locale-aware untranslated note) lives
 * in BlogArticleClient (uses useTranslation('blog')). Article body content
 * stays English for Phase E — Phase F handles full body bilingualism.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/sanity/lib/posts';
import BlogArticleClient from './BlogArticleClient';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <BlogArticleClient post={post} />;
}
