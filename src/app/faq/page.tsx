import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import FadeUp from '@/components/animations/FadeUp';
import PhotoBackground from '@/components/PhotoBackground';
import { faqPageSchema, schemaScript } from '@/lib/schema';

// /faq — Frequently Asked Questions
//
// Phase 1E (Static Pages Bundle Agent). 12 FAQs in 3 grouped sections.
// Native HTML <details>/<summary> accordion (no JS required, accessible by default,
// indexable by Google + AEO crawlers as Q&A blocks).
//
// Section rhythm:
//   1. Hero       → dark  → intent (common questions, honest answers)
//   2. Accordion  → light → education (12 Qs in 3 groups)
//   3. CTA        → dark  → conversion (book a call / take quiz)
//
// All answers are [DEMO COPY — pending client review]. Compliance review pending
// for any quantifiable claims (close time, down-payment specifics).

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'How pre-approval works. What documents you need. FHA vs Conventional. Why a broker beats a bank. Twelve common questions, honestly answered.',
};

interface FaqItem {
  q: string;
  a: string;
  flag?: string;
}

interface FaqGroup {
  title: string;
  eyebrow: string;
  items: FaqItem[];
}

// [DEMO COPY — pending client review]
// All answers in voice (Lowell handshake, no em dashes, short sentences).
// Quantifiable claims flagged for compliance review per CLAUDE.md Compliance Rule.
const FAQ_GROUPS: FaqGroup[] = [
  {
    eyebrow: 'Group 1',
    title: 'Pre-Approval & Process',
    items: [
      {
        q: 'How do I get pre-approved?',
        a: 'Start with a 30-minute call. Your loan officer asks about your goal, your timeline, and your numbers. We run a soft credit pull, request a short document list (income, assets, ID), and most files have a pre-approval letter within 24 to 48 hours.',
      },
      {
        q: 'What documents do I need?',
        a: 'Government-issued ID, your two most recent pay stubs, two years of W-2s or tax returns, two months of bank statements, and your current mortgage statement if you are refinancing. Self-employed borrowers send K-1s, 1099s, or business returns instead. Your LO sends a clean checklist so you upload once, not three times.',
      },
      {
        q: 'How long does closing take?',
        a: 'Our team targets 14 to 30 days from clear-to-close. The exact number depends on the program, the property, and how quickly conditions clear. We push hard on the parts we control and tell you the truth on the parts we do not.',
        flag: '[SOURCING-REQUIRED — 14-day claim] [COMPLIANCE-REVIEW-PENDING]',
      },
      {
        q: 'Will this affect my credit score?',
        a: 'The first conversation uses a soft pull, which does not affect your score. A hard inquiry only happens at full application, with your written consent. If you decide not to move forward after pre-approval, your credit stays untouched.',
      },
    ],
  },
  {
    eyebrow: 'Group 2',
    title: 'Loan Program Basics',
    items: [
      {
        q: 'FHA vs Conventional, which one is right for me?',
        a: 'It depends on your credit score, your down payment, and your debt-to-income ratio. FHA is friendlier on credit and accepts a 3.5% down payment. Conventional is sharper on rate if your credit is strong and you can put down at least 5%. We run the math both ways and show you the actual monthly cost side by side.',
        flag: '[COMPLIANCE-REVIEW-PENDING]',
      },
      {
        q: 'What is the minimum down payment?',
        a: 'It varies by program. FHA starts at 3.5%, VA and USDA at 0%, Conventional at 3 to 5% for first-time buyers, and Jumbo typically at 10% or more. State down-payment assistance can stack on top, in some cases bringing your out-of-pocket close to zero.',
        flag: '[COMPLIANCE-REVIEW-PENDING]',
      },
      {
        q: 'Do you offer refinancing?',
        a: 'Yes. Rate-and-term refinances, cash-out refinances, and HELOCs across all nine licensed states. Every refinance starts with a breakeven analysis, where we calculate how many months it takes for the savings to cover the closing costs. If the math does not work, we say so.',
      },
      {
        q: 'Why use a broker instead of going to my bank?',
        a: 'Your bank shops one lender, theirs. We shop more than 30 wholesale lenders, then bring back the strongest combination of rate, fees, and program fit. Same application, multiple lender bids, no extra credit pulls. The wholesale market typically prices below retail because the lender is not paying for branches and a marketing department.',
      },
    ],
  },
  {
    eyebrow: 'Group 3',
    title: 'Working With LMP',
    items: [
      {
        q: 'What languages do you speak?',
        a: 'English across the team. Spanish with three of our loan officers. Portuguese with two. Lowell, Lawrence, and the Greater Boston metro have one of the densest Brazilian and Portuguese-speaking populations in the country, and we built the team to match.',
      },
      {
        q: 'Do you work with first-time buyers?',
        a: 'Yes, and it is a big part of what we do. We carry a deep state-program library: MassHousing, NHHFA, MaineHousing, RIHousing, CHFA-CT, VHFA, FL Hometown Heroes, TSAHC and TDHCA in Texas, and CHFA-CO with metroDPA in Colorado. Most first-time buyers qualify for more than one program. We line them all up and let you pick.',
      },
      {
        q: 'Do you work with realtors?',
        a: 'Yes. We have a dedicated realtor partner program with co-marketing kits, fast same-day pre-approval letters, and in-person attendance at every closing the geography allows. See the Realtors page for details and to introduce yourself.',
      },
      {
        q: 'I am an LO looking for a new shop. Who do I talk to?',
        a: 'Brian Walsh handles loan-officer recruiting. Confidential intro calls, a clear comp plan, real wholesale access through UWM, Rocket Pro, and 30-plus other lenders. See the Careers page or text Brian directly.',
      },
    ],
  },
];

