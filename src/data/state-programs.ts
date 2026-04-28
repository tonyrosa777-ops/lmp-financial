// src/data/state-programs.ts
//
// Phase 1F — State Pages Agent (2026-04-27).
//
// State-program operator data for LMP Financial's 9 licensed states.
// Drives /service-areas (index) and /mortgage-broker-[state] (dynamic per-state).
//
// Per market-intelligence.md §6 (AEO query gaps per state) + §9 Do #2 (publish 22+
// state-program operator pages with current 2026 figures by quarter-end). The
// state-program-operator-with-current-2026-figures wedge is one of the highest-
// leverage AEO plays — most competitors are running 2023-era figures.
//
// COMPLIANCE — every program below is flagged [FIGURES-CURRENT-AS-OF-2026-Q1] +
// [COMPLIANCE-REVIEW-PENDING] until verified against the agency website. Every
// state intro is [DEMO COPY — pending client review]. Per-state featured-LO
// arrays are [CONFIRM-WITH-CLIENT] — actual per-state LO licensure is a regulatory
// matter pending Mike's confirmation (CLAUDE.md Compliance Rule).
//
// Voice anchor (design-system.md §7): "Built like a Lowell handshake, runs like
// Stripe." First-person plural for LMP voice. No em dashes.

// ============================================================================
// SCHEMA
// ============================================================================

export type StateCode =
  | 'MA'
  | 'NH'
  | 'ME'
  | 'RI'
  | 'CT'
  | 'FL'
  | 'CO'
  | 'VT'
  | 'TX';

export type StateRegion =
  | 'New England'
  | 'Florida'
  | 'Mountain West'
  | 'Texas';

export type StateProgramType =
  | 'DPA'
  | 'First-Time'
  | 'MCC'
  | 'Below-Market-Rate'
  | 'First-Gen'
  | 'Veteran'
  | 'Essential-Worker';

export interface StateProgram {
  name: string;
  agency: string;
  agencyUrl: string;
  type: StateProgramType;
  downPaymentAssistance?: string;
  eligibility: string;
  flag?: string;
}

export interface StateInfo {
  code: StateCode;
  name: string;
  slug: string;
  region: StateRegion;
  primaryCity: string;
  programs: StateProgram[];
  featuredLOSlugs: string[];
  intro: string;
}

// ============================================================================
// DATA
// ============================================================================

const FIGURES_FLAG =
  '[FIGURES-CURRENT-AS-OF-2026-Q1 · VERIFY-WITH-AGENCY-WEBSITE · COMPLIANCE-REVIEW-PENDING]';

