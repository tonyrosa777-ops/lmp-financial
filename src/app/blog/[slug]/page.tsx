/**
 * /blog/[slug] — Reading Room article detail. Phase 1G: Sanity-wired with
 * seeded JSON fallback.
 *
 * Data source: src/sanity/lib/posts.ts → getPostBySlug(). Renders the simplified
 * BlockContent shape (paragraph | heading | list | quote) defined in queries.ts.
 * When real Sanity PortableText is needed (Phase 1G+), replace renderBlock with
 * @portabletext/react and adjust the GROQ projection.
 *
 * Section rhythm:
 *   1. Header  → dark   → identification (category, title, byline, date)
 *   2. Body    → light  → article content (gradient + static, motion off per CLAUDE.md)
 *   3. CTA     → dark   → conversion (pre-approval + back to blog)
 *
 * Server component. generateStaticParams pulls all known slugs at build time.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/sanity/lib/posts';
import type { BlockContent } from '@/sanity/queries';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

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

function renderBlock(block: BlockContent, key: string) {
  if (block.type === 'paragraph') {
    return (
      <p
        key={key}
        className="text-body text-[var(--text-on-light-secondary)] leading-relaxed mb-5"
      >
        {block.text}
      </p>
    );
  }
  if (block.type === 'heading') {
    const Tag = (block.level === 2 ? 'h2' : 'h3') as 'h2' | 'h3';
    const className =
      block.level === 2
        ? 'font-display text-h2 text-[var(--text-on-light)] mt-12 mb-4'
        : 'font-display text-h3 text-[var(--text-on-light)] mt-8 mb-3';
    return (
      <Tag key={key} className={className}>
        {block.text}
      </Tag>
    );
  }
  if (block.type === 'list') {
    return (
      <ul
        key={key}
        className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] mb-5"
      >
        {block.items?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote
        key={key}
        className="border-l-4 border-[var(--accent)] pl-4 my-6 italic text-body text-[var(--text-on-light-secondary)]"
      >
        {block.text}
      </blockquote>
    );
  }
  return null;
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Article header (dark)                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        {post.headerImage?.url && (
          <PhotoBackground src={post.headerImage.url} alt={post.headerImage.alt} priority />
        )}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-narrow px-6 relative z-10">
          <FadeUp>
            <Badge color="gold">{post.category}</Badge>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="hero-shimmer font-display text-h1 mt-4">{post.title}</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {post.excerpt}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-micro font-mono text-[var(--text-muted)] mt-6">
              By {post.author.name}
              {post.author.role ? `, ${post.author.role}` : ''} · {publishedDate}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Article body (light, text-heavy: gradient yes, motion off) */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <article>
            {post.body.map((block, i) => renderBlock(block, `block-${i}`))}
          </article>
          {post.flag && (
            <p className="text-micro font-mono text-[var(--text-on-light-muted)] italic mt-12 pt-6 border-t border-[rgba(14,27,51,0.1)]">
              {post.flag}
            </p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — CTA (dark)                                         */}
      {/* ============================================================ */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              Ready to talk through your situation?
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                Get Pre-Approved
              </Button>
              <Button href="/blog" variant="secondary" size="lg">
                More articles
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
