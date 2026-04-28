import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';

// /blog — STUB for Phase 1F
//
// Phase 1E (Static Pages Bundle Agent) ships a 3-card placeholder index so the
// /blog route does not 404 and so users land somewhere coherent if they click
// through from BlogPreviewSection on the homepage. Phase 1F wires Sanity CMS and
// publishes the real articles per CLAUDE.md Always-Built Features Rule (Blog).
//
// Section rhythm:
//   1. Hero       → dark  → intent (Reading Room, state-program literacy)
//   2. Stub grid  → light → preview (3 article placeholders mirroring homepage preview)
//   3. Note       → dark  → status (Phase 1F flag)

export const metadata: Metadata = {
  title: 'Reading Room — Mortgage Articles',
  description:
    'State-program walkthroughs, FHA vs Conventional explainers, refinance guides, and wholesale-vs-retail breakdowns. Built for AEO and real-world borrower questions.',
};

interface ArticleStub {
  category: string;
  title: string;
  excerpt: string;
}

// [DEMO COPY — pending client review]
// Three placeholders mirroring the homepage BlogPreviewSection so users do not get
// orphan cards if they click through.
const ARTICLE_STUBS: ArticleStub[] = [
  {
    category: 'Loan Programs',
    title: 'FHA vs Conventional in NH',
    excerpt:
      'Same buyer, two programs, side-by-side. What FHA actually costs after MIP, when Conventional wins on rate, and the New Hampshire-specific layered DPA most retail lenders never mention.',
  },
  {
    category: 'State Programs',
    title: 'MassHousing $30K Down Payment Assistance',
    excerpt:
      'How the MassHousing DPA stack actually works. Income limits, the recapture rules nobody reads, and the Lowell, Lawrence, and Brockton cases where it changes the math from no to yes.',
  },
  {
    category: 'How We Work',
    title: 'Wholesale vs Retail: Why It Matters',
    excerpt:
      'Banks shop one lender, theirs. We shop more than thirty. The difference shows up on the loan estimate, in the rate, and in the closing date. The plain-English version of the wholesale advantage.',
  },
];

export default function BlogIndexPage() {
  return (
    <>
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark)                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)',
          }}
        />

        <div className="container-wide px-6 relative z-10">
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
              Plain-English walkthroughs of the loans, programs, and trade-offs your bank
              will not sit down and explain. Built for the questions a real first-time
              buyer or refinance shopper actually asks.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Stub article grid (light)                          */}
      {/* ============================================================ */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-wide px-6">
          <FadeUp>
            <p className="text-eyebrow text-[var(--accent-deep)]">First Three Articles</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3 max-w-3xl">
              Coming first to the Reading Room.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {ARTICLE_STUBS.map((article, idx) => (
              <FadeUp key={article.title} delay={0.1 + idx * 0.075}>
                <Card variant="light" hover={false} className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <Badge color="gold">{article.category}</Badge>
                    <Badge color="neutral">Stub</Badge>
                  </div>
                  <h3 className="font-display text-h4 text-[var(--text-on-light)] mt-4">
                    {article.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-on-light-secondary)] mt-3">
                    {article.excerpt}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-4">
                    [STUB — Phase 1F: Sanity wiring]
                  </p>
                </Card>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-12 text-center">
              <Button href="/booking" size="lg">
                Talk to a loan officer now
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Phase 1F status note (dark)                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-base">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 65%)',
          }}
        />

        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <p className="font-mono text-eyebrow text-[var(--accent)]">
              [PHASE-1F STUB]
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
              Full blog launching with real articles soon, wired to Sanity for fast
              editing and AEO-optimized at the schema layer.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
