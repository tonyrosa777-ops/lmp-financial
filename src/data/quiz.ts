// src/data/quiz.ts
//
// LMP Financial — Mortgage Path Quiz (lead funnel + LO match).
// Pure logic module. Zero UI imports. Testable.
//
// Per CLAUDE.md Always-Built Features Rule → Interactive Quiz section:
//   - 4 result archetypes typed to LMP's loan-program/audience segments
//   - Each answer tagged with a QuizType
//   - scoreQuiz() is pure + deterministic
//   - Tiebreaker: declared order in QuizType union
//
// [COMPLIANCE-REVIEW-PENDING] — All qualifying questions in this module require
// compliance review before publish. Per CLAUDE.md Compliance Rule (LMP-specific),
// quiz copy that influences program recommendation is regulated advertising. Do
// not publish without sign-off from LMP's compliance IT firm (intro pending per
// initial-business-data.md §9D).
//
// [DEMO COPY — pending client review] applies to all result body copy.

import type { LoanOfficer, LoanProgram } from './site';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type QuizType =
  | 'FirstTimeFoundation'
  | 'VeteranPath'
  | 'MoveUpBuyer'
  | 'RefinanceOptimizer';

export interface QuizAnswer {
  /** User-facing label, leading emoji per CLAUDE.md Code Standards. */
  label: string;
  /** Archetype this answer contributes one point to. */
  type: QuizType;
}

export interface QuizQuestion {
  /** Stable id used as React key. */
  id: string;
  prompt: string;
  /** Exactly 4 answers. */
  answers: QuizAnswer[];
}

export interface QuizResult {
  type: QuizType;
  /** Display name (e.g. "First-Time Foundation"). */
  name: string;
  /** Single-line emotional summary. */
  tagline: string;
  /** 2-3 paragraphs of result body copy. */
  body: string[];
  /** Loan program the result points to. */
  recommendedProgram: {
    /** Matches a slug in siteConfig.loanPrograms. */
    slug: string;
    name: string;
    reason: string;
  };
  /** Slug of the recommended LO. Matches siteConfig.loanOfficers[i].slug. */
  recommendedLOSlug: string;
}

// ---------------------------------------------------------------------------
// QUESTIONS — 6 questions, 4 answers each, every answer tagged with a QuizType
// ---------------------------------------------------------------------------
//
// Score distribution principles:
//   - Q1 directly tags one of the four archetypes per answer (the strongest signal).
//   - Q2-Q6 tag answers in patterns that reinforce the archetype assignment from Q1
//     so the score is not dominated by a single question.
//   - Tiebreakers naturally fall to FirstTimeFoundation (declared first) when the
//     user gives mixed signals — the safest default for a first-touch lead.

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // -------------------------------------------------------------------------
  // Q1 — Life situation (the most important signal; one answer per archetype)
  // -------------------------------------------------------------------------
  {
    id: 'situation',
    prompt: 'Where are you right now in your home journey?',
    answers: [
      { label: '🌱 Buying my first home', type: 'FirstTimeFoundation' },
      { label: '🎖️ I served, and I want to use my VA benefit', type: 'VeteranPath' },
      { label: '🏡 Selling, moving up, or buying a second home', type: 'MoveUpBuyer' },
      { label: '🔄 I already own and want to refinance', type: 'RefinanceOptimizer' },
    ],
  },

  // -------------------------------------------------------------------------
  // Q2 — Credit range
  // -------------------------------------------------------------------------
  {
    id: 'credit',
    prompt: 'What credit range are you working with today?',
    answers: [
      // Lower bands lean first-time / FHA / VA territory
      { label: '🌱 Under 620, still building', type: 'FirstTimeFoundation' },
      { label: '🎖️ 620 to 699, solid mid-band', type: 'VeteranPath' },
      // Higher bands lean refi / move-up
      { label: '🔄 700 to 739, healthy', type: 'RefinanceOptimizer' },
      { label: '🏡 740 and above, top tier', type: 'MoveUpBuyer' },
    ],
  },

  // -------------------------------------------------------------------------
  // Q3 — Property type
  // -------------------------------------------------------------------------
  {
    id: 'property',
    prompt: 'What kind of property are we talking about?',
    answers: [
      { label: '🔑 Primary residence I will live in', type: 'FirstTimeFoundation' },
      { label: '🇺🇸 Primary residence, using VA eligibility', type: 'VeteranPath' },
      { label: '🏛️ Move-up home or second home', type: 'MoveUpBuyer' },
      { label: '🏠 The home I already own and live in', type: 'RefinanceOptimizer' },
    ],
  },

  // -------------------------------------------------------------------------
  // Q4 — State (LMP's 9-state footprint)
  // -------------------------------------------------------------------------
  // State alone is a weak archetype signal, so we distribute by regional patterns
  // observed in the testimonial set: Northeast tends first-time + refi; FL/CO/TX
  // skews move-up + VA cohorts.
  {
    id: 'state',
    prompt: 'Which state is the property in (or going to be)?',
    answers: [
      { label: '🦞 Massachusetts, Maine, or Rhode Island', type: 'FirstTimeFoundation' },
      { label: '🌲 New Hampshire, Vermont, or Connecticut', type: 'RefinanceOptimizer' },
      { label: '🌴 Florida or Texas', type: 'VeteranPath' },
      { label: '⛰️ Colorado', type: 'MoveUpBuyer' },
    ],
  },

  // -------------------------------------------------------------------------
  // Q5 — Down payment readiness
  // -------------------------------------------------------------------------
  {
    id: 'down-payment',
    prompt: 'How much do you have set aside for a down payment?',
    answers: [
      { label: '🌱 Under 3.5 percent, or just starting', type: 'FirstTimeFoundation' },
      // Zero down strongest signal for VA (and USDA, but quiz routes USDA through state)
      { label: '🎖️ Zero, I plan to use VA', type: 'VeteranPath' },
      { label: '🏡 10 to 20 percent ready to deploy', type: 'MoveUpBuyer' },
      // Refi answers shouldn't really need a down payment, so make it about equity
      { label: '🔄 Not buying — I have equity in my current home', type: 'RefinanceOptimizer' },
    ],
  },

  // -------------------------------------------------------------------------
  // Q6 — Timeline
  // -------------------------------------------------------------------------
  {
    id: 'timeline',
    prompt: 'What is your timeline?',
    answers: [
      { label: '⏳ Just exploring, no pressure yet', type: 'FirstTimeFoundation' },
      { label: '⚡ I need to close in the next 30 days', type: 'VeteranPath' },
      { label: '📅 1 to 3 months out', type: 'RefinanceOptimizer' },
      { label: '🗓️ 3 to 6 months out', type: 'MoveUpBuyer' },
    ],
  },
];

