import type { Metadata } from 'next';
import FadeUp from '@/components/animations/FadeUp';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

// /blog/[slug] — STUB for Phase 1F
//
// Phase 1E (Static Pages Bundle Agent) ships an accept-any-slug catch-all so links
// from the homepage BlogPreviewSection or the blog index do not 404 in the demo.
// Phase 1F replaces this with a real Sanity-driven detail page; until then, every
// slug renders a clean coming-soon screen with conversion CTAs intact.
//
// Per CLAUDE.md, this stub does NOT call notFound() — it accepts ANY slug and
// renders a coming-soon screen so the demo does not show a 404.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} — Reading Room`,
    description: 'Article launching with full blog in Phase 1F.',
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const titleized = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-16">
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div className="container-base px-6 relative z-10">
          <FadeUp>
            <Badge color="gold">Coming Soon</Badge>
            <h1 className="hero-shimmer font-display text-h1 mt-4 max-w-3xl">
              {titleized}
            </h1>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              This article is part of our Reading Room series, launching with the full
              blog soon. In the meantime, our loan officers can answer any specific
              question on a 15-minute call.
            </p>
          </FadeUp>
        </div>
      </section>
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6 text-center">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">Phase 1F Stub</p>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
              While you wait, let&apos;s talk.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                Schedule a call
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                Take the quiz
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