export const STATE_PROGRAMS: Record<StateCode, StateInfo> = {
  // ===========================================================================
  // MASSACHUSETTS
  // ===========================================================================
  MA: {
    code: 'MA',
    name: 'Massachusetts',
    slug: 'massachusetts',
    region: 'New England',
    primaryCity: 'Lowell',
    // [DEMO COPY — pending client review]
    intro:
      "Massachusetts is home. Our Lowell office sits five minutes from the Acre, ten from Centralville, and we work the Merrimack Valley, the South Shore, the Brazilian and Hispanic communities in Lawrence and Brockton, and the Cape every week. We close MassHousing DPA stacks, ONE Mortgage files, and FHA in three languages.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'aisha-barbosa', 'alexa-parra-magalhaes'],
    programs: [
      {
        name: 'MassHousing Mortgage with Down Payment Assistance',
        agency: 'Massachusetts Housing Finance Agency (MassHousing)',
        agencyUrl: 'https://www.masshousing.com/home-ownership/homebuyers',
        type: 'DPA',
        downPaymentAssistance: 'Up to $30,000',
        eligibility:
          'First-time buyers (or first-time in three years) with income at or below 135% AMI in select communities. Layered as a deferred second mortgage on a 30-year fixed first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'ONE Mortgage',
        agency: 'Massachusetts Housing Partnership (MHP)',
        agencyUrl: 'https://www.mhp.net/one-mortgage',
        type: 'First-Time',
        downPaymentAssistance: 'No PMI',
        eligibility:
          'Partner-bank program for first-time buyers under MHP income limits. 30-year fixed with no PMI and a publicly subsidized rate. Income tiers and county AMI caps apply.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'Operation Welcome Home',
        agency: 'MassHousing (Veteran-focused)',
        agencyUrl: 'https://www.masshousing.com/home-ownership/homebuyers',
        type: 'Veteran',
        downPaymentAssistance: 'Up to $30,000 (stackable)',
        eligibility:
          'Active duty service members, veterans, Gold Star families, and qualified surviving spouses. Pairs with VA or MassHousing first.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // NEW HAMPSHIRE
  // ===========================================================================
  NH: {
    code: 'NH',
    name: 'New Hampshire',
    slug: 'new-hampshire',
    region: 'New England',
    primaryCity: 'Manchester',
    // [DEMO COPY — pending client review]
    intro:
      "Salem, Nashua, Manchester, Concord. NH is fifteen minutes north of our Lowell HQ and our second-densest book of business. We stack NHHFA Home Flex Plus with the conventional first, run the Community Heroes Initiative for first responders, and we know the move-up market in southern NH cold.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'tim', 'edward'],
    programs: [
      {
        name: 'NHHFA Home Flex Plus',
        agency: 'New Hampshire Housing Finance Authority',
        agencyUrl: 'https://www.nhhfa.org/homebuyers/',
        type: 'DPA',
        downPaymentAssistance: 'Up to 4% of loan amount, forgivable',
        eligibility:
          'Purchase or refinance for borrowers under NHHFA income limits. Forgivable after four years of owner occupancy. Layered on conventional, FHA, VA, or RD first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'NHHFA Home Preferred Plus',
        agency: 'New Hampshire Housing Finance Authority',
        agencyUrl: 'https://www.nhhfa.org/homebuyers/',
        type: 'Below-Market-Rate',
        downPaymentAssistance: 'Up to 4% cash assistance',
        eligibility:
          'Conventional 30-year fixed at a below-market rate for buyers under NHHFA income limits. Reduced PMI tiers for income-qualifying buyers.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'NHHFA Home First',
        agency: 'New Hampshire Housing Finance Authority',
        agencyUrl: 'https://www.nhhfa.org/homebuyers/',
        type: 'First-Time',
        eligibility:
          'First-time homebuyer FHA with NHHFA income and purchase price limits. Pairs with Home Flex Plus DPA.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'NHHFA Community Heroes Initiative',
        agency: 'New Hampshire Housing Finance Authority',
        agencyUrl: 'https://www.nhhfa.org/homebuyers/',
        type: 'Essential-Worker',
        downPaymentAssistance: 'Up to 4% cash assistance',
        eligibility:
          'First responders, healthcare workers, and educators. Layered with Home Flex Plus or Home Preferred Plus.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'NHHFA First Generation Homebuyer',
        agency: 'New Hampshire Housing Finance Authority',
        agencyUrl: 'https://www.nhhfa.org/homebuyers/',
        type: 'First-Gen',
        downPaymentAssistance: '$10,000 (stackable)',
        eligibility:
          'Buyers whose parents have not owned a home in three or more years. Stacks on top of Home Flex Plus or Home Preferred Plus.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // MAINE
  // ===========================================================================
  ME: {
    code: 'ME',
    name: 'Maine',
    slug: 'maine',
    region: 'New England',
    primaryCity: 'Portland',
    // [DEMO COPY — pending client review]
    intro:
      "Portland to Bangor, the Midcoast and Down East, mobile-home and modular financing other shops walk away from. MaineHousing's First Home Loan plus Advantage stack is one of the most generous DPA structures in New England, and the new First Generation grant is a real wedge for buyers whose parents never owned. We close it.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'kwame', 'allen-carmody'],
    programs: [
      {
        name: 'MaineHousing First Home Loan',
        agency: 'Maine State Housing Authority (MaineHousing)',
        agencyUrl: 'https://www.mainehousing.org/programs-services/homebuyer/homebuyerdetail',
        type: 'First-Time',
        downPaymentAssistance: 'Below-market 30-year fixed rate',
        eligibility:
          'First-time buyers (or first-time in three years) under MaineHousing income limits. Pairs with the Advantage cash grant.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'MaineHousing Advantage',
        agency: 'Maine State Housing Authority',
        agencyUrl: 'https://www.mainehousing.org/programs-services/homebuyer/homebuyerdetail',
        type: 'DPA',
        downPaymentAssistance: '$5,000 cash grant',
        eligibility:
          'Stackable with First Home Loan. Cash toward down payment and closing costs. Income limits by household size and county.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'MaineHousing First Generation',
        agency: 'Maine State Housing Authority',
        agencyUrl: 'https://www.mainehousing.org/programs-services/homebuyer/homebuyerdetail',
        type: 'First-Gen',
        downPaymentAssistance: '$5,000 grant (stackable)',
        eligibility:
          'For buyers whose parents have not owned a home in three or more years. Stacks on top of First Home Loan + Advantage.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'MaineHousing Mobile Home Self-Insured Mortgage',
        agency: 'Maine State Housing Authority',
        agencyUrl: 'https://www.mainehousing.org/programs-services/homebuyer/homebuyerdetail',
        type: 'First-Time',
        eligibility:
          'Owner-occupied mobile and manufactured homes on owned land. Higher LTV than conventional manufactured-home programs typically allow.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // RHODE ISLAND
  // ===========================================================================
  RI: {
    code: 'RI',
    name: 'Rhode Island',
    slug: 'rhode-island',
    region: 'New England',
    primaryCity: 'Providence',
    // [DEMO COPY — pending client review]
    intro:
      "Providence, Cranston, Pawtucket, Newport, Woonsocket. RI is a dense first-time-buyer market and RIHousing has built one of the most layerable DPA stacks in the country: 15kDPA on top of FirstGenHomeRI on top of an MCC tax credit. We have closed all three on the same file.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'ryan', 'doug'],
    programs: [
      {
        name: 'RIHousing First-Time Homebuyer Loan',
        agency: 'Rhode Island Housing',
        agencyUrl: 'https://www.rihousing.com/homebuyer-programs/',
        type: 'First-Time',
        downPaymentAssistance: 'Below-market 30-year fixed rate',
        eligibility:
          'First-time buyers under RIHousing income and purchase price limits. Foundation product for the RI DPA stack.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'RIHousing 15kDPA',
        agency: 'Rhode Island Housing',
        agencyUrl: 'https://www.rihousing.com/homebuyer-programs/',
        type: 'DPA',
        downPaymentAssistance: '$15,000',
        eligibility:
          'Layered second on the RIHousing First-Time Homebuyer Loan. Forgivable after five years of owner occupancy.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'RIHousing Extra Assistance',
        agency: 'Rhode Island Housing',
        agencyUrl: 'https://www.rihousing.com/homebuyer-programs/',
        type: 'DPA',
        downPaymentAssistance: 'Up to $25,000 deferred second',
        eligibility:
          'Higher-amount alternative to 15kDPA for buyers needing more closing cost help. Repayable on sale or refinance.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'RIHousing FirstGenHomeRI',
        agency: 'Rhode Island Housing',
        agencyUrl: 'https://www.rihousing.com/homebuyer-programs/',
        type: 'First-Gen',
        downPaymentAssistance: '$25,000 forgivable',
        eligibility:
          'For first-generation homebuyers (parents have not owned in three or more years). Forgivable after five years. Stacks with 15kDPA on the same file.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'RIHousing FirstHomes Tax Credit (MCC)',
        agency: 'Rhode Island Housing',
        agencyUrl: 'https://www.rihousing.com/homebuyer-programs/',
        type: 'MCC',
        eligibility:
          'Mortgage Credit Certificate. Federal tax credit equal to a percentage of mortgage interest paid. Reduces effective mortgage cost annually for the life of the loan.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // CONNECTICUT
  // ===========================================================================
  CT: {
    code: 'CT',
    name: 'Connecticut',
    slug: 'connecticut',
    region: 'New England',
    primaryCity: 'Hartford',
    // [DEMO COPY — pending client review]
    intro:
      "Hartford, New Haven, Bridgeport, Stamford, the Fairfield County jumbo market. CHFA Time To Own can put up to $50,000 of forgivable cash toward a first home, layered on the CHFA first. Most retail lenders treat CT bond programs as a checkbox. We treat them as the file.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'nick-anastasi', 'jamal-azweem'],
    programs: [
      {
        name: 'CHFA Time To Own',
        agency: 'Connecticut Housing Finance Authority',
        agencyUrl: 'https://www.chfa.org/homebuyers-homeowners/',
        type: 'DPA',
        downPaymentAssistance: 'Up to $50,000 forgivable',
        eligibility:
          'First-time buyers in CT high-opportunity census tracts. Forgivable over 10 years (10% per year). Layered on CHFA HFA Advantage or HFA Preferred first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA Down Payment Assistance Program (DAP)',
        agency: 'Connecticut Housing Finance Authority',
        agencyUrl: 'https://www.chfa.org/homebuyers-homeowners/',
        type: 'DPA',
        downPaymentAssistance: 'Up to $25,000',
        eligibility:
          'Second mortgage at 1% interest, repayable monthly. For CHFA-eligible buyers needing down payment plus closing-cost coverage. Income and purchase price limits apply.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA HFA Advantage / HFA Preferred',
        agency: 'Connecticut Housing Finance Authority',
        agencyUrl: 'https://www.chfa.org/homebuyers-homeowners/',
        type: 'Below-Market-Rate',
        eligibility:
          'Below-market conventional 30-year fixed for income-qualifying first-time buyers. Reduced PMI tiers. Foundation product for CHFA DPA stacks.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // VERMONT
  // ===========================================================================
  VT: {
    code: 'VT',
    name: 'Vermont',
    slug: 'vermont',
    region: 'New England',
    primaryCity: 'Burlington',
    // [DEMO COPY — pending client review]
    intro:
      "Burlington, South Burlington, Montpelier, Rutland. Vermont is a small market with an outsized DPA toolkit. VHFA stacks MOVE plus ASSIST plus First Generation on a single file, and the MOVE MCC layers a federal tax credit on top of all of it. We close them.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'rocco', 'tim'],
    programs: [
      {
        name: 'VHFA MOVE',
        agency: 'Vermont Housing Finance Agency',
        agencyUrl: 'https://www.vhfa.org/homebuyers',
        type: 'First-Time',
        downPaymentAssistance: 'Below-market 30-year fixed rate',
        eligibility:
          'Purchase program for first-time buyers (or first-time in three years) under VHFA income limits. Foundation product for VHFA DPA stacks.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'VHFA MOVE MCC',
        agency: 'Vermont Housing Finance Agency',
        agencyUrl: 'https://www.vhfa.org/homebuyers',
        type: 'MCC',
        eligibility:
          'Mortgage Credit Certificate paired with the MOVE first. Federal tax credit on a portion of mortgage interest paid annually, for the life of the loan.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'VHFA ADVANTAGE',
        agency: 'Vermont Housing Finance Agency',
        agencyUrl: 'https://www.vhfa.org/homebuyers',
        type: 'Below-Market-Rate',
        eligibility:
          'Reduced PMI conventional 30-year fixed for VHFA-eligible buyers. Lower monthly payment than market-rate conventional with similar credit.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'VHFA ASSIST',
        agency: 'Vermont Housing Finance Agency',
        agencyUrl: 'https://www.vhfa.org/homebuyers',
        type: 'DPA',
        downPaymentAssistance: 'Up to $15,000',
        eligibility:
          'Second mortgage at 0% interest. Repayable on sale or refinance. Stacks with MOVE or ADVANTAGE first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'VHFA First Generation',
        agency: 'Vermont Housing Finance Agency',
        agencyUrl: 'https://www.vhfa.org/homebuyers',
        type: 'First-Gen',
        downPaymentAssistance: '$15,000 grant (stackable)',
        eligibility:
          'For buyers whose parents have not owned a home in three or more years. Stacks on top of MOVE plus ASSIST.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // FLORIDA
  // ===========================================================================
  FL: {
    code: 'FL',
    name: 'Florida',
    slug: 'florida',
    region: 'Florida',
    primaryCity: 'Tampa',
    // [DEMO COPY — pending client review]
    intro:
      "Tampa, Miami, Orlando, Cape Coral, Naples, Jacksonville. Florida is the snowbird market, the condo market, and the essential-worker market. Hometown Heroes puts $35,000 of DPA on the table for nurses, teachers, firefighters, police, and EMS. Non-warrantable condo financing scares retail lenders. It does not scare us.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'scott-jones', 'ryan-mcconihe'],
    programs: [
      {
        name: 'Florida Hometown Heroes',
        agency: 'Florida Housing Finance Corporation',
        agencyUrl: 'https://www.floridahousing.org/programs/homebuyer-overview-page',
        type: 'Essential-Worker',
        downPaymentAssistance: 'Up to $35,000 (5% of first mortgage, capped)',
        eligibility:
          'Full-time Florida workforce in eligible essential occupations: nurses, teachers, firefighters, police, EMS, military, and many others. Income up to 150% AMI by county.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'Florida Assist',
        agency: 'Florida Housing Finance Corporation',
        agencyUrl: 'https://www.floridahousing.org/programs/homebuyer-overview-page',
        type: 'DPA',
        downPaymentAssistance: 'Up to $10,000',
        eligibility:
          'Second mortgage, deferred 0% interest. Repayable on sale, refinance, or transfer. Layered on Florida Housing first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'Florida HFA Preferred / HFA Advantage Plus',
        agency: 'Florida Housing Finance Corporation',
        agencyUrl: 'https://www.floridahousing.org/programs/homebuyer-overview-page',
        type: 'Below-Market-Rate',
        eligibility:
          'Conventional 30-year fixed at a competitive rate for income-qualifying first-time buyers. Reduced PMI tiers. Pairs with Florida Assist DPA.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'Salute Our Soldiers Military Loan Program',
        agency: 'Florida Housing Finance Corporation',
        agencyUrl: 'https://www.floridahousing.org/programs/homebuyer-overview-page',
        type: 'Veteran',
        downPaymentAssistance: 'Pairs with Florida Assist or Hometown Heroes',
        eligibility:
          'Active duty military, veterans, and qualified surviving spouses. Below-market first paired with DPA second. Available statewide regardless of first-time buyer status.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // COLORADO
  // ===========================================================================
  CO: {
    code: 'CO',
    name: 'Colorado',
    slug: 'colorado',
    region: 'Mountain West',
    primaryCity: 'Denver',
    // [DEMO COPY — pending client review]
    intro:
      "Denver, Boulder, Aurora, Colorado Springs, the Front Range. CHFA-CO updated income limits in January 2026 and the metroDPA forgivable second is one of the most layerable assistance programs in the country. We pair CHFA Preferred with metroDPA on the same file, and we know the high-cost-county jumbo dance in Boulder cold.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford-jr', 'lily-perez', 'allen-carmody'],
    programs: [
      {
        name: 'CHFA-CO FirstStep',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'First-Time',
        downPaymentAssistance: 'Below-market FHA',
        eligibility:
          'First-time buyers (or first-time in three years) under CHFA income limits. FHA-backed. Foundation product for CHFA-CO DPA stacks.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA-CO FirstGeneration',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'First-Gen',
        downPaymentAssistance: '$25,000 (with affidavit)',
        eligibility:
          'First-generation buyers (parents have not owned in three or more years). Affidavit-based qualification. Stacks with FirstStep or Preferred.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA-CO SmartStep',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'Below-Market-Rate',
        eligibility:
          'Conventional below-market alternative to FirstStep. For buyers slightly above CHFA-FHA limits. Pairs with CHFA-CO DPA second mortgages.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA-CO Preferred',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'Below-Market-Rate',
        eligibility:
          'Reduced-PMI conventional 30-year fixed for income-qualifying buyers. Common pairing with metroDPA in Denver-metro.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA-CO SectionEight Homeownership',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'First-Time',
        eligibility:
          'For Section 8 voucher recipients converting to homeownership. Specialized underwriting. Income from voucher counted toward DTI per HUD guidance.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'CHFA-CO HomeAccess',
        agency: 'Colorado Housing and Finance Authority',
        agencyUrl: 'https://www.chfainfo.com/homeownership',
        type: 'DPA',
        downPaymentAssistance: 'Up to $25,000',
        eligibility:
          'For buyers with permanent disabilities or families with a member with a permanent disability. Layered on CHFA first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'metroDPA',
        agency: 'Denver-Metro Cities and Counties',
        agencyUrl: 'https://www.metrodpa.org/',
        type: 'DPA',
        downPaymentAssistance: 'Up to 6% forgivable',
        eligibility:
          'Forgivable second mortgage available across Denver, Adams, Arapahoe, Boulder, Broomfield, Douglas, and Jefferson counties. Forgivable over three years. Stacks with CHFA-CO Preferred or SmartStep.',
        flag: FIGURES_FLAG,
      },
    ],
  },

  // ===========================================================================
  // TEXAS
  // ===========================================================================
  TX: {
    code: 'TX',
    name: 'Texas',
    slug: 'texas',
    region: 'Texas',
    primaryCity: 'Houston',
    // [DEMO COPY — pending client review]
    intro:
      "Houston, Dallas, Austin, San Antonio, the Rio Grande Valley. Texas runs two parallel state housing systems (TSAHC and TDHCA), each with its own DPA, MCC, and essential-worker program. Bilingual files close faster here than anywhere else in our footprint, and we have closed Homes for Texas Heroes for teachers, EMS, firefighters, and police.",
    // [CONFIRM-WITH-CLIENT — actual per-state LO licensure unconfirmed]
    featuredLOSlugs: ['mike-comerford', 'david-serrano', 'juan'],
    programs: [
      {
        name: 'TSAHC Homes for Texas Heroes',
        agency: 'Texas State Affordable Housing Corporation',
        agencyUrl: 'https://www.tsahc.org/homebuyers-renters/down-payment-assistance',
        type: 'Essential-Worker',
        downPaymentAssistance: 'Up to 5% of loan amount (grant or repayable)',
        eligibility:
          'Teachers, firefighters, EMS, police, corrections officers, veterans. Statewide. Income limits by county. Layered on FHA, VA, USDA, or conventional first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'TSAHC Home Sweet Texas',
        agency: 'Texas State Affordable Housing Corporation',
        agencyUrl: 'https://www.tsahc.org/homebuyers-renters/down-payment-assistance',
        type: 'DPA',
        downPaymentAssistance: 'Up to 5% (grant or repayable)',
        eligibility:
          'General DPA program for Texas buyers under TSAHC income limits. No essential-worker requirement. Layered on FHA, VA, USDA, or conventional first.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'TSAHC MCC',
        agency: 'Texas State Affordable Housing Corporation',
        agencyUrl: 'https://www.tsahc.org/homebuyers-renters/down-payment-assistance',
        type: 'MCC',
        eligibility:
          'Mortgage Credit Certificate. Federal tax credit on a percentage of mortgage interest paid annually for the life of the loan. Stacks with Homes for Texas Heroes or Home Sweet Texas.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'TDHCA My First Texas Home',
        agency: 'Texas Department of Housing and Community Affairs',
        agencyUrl: 'https://www.tdhca.texas.gov/homebuyer-programs',
        type: 'First-Time',
        downPaymentAssistance: 'Up to 5%',
        eligibility:
          'First-time buyers under TDHCA income limits. Below-market first plus DPA second. Targeted areas may waive first-time buyer requirement.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'TDHCA My Choice Texas Home',
        agency: 'Texas Department of Housing and Community Affairs',
        agencyUrl: 'https://www.tdhca.texas.gov/homebuyer-programs',
        type: 'DPA',
        downPaymentAssistance: 'Up to 5%',
        eligibility:
          'No first-time buyer requirement. Open to repeat buyers under TDHCA income limits. Same DPA structure as My First Texas Home.',
        flag: FIGURES_FLAG,
      },
      {
        name: 'TDHCA MCC',
        agency: 'Texas Department of Housing and Community Affairs',
        agencyUrl: 'https://www.tdhca.texas.gov/homebuyer-programs',
        type: 'MCC',
        eligibility:
          'TDHCA-issued Mortgage Credit Certificate. Federal tax credit on a percentage of mortgage interest paid annually for the life of the loan.',
        flag: FIGURES_FLAG,
      },
    ],
  },
};

export const STATES_BY_REGION: Record<StateRegion, StateCode[]> = {
  'New England': ['MA', 'NH', 'ME', 'RI', 'CT', 'VT'],
  Florida: ['FL'],
  'Mountain West': ['CO'],
  Texas: ['TX'],
};

// Display order for regions on /service-areas
export const REGION_ORDER: StateRegion[] = [
  'New England',
  'Mountain West',
  'Texas',
  'Florida',
];
