// src/data/site.ts
//
// Single source of truth for all visible copy on the LMP Financial site.
// Per CLAUDE.md Code Standards: zero hard-coded strings in components.
// Voice anchor (design-system.md §7): "Built like a Lowell handshake, runs like Stripe."
// Local + warm + trustworthy + modern + precise + premium. First-person plural for LMP voice.
// No em dashes anywhere. Use commas, periods, semicolons, ellipses.
//
// Phase 1D (2026-04-27) - Content-Writer pass: populated 36 testimonials, 22 LO bios,
// 9 program blurbs, 6 pain-point bodies, 6 process-step bodies, hero subheadline.
// All copy is [DEMO COPY] pending client review per CLAUDE.md Copy Writing Rule.

// ============================================================================
// SCHEMA
// ============================================================================

export interface BusinessInfo {
  name: string;
  tagline: string;
  nmls: string;
  founded: string;
  address: { street: string; suite: string; city: string; state: string; zip: string };
  phone: string;
  smsPhone?: string;
  emailMain: string;
  emailFounder: string;
  licensedStates: string[];
  licensedStatesLong: string[];
}

export interface NavItem {
  href: string;
  label: string;
  isInternal?: boolean;
  isCta?: boolean;
}

export interface HeroContent {
  tagline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trustStrip: string[];
}

export interface LoanProgram {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  eligibility: string;
}

export interface PainPoint {
  emoji: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  number: string;
  emoji: string;
  title: string;
  body: string;
}

export interface Stat {
  emoji: string;
  value: string;
  label: string;
  flag?: string;
}

export interface Testimonial {
  name: string;
  city: string;
  state: string;
  program: string;
  quote: string;
}

export interface LoanOfficer {
  slug: string;
  name: string;
  nmls: string;
  role: string;
  bio: string;
  email: string;
  phone?: string;
  my1003appUrl: string;
  calendlyUri?: string;
  stateLicensure: string[];
  languages: string[];
}

export interface ComplianceCopy {
  smsOptInDisclaimer: string;
  brokerDisclosure: string;
  adaStatement: string;
  privacyPolicyLastUpdated: string;
  termsOfUseLastUpdated: string;
}