// ---------------------------------------------------------------------------
// RESULTS — keyed by QuizType
// ---------------------------------------------------------------------------
//
// LO matching rationale:
//   - FirstTimeFoundation → mike-comerford. Mike's bio is the warmest "I take
//     Saturday calls" voice on the site, and as President he's the strongest
//     first-touch signal for new buyers. Multi-state, multi-program coverage.
//   - VeteranPath → doug. Doug Danzey's bio explicitly specializes in VA loans
//     across the 9-state footprint; testimonials in MA, NH, CT, FL, TX confirm
//     the VA expertise. NMLS 22421 (lowest number on roster — most senior).
//   - MoveUpBuyer → tim. Tim Anderson's bio specifically calls out move-up
//     families, buy-down math, and rate-give-up scenarios. Jumbo testimonials
//     in NH (the Hs) confirm the move-up specialty.
//   - RefinanceOptimizer → lew-calhoun. Lew's bio explicitly mentions a steady
//     book of refinances and weekly written status updates — perfect refi voice.
//     Testimonial from Greg & Elena V. in NH confirms refi work.

export const QUIZ_RESULTS: Record<QuizType, QuizResult> = {
  FirstTimeFoundation: {
    type: 'FirstTimeFoundation',
    name: 'First-Time Foundation',
    tagline: "You are buying your first home. Let's make the math actually work.",
    body: [
      // [DEMO COPY — pending client review]
      'First homes are a math problem and an emotion problem at the same time. Most lenders only solve one. We solve both. The right program for a first-time buyer is rarely the one a single bank pushes. It is whichever combination of FHA, conventional, and state down-payment assistance gets you into the home you actually want at a payment you can actually live with.',
      // [DEMO COPY — pending client review]
      'We shop your file across thirty-plus wholesale lenders and we know every state DPA program in our footprint by name. MassHousing, NHHFA, MaineHousing, RIHousing, CHFA, VHFA, FL Hometown Heroes, TSAHC, CHFA-CO. The grants and forgivable seconds you might qualify for can be the difference between renting another year and closing this fall.',
      // [DEMO COPY — pending client review]
      'Your next step is a 15-minute intro call. No credit pull, no documents, no pressure. We listen first, recommend programs second, and tell you straight what you qualify for and what the numbers look like.',
    ],
    recommendedProgram: {
      slug: 'fha',
      name: 'FHA Loan',
      reason:
        'FHA is the most common starting point for first-time buyers because the down payment is 3.5 percent and the credit threshold is friendlier than conventional. We almost always layer it with state DPA programs for an even lower out-of-pocket close.',
    },
    recommendedLOSlug: 'mike-comerford',
  },

  VeteranPath: {
    type: 'VeteranPath',
    name: 'Veteran Path',
    tagline: 'You served. The VA loan was built for exactly this moment.',
    body: [
      // [DEMO COPY — pending client review]
      'The VA loan is the single most powerful purchase tool in the residential market and almost no retail lender treats it that way. Zero down, no private mortgage insurance, no maximum loan amount in most counties since 2020, and a funding fee that gets waived entirely for many disability-rated veterans. If you served, this benefit was earned, and we will make sure the lender treats it that way.',
      // [DEMO COPY — pending client review]
      'We close VA loans across all nine of our licensed states. Active duty, retired, reserve, surviving spouse, all eras. Doug Danzey on our team has been originating VA loans since before some of our other LOs were in the industry and he comes to closings whenever the borrower wants him there.',
      // [DEMO COPY — pending client review]
      'Your next step is a Certificate of Eligibility check and a 15-minute intro call. We will pull the COE for you. No credit hit, no commitment, just clarity on what you qualify for and what the math looks like.',
    ],
    recommendedProgram: {
      slug: 'va',
      name: 'VA Loan',
      reason:
        'Zero down, no PMI, competitive rates. For most veterans this is the right answer the first time we run the numbers, and we shop VA wholesale lenders to find the best rate-and-fee combination on your specific file.',
    },
    recommendedLOSlug: 'doug',
  },

  MoveUpBuyer: {
    type: 'MoveUpBuyer',
    name: 'Move-Up Buyer',
    tagline: "You are not new to this. Let's get you the rate the market actually gives.",
    body: [
      // [DEMO COPY — pending client review]
      "You have done this before. You know what a closing disclosure looks like, you know what an escrow waiver costs you, and you are not going to be impressed by a teaser rate. Good. Move-up buyers usually get the worst service in this industry because lenders assume you do not need explanation. We assume the opposite. You deserve more detail, not less, because the dollars are bigger.",
      // [DEMO COPY — pending client review]
      'For move-up purchases we typically run a contingency analysis on your current home, model the rate-give-up math against a permanent buy-down or a 2-1 temp buy-down, and shop conventional and jumbo wholesale lenders side by side. If a piggyback second makes more sense than a jumbo first, we will tell you. If a bridge loan is the cleaner play, we will tell you that too.',
      // [DEMO COPY — pending client review]
      'Your next step is a 15-minute consult. Bring your current loan number and your equity estimate. We will run real numbers, not pitch numbers.',
    ],
    recommendedProgram: {
      slug: 'jumbo',
      name: 'Jumbo Mortgage',
      reason:
        'Move-up buyers often cross the conforming loan limit. We shop wholesale jumbo investors so the financing on your bigger home prices competitively, not punitively. If a conforming loan is the right answer, we will tell you that instead.',
    },
    recommendedLOSlug: 'tim',
  },

  RefinanceOptimizer: {
    type: 'RefinanceOptimizer',
    name: 'Refinance Optimizer',
    tagline: 'You already own. Now make the loan work harder for you.',
    body: [
      // [DEMO COPY — pending client review]
      'A refinance is the most underrated wealth move in residential finance because it is the only loan transaction where you already know the property, you already know the borrower, and you already know what the old payment was. The only question is whether the new math beats the old math, and by how much, and how fast.',
      // [DEMO COPY — pending client review]
      'We model the break-even on a rate-and-term refi to the month, not the year. We shop cash-out, no-cash-out, and HELOC structures side by side so you see the trade-offs. We will tell you when it is not the right time, which is something most lenders will never do because they are paid to close, not to advise.',
      // [DEMO COPY — pending client review]
      'Your next step is a 15-minute call. Have your current loan statement handy. We will run the breakeven on the spot.',
    ],
    recommendedProgram: {
      slug: 'fixed-rate',
      name: 'Fixed-Rate Mortgage',
      reason:
        'Most refinances land on a 15 or 30-year fixed because the goal is locking the new payment in for the long haul. If a different structure (ARM, interest-only, HELOC second) actually serves your goal better, we will route you there instead.',
    },
    recommendedLOSlug: 'lew-calhoun',
  },
};

// ---------------------------------------------------------------------------
// scoreQuiz — pure, deterministic
// ---------------------------------------------------------------------------

/**
 * Counts QuizType occurrences across the answer array and returns the dominant
 * archetype. Tiebreaker: declared order in the QuizType union (FirstTimeFoundation
 * wins ties because it is the safest default for a mixed-signal first-touch lead).
 *
 * Pure function. Same input always returns same output. Trivially testable.
 */
export function scoreQuiz(answers: QuizType[]): QuizType {
  const order: QuizType[] = [
    'FirstTimeFoundation',
    'VeteranPath',
    'MoveUpBuyer',
    'RefinanceOptimizer',
  ];

  const counts: Record<QuizType, number> = {
    FirstTimeFoundation: 0,
    VeteranPath: 0,
    MoveUpBuyer: 0,
    RefinanceOptimizer: 0,
  };

  for (const t of answers) {
    counts[t] += 1;
  }

  return order.reduce<QuizType>(
    (winner, t) => (counts[t] > counts[winner] ? t : winner),
    order[0],
  );
}

// ---------------------------------------------------------------------------
// Re-export type helpers for QuizClient consumption
// ---------------------------------------------------------------------------

export type { LoanOfficer, LoanProgram };
