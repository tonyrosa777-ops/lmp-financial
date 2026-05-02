'use client';

// src/app/blog/BlogIndexClient.tsx
//
// Client wrapper for the Reading Room (blog) index. Owns chrome copy via
// useTranslation('blog'). Article fields (title, excerpt, category, flag)
// stay structural — they come from Sanity (or seed JSON) and represent
// content authored per-article. Phase F handles full article-body i18n.
//
// Per CLAUDE.md Bilingual Copy Rule: page chrome strings live in
// /src/locales/en/blog.json + /src/locales/es/blog.json.

import { useTranslation } from '@/hooks/useTranslation';
import type { Post } from '@/sanity/queries';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

interface BlogIndexClientProps {
  posts: Post[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const { t } = useTranslation('blog');

  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark)                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <PhotoBackground src="/images/pages/blog.jpg" priority />
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-base px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">{t('index.eyebrow')}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              {t('index.headline')}
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {t('index.subheadline')}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Articles grid (light)                              */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6">
          {posts.length === 0 ? (
            <p className="text-body text-[var(--text-on-light-secondary)] text-center">
              {t('index.noArticles')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <FadeUp key={post._id} delay={i * 0.05}>
                  <Card variant="light" href={`/blog/${post.slug}`}>
                    {post.headerImage?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.headerImage.url}
                        alt={post.headerImage.alt}
                        className="w-full aspect-[16/9] object-cover rounded-[var(--radius-lg)] mb-4"
                      />
                    ) : (
                      <div
                        className="w-full aspect-[16/9] rounded-[var(--radius-lg)] mb-4 flex items-center justify-center p-6"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--primary) 0%, var(--accent-deep) 100%)',
                        }}
                      >
                        <span className="font-display text-h4 text-[var(--text-primary)] text-center leading-tight">
                          {post.title}
                        </span>
                      </div>
                    )}
                    <Badge color="gold">{post.category}</Badge>
                    <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-3">
                      {post.title}
                    </h2>
                    <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-2 line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.flag && (
                      <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-4 italic">
                        {post.flag}
                      </p>
                    )}
                  </Card>
                </FadeUp>
              ))}
            </div>
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
              {t('index.cta.headline')}
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              {t('index.cta.body')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                {t('index.cta.primary')}
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                {t('index.cta.secondary')}
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
