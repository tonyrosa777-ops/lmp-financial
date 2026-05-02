'use client';

// src/app/blog/[slug]/BlogArticleClient.tsx
//
// Client wrapper for the Reading Room article detail page. Owns chrome copy
// (byline, related-articles, CTA labels) via useTranslation('blog'). Article
// body content (BlockContent rendering) stays untouched — Phase F handles
// full article-body bilingual content.
//
// When locale === 'es' AND the article is English-only (Phase F not done yet
// for this slug), we render a small italic "Available soon in Spanish." note
// near the title so the user sees the language status at a glance.

import { useTranslation } from '@/hooks/useTranslation';
import type { Post, BlockContent } from '@/sanity/queries';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

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

interface BlogArticleClientProps {
  post: Post;
}

export default function BlogArticleClient({ post }: BlogArticleClientProps) {
  const { t, locale } = useTranslation('blog');

  // Locale-aware date format. Article body itself stays English (Phase F).
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === 'es' ? 'es-US' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  // Byline: chooses template based on whether the author has a role.
  const byline = post.author.role
    ? t('article.byWithRoleTemplate')
        .replace('{author}', post.author.name)
        .replace('{role}', post.author.role)
    : t('article.byTemplate').replace('{author}', post.author.name);

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
          {/* Locale notice: article body stays English in Phase E; surface that
              clearly when the user is on ES so the language gap is visible. */}
          {locale === 'es' && (
            <FadeUp delay={0.15}>
              <p className="text-micro italic text-[var(--text-muted)] mt-3">
                {t('untranslatedNote')}
              </p>
            </FadeUp>
          )}
          <FadeUp delay={0.2}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {post.excerpt}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-micro font-mono text-[var(--text-muted)] mt-6">
              {byline} {t('article.publishedSeparator')} {publishedDate}
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
              {t('article.cta.headline')}
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                {t('article.cta.primary')}
              </Button>
              <Button href="/blog" variant="secondary" size="lg">
                {t('article.cta.secondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
