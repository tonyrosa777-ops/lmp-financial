import type { Metadata } from 'next';
import FadeUp from '@/components/animations/FadeUp';
import { siteConfig } from '@/data/site';

// /ada-accessibility-statement
//
// Phase 1J (Legal Verbatim Reconcile). Compliance-critical per CLAUDE.md Compliance Rule.
//
// Source of truth: live site https://www.lmpfinancial.com/ada-accessibility-statement
// (canonical text supplied by client 2026-04-28). Body prose is preserved VERBATIM.
// No paraphrasing, no omission, no invented sections. Phase 1E shipped invented
// "Our Commitment / Ongoing Efforts / Third-Party Content / Need Assistance?" sections;
// Phase 1J replaces them with the single flowing statement that matches the live site.
//
// DO NOT modify clauses without compliance sign-off. DO NOT add new sections.
// DO NOT rewrite without re-confirming with the client.
//
// Section rhythm (text-heavy exception per design-system.md §14: gradient yes, motion off):
//   1. Header → dark gradient (static orb)  → context (Legal · ADA Accessibility Statement)
//   2. Body   → light gradient (static)     → verbatim live-site statement (3 paragraphs)

export const metadata: Metadata = {
  title: 'ADA Accessibility Statement',
  description:
    'LMP Financial is committed to digital accessibility for people with disabilities. Read our accessibility statement and how to request assistance.',
};

export default function AdaAccessibilityStatementPage() {
  return (
    <>
      {/* Header — dark gradient + static orb (text-heavy: motion off, gradient on) */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)' }}
        />
        <div className="container-narrow px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Legal</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3">
              ADA Accessibility Statement
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="font-mono text-eyebrow text-[var(--accent)] mt-6">
              Effective Date: January 1, 2025
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body — light gradient (text-heavy: motion off, gradient on) */}
      {/* VERBATIM from live site (canonical supplied 2026-04-28). */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <article className="space-y-6">
            {/* Paragraph 1 — opener (sourced from siteConfig.compliance.adaStatement). */}
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              {siteConfig.compliance.adaStatement}
            </p>

            {/* Paragraph 2 — guidelines + ongoing review. Logical break at the live site's
                "visitors.In pursuit" run-on (no space after period — preserved by splitting). */}
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              In pursuit of this goal, we adhere to the guidelines of the Americans with
              Disabilities Act (ADA) and continually update our website to improve its
              accessibility. Our efforts include monitoring our website through regular
              accessibility reviews and making necessary adjustments to enhance usability for
              visitors with disabilities.
            </p>

            {/* Paragraph 3 — feedback + contact. Logical break at the live site's
                "disabilities.We" run-on (no space after period — preserved by splitting). */}
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We believe in creating an inclusive and accessible environment for all users.
              Should you encounter any difficulty in accessing any part of our website or if
              you have any feedback regarding its accessibility, please contact us at{' '}
              <a
                href={`mailto:${siteConfig.business.emailFounder}`}
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                {siteConfig.business.emailFounder}
              </a>
              . Your feedback is crucial in helping us achieve our goal of providing an
              inclusive digital experience for all our visitors.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
