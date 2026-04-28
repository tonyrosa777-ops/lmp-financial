'use client';

// src/app/testimonials/TestimonialsClient.tsx
//
// Interactive testimonials index. Owned by Phase 1E Testimonials Index Agent.
//
// Per CLAUDE.md Always-Built Features Rule (Testimonials Page):
//   - 36 testimonials sourced from siteConfig.testimonials (no hardcoded copy)
//   - Paginated 9 per page → 4 pages exactly when filter is "all"
//   - 3-col × 3-row grid on lg+ (NEVER 8 per page or 4 cols — broken-layout failure)
//   - Filter chips reflect unique programs in the data (gold = active, neutral = inactive)
//   - Featured pull-quote = the longest-by-character-count quote in the dataset
//   - Zero em dashes anywhere. Any em dashes in source data flow through; copy was
//     authored em-dash-free per content-writer agent.
//
// Section rhythm (homepage architecture rule applies to interior pages too):
//   1. Hero header        → dark  → intent (eyebrow, shimmer H1, sub)
//   2. Featured quote     → light → social proof (single-column pull-quote)
//   3. Filter + grid      → light → social proof (kept on light to avoid splitting
//                                   the social-proof block; the grid is the
//                                   continuation of the featured quote's purpose)
//   4. Pagination         → light → (sub-component of grid section)
//   5. CTA                → dark  → conversion (single bottom CTA)
// Adjacent dark/light alternation: dark → light (combined sections 2+3+4) → dark.

import { useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/data/site';
import type { Testimonial } from '@/data/site';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import ScaleIn from '@/components/animations/ScaleIn';
import SlideIn from '@/components/animations/SlideIn';

const PAGE_SIZE = 9;

type ProgramFilter = 'all' | string;

/**
 * Pure helper: pick the testimonial with the highest character count in `quote`.
 * Used as the featured pull-quote at the top of the page.
 */
function findLongestTestimonial(items: readonly Testimonial[]): Testimonial {
  // Defensive: items is always 36 per CLAUDE.md, but guard against runtime drift.
  return items.reduce(
    (longest, current) =>
      current.quote.length > longest.quote.length ? current : longest,
    items[0]
  );
}

/**
 * Pure helper: collect the unique set of programs in display order
 * (preserves first-seen ordering from the source array — keeps Massachusetts
 * programs grouped first, and so on, matching the data file's structure).
 */
function uniquePrograms(items: readonly Testimonial[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of items) {
    if (!seen.has(t.program)) {
      seen.add(t.program);
      out.push(t.program);
    }
  }
  return out;
}

export default function TestimonialsClient() {
  const all = siteConfig.testimonials;
  const [program, setProgram] = useState<ProgramFilter>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gridTopRef = useRef<HTMLDivElement | null>(null);

  // Memoized: featured + program list don't change at runtime.
  const featured = useMemo(() => findLongestTestimonial(all), [all]);
  const programs = useMemo(() => uniquePrograms(all), [all]);

  const filteredTestimonials = useMemo(
    () => (program === 'all' ? all : all.filter((t) => t.program === program)),
    [all, program]
  );

  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / PAGE_SIZE));

  // Clamp currentPage if filter shrinks the result set below the active page.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTestimonials = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredTestimonials.slice(start, start + PAGE_SIZE);
  }, [filteredTestimonials, safePage]);

  const handleFilterChange = (next: ProgramFilter) => {
    setProgram(next);
    setCurrentPage(1);
    // No scroll on filter change — user is at the chip row, scroll would feel jumpy.
  };

  const scrollToGridTop = () => {
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrev = () => {
    if (safePage > 1) {
      setCurrentPage(safePage - 1);
      scrollToGridTop();
    }
  };

  const handleNext = () => {
    if (safePage < totalPages) {
      setCurrentPage(safePage + 1);
      scrollToGridTop();
    }
  };

  const allCount = all.length;
  const filteredCount = filteredTestimonials.length;

  return (
    <>
      {/* Local keyframes for the breathing orb. Inline so the page is
          self-contained — globals.css stays focused on universal tokens. */}
      <style>{`
        @keyframes breathe-orb {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathe-orb { animation: none !important; opacity: 0.7; }
        }
      `}</style>

      {/* ============================================================
          1. HERO HEADER — dark gradient + ambient breathing orb
          ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <div
          aria-hidden="true"
          className="breathe-orb absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.12), transparent 60%)',
            animation: 'breathe-orb 12s ease-in-out infinite',
          }}
        />
        <div className="container-wide px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">
              Reviews &amp; Testimonials
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Real borrowers, real closings.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              {allCount} reviews across 9 states. Every program. Every state we
              operate in.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================
          2. FEATURED QUOTE — light, single-column pull-quote
          ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-base px-6">
          <SlideIn direction="left">
            <figure className="max-w-4xl mx-auto text-center">
              <span
                aria-hidden="true"
                className="block font-display text-[6rem] leading-none text-[var(--accent)] opacity-50"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-h3 text-[var(--text-on-light)] -mt-4">
                {featured.quote}
              </blockquote>
              <figcaption className="font-mono text-eyebrow text-[var(--text-on-light-muted)] mt-8">
                {featured.name} · {featured.city}, {featured.state} ·{' '}
                {featured.program}
              </figcaption>
            </figure>
          </SlideIn>
        </div>
      </section>

      {/* ============================================================
          3. FILTER CHIPS + 3×3 GRID — light section continued
          ============================================================ */}
      <section className="section-light-gradient pb-20">
        <div className="container-base px-6">
          {/* Anchor target for pagination scroll-to-top */}
          <div ref={gridTopRef} aria-hidden="true" />

          {/* Filter chips */}
          <FadeUp>
            <div
              className="flex flex-wrap gap-3 justify-center mb-10"
              role="group"
              aria-label="Filter testimonials by loan program"
            >
              <button
                type="button"
                onClick={() => handleFilterChange('all')}
                aria-pressed={program === 'all'}
                className="rounded-[var(--radius-pill)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <Badge color={program === 'all' ? 'gold' : 'neutral'}>
                  All ({allCount})
                </Badge>
              </button>
              {programs.map((p) => {
                const count = all.filter((t) => t.program === p).length;
                const isActive = program === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleFilterChange(p)}
                    aria-pressed={isActive}
                    className="rounded-[var(--radius-pill)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Badge color={isActive ? 'gold' : 'neutral'}>
                      {p} ({count})
                    </Badge>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Grid — 3×3 on lg+ (never 4-col, never 8 per page) */}
          {paginatedTestimonials.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              // Re-key on filter+page so ScaleIn re-fires when content changes.
              key={`${program}-${safePage}`}
            >
              {paginatedTestimonials.map((t, i) => (
                <ScaleIn
                  key={`${t.name}-${t.city}-${i}`}
                  delay={i * 0.04}
                >
                  <Card variant="light" hover={false} as="article">
                    <p className="text-body italic text-[var(--text-on-light)]">
                      {`"${t.quote}"`}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-body-sm font-semibold text-[var(--text-on-light)]">
                          {t.name}
                        </p>
                        <p className="text-micro text-[var(--text-on-light-muted)]">
                          {t.city}, {t.state}
                        </p>
                      </div>
                      <Badge color="gold">{t.program}</Badge>
                    </div>
                  </Card>
                </ScaleIn>
              ))}
            </div>
          ) : (
            <FadeUp>
              <p className="text-center text-body text-[var(--text-on-light-secondary)] py-12">
                No reviews yet for this program. Try another filter, or{' '}
                <a
                  href="/booking"
                  className="text-[var(--accent-deep)] underline"
                >
                  start a pre-approval
                </a>{' '}
                and be the first.
              </p>
            </FadeUp>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeUp>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-mono text-eyebrow text-[var(--text-on-light-muted)]">
                  Page {safePage} of {totalPages}
                  {program !== 'all' && (
                    <>
                      {' '}
                      · {filteredCount} {filteredCount === 1 ? 'review' : 'reviews'}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handlePrev}
                    disabled={safePage <= 1}
                    ariaLabel="Previous page of testimonials"
                  >
                    ← Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleNext}
                    disabled={safePage >= totalPages}
                    ariaLabel="Next page of testimonials"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ============================================================
          4. CTA — dark section, single bottom CTA (purpose-level dedup)
          ============================================================ */}
      <section className="section-dark-gradient section-pad-base">
        <div className="container-base px-6 text-center">
          <FadeUp>
            <h2 className="font-display text-h2 max-w-2xl mx-auto">
              See yourself in these stories?
            </h2>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              Same team, same shop-the-market approach, same close-on-time promise.
              Start your pre-approval and we will match you to the LO who fits your
              state, your language, and your situation.
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