export interface SocialLinks {
  linkedinPersonal?: string;
  linkedinCompany?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface FooterConfig {
  columns: { title: string; links: { label: string; href: string }[] }[];
  copyright: string;
  legalLinks: { label: string; href: string }[];
}

export interface SiteConfig {
  business: BusinessInfo;
  nav: NavItem[];
  hero: HeroContent;
  loanPrograms: LoanProgram[];
  painPoints: PainPoint[];
  processSteps: ProcessStep[];
  stats: Stat[];
  testimonials: Testimonial[];
  loanOfficers: LoanOfficer[];
  compliance: ComplianceCopy;
  social: SocialLinks;
  footer: FooterConfig;
}

// ============================================================================
// CONFIG
// ============================================================================

export const siteConfig: SiteConfig = {
  business: {
    name: "LMP Financial",
    // [PHASE-1D — content-writer may rewrite per /market-research]
    tagline: "Settle down in your new home without a loan you had to settle for.",
    nmls: "2754084",
    // [DEMO COPY — pending client review — site claims 20+ years / 3 decades / 10 years inconsistently per IBD §1]
    founded: "Established mortgage broker, 20+ years of combined origination experience",
    address: {
      street: "175 Cabot St",
      suite: "500",
      city: "Lowell",
      state: "MA",
      zip: "01854",
    },
    // [DEMO COPY — pending client review — exact published number not in IBD]
    phone: "(978) 453-LOAN",
    emailMain: "info@lmpfinancial.com",
    emailFounder: "mike@lmpfinancial.com",
    licensedStates: ["MA", "NH", "ME", "RI", "CT", "FL", "CO", "VT", "TX"],
    licensedStatesLong: [
      "Massachusetts",
      "New Hampshire",
      "Maine",
      "Rhode Island",
      "Connecticut",
      "Florida",
      "Colorado",
      "Vermont",
      "Texas",
    ],
  },

  nav: [
    { href: "/services", label: "Loan Programs" },
    { href: "/calculators", label: "Calculators" },
    { href: "/team", label: "Team" },
    { href: "/partners", label: "Realtors" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    // Optimus internal sales tool, gold marker per CLAUDE.md Always-Built Features Rule
    { href: "/pricing", label: "Pricing", isInternal: true },
    { href: "/booking", label: "Get Pre-Approved", isCta: true },
  ],

  hero: {
    // [PHASE-1D — kept; voice anchor compatible. Existing tagline reads true and Mike confirmed it works on the live site. Alternate suggestions for client review at Tuesday demo:]
    //   1. "Twenty-two loan officers. Thirty-plus lenders. One application."
    //   2. "Your mortgage, shopped by a team that lives where you live."
    //   3. "We work the lenders. You work on packing boxes."
    tagline: "Settle into your home, not a rate you'll regret.",
    // [DEMO COPY — pending client review]
    subheadline:
      "We are an independent mortgage broker out of Lowell, Massachusetts. Twenty-two loan officers, nine licensed states, thirty-plus wholesale lenders shopping every file we touch. One application, one team, one closing.",
    ctaPrimary: { label: "Get Pre-Approved", href: "/booking" },
    ctaSecondary: { label: "Take the Quiz", href: "/quiz" },
    trustStrip: [
      "NMLS #2754084",
      "9 states licensed",
      "22 loan officers",
      "Lowell, MA",
      "EN · PT · ES",
    ],
  },

  loanPrograms: [
    {
      slug: "fixed-rate",
      name: "Fixed-Rate Mortgage",
      emoji: "🏠",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Lock your rate for 15 or 30 years. The payment you sign at closing is the payment you make every month, no matter what the market does next.",
      eligibility: "30-year and 15-year terms. Conventional credit and income guidelines apply.",
    },
    {
      slug: "fha",
      name: "FHA Loan",
      emoji: "🔑",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Government-backed and built for first-time and lower-down-payment buyers. Smaller down payment, friendlier credit thresholds, primary residence only.",
      eligibility: "3.5% down, 580+ credit score, primary residence only.",
    },
    {
      slug: "va",
      name: "VA Loan",
      emoji: "🇺🇸",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "A benefit you earned. Zero down, no private mortgage insurance, competitive rates for veterans, active duty service members, and qualifying spouses.",
      eligibility:
        "Zero down, no PMI. Eligible veterans, active duty service members, and qualifying spouses.",
    },
    {
      slug: "jumbo",
      name: "Jumbo Mortgage",
      emoji: "🏛️",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Financing above conforming loan limits. We shop wholesale jumbo investors so high-balance loans price competitively, not punitively.",
      eligibility: "Up to $3M, 10% down minimum, 680+ credit score.",
    },
    {
      slug: "arm",
      name: "Adjustable-Rate Mortgage",
      emoji: "⚖️",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Lower starting rate for a fixed intro period, then it adjusts. Smart play if you plan to move, refinance, or upgrade before the reset.",
      eligibility: "3/1, 5/1, 7/1, and 10/1 ARM structures. Standard income and credit qualifying.",
    },
    {
      slug: "usda",
      name: "USDA Mortgage",
      emoji: "🌾",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Zero-down financing for eligible rural and suburban homes. Quietly powerful for the right address, especially across northern New England and rural CT.",
      eligibility:
        "Zero down. Property must fall inside USDA-eligible geography. Income limits apply by county.",
    },
    {
      slug: "first-time-buyer",
      name: "First-Time Home Buyer",
      emoji: "🌱",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Programs and grants built for the first home, including state down-payment assistance: MassHousing, NHHFA, MaineHousing, RIHousing, CHFA, VHFA, FL Hometown Heroes, TSAHC, CHFA-CO.",
      eligibility:
        "Eligibility varies by state and program. We walk you through every option you qualify for.",
    },
    {
      slug: "reverse",
      name: "Reverse Mortgage",
      emoji: "🌅",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Convert home equity into income or a line of credit while staying in the home you love. Built for retirement-stage homeowners 62 and older.",
      eligibility: "Primary borrower must be 62 or older. Owner-occupied primary residence required.",
    },
    {
      slug: "interest-only",
      name: "Interest-Only Mortgage",
      emoji: "📊",
      // [DEMO COPY — pending client review] [COMPLIANCE-REVIEW-PENDING]
      blurb:
        "Pay interest only for the first 5 to 10 years, freeing cash flow for investment, business, or a renovation. Specialized program, specific use cases, and we will tell you when it does not fit.",
      eligibility: "5 to 10 year interest-only period. Stronger credit and reserve requirements typical.",
    },
  ],

  painPoints: [
    {
      emoji: "🔍",
      title: "Shopping multiple banks yourself",
      // [DEMO COPY]
      body: "Three banks, three answers, no clarity. We submit one application to thirty-plus wholesale lenders, then bring back the strongest combination so you compare apples to apples.",
    },
    {
      emoji: "💰",
      title: "Confusing rates and hidden fees",
      // [DEMO COPY]
      body: "Teaser rates, points, lender credits, junk fees. We sit with the loan estimate line by line so you know exactly what you are paying for and what you are not.",
    },
    {
      emoji: "⏳",
      title: "Slow underwriting that kills deals",
      // [DEMO COPY]
      body: "Most retail lenders move on their own clock. Wholesale shops pick up the phone. Our team works conditions the same day they hit, so the closing date holds.",
    },
    {
      emoji: "❓",
      title: "Uncertain whether you'll be approved",
      // [DEMO COPY]
      body: "Pre-approval should be a yes, or a clear path to yes. We tell you where you stand on day one, then build the file that gets you across. No vague maybes.",
    },
    {
      emoji: "🗣️",
      title: "Language barriers in a major life decision",
      // [DEMO COPY]
      body: "We work in English, Portuguese, and Spanish across our team. The biggest financial decision of your life should never get lost in translation, and your family should be able to follow along.",
    },
    {
      emoji: "📈",
      title: "Self-employed income that confuses lenders",
      // [DEMO COPY]
      body: "1099, K-1, bank-statement, DSCR, rental income. We work with wholesale investors who actually underwrite non-W-2 income, not just check boxes and decline.",
    },
  ],

  processSteps: [
    {
      number: "1️⃣",
      emoji: "🤝",
      title: "Intro Call",
      // [DEMO COPY]
      body: "A 15-minute conversation with the LO who fits your state, your language, and your situation. We listen first, ask questions second, recommend programs third.",
    },
    {
      number: "2️⃣",
      emoji: "📋",
      title: "Documents",
      // [DEMO COPY]
      body: "Income, assets, ID. We send a clean checklist, you upload securely, we handle the rest. Most files are document-complete within 2 to 3 days.",
    },
    {
      number: "3️⃣",
      emoji: "🔍",
      title: "Lender Shop",
      // [DEMO COPY]
      body: "We submit your file to multiple wholesale lenders and bring back the strongest combination of rate, fees, and program fit. Same week, every time.",
    },
    {
      number: "4️⃣",
      emoji: "📝",
      title: "Application",
      // [DEMO COPY]
      body: "Pre-approval letter in hand, you make the offer. When the offer wins, we move straight to full application with the chosen lender, no restart, no re-typing.",
    },
    {
      number: "5️⃣",
      emoji: "🏠",
      title: "Underwriting",
      // [DEMO COPY]
      body: "We push the file through, work conditions same-day, and keep you and your realtor in the loop with weekly written updates. No silent stretches.",
    },
    {
      number: "6️⃣",
      emoji: "🎉",
      title: "Close",
      // [DEMO COPY]
      body: "Final numbers, closing disclosure, signing day. You get the keys. We send a closing gift, and we are still here for the refinance, the next home, your kids' first home.",
    },
  ],

  stats: [
    {
      emoji: "⚡",
      value: "14 days",
      label: "Average close time",
      flag: "[SOURCING-REQUIRED]",
    },
    {
      emoji: "⭐",
      value: "4.9/5",
      label: "Average rating",
      flag: "[SOURCING-REQUIRED]",
    },
    {
      emoji: "🌎",
      value: "9",
      label: "States licensed",
    },
    {
      emoji: "👥",
      value: "22",
      label: "Loan officers",
    },
    {
      emoji: "💰",
      value: "$10,662",
      label: "Average lifetime savings vs retail (Polygon Research / UWM, 2023 HMDA)",
      flag: "[COMPLIANCE-REVIEW-PENDING]",
    },
  ],

  // 36 testimonials populated 2026-04-27 by content-writer agent. All [DEMO COPY — pending client review].
  // To be replaced or edited after Mike provides the actual review export from Google / Zillow / Experience.com per IBD §1.
  // Distribution: 4 per state across 9 licensed states. Persona variety: couples, singles, veterans, retirees,
  // first-time, move-up, refi, immigrant/multilingual, self-employed/investor. ZERO em dashes.
  testimonials: [
    // ===== MASSACHUSETTS (4) =====
    {
      name: "Maria S.",
      city: "Lowell",
      state: "MA",
      program: "FHA Loan",
      quote:
        "Eu não falava bem inglês quando comecei o processo, e Aisha respondeu cada mensagem no WhatsApp em português. She walked my mãe through the MassHousing DPA on a Sunday afternoon. We closed in 32 days on our first home in Centralville.",
    },
    {
      name: "Steve and Kara D.",
      city: "Salem",
      state: "MA",
      program: "Fixed-Rate Mortgage",
      quote:
        "We had a 3.25% on our starter colonial and giving that up hurt. Tim showed us a permanent buy-down side by side with a 2-1, with the actual break-even math. We made the move because the numbers, not the pitch, made sense.",
    },
    {
      name: "Adelina P.",
      city: "Methuen",
      state: "MA",
      program: "Interest-Only Mortgage",
      quote:
        "Banco não me atendia porque eu pago imposto com ITIN. Alexa found me a lender who actually does ITIN loans, in Portuguese, and explained the down payment was 15% not 25%. My kids will grow up in a house we own.",
    },
    {
      name: "Carlos M.",
      city: "Brockton",
      state: "MA",
      program: "FHA Loan",
      quote:
        "Honestly I thought a charge-off from 2019 meant no FHA, ever. Juan looked at the file and said let's work the timeline, here is what underwriting will need. Two-family in Campello, rental from the second unit covered the FHA self-sufficiency math.",
    },

    // ===== NEW HAMPSHIRE (4) =====
    {
      name: "Rob and Jenny H.",
      city: "Windham",
      state: "NH",
      program: "Jumbo Mortgage",
      quote:
        "Four kids, needed a bigger house, did not need a bigger headache. Tim Anderson treated the jumbo like he treats every loan: full file at the front, no surprises at the back. Closed in 19 days, week before the school year started.",
    },
    {
      name: "Mark T.",
      city: "Manchester",
      state: "NH",
      program: "VA Loan",
      quote:
        "Twenty years Army, first time using my VA. Doug knew the program cold and got me to zero down on a place I actually wanted, not the one the bank told me I could afford. Came to the closing with us. That meant something.",
    },
    {
      name: "Sarah K.",
      city: "Nashua",
      state: "NH",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "I qualified for NHHFA Home Preferred and didn't even know it. Edward ran the income limits, paired it with the conventional, and told me what it would cost in PMI vs. without. To be honest I had been ready to give up.",
    },
    {
      name: "Greg and Elena V.",
      city: "Concord",
      state: "NH",
      program: "Fixed-Rate Mortgage",
      quote:
        "Refi shopping took weeks before I called LMP. Lew came back the next morning with three lender quotes, the costs in writing, and a recommendation. Closed at the kitchen table with our kids running around. That's exactly how I wanted it.",
    },

    // ===== MAINE (4) =====
    {
      name: "Pam G.",
      city: "Portland",
      state: "ME",
      program: "Reverse Mortgage",
      quote:
        "My husband had a fall and we needed to redo the bathroom and the front steps. Jayne explained how the line of credit works, what we keep, what we owe later, and answered every question my son asked twice. We did the renovations. We are still in our home.",
    },
    {
      name: "Thomas W.",
      city: "Bangor",
      state: "ME",
      program: "USDA Mortgage",
      quote:
        "Did not know our property was USDA eligible until Scott looked it up. Zero down, decent rate, and the closing was actually on time. He texted my realtor every Friday with status. No silent treatment.",
    },
    {
      name: "Hannah and Will B.",
      city: "Bar Harbor",
      state: "ME",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "We used MaineHousing First Home with the Advantage grant. Honestly we had no idea you could stack them. Allen walked us through it, told us straight what the trade-offs were on rate, and let us decide. Closed three weeks before our wedding.",
    },
    {
      name: "Diane L.",
      city: "Augusta",
      state: "ME",
      program: "Fixed-Rate Mortgage",
      quote:
        "Refinanced from a 7.1 to lock something I could live with for the next decade. Kwame took the time to explain why now and not later, and the math worked. Saved real money. I trust him with my mom's place next.",
    },

    // ===== RHODE ISLAND (4) =====
    {
      name: "Jesse and Tina R.",
      city: "Cranston",
      state: "RI",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "RIHousing FirstGenHomeRI plus the 15kDPA, packaged together. We did not believe it was possible until Ryan showed us the printout from the lender. He was at the closing in person and brought a card for the kids.",
    },
    {
      name: "Antonio C.",
      city: "Providence",
      state: "RI",
      program: "FHA Loan",
      quote:
        "Self-employed cleaning company, two bank accounts, lots of deposits. Most banks said no in two days. Ryan McConihe spent an hour on the phone with my CPA, mapped the income, and got me an FHA approval. Closed on a 3-family. Renting two of them now.",
    },
    {
      name: "Linda O.",
      city: "Newport",
      state: "RI",
      program: "Jumbo Mortgage",
      quote:
        "Coastal property, jumbo loan, condo association from another era. Amy navigated the whole HOA questionnaire and pushed back on the underwriter twice. We closed on the date my agent had promised the seller. Not a day late.",
    },
    {
      name: "Marcus and Elena B.",
      city: "Pawtucket",
      state: "RI",
      program: "FHA Loan",
      quote:
        "First place. We were honestly nervous about the whole thing. Lily took it slow, in Spanish when my wife wanted, in English when I did, and never once made us feel small for asking the same question twice.",
    },

    // ===== CONNECTICUT (4) =====
    {
      name: "Christopher and Amy F.",
      city: "Stamford",
      state: "CT",
      program: "Jumbo Mortgage",
      quote:
        "Fairfield County prices needed a jumbo. Mike Comerford himself worked the file. Three lender quotes, real numbers, no theatrics. Closed in 22 days, on a Tuesday afternoon, in person at the title company. Old-school in the best way.",
    },
    {
      name: "Jared P.",
      city: "Hartford",
      state: "CT",
      program: "VA Loan",
      quote:
        "Two tours, retired Navy. Used my VA for the first time. Doug answered a Saturday text within 20 minutes about the funding fee. Got me 100% financing on a place in West End. The team treated my service like it actually mattered.",
    },
    {
      name: "Beatrice N.",
      city: "New Haven",
      state: "CT",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "CHFA Time To Own gave me the down payment as a forgivable second. Nick walked me through how the layered seconds work and what happens if I sell in five years. Closed on a 2-bedroom near Yale. Didn't think it was possible at my income.",
    },
    {
      name: "Robert S.",
      city: "Bridgeport",
      state: "CT",
      program: "Fixed-Rate Mortgage",
      quote:
        "Refi from 7.5 to a number I can live with. Jamal kept me posted with weekly emails so I never had to chase. Closing was a 30-minute signing. No surprises on the closing disclosure, which is exactly what he had promised.",
    },

    // ===== FLORIDA (4) =====
    {
      name: "Carlos and Mariana V.",
      city: "Cape Coral",
      state: "FL",
      program: "Interest-Only Mortgage",
      quote:
        "Self-employed, 1099, three kids, condo my last lender said was unwarrantable. Aisha and Ryan McConihe found a portfolio lender who actually does this stuff. Bank-statement loan, conditional approval in 48 hours, closed in 21 days.",
    },
    {
      name: "Susan and Bill K.",
      city: "Naples",
      state: "FL",
      program: "Jumbo Mortgage",
      quote:
        "Snowbird buyers from Boston. The HOA situation post-Surfside scared off two lenders before LMP. Jayne actually read the condo financials, and Mike picked up the phone the night before closing when the title company had a question. We closed on time.",
    },
    {
      name: "Daniel R.",
      city: "Tampa",
      state: "FL",
      program: "FHA Loan",
      quote:
        "642 FICO, FHA, condo. Three lenders said no, said it was the building. Scott called the HOA, got the documents, and turned a non-warrantable into a yes. Forty-eight days from start to keys. The team kept me sane.",
    },
    {
      name: "Renee D.",
      city: "Jacksonville",
      state: "FL",
      program: "VA Loan",
      quote:
        "Active duty, PCS to Mayport. Needed a fast close and an LO who knew the funding fee, the certificate of eligibility, all of it. Doug had it handled. Closed before my household goods even arrived.",
    },

    // ===== COLORADO (4) =====
    {
      name: "Riley A.",
      city: "Lafayette",
      state: "CO",
      program: "Jumbo Mortgage",
      quote:
        "Tech worker household, $215K income, too much for most bond programs. Mike Jr. paired CHFA Preferred with a piggyback for the jumbo piece. Closed on a townhouse in 26 days. He knew the metroDPA layered second cold.",
    },
    {
      name: "Felicia and James K.",
      city: "Aurora",
      state: "CO",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "metroDPA 6% forgivable, packaged with FHA. Allen explained the income cap, what happens if we sell in three years, and what the recapture looks like. Felt like he wanted us to understand it, not just sign it.",
    },
    {
      name: "Tomás G.",
      city: "Denver",
      state: "CO",
      program: "Fixed-Rate Mortgage",
      quote:
        "Refi at the right time, finally. Lily ran the math in Spanish for me and in English for my wife so we both understood. Saved real money on the monthly. Closing was 25 minutes at our dining table.",
    },
    {
      name: "Andrew P.",
      city: "Colorado Springs",
      state: "CO",
      program: "VA Loan",
      quote:
        "Air Force, used the VA. Edward got me to zero down with a sub-conforming jumbo because of the high-cost county. Two-week close. Came to the table with us. The whole team treated my file like it was the only one they had.",
    },

    // ===== VERMONT (4) =====
    {
      name: "Maddie L.",
      city: "Burlington",
      state: "VT",
      program: "First-Time Home Buyer Mortgage",
      quote:
        "VHFA MOVE plus the MCC tax credit. Honestly I had been told my income was too high by another broker. Rocco re-ran it and showed me I was right under the cap. Closed in 28 days on a 3-bedroom in the New North End.",
    },
    {
      name: "Steve and Karen D.",
      city: "South Burlington",
      state: "VT",
      program: "Fixed-Rate Mortgage",
      quote:
        "Refi from a 7.25 we got in 2024. Kwame told us when to lock and stuck to the timeline. Saved enough on the monthly to put our youngest into the music program at school. Small thing, real impact.",
    },
    {
      name: "Joel B.",
      city: "Rutland",
      state: "VT",
      program: "USDA Mortgage",
      quote:
        "Rural property, USDA eligible, zero down. Tim walked me through what the funding fee adds and how the income limits work. Closed in 24 days. He answered a Sunday morning text before I had finished my coffee.",
    },
    {
      name: "Caroline V.",
      city: "Montpelier",
      state: "VT",
      program: "Reverse Mortgage",
      quote:
        "I was 67 and wanted a HECM line of credit, not a lump sum. Jayne took two long phone calls with my daughter on the line and laid out the whole thing. We all understood it before I signed. That is the most I can ask for.",
    },

    // ===== TEXAS (4) =====
    {
      name: "Hector and Lupe G.",
      city: "Cypress",
      state: "TX",
      program: "FHA Loan",
      quote:
        "TSAHC plus FHA, my wife is a teacher so we qualified for Homes for Texas Heroes. David explained it in Spanish when my mom was on the call and in English when our agent was. We needed nothing close to $25K to close. Honestly a relief.",
    },
    {
      name: "Imani T.",
      city: "Houston",
      state: "TX",
      program: "Interest-Only Mortgage",
      quote:
        "I run an investment podcast and I'm picky about LOs. DSCR loan, no W-2 needed, closed in 19 days. Ryan McConihe knows wholesale cold and sent every disclosure with a one-paragraph plain-English summary. That is the bar now.",
    },
    {
      name: "Carla and Ben R.",
      city: "Austin",
      state: "TX",
      program: "Adjustable-Rate Mortgage",
      quote:
        "7/1 ARM made sense because we're moving in five years for sure. Most lenders pushed us to 30-year fixed for their commission. Nick laid out both, told us he'd be fine with either, and let us pick. Saved us a chunk on the monthly.",
    },
    {
      name: "Jorge L.",
      city: "San Antonio",
      state: "TX",
      program: "VA Loan",
      quote:
        "Marine Corps veteran, second time using the VA. Doug remembered me from the first loan four years ago, and asked about my daughter by name. Closed on a bigger house for the new baby. Felt like family the whole way.",
    },
  ],

  loanOfficers: [
    {
      slug: "mike-comerford",
      name: "Mike Comerford",
      nmls: "184368",
      role: "President / CEO / Loan Officer",
      // [DEMO COPY — pending client review — model on existing published bio per CLAUDE.md Copy Writing Rule]
      bio: "Hi, I'm Mike. I founded LMP Financial because borrowers in Lowell, in Cape Coral, in Denver deserve a broker who shops the market, not a bank pushing one product. I have been originating loans for two decades and I still take Saturday calls. I still close loans in person when I can. And I still believe the best mortgage is the one you understand cold by the time we get to the closing table. Twenty-two LOs, nine states, three languages. We are independent on purpose.",
      email: "mike@lmpfinancial.com",
      my1003appUrl: "https://mikecomerford.my1003app.com/184368/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "allen-carmody",
      name: "Allen Carmody",
      nmls: "2455283",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I came up in this business by listening more than I talked. Every borrower walks in with a story, an income situation, a reason they have not bought yet. My job is to match yours to the loan that actually fits, not the one a bank wants to sell that month. I work New England and the Mountain West, and I have a soft spot for first-time buyers who think they cannot afford it yet. Half the time, they can.",
      email: "allen@lmpfinancial.com",
      my1003appUrl: "https://allencarmody.my1003app.com/2455283/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "edward",
      name: "Edward Whitehouse",
      nmls: "2361088",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I work the phones late, I answer texts on weekends, and I remember the names of the kids in every borrower family I have helped close. Mortgages are math. The relationship is everything else. I work primarily in the Northeast and I have closed loans for veterans, first-time buyers, and self-employed borrowers other shops turned away. If your file is unusual, that is exactly when you want me on it.",
      email: "ed@lmpfinancial.com",
      my1003appUrl: "https://edwhitehouse.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "rocco",
      name: "Rocco DiPietro",
      nmls: "2093492",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I have been originating loans long enough to know that the rate matters less than the closing date. If you do not close on time, the rate you locked is theoretical and the seller you lost is real. I get my borrowers to the table on the day we promised. I work New England and Vermont especially, and I close my Friday afternoons walking neighborhoods I have helped families move into.",
      email: "rocco@lmpfinancial.com",
      my1003appUrl: "https://roccodipietro.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "tim",
      name: "Tim Anderson",
      nmls: "2732803",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "First-time buyers, move-up families, veterans, refinance optimizers. I have walked every kind of borrower through every kind of program in the Northeast. I run buy-down math the way other people run fantasy lineups. Bring me your situation and the rate you are afraid to give up, and I will bring you the path that actually pencils. Saturdays I am at my kid's hockey game with my phone on.",
      email: "tim@lmpfinancial.com",
      my1003appUrl: "https://timanderson.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "doug",
      name: "Doug Danzey",
      nmls: "22421",
      role: "Loan Officer",
      // [DEMO COPY — pending client review — model on existing published bio]
      bio: "I have been in this industry since before online lenders existed and I am still here for one reason. Borrowers remember who picked up the phone when their deal was about to fall apart at closing. I specialize in VA loans across our nine-state footprint, and I have closed for veterans of every branch and every era. If you served, you earned the benefit, and I will make sure the lender treats it that way. I come to closings.",
      email: "doug@lmpfinancial.com",
      my1003appUrl: "https://dougdanzey.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "juan",
      name: "Juan Palacio",
      nmls: "1533425",
      role: "Loan Officer",
      // [DEMO COPY — pending client review — model on existing published bio]
      bio: "Hablo español. I work with borrowers who deserve to understand every page of every disclosure, in the language they think in. The biggest financial decision of your life should never come down to a language barrier or a rushed translation. I have closed loans for first-generation buyers in Lawrence, in Lowell, in Brockton, and in Houston. If your mom or your tía wants to be on the call, that is exactly how I want to do it.",
      email: "juan@lmpfinancial.com",
      my1003appUrl: "https://juanpalacio.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en", "es"],
    },
    {
      slug: "ryan",
      name: "Ryan Carmody",
      nmls: "2775053",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I love this work because every loan changes a family's life. I treat your file like it is the only one on my desk, because for you, it is. I work primarily in New England and Rhode Island, and I take my Sunday afternoons to call borrowers a year out from their closing to see how the house is treating them. The best part of this job is not the closing. It is the housewarming photo I get six months later.",
      email: "ryan@lmpfinancial.com",
      my1003appUrl: "https://ryancarmody.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "scott-jones",
      name: "Scott Jones",
      nmls: "2781609",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I have sat in the closing chair on hundreds of loans. The pattern is clear. Borrowers who understand their loan are happier years later. So I slow down on the parts that look small, like the escrow waiver, the impound math, the hazard insurance line. I work primarily in Florida and the Northeast, and I am the LO who calls the HOA myself when the underwriter has a question. It saves a week.",
      email: "scott@lmpfinancial.com",
      my1003appUrl: "https://scottjones.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "amy-mcbrair",
      name: "Amy McBrair",
      nmls: "1781429",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I work hard, I move fast, and I tell the truth. If your file has a wrinkle, I will find it on day one and we will work the problem together. No surprises at the closing table, no late-stage panic, no calls from the underwriter you did not see coming. I work jumbo, conventional, and the kind of unique condo financing that scares retail lenders. I came to this business because my parents were first-time buyers once. I do not forget that.",
      email: "amy@lmpfinancial.com",
      my1003appUrl: "https://amymcbrair.my1003app.com/1781429/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "mike-comerford-jr",
      name: "Mike Comerford Jr.",
      nmls: "2772959",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I grew up around this business, which means I learned the trade from someone who has been doing it for two decades. I bring fresh hustle and old-school standards to every file. I have closed CHFA loans in Colorado, jumbos in Massachusetts, and FHA in New Hampshire. The product names change. The promise does not. I close on time, and if I cannot, I tell you the day before, not the day of.",
      email: "michael@lmpfinancial.com",
      my1003appUrl: "https://michaelcomerford.my1003app.com",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "david-serrano",
      name: "David Serrano",
      nmls: "2626257",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "Hablo español. I spend extra time with first-time buyers because the first home is a once-in-a-lifetime moment. I work primarily Texas and the Northeast, and I have closed TSAHC, TDHCA, and MCC stacks for teachers, firefighters, and EMTs. If you qualify for Homes for Texas Heroes, I want you on the call with your spouse and your mom, in whichever language is comfortable. We get it right or we do not close.",
      email: "david@lmpfinancial.com",
      my1003appUrl: "https://davidserrano.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en", "es"],
    },
    {
      slug: "aisha-barbosa",
      name: "Aisha Barbosa",
      nmls: "2401636",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "Falo português. I work with families across New England's Portuguese-speaking communities and beyond, from Lowell to Lawrence to Brockton to Framingham. Every borrower deserves a clear path, in the language they think in, and a broker who understands that big decisions get made in family councils, not solo. I close ITIN loans, FHA, MassHousing DPA stacks, and I answer WhatsApp at speeds my husband finds excessive.",
      email: "aisha@lmpfinancial.com",
      my1003appUrl: "https://aishabarbosa.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en", "pt"],
    },
    {
      slug: "ryan-mcconihe",
      name: "Ryan McConihe",
      nmls: "2524646",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I learned this business by closing tough files for tough situations. Self-employed income, asset-backed loans, jumbo deals, DSCR for investors, bank-statement programs for the gig economy. If your file is complicated, that is exactly when you want me on it. I read tax returns the way some people read mystery novels. I work primarily Florida and the Northeast, and my sweet spot is borrowers who have heard no three times before they get to me.",
      email: "rmcconihe@lmpfinancial.com",
      my1003appUrl: "https://ryanmcconihe.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "lew-calhoun",
      name: "Lew Calhoun",
      nmls: "110128",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I have originated through every market cycle since the early 2000s. The cycle changes. The job does not. Listen, work the file, get the borrower home. I work mostly New England, with a steady book of refinances and move-up purchases. I send weekly written status updates because I learned the hard way that silence is the worst customer experience in this industry. My borrowers know what is happening every week of the file.",
      email: "lew@lmpfinancial.com",
      my1003appUrl: "https://lewcalhoun.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "kwame",
      name: "Kwame Bonsu",
      nmls: "554817",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I take the time to teach. Every borrower I work with closes knowing what every line on their disclosure means, what their PMI does and when it goes away, what their escrow holds and why. Knowledge is the part of the loan you keep forever. I work New England and Maine, and I refinance my own borrowers when the math says it is time. I do not chase the next deal at the cost of the one I already closed.",
      email: "kwame@lmpfinancial.com",
      my1003appUrl: "https://kwamebonsu.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "nick-anastasi",
      name: "Nick Anastasi",
      nmls: "2784380",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I treat your goal as the brief. Whether it is the lowest payment, the fastest close, or the smartest long-term play, I build the loan that actually serves it. I work primarily Connecticut and the Northeast, and I close a lot of CHFA Time To Own and DAP files for first-time buyers in Hartford and New Haven. If you qualify for the program, I want it on the table. If you do not, I will tell you straight.",
      email: "nick@lmpfinancial.com",
      my1003appUrl: "https://nicholasanastasi.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "jamal-azweem",
      name: "Jamal Azweem",
      nmls: "2124699",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "Communication is the whole game. I keep you, your realtor, and the underwriter on the same page from pre-approval through clear-to-close. No silent stretches, no surprise conditions on the day before closing, no weekend emails left unread until Monday. I work New England and Connecticut, and I send a Friday afternoon update on every active file because I would want one if I were the borrower.",
      email: "jamal@lmpfinancial.com",
      my1003appUrl: "https://jamalazweem.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "alexa-parra-magalhaes",
      name: "Alexa Parra Magalhaes",
      nmls: "2515061",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "Hablo español, falo português. I work across our New England communities to make sure every borrower walks into their closing knowing exactly what they signed and what comes next. ITIN files, MassHousing DPA, FHA stacks for first-generation buyers in Lowell, Lawrence, Methuen, and Framingham. I do calls on weekends, in three languages, and I welcome family members on the line. That is how this should work.",
      email: "alexa@lmpfinancial.com",
      my1003appUrl: "https://alexaparramagalhaes.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en", "es", "pt"],
    },
    {
      slug: "jayne-bolton",
      name: "Jayne Bolton",
      nmls: "625008",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "I have been in mortgage long enough to remember when fax machines were the bottleneck. The tools change. The promise stays the same. I will close your loan on time and tell you the truth at every step. I specialize in reverse mortgages and refinances for retirement-age homeowners across our nine-state footprint, and I am the LO most likely to take a long phone call with your daughter on the line. That is exactly how it should work.",
      email: "jayne@lmpfinancial.com",
      my1003appUrl: "https://jaynebolton.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
    {
      slug: "lily-perez",
      name: "Lily Perez Cepeda",
      nmls: "1309126",
      role: "Loan Officer",
      // [DEMO COPY — pending client review]
      bio: "Hablo español. I work with families putting down their first roots in this country, and with neighbors who have been here for generations. Every story gets the same care, the same patience, the same calls answered after hours when life only allows after-hours calls. I close FHA, conventional, MassHousing DPA, and CHFA-CO programs across the Northeast and Colorado. I want your spouse, your mom, and your CPA on the call if that helps.",
      email: "lily@lmpfinancial.com",
      my1003appUrl: "https://lilyperezcepeda.my1003app.com/register",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en", "es"],
    },
    {
      slug: "brian-walsh",
      name: "Brian Walsh",
      nmls: "n/a",
      role: "Recruiter",
      // [DEMO COPY — pending client review — Brian is the contact for /careers per IBD §10]
      bio: "I help loan officers find their next chapter at LMP. Better splits, better wholesale access, real mentorship from Mike, in-person training in Lowell or fully remote, and bilingual marketing assets if you serve a Portuguese or Spanish community. We have UWM, Rocket Pro, and 30-plus wholesale lender relationships. If you are tired of a comp plan you cannot read or overlays that decline your borrowers for no reason, let's have a confidential intro call. Text me direct.",
      // [CONFIRM-WITH-CLIENT]
      email: "brian@lmpfinancial.com",
      my1003appUrl: "n/a",
      stateLicensure: ["[CONFIRM-WITH-CLIENT]"],
      languages: ["en"],
    },
  ],

  compliance: {
    smsOptInDisclaimer:
      "By checking this box, you agree to receive text messages from LMP Financial. You may reply STOP to opt-out at any time. Reply HELP for assistance. Messages and data rates may apply. Message frequency will vary. Learn more on our Privacy Policy Page & Terms of Use page.",
    brokerDisclosure:
      "MORTGAGE BROKER ONLY, NOT A MORTGAGE LENDER OR MORTGAGE CORRESPONDENT LENDER",
    adaStatement:
      "American with Disabilities Act (ADA) Statement: We at LMP Financial are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.",
    privacyPolicyLastUpdated: "January 1, 2025",
    termsOfUseLastUpdated: "January 1, 2025",
  },

  social: {
    linkedinPersonal: "https://www.linkedin.com/in/mike-comerford-aa134887/",
    linkedinCompany: "[CONFIRM-WITH-CLIENT]",
    instagram: "[CONFIRM-WITH-CLIENT]",
    facebook: "[CONFIRM-WITH-CLIENT]",
    youtube: "[CONFIRM-WITH-CLIENT]",
  },

  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Team", href: "/team" },
          { label: "Realtors", href: "/partners" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Loan Programs",
        links: [
          { label: "Fixed-Rate Mortgage", href: "/services/fixed-rate" },
          { label: "FHA Loan", href: "/services/fha" },
          { label: "VA Loan", href: "/services/va" },
          { label: "Jumbo Mortgage", href: "/services/jumbo" },
          { label: "Adjustable-Rate Mortgage", href: "/services/arm" },
          { label: "USDA Mortgage", href: "/services/usda" },
          { label: "First-Time Home Buyer", href: "/services/first-time-buyer" },
          { label: "Reverse Mortgage", href: "/services/reverse" },
          { label: "Interest-Only Mortgage", href: "/services/interest-only" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Calculators", href: "/calculators" },
          { label: "FAQ", href: "/faq" },
          { label: "Blog", href: "/blog" },
          { label: "Reviews", href: "/testimonials" },
          { label: "Service Areas", href: "/service-areas" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "(978) 453-LOAN", href: "tel:+19784535626" },
          { label: "info@lmpfinancial.com", href: "mailto:info@lmpfinancial.com" },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/mike-comerford-aa134887/",
          },
        ],
      },
    ],
    copyright: "© 2026 LMP Financial. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "ADA Accessibility Statement", href: "/ada-accessibility-statement" },
    ],
  },
};
