import type { Metadata } from 'next';
import FadeUp from '@/components/animations/FadeUp';
import { siteConfig } from '@/data/site';

// /ada-accessibility-statement
//
// Phase 1E (Legal Pages Agent). Compliance-critical per CLAUDE.md Compliance Rule.
//
// Source of truth: reference/lmp-financial-data-scrape.md → Legal Pages → ADA
// Accessibility Statement. The opening paragraph is preserved verbatim from the live
// page (also captured in siteConfig.compliance.adaStatement). Remaining body
// (commitments, contact path) is grounded in the documented contact info from the scrape
// (mike@lmpfinancial.com for accessibility complaints).
//
// DO NOT modify the verbatim opening paragraph. DO NOT change the contact email.
//
// Section rhythm (text-heavy exception per design-system.md §14: gradient yes, motion off):
//   1. Header → dark gradient (static orb)  → context (Legal · ADA Accessibility Statement)
//   2. Body   → light gradient (static)     → verbatim opening + commitments + contact

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
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <article className="space-y-6">
            {/* Verbatim opening paragraph — sourced from siteConfig.compliance.adaStatement
                and reference/lmp-financial-data-scrape.md → ADA Accessibility Statement.
                DO NOT MODIFY. */}
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              {siteConfig.compliance.adaStatement} In pursuit of this goal, we adhere to the
              guidelines of the Americans with Disabilities Act (ADA) and continually update our
              website to maintain and improve compliance.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Our Commitment
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              LMP Financial is committed to providing a website that is accessible to the widest
              possible audience, regardless of technology or ability. We aim to comply with all
              applicable standards, including the Web Content Accessibility Guidelines (WCAG 2.1)
              at the AA level, and we work to remove barriers that may prevent people with
              disabilities from interacting with or accessing our content.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Ongoing Efforts
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Accessibility is an ongoing process. We periodically review and test the Site,
              including with assistive technologies, to identify and address barriers, and we train
              our team on accessibility best practices. As technology and standards evolve, we
              update our approach to keep pace.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Third-Party Content
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Some content on the Site is provided by third parties, including embedded
              calculators, video players, and lead-routing tools. We work with our partners to
              prioritize accessibility, but we cannot guarantee that all third-party content meets
              the same standards. If you encounter a third-party feature that creates an
              accessibility barrier, please let us know so we can help you access the information
              another way.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Need Assistance?
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              If you have difficulty using or accessing any element of the Site, or if you have
              questions, comments, or suggestions about accessibility, please contact us. We will
              work with you to provide the information, item, or transaction you seek through a
              communication method that is accessible to you and consistent with applicable law.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              LMP Financial
              <br />
              {siteConfig.business.address.street}, Ste {siteConfig.business.address.suite}
              <br />
              {siteConfig.business.address.city}, {siteConfig.business.address.state}{' '}
              {siteConfig.business.address.zip}
              <br />
              <a
                href={`mailto:${siteConfig.business.emailFounder}`}
                className="underline text-[var(--accent)] hover:opacity-80"
              >
                {siteConfig.business.emailFounder}
              </a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
