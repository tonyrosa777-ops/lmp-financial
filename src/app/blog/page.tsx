/**
 * /blog — Reading Room index. Phase 1G: Sanity-wired with seeded JSON fallback.
 *
 * Data source: src/sanity/lib/posts.ts → getPosts(). When env vars are set,
 * fetches from Sanity via GROQ. When not set (demo state), reads seed-posts.json.
 *
 * Section rhythm:
 *   1. Hero        → dark  → intent (Reading Room)
 *   2. Article grid → light → preview (paginated/grid of all articles)
 *   3. CTA         → dark  → conversion
 *
 * Server component. Articles flagged with [DEMO COPY] / [COMPLIANCE-REVIEW-PENDING]
 * — flags are surfaced on each card so reviewers can see review status at a glance.
 */

import type { Metadata } from 'next';
import { getPosts } from '@/sanity/lib/posts';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';

export const metadata: Metadata = {
  title: 'Reading Room',
  description:
    'State programs, loan-program comparisons, and how the wholesale-broker model works. Written by LMP loan officers.',
};

export default async function BlogPage() {
  const posts = await getPosts();

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
            <p className="text-eyebrow text-[var(--accent)]">Reading Room</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              State programs, explained.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Loan-program comparisons, state DPA explainers, and how the wholesale-broker
              model actually works. Written by LMP loan officers, flagged demo copy
              pending client review.
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
              No articles yet.
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
              Want to talk it through?
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              Articles are a good start. Conversations close loans.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                Get Pre-Approved
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                Take the Quiz
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