// Flattened {q, a} list derived from FAQ_GROUPS — single source of truth.
// Used by the FAQPage JSON-LD schema; the visible JSX still renders from
// FAQ_GROUPS so the on-page grouping metadata (eyebrow, title, flag) is
// preserved.
const FAQS_FLAT = FAQ_GROUPS.flatMap((group) =>
  group.items.map(({ q, a }) => ({ q, a }))
);

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD: FAQPage schema with all 12 Q/A pairs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaScript(faqPageSchema(FAQS_FLAT))}
      />

      {/* ============================================================ */}
      {/* SECTION 1 — Hero (dark)                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-20">
        <PhotoBackground src="/images/pages/faq.jpg" priority />
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
            <p className="text-eyebrow text-[var(--accent)]">Common Questions</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3 max-w-3xl">
              Most asked. Honestly answered.
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-body text-[var(--text-secondary)] mt-6 max-w-2xl">
              Twelve questions that come up almost every week, from first-time buyers,
              refinance shoppers, realtor partners, and loan officers thinking about a
              move. If yours is not here, send it our way.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — FAQ Accordion (light)                              */}
      {/* ============================================================ */}
      {/* [DEMO COPY — pending client review — all 12 answers] */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          {FAQ_GROUPS.map((group, gIdx) => (
            <div key={group.title} className={gIdx > 0 ? 'mt-16' : ''}>
              <FadeUp>
                <p className="text-eyebrow text-[var(--accent-deep)]">{group.eyebrow}</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-h2 text-[var(--text-on-light)] mt-3">
                  {group.title}
                </h2>
              </FadeUp>

              <div className="mt-8 flex flex-col gap-3">
                {group.items.map((item, iIdx) => (
                  <FadeUp key={item.q} delay={0.1 + iIdx * 0.05}>
                    <details
                      className="group bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] overflow-hidden transition-all duration-200 open:shadow-[var(--shadow-lg)]"
                    >
                      <summary className="cursor-pointer list-none flex items-start justify-between gap-6 p-6 hover:bg-[rgba(197,165,114,0.04)] transition-colors">
                        <h3 className="font-display text-h5 text-[var(--text-on-light)]">
                          {item.q}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(197,165,114,0.12)] text-[var(--accent-deep)] flex items-center justify-center font-mono text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-6 -mt-2">
                        <p className="text-body text-[var(--text-on-light-secondary)]">
                          {item.a}
                        </p>
                        {item.flag && (
                          <p className="font-mono text-[10px] text-[var(--text-on-light-muted)] mt-3">
                            {item.flag}
                          </p>
                        )}
                      </div>
                    </details>
                  </FadeUp>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Final CTA (dark)                                   */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden section-dark-gradient section-pad-loose">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(197, 165, 114, 0.08), transparent 60%)',
          }}
        />

        <div className="container-base px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="hero-shimmer font-display text-h1 max-w-3xl mx-auto">
              Question we did not answer?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-[var(--text-secondary)] max-w-xl mx-auto mt-6">
              Book a 15-minute intro call or take the quiz to see which loan program fits
              your situation. Either way, you talk to a real loan officer next.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button href="/booking" size="lg">
                Schedule a Call
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
