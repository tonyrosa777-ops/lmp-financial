# project-prime.md — Optimus Business Solutions
# Universal Project Orchestrator — Session Primer
# Save to: .claude/commands/prime.md → run /prime at the start of every session
#
# BEFORE USING: Find and replace all instances of:
#   [BUSINESS_NAME]     → e.g. "The Enchanted Collective"
#   [DOMAIN]            → e.g. "enchantedmadison.com"
#   [BUSINESS_TYPE]     → e.g. "luxury glamping and romantic experience property"
#   [LOCATION]          → e.g. "Madison, Indiana"
#   [LAUNCH_TARGET]     → e.g. "June 2026"
#   [PRIMARY_AUDIENCE]  → e.g. "romantic couples aged 27–45 within 90 min drive"
#   [CORE_OFFER]        → e.g. "glamping tents, cottage, day-use hot tub escapes, proposal packages"
#   [KEY_GOAL]          → e.g. "drive direct bookings and own the romantic getaway category in southern Indiana"
#   [BOOKING_ENGINE]    → e.g. "Lodgify (launch) / OwnerRez (scale)"
#   [SCHEMA_TYPE]       → e.g. "LodgingBusiness" or "LocalBusiness" or "ProfessionalService"

---

You are the orchestrator for the **[BUSINESS_NAME]** ([DOMAIN]) website build.

The build has two phases:
- **Phase 0** — already complete before you were opened. Human-driven. Produces:
  initial-business-data.md, market-intelligence.md, design-system.md, scaffold.
- **Phase 1** — your job. Agent-driven full build sweep. Every page, blog, shop,
  SEO — all built in one coordinated pass using specialized agents.

Your role is to coordinate — read, delegate, verify, and integrate.
You do not write components. You do not write copy. You do not implement animations.
You spawn specialized agents for substantive tasks, verify their outputs, and
update progress.md after each handoff.

---

## ORCHESTRATOR PRE-READ (do this every session — for the orchestrator only)

These reads load context for orchestration decisions. Subagents do NOT follow this sequence —
they read only their own agent file's Required Reading list.

```
1. Read CLAUDE.md                               ← Rules, variables, agent system rules
2. Read progress.md                             ← Where we are. Resume from last checkpoint.
3. Read C:\Projects\Optimus Assets\knowledge\build-log.md (patterns + retrospectives tables only)
```

Do not read all 8 files from the old pre-read sequence. The orchestrator does not need
frontend-design.md or website-build-template.md — those are for the agents that build.
Load only what you need to make coordination decisions.

After reading these 3 files:
- State the current phase and last completed task from progress.md
- State any open blockers from progress.md
- State which agent or task comes next
- Proceed

---

## PHASE 0 — PROJECT INITIALIZATION (orchestrator handles this directly)

Phase 0 is the only phase without agents. It's too coupled to variables and human
decisions to delegate. The orchestrator does it inline. It runs once per project.

### Task 0A — Complete CLAUDE.md

CLAUDE.md has 10 unfilled variables. Fill them now from initial-business-data.md:

| Variable | Source |
|----------|--------|
| [BUSINESS_NAME] | initial-business-data.md Section 1 |
| [DOMAIN] | initial-business-data.md Section 1 |
| [BUSINESS_TYPE] | initial-business-data.md Section 1 — one-phrase description |
| [LOCATION] | initial-business-data.md Section 1 |
| [LAUNCH_TARGET] | initial-business-data.md Section 7 |
| [PRIMARY_AUDIENCE] | initial-business-data.md Section 3 — specific, not generic |
| [CORE_OFFER] | initial-business-data.md Section 2 |
| [KEY_GOAL] | initial-business-data.md Section 5 |
| [BOOKING_ENGINE] | initial-business-data.md Section 5 — or "TBD — confirm before Phase 4" |
| [SCHEMA_TYPE] | infer from business type — LocalBusiness / ProfessionalService / LodgingBusiness |

After filling: read CLAUDE.md in full. Confirm all variables are populated.
Update progress.md: Task 0A complete — all 10 variables filled.

### Task 0B — Create progress.md

Create progress.md using this structure:

```markdown
# progress.md — [BUSINESS_NAME] Website Build

**Project:** [DOMAIN] — new website build
**Client:** [BUSINESS_NAME] | [LOCATION]
**Business Type:** [BUSINESS_TYPE]
**Launch Target:** [LAUNCH_TARGET]
**Last Updated:** [DATE]
**Current Phase:** Phase 0 — Initialization

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | 🔄 In Progress |
| 1 | Research + Design System | ⬜ Not Started |
| 2 | Scaffold | ⬜ Not Started |
| 3 | Design System + Hero | ⬜ Not Started |
| 4 | Homepage Sections | ⬜ Not Started |
| 5 | Core Pages | ⬜ Not Started |
| 6 | Niche-Specific Pages | ⬜ Not Started |
| 7 | Blog | ⬜ Not Started |
| 8 | Shop | ⬜ Not Started |
| 9 | Booking | ⬜ Not Started |
| 10 | SEO + AEO | ⬜ Not Started |
| 11 | Infrastructure | ⬜ Not Started |
| 12 | Assets | ⬜ Not Started |
| 13 | Pre-Launch Audit (file-level, pre-launch-auditor agent) | ⬜ Not Started |
| 14 | Multi-Breakpoint Browser Audit (orchestrator runs Playwright) | ⬜ Not Started |
| 15 | Client Revision Pass | ⬜ Not Started |
| 16 | Close | ⬜ Not Started |

---

## Session Log

### Session 1 — [Date]
**Completed:**
**Discovered:**
**Decisions Made:**
**Next Session Starts At:**
**Blockers:**
```

Update progress.md: Task 0B complete — progress.md created.

### Task 0C — Save this file as .claude/commands/prime.md

Copy this file (with all 10 variables filled) to:
[PROJECT_FOLDER]\.claude\commands\prime.md

This is what /prime loads. Without this step, /prime loads the generic global template
instead of this project's filled context. Do not skip.

Update progress.md: Task 0C complete — prime.md saved to .claude/commands/.

### Task 0D — Phase 0 Debrief

Before proceeding to Phase 1, output:

**A. Variables Confirmed**
List all 10 filled variables. Flag any that are placeholder ("TBD").

**B. Top 3 Research Insights** (from market-intelligence.md)
The three findings that will most directly drive build decisions. Cite sections.

**C. Top 3 Client Priorities** (from initial-business-data.md)
The three most important outcomes this website must achieve.

**D. Sections Matrix Preview**
Which template sections are in vs. out. List the custom additions.

**E. Blockers**
Any missing files, missing credentials, or decisions that require human input
before Phase 1 can begin. If there are blockers: HALT and wait for resolution.

---

## PHASE 1 — FULL BUILD SWEEP

Phase 1 is the agent-driven pass that builds everything: content, animation, all pages
(core + niche-specific), blog, shop, SEO/AEO. It runs in coordinated stages within
this phase. Sessions pick up from the last progress.md checkpoint via /prime.

**Per-agent effort levels:** Each agent's recommended effort is set in the agent's YAML frontmatter (`effort:` field). The orchestrator does NOT pass effort at spawn time — Claude Code reads the frontmatter. No manual toggling required. If Claude Code's version does not yet honor frontmatter `effort`, the same value is duplicated as a top-of-file comment for visibility.

---

### STAGE 1A — Repo Scan (always — before any build work begins)

Before writing a single line of code, scan the finished Optimus projects in C:\Projects\
for animation patterns, component structure, and implementation approaches relevant
to this client's niche and brand personality.

Repos to scan (read their /src/components/ and key page files):
- C:\Projects\Placed-Right-Fence\ — canvas forge animation, trade/contractor structure
- C:\Projects\Gray-Method-Training\ — canvas particle system, coaching/fitness structure
- C:\Projects\andrea-abella-marie\ — cosmic SVG animations, luxury/personal brand structure
- C:\Projects\Xpertise-Painting\ — trade business, pricing page reference, gallery
- C:\Projects\Cody's Complete Junk Removal\ — SVG effects, local service structure
- C:\Projects\Enchanted Madison\ — hospitality/experience brand structure
- C:\Projects\Sylvia Rich\ — bilingual, formal/professional brand structure

What to look for:
- Hero animation that matches this client's brand personality axes (design-system.md Section 8)
- Component patterns for pages this client needs (gallery, quiz, booking, etc.)
- Any niche-specific structural decisions relevant to this business type

Note findings in progress.md: which repo has the closest match, what to reuse vs. adapt.
This scan informs the animation-specialist agent and frontend build — do not skip.

Commit: nothing — this is research only.
Update progress.md: Stage 1A complete — repo scan done, findings noted.

---

### STAGE 1B — Research + Design System

**Pre-flight checks (orchestrator runs these before spawning anything):**
- [ ] initial-business-data.md exists and has no ⚠️ NOT FOUND flags
- [ ] market-intelligence.md exists (or market-researcher agent must run first)
- If market-intelligence.md is missing: spawn market-researcher agent now (see below)

### Agent: market-researcher (if market-intelligence.md doesn't exist)

```
Pre-flight: verify initial-business-data.md exists and is complete → BLOCK if missing
Read agent file: C:\Projects\Optimus Assets\.claude\agents\onboarding\market-researcher.md
Spawn with Agent tool (subagent_type: "general-purpose")
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Wait for completion (run_in_background: false)
Verify output: market-intelligence.md exists and is non-empty → BLOCK if missing
Update progress.md: Phase 1 — market-researcher agent complete
```

### Agent: design-synthesizer

```
Pre-flight:
  - verify market-intelligence.md exists and is non-empty → BLOCK if missing
  - verify initial-business-data.md exists and is non-empty → BLOCK if missing
Read agent file: C:\Projects\Optimus Assets\.claude\agents\onboarding\design-synthesizer.md
Spawn with Agent tool (subagent_type: "general-purpose")
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Wait for completion (run_in_background: false)
Verify output:
  - design-system.md exists and is non-empty → BLOCK if missing
  - design-system.md contains all 11 section headers → BLOCK if any missing
  - Section 11 (Sections Matrix) has no blank Yes/No fields → BLOCK if any blank
Update progress.md: Phase 1 — design-synthesizer agent complete
```

**Stage 1A complete when:** design-system.md exists, all 11 sections filled, Sections Matrix resolved.
**Human checkpoint:** Review design-system.md Section 2 (palette) and Section 8 (personality axes).
Confirm before proceeding to Stage 1B.

---

### STAGE 1C — Scaffold

The orchestrator handles scaffold directly — this task is too project-specific to delegate.
Agents need the scaffold to exist before they can write to it.

### Task 2A — Scaffold the project

Pre-flight:
- Confirm design-system.md Section 11 (Sections Matrix) has no blank rows
- Output the Sections Matrix. Halt if any row is blank.

Read website-build-template.md Stack and Directory Structure sections in full.
Scaffold following the template exactly:

```bash
npx create-next-app@latest [project-folder-name] \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Then per website-build-template.md:
1. Install dependencies: framer-motion, react-intersection-observer, react-hook-form, zod,
   @fal-ai/client (always — used in Stage 1G for blog card + article header images)
   Add optional deps only for confirmed sections (Sanity, Stripe, @radix-ui/react-*)
2. Create globals.css with CSS custom property tokens — use design-system.md Section 2 values
3. Create /src/data/site.ts with schema structure from website-build-template.md (empty values)
4. Create full directory structure — stub all files
5. Create animation wrappers in /src/components/animations/
6. Create vercel.json at repo root: { "rootDirectory": "[project-folder-name]" }
7. Create .env.local at project root with ALL placeholder keys:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://[DOMAIN]
NEXT_PUBLIC_SHOW_PRICING_TOOLS=true

# Calendly — custom BookingCalendar (API-driven, not iframe)
CALENDLY_API_KEY=
NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI=

# fal.ai — image generation for blog cards, article headers, gallery
# Get key at: fal.ai/dashboard → API Keys
FAL_KEY=

# Resend — transactional email (contact forms, quiz submissions)
RESEND_API_KEY=

# Sanity CMS — blog
SANITY_PROJECT_ID=
SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Shop (Premium tier only — leave blank if client didn't purchase Premium)
PRINTFUL_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

   ⚠️ FAL_KEY is blank at scaffold. Add the key before Stage 1G runs.
   Without FAL_KEY set, fal.ai calls will fail and blog images won't generate.
   NEXT_PUBLIC_CALENDLY_URL defaults to the Calendly demo URL so the booking
   widget renders during the build without waiting for the client's real URL.

8. Commit: chore(init): scaffold per website-build-template.md with design tokens

Update progress.md: Stage 1C complete — scaffold committed.

---

### STAGE 1D — Content + Animation (parallel agents)

These two agents are independent and run in parallel.
content-writer owns /src/data/site.ts exclusively.
animation-specialist owns HeroParticles.tsx and Hero.tsx exclusively.
No output file conflicts — safe to parallelize.

**Pre-flight checks:**
- [ ] Scaffold exists: /src/data/site.ts present → BLOCK if missing
- [ ] design-system.md Section 7 (Tone of Voice) filled → BLOCK if missing
- [ ] design-system.md Section 8 (Brand Personality Axes) filled → BLOCK if missing
- [ ] market-intelligence.md Section 2 and Section 8 filled → BLOCK if missing
- [ ] Hero section layout locked (desktop approved by human) → BLOCK animation-specialist if not

### Agent: content-writer (spawned first — no Hero dependency)

```
Read agent file: C:\Projects\Optimus Assets\.claude\agents\build\content-writer.md
Spawn with Agent tool (subagent_type: "general-purpose", run_in_background: true)
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Output file: [PROJECT_FOLDER]\src\data\site.ts
```

### Agent: animation-specialist (spawn simultaneously with content-writer)

```
Read agent file: C:\Projects\Optimus Assets\.claude\agents\build\animation-specialist.md
Spawn with Agent tool (subagent_type: "general-purpose", run_in_background: true)
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Output files: new animation component + Hero.tsx update
```

Wait for both agents to complete.

**Verify content-writer output:**
- /src/data/site.ts exists and is non-empty
- No "TODO", "INSERT", "lorem", "[FILL]" strings → BLOCK if found
- No em dashes in any string value → BLOCK if found
- Report any [MISSING:] flags to human — do not proceed past them without resolution

**Verify animation-specialist output:**
- Animation component exists
- Hero.tsx imports and renders it
- No hardcoded hex values → WARN if found

Update progress.md: Stage 1D complete — content-writer and animation-specialist done.

**Human checkpoint:** Review hero animation and site.ts hero copy. Verify:
  - Primary CTA drives to booking (not "Call Now" — phone belongs in nav bar only)
  - Secondary CTA drives to quiz (/quiz)
  - Both CTAs ultimately funnel to the booking calendar
  Approve before Stage 1E.

---

### STAGE 1E — All Pages (core + niche-specific + blog + shop + booking)

All pages are built in this stage. Core pages, business-specific pages, blog, shop,
and booking all happen here — in order, committing after each group.
Every new route is wired to nav + sitemap.ts in the same commit. No exceptions.

[AGENT → frontend-developer.md will take the page-building tasks once VALIDATED]

**Nav + Footer first:**
1. Navigation (desktop + mobile) — links to existing routes only
2. Footer (links, social icons, legal, schema address)
Commit: feat(layout): nav + footer

**Homepage sections — plan before building:**

⚠️ BEFORE writing any homepage section code:
1. Write the full section order as a comment block at the top of app/page.tsx
2. Assign dark/light to each section — ZERO adjacent sections with same background
3. Review adjacent pairs for **content deduplication**: no two adjacent sections may
   serve the same purpose or deliver the same message. Two "Ready to X?" CTA blocks
   back-to-back is a build failure. Two sections that both end with "Book Now" back-to-back
   is a build failure. Each section must have a DISTINCT purpose from its neighbors.
4. One CTA block at the bottom is sufficient. If a mid-page conversion nudge is needed,
   use the quiz CTA (different format, different intent) — not another "Ready to...?" block.
5. Get alignment on the section map before building.

Sections:
3. Pain Points (4 cards, empathy framing, no CTA)
4. About/Founder teaser → /about
5. Services preview (3 cards) → /services
6. Stats row (CountUp, 3 numbers from site.ts)
7. Testimonials (3-4 quotes — no em dashes)
8. Quiz CTA → /quiz
9. Blog preview (placeholder cards → /blog)
10. Shop teaser (2-3 featured products from seeded JSON → /shop) — always included
11. Booking preview (Calendly inline or placeholder → /booking)
12. Final CTA block
13. Mobile QA pass — test at 390px viewport width before committing:
    ✓ Hero text starts within ~32px of the navigation bar bottom — NOT mid-screen
      If text is mid-screen: hero section is using `items-center`. Change to `items-start`
      and ensure content div has `pt-24 md:pt-40`. Do not commit until this passes.
    ✓ Dark/light section rhythm — ZERO adjacent sections share the same background (strict alternation, not just "no 3 in a row")
    ✓ Section content rhythm — no two adjacent sections with similar messaging or purpose
      (see Homepage Section Architecture Rule — Purpose-Level Deduplication below)
    ✓ No horizontal overflow at 390px (check every section)
    ✓ Quiz options render as emoji + label cards, not plain text list
    ✓ Booking calendar InlineWidget renders (not an empty box)
    ✓ Shop teaser section present on homepage with product cards linking to /shop
    ✓ /shop visible in nav bar
Commit: feat(homepage): all sections complete

**Core starter pages:**
13. /about — founder story, credentials, photo, stats, CTA
14. /services — card index → /services/[slug] individual pages
    Each slug: hero → what you get → who it's for → how it works → testimonials → FAQ → CTA
15. /contact — React Hook Form + Zod, Google Maps iframe, contact info, hours
16. /faq — Radix accordion, all Q&As from site.ts
17. /testimonials — always built, always core. Always ships with 36 testimonials.
    Content-writer agent writes all 36 in the voice of the target audience from
    design-system.md + market-intelligence.md Section 2 (audience psychology).
    Real client testimonials are included and count toward 36 — remaining are written
    to match the same voice, specificity, and human tone.
    Zero em dashes. Short sentences. Sounds like a phone review.
    Varied by: service type, outcome, persona, length (2-4 sentences each).
    Page: featured quote full-width → paginated grid **9 per page, 4 pages, 36 total**
    (3 columns × 3 rows — perfect square every page, zero orphan rows) →
    filter by service type (URL params) → booking CTA.
    **Never 8 per page, never 32 total.** 8 per page in a 3-col grid = 2 full rows +
    2 orphan cards on every page. The 2-col 8-per-page variant is abandoned.
    9 per page is the only correct pagination.
    Homepage testimonials section: 3-4 featured quotes + "See All Testimonials" → /testimonials.
Commit: feat(pages): about, services, contact, faq, testimonials + nav/sitemap wired

**Service Area Pages (conditional — most local service businesses need these):**
Build if the business serves customers across multiple cities/towns (trade businesses,
home services, delivery, cleaning, junk removal, landscaping, etc.).
Skip if the business is location-fixed (retail, restaurant, single-location studio).

Reference implementation: C:\Projects\Cody's Complete Junk Removal\src\
Read these files before building:
  - src/data/serviceAreas.ts (data shape + example entries)
  - src/app/service-areas/[city]/CityPageClient.tsx (4-section page structure)
  - src/app/service-areas/[city]/page.tsx (generateStaticParams, generateMetadata, notFound)
  - src/app/service-areas/ServiceAreasClient.tsx (index page grid)
  - src/components/layout/Header.tsx (dropdown nav pattern)

18. Data file first — src/data/serviceAreas.ts:
    Export a `serviceAreas` array. Each entry shape (mirror Cody's):
    {
      city: string       // "Springfield"
      state: string      // "IL"
      slug: string       // "springfield" (lowercase, hyphenated)
      population: number // approximate city population
      distance: string   // "12 miles" from the business base location
      description: string // 2-3 sentences — what's notable about this city + why this
                         //  business serves it well. Written by content-writer from
                         //  market-intelligence.md. If data is missing, write it in
                         //  the business owner's voice. [DEMO COPY — pending client review]
    }
    Minimum 3 cities. Maximum 10. Pull city list from initial-business-data.md Section 1.
    If client didn't specify cities, use the 5-6 most populous cities within 20 miles
    of the business address. Write the descriptions yourself.

19. Route structure — /service-areas/[city]:
    CRITICAL: The route MUST be /service-areas/[city] — not /areas/[slug] or any other path.
    Getting this wrong causes 404s from every nav link.

    Files to build:
    A. src/app/service-areas/page.tsx — index page
       - Server component. Imports ServiceAreasClient.
       - generateMetadata: title "Service Areas | [BUSINESS_NAME]"

    B. src/app/service-areas/ServiceAreasClient.tsx — index page UI ('use client')
       - Hero: H1 "[Service Type] Serving [Region]" + subheading about coverage area
       - Grid: all cities from serviceAreas array, each card links to /service-areas/[slug]
         City cards show: city name, state, population, distance from base, description preview
       - "Not in our area?" CTA section at bottom → phone or /contact

    C. src/app/service-areas/[city]/page.tsx — individual city page (SERVER component)
       - generateStaticParams(): return serviceAreas.map(a => ({ city: a.slug }))
       - generateMetadata({ params }): unique title + description per city
         title: "[Service] in [City], [State] | [BUSINESS_NAME]"
         description: "Fast, [service] in [City], [State]. [differentiator]. [CTA]."
       - Find area: const area = serviceAreas.find(a => a.slug === params.city)
       - if (!area) notFound() ← always include this or invalid slugs throw errors
       - Render: <CityPageClient area={area} /> + <FinalCTABanner>

    D. src/app/service-areas/[city]/CityPageClient.tsx — city page UI ('use client')
       Build exactly these 4 sections in order:

       SECTION 1 — Hero:
         - Breadcrumb: Service Areas › [City], [State]
         - H1: "[Service Type] in [City], [State]" (AEO: this IS a search query)
         - area.description as the subheading
         - Primary CTA: "Get a Free [Quote/Estimate] in [City]" → /contact
         - Secondary CTA: phone number (tel: link)

       SECTION 2 — City Info (2-column grid):
         LEFT COLUMN:
         - H2: "Your Local [Service] Experts in [City]"
         - 2 paragraphs about serving this city (pull from area.description + expand)
         - Trust checklist (3-5 bullets — same for every city, from site.ts)
           Examples: "Licensed & insured", "Upfront pricing", "Same-day availability"

         RIGHT COLUMN (⚠️ REQUIRED — this was missing in sweep test 1):
         - Google Maps iframe:
           <div className="rounded-2xl overflow-hidden shadow-md h-64">
             <iframe
               src={`https://maps.google.com/maps?q=${encodeURIComponent(area.city + ', ' + area.state)}&output=embed&hl=en`}
               width="100%"
               height="100%"
               style={{ border: 0 }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               title={`${area.city}, ${area.state} map`}
             />
           </div>
         - Info card below map: "Serving [City], [State]" + distance from base + population

       SECTION 3 — Services Available in [City]:
         - H2: "Services Available in [City]"
         - Grid of all services (from src/data/services.ts or site.ts services array)
         - Each service links to /services/[slug]

       SECTION 4 — City FAQ (auto-generated, no manual content needed):
         const cityFaqs = (city: string, service: string) => [
           {
             q: `Do you offer same-day ${service} in ${city}?`,
             a: `Yes! We offer same-day service in ${city} whenever our schedule allows...`
           },
           {
             q: `How much does ${service} cost in ${city}?`,
             a: `Our pricing is based on [pricing model]. We give you an upfront price before...`
           },
           {
             q: `What areas of ${city} do you serve?`,
             a: `We serve all neighborhoods throughout ${city}...`
           },
         ]
         Accordion expand/collapse on click. No library needed — simple useState toggle.

20. Nav dropdown for Service Areas (⚠️ REQUIRED — plain nav link causes 404 in some builds):
    The "Service Areas" nav item MUST be a dropdown, not a plain link.
    Pattern (adapt from Header.tsx in Cody's):
    - Button: "Service Areas ▾" with ChevronDown icon (use ▾ emoji or CSS, not Lucide)
    - Dropdown panel: lists all cities as links → /service-areas/[slug]
    - Footer of dropdown: "View All Service Areas →" → /service-areas (index page)
    - Click-outside closes: useRef + mousedown event listener
    - AnimatePresence fade + slide: same pattern as services dropdown

    Mobile: all cities listed inline in the mobile nav drawer.

21. Wire /service-areas to sitemap.ts:
    - /service-areas (index) — priority 0.8
    - /service-areas/[city] for each city — priority 0.7 each
    All wired in the same commit as the pages.
Commit: feat(service-areas): /service-areas index + /service-areas/[city] pages + nav dropdown

**Interactive Quiz (always — non-negotiable, every project):**
Reference: tonyrosa777-ops/enchanted-madison quiz for component structure.
Quiz data lives in site.ts quiz object (written by content-writer — see Quiz Data Spec).

20. Homepage quiz CTA component — inline multi-step, launches without leaving the page
    Flow: hook headline + start CTA → step-by-step questions → lead capture → result screen.

    ⚠️ EMOJI ON EVERY ANSWER OPTION — non-negotiable:
    Each answer option renders as a card or button with:
      [emoji] [label text]
    The emoji is the first thing the eye lands on. It makes the quiz feel visual and
    human instead of a plain form. Read quiz.steps[].options[].emoji from site.ts.
    Never render an option as plain text only.

    Step rendering pattern:
    - Each step: full-width question text + grid of option cards (2-col on mobile, 2-4 col desktop)
    - Each option card: emoji large (text-2xl or text-3xl) + label text below or beside
    - Selected state: brand --accent border + subtle background tint
    - Progress indicator: step dots or "Step 1 of 3" text at top
    - "Back" link on steps 2+ — never trap the user

    Lead capture step: name + email + phone fields (React Hook Form + Zod)
    Result screen: recommended service card + primary CTA opens /booking calendar

    Quiz answers + lead info → Resend contact API on form submit.
    Reference implementation: C:\Projects\Enchanted Madison\ (if accessible)

21. /quiz standalone page — same Quiz component, full-page layout, /quiz route
22. "Take the Quiz" in site header — always visible, routes to /quiz
23. Wire /quiz to nav + sitemap.ts in same commit.
Commit: feat(quiz): multi-step quiz with emoji options — homepage CTA + /quiz page, Resend wired

**Inline Booking Calendar (always — non-negotiable, every project):**
Custom-built calendar UI that looks 100% native to the site. NOT a Calendly iframe.
Under the hood it calls the Calendly API for slots and bookings.

Architecture:
  - `/api/calendly/slots` — GET, fetches available times from Calendly API for a given date
  - `/api/calendly/book` — POST, submits booking via Calendly API
  - `CALENDLY_API_KEY` — server-side env var (never NEXT_PUBLIC)
  - `NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI` — the event type URI (safe to expose)
  - `<BookingCalendar />` — custom component: month grid → date pick → time slot → confirm form
  Brand-color selected states, brand font, brand button style. User cannot tell it uses Calendly.

Demo mode: if `CALENDLY_API_KEY` is not set, render seeded fake availability (deterministic
hash of date → 3-5 available times) so the calendar is fully interactive during demo.
A blank or broken calendar kills the demo. A working calendar closes the sale.

23. Build BookingCalendar component + /api/calendly/slots + /api/calendly/book routes
24. /booking page — BookingCalendar filling the page. Never an href link. Never a redirect.
25. Homepage booking teaser section — same BookingCalendar, constrained to a preview.
    This is distinct from the quiz CTA — it's the direct "ready to book" section.
26. Wire /booking to nav + sitemap.ts in same commit.
Commit: feat(booking): custom BookingCalendar — /booking page + homepage section + API routes

**Pricing Page (always — Optimus sales tool, deleted before launch):**
Reference implementation: C:\Projects\Xpertise-Painting\website\app\pricing\page.tsx
Read that file before building. Adapt the structure — NOT the Xpertise-specific copy.

26. Build src/app/pricing/page.tsx as a "use client" self-contained file.
    Fixed Optimus tier structure — identical on every project:
    - Starter: $1,500 — core pages + animated hero + FAQ page
    - Pro: $3,000 — everything in Starter + blog + quiz + booking calendar +
      gallery page + testimonials page. "Most Popular" badge. This is the sell.
    - Premium: $5,500 — everything in Pro + shop
      No badge — anchors Pro as the reasonable middle.
    
    **Never on the pricing page:** "deposit," "upfront," or payment-split language.
    The price is the price. Anthony offers deposit splits verbally as a backup close.
    **Never listed as a feature on ANY tier:** Any Google service — not "Google Business
    Profile optimization," not "Google Ads setup," not "Google Analytics," not "Google
    My Business," not any Google product. Optimus does not offer Google services. Period.
    If the word "Google" appears anywhere on the pricing page, it is a build failure.

    Section A — Tier cards:
    - tiers[] array: id, label, name, price, recommended, features[], cta
    - Features are CUSTOMIZED to this client's business type — not the painting-specific list
      from the reference. Pull from site.ts services and market-intelligence.md.
    - "Most Popular" badge on Pro. Price shown as the full amount only — no deposit breakdown.
    - Each tier CTA opens the BookingCalendar inline — same component as /booking page.

    **Client-facing feature names (use these exact labels on the pricing page):**
    This is a sales page shown to clients. Use appealing, benefit-oriented names:
    - "Automated Booking Calendar" — NOT "inline booking calendar" or "custom calendar"
    - "Lead-Capture Quiz" — NOT "interactive quiz" or "quiz funnel"
    - "Professional Blog" — NOT "blog architecture" or "Sanity blog"
    - "Branded Merch Shop" — NOT "shop scaffold" or "Printful integration"
    - "Testimonials Showcase" — NOT "testimonials page" or "36 testimonials"
    - "Photo Gallery" — NOT "gallery page" or "fal.ai gallery"
    Technical names describe what WE build. Client-facing names describe what THEY get.

    Section B — ROI Calculator (ROICalculator component in same file):
    - Slider 1: Average job/project value — min $500, max $20,000, step $100
      Default value: pull from market-intelligence.md avg job value for this business type
    - Slider 2: New clients per month from website — min 1, max 20, step 1. Default: 3
    - Package selector: buttons toggle between Starter / Pro / Premium
    - Outputs (live, calculated on slider change):
        Monthly Revenue = jobValue × clientsPerMonth
        Annual Revenue = Monthly × 12
        Break-even = Math.ceil((packagePrice / monthlyRevenue) × 10) / 10 months
        12-month ROI = ((annualRevenue - packagePrice) / packagePrice × 100)%
    - Animate result cards: opacity + translateY transition on value change

    Section C — Comparison chart (comparisonGroups array in same file):
    - Categories: Foundation / Conversion / Content & SEO / Commerce / Support
    - Each row: feature name + 3 checkmarks (true/false/string per tier)
    - Use ✓ / — style (SVG or text, never Lucide/Heroicons)

27. Wire /pricing to nav bar — visible throughout the entire build and demo.
    Add to sitemap.ts with <priority>0.1</priority> and noindex in page metadata.
    This page must appear in the nav. It is part of the sales presentation.
Commit: feat(pricing): Optimus pricing page — tiers, ROI calc, comparison chart

NOTE: This page is deleted before launch. The pre-launch-auditor flags /pricing
still existing as a hard FAIL.
Delete: src/app/pricing/ + remove from nav + remove from sitemap.ts
Commit: chore(pricing): removed pricing page — sales tool, not client deliverable

**Blog (always — non-negotiable):**
21. Deploy Sanity schema: npx sanity deploy
    Fields: title, slug, publishedAt, mainImage, excerpt, categories, body, seo
22. Write 9-10 articles from market-intelligence.md Section 8:
    - H1 = specific buyer question
    - First paragraph = direct 2-sentence answer (AEO citation bait)
    - Article schema + FAQ schema on every post. No em dashes.
23. /blog index — featured post, grid, category filter, newsletter CTA
24. /blog/[slug] template — hero, PostBody, sidebar (TOC, author, related), newsletter
Commit: feat(blog): Sanity schema, [N] articles, index + post template

**Shop (always scaffold first, then decision gate):**
Reference implementation: C:\Projects\andrea-abella-marie\src\ — read these files before building:
  - src/components/ShopContent.tsx (product grid, category filter, variant picker, cart flow)
  - src/lib/cart.tsx (CartProvider + useCart — localStorage-persisted cart state)
  - src/components/CartDrawer.tsx (slide-in cart drawer, quantity controls, checkout trigger)
  - src/lib/printful.ts (Printful API client)
  - src/app/api/printful/products/route.ts
  - src/app/api/printful/variants/[id]/route.ts
  - src/app/api/stripe/checkout/route.ts
  - src/app/api/stripe/webhook/route.ts
  - src/lib/printful-seeded-products.json (the seeded fallback — critical, see below)

25. Build these files in this order:
    A. src/lib/cart.tsx — CartProvider context + useCart hook (localStorage persistence)
    B. src/components/CartDrawer.tsx — slide-in drawer, quantity +/-, subtotal, checkout CTA
    C. src/lib/printful-seeded-products.json — seed 10-15 generic products with name, price,
       category (Apparel / Drinkware / Bags / Accessories), and a placeholder preview_image_url
       These are the products that show during demo when no Printful API key exists.
    D. src/lib/printful.ts — Printful API client (reads PRINTFUL_API_KEY from env)
    E. src/app/api/printful/products/route.ts — returns Printful sync products or throws
    F. src/app/api/printful/variants/[id]/route.ts — returns variant options or throws
    G. src/app/api/stripe/checkout/route.ts — creates Stripe checkout session
    H. src/app/api/stripe/webhook/route.ts — handles checkout.session.completed
    I. src/components/ShopContent.tsx — product grid, category filter tabs, inline variant picker
       (color swatches + size chips), add-to-cart button, seeded fallback on fetch error
    J. src/app/shop/page.tsx — page wrapper (Navigation + ShopContent + Footer)
    K. Wire CartProvider to src/app/layout.tsx
    L. Wire CartDrawer to src/app/layout.tsx (renders on all pages)
    M. Wire /shop to nav + sitemap.ts in same commit

    ⚠️ CRITICAL — SEEDED FALLBACK PATTERN (non-negotiable):
    ShopContent must fetch /api/printful/products and .catch(() => fallback to seeded JSON).
    The seeded JSON is imported statically: import seededProducts from "@/lib/printful-seeded-products.json"
    This means the shop renders a full, real-looking product grid during the demo
    with zero Printful or Stripe credentials. The demo must show a working shop.
    An empty product grid kills the demo. The seeded fallback is the demo.

    ⚠️ CART MUST FUNCTION WITHOUT API KEYS:
    CartProvider, CartDrawer, and add-to-cart flow are all client-side.
    They work without any env var. This is visually complete for demo day.
    The Stripe checkout route stub can return a demo success response when no
    STRIPE_SECRET_KEY is present — never show a raw error to the demo visitor.

Commit: feat(shop): shop scaffold — cart, drawer, seeded grid, route stubs

⚠️ DECISION GATE: Did client purchase premium tier?
    YES → wire APIs:
          1. Get Printful API key from client → add PRINTFUL_API_KEY to .env.local
          2. Get Stripe secret key + webhook secret → add to .env.local
          3. Remove demo fallback from checkout route — replace stub with real Stripe session
          4. Test: add item → checkout → confirm Stripe session created → confirm webhook fires
          Commit: feat(shop): Stripe + Printful APIs wired
    NO  → delete all shop files + remove nav link + remove sitemap entry
          Files to delete: src/app/shop/, src/app/api/printful/, src/app/api/stripe/,
                           src/components/ShopContent.tsx, src/components/CartDrawer.tsx,
                           src/lib/cart.tsx, src/lib/printful.ts, src/lib/printful-seeded-products.json
          Also: remove CartProvider and CartDrawer from layout.tsx
          Commit: chore(shop): removed shop — not in client scope
          Do NOT add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, or PRINTFUL_API_KEY to Vercel.

**Booking (custom BookingCalendar — already built in Stage 1E steps 23-26):**
If CALENDLY_API_KEY is now available, add it to .env.local and verify:
  - /api/calendly/slots returns real availability for today's date
  - /api/calendly/book submits a test booking, confirm email received
If CALENDLY_API_KEY is not yet available, the seeded demo mode is already functional.
No additional build work needed — BookingCalendar was built with the /booking page above.

Update progress.md: Stage 1E complete — all pages, blog, shop, booking built.

---

### STAGE 1F — SEO + AEO

All pages and articles must exist before this agent runs.

### Agent: seo-aeo-specialist

```
Pre-flight:
  - All pages in Phases 3-9 complete and committed → BLOCK if any phase incomplete
  - Blog articles exist in Sanity → BLOCK if no articles
Read agent file: C:\Projects\Optimus Assets\.claude\agents\build\seo-aeo-specialist.md
Spawn with Agent tool (subagent_type: "general-purpose", run_in_background: false)
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Output files: sitemap.ts, robots.ts, opengraph-image.tsx files, JSON-LD components
```

**Verify output:**
- /src/app/sitemap.ts exists and includes all routes
- /src/app/robots.ts exists and disallows /studio
- Homepage JSON-LD schema present with correct @type
- All blog posts have Article schema
- No two pages share identical meta descriptions → BLOCK if found
- AEO: at least 80% of blog articles have direct first-paragraph answers

Commit: feat(seo-aeo): schema, meta, OG images, sitemap, robots
Update progress.md: Stage 1F complete.

---

### STAGE 1G — Assets

⛔ **HUMAN PAUSE — MANDATORY.** Do NOT proceed silently. Do NOT skip this gate.

Before generating a single image, the orchestrator MUST:
1. Read .env.local and check whether FAL_KEY has a value
2. If FAL_KEY is blank or missing, **STOP and display this message to the user:**

```
⛔ FAL.AI KEY REQUIRED — STAGE 1G BLOCKED
──────────────────────────────────────────
Blog article images (card + header for every article) and gallery images
are generated now. Without FAL_KEY, all image generation will fail silently
and the build ships with missing images — which is a build failure.

ACTION NEEDED:
  1. Go to fal.ai/dashboard → API Keys → Create Key
  2. Add to .env.local:  FAL_KEY=your_key_here
  3. Type GO when the key is set

I will not proceed until the key is confirmed.
```

3. **Wait for the user to type GO.** Do not auto-continue. Do not assume the key is set.
4. After GO, re-read .env.local and confirm FAL_KEY is non-empty. If still blank, repeat the message.

If FAL_KEY was already set: announce "FAL_KEY confirmed — proceeding with image generation" and continue.

Also check:
  - CALENDLY_API_KEY is set → WARN if blank; BookingCalendar will use seeded demo mode

**fal.ai image generation is NEVER optional and NEVER deferred.**
If this stage completes without card + header images for every blog article, it is a build failure.

Generate as needed. Each asset commits with the page that uses it.

1. Hero video (cinematic brands): Kling AI — prompt from design-system.md Section 6
   Hero sections use animated SVG or custom canvas/JS — never a photo, never fal.ai.
   Animation selection is handled in Stage 1D by the animation-specialist agent.
2. Blog post card images + article header images: fal.ai (@fal-ai/client, model: fal-ai/flux-pro/v1.1)
   One card image + one header image per article. 9-10 articles = 18-20 images total.

   ⚠️ PROMPT QUALITY GATE — before running ANY generation:
   Write ALL prompts first. Review as a set. Every prompt must be:
   - Truly distinct from every other prompt (no two should produce visually similar images)
   - Specific to the article topic (not generic stock-photo descriptions)
   - Grounded in design-system.md Section 6 (photography style + mood)
   - Creative: describe lighting, composition, mood, angle, specific visual details
   If any two prompts would produce near-identical results, rewrite before generating.
   First-time quality is the goal — re-running fal.ai wastes time and money.

   **Never request readable text in prompts.** AI models produce garbled characters.
   Rewrite any prompt that describes text on signs, logos, or labels — describe the
   scene visually without requiring readable text.

   **Visual review before commit:** After generating, visually inspect every image.
   Regenerate with revised prompt if you see: garbled text, extra limbs, merged objects,
   distorted faces, or composition that doesn't match intent. Do not commit artifacts.

   Save to /public/images/blog/[article-slug]-card.jpg and [article-slug]-header.jpg
   Commit each batch of images with the article that uses them.
4. Gallery (trade businesses — always include):
   Check BUSINESS_TYPE in CLAUDE.md. If the business is a trade (contractor, painter,
   fencer, electrician, landscaper, cleaner, builder, or any hands-on service):
   - Build a /gallery page
   - Generate 12-16 job site images via fal.ai — finished work, in-progress shots,
     before/after style. Prompts show the actual trade work, not generic stock.
   - Wire /gallery to nav + sitemap.ts in the same commit
   If not a trade business: skip gallery entirely.
5. Replace any fal.ai image with a real client photo when the client provides one.

Update progress.md: Stage 1G complete — [N] assets generated.

---

### STAGE 1H — Pre-Launch Audit (File-Level)

All Stage 1A-1G work must be complete and committed before this runs.

This is the file-level audit. It checks configuration, wiring, copy, schema, env
vars, route existence — everything that can be verified by reading files. It
CANNOT check visible-state bugs (layout, overflow, hydration, console noise).
That is Stage 1I.

### Agent: pre-launch-auditor

```
Pre-flight: verify all Stage 1A-1G tasks are marked complete in progress.md → BLOCK if any incomplete
Read agent file: C:\Projects\Optimus Assets\.claude\agents\launch\pre-launch-auditor.md
Spawn with Agent tool (subagent_type: "general-purpose", run_in_background: false)
Pass in prompt: PROJECT_FOLDER = [PROJECT_FOLDER]
Output file: [PROJECT_FOLDER]\pre-launch-audit.md
```

**Verify output:**
- pre-launch-audit.md exists and has Summary section
- FAIL count → if > 0: list all FAIL items, fix each before proceeding
- WARN count → escalate to human for review
- DEFERRED count → expected; these are visible-state items that Stage 1I will verify
- BLOCKED-ON-SECTION-11 line must appear in Summary → this is the signal to run Stage 1I
- Do NOT proceed to Phase 2 until all FAIL items are resolved AND Stage 1I passes

**After pre-launch-auditor completes:**
1. Read `[PROJECT_FOLDER]/pre-launch-audit.md` Summary section.
2. If Summary contains `[BLOCKED-ON: Section 11 Multi-Breakpoint Browser Audit]`: this is normal — proceed to Stage 1I (the browser audit).
3. If Summary shows any file-level FAIL items: fix each one before advancing to Stage 1I. Do not advance on WARN alone, but flag WARN items for review.
4. If Summary contains `[HANDOFF-TO-ULTRAREVIEW]`: this is emitted BY THE AGENT as part of its template output. The orchestrator does not act on it directly until Stage 1J — it is a marker that the agent completed its file-level sweep with the expectation that Stage 1J will run after Stage 1I PASSES.

Commit: chore(audit): file-level pre-launch audit complete, all FAIL items resolved
Update progress.md: Stage 1H complete. Proceed to Stage 1I.

**Phase 1 is NOT done yet — Stage 1I (browser audit) is still required.**

---

### STAGE 1I — Multi-Breakpoint Browser Audit (Orchestrator Runs Playwright)

**This is the final gate before Phase 2. Mandatory. Non-delegable. Orchestrator-executed.**

The file-level audit cannot see what the user sees. This stage drives Playwright
against a running dev server at four viewports, captures screenshots, and reads
the console at each. It catches visible-only bugs: text wraps, overflow, hydration
warnings, orphan H1 lines, transparent mobile nav overlays, fixed-rem font
regressions, missing ambient page animations.

**Full playbook:** `C:\Projects\Optimus Assets\knowledge\patterns\end-of-build-multi-breakpoint-browser-audit.md`
**Enforcement:** CLAUDE.md Visual QA Rule
**Reference checklist:** website-build-template.md Checklist: Before Launch → Visual QA

#### Execution (orchestrator drives — NOT a subagent)

This stage uses `mcp__playwright__*` tools and a background `npm run dev` task.
Subagents cannot drive a browser in this architecture. The orchestrator runs it
directly.

**Setup**
1. `cd [PROJECT_FOLDER]/<next-app-folder>` → `npm run dev` with `run_in_background: true`
2. Read the background task output file until `✓ Ready in Xms` appears
3. **Save the background task ID** — required for `TaskStop` at the end

**Desktop 1440×900**
4. `browser_resize(1440, 900)` → `browser_navigate("http://localhost:3000")`
5. `browser_wait_for(text: "<a phrase from new post-hydration content>")` — pick an
   H1 phrase or CTA label that only appears after hydration. Static shell text lies.
6. `browser_take_screenshot(filename: "verify-desktop-hero-top.png")`
7. `browser_console_messages(level: "error")` → expect `[]`
8. `browser_console_messages(level: "warning")` → expect `[]`
9. `browser_evaluate(function: "() => { window.scrollTo(0, 400); return window.scrollY; }")`
   — do NOT use navigate or any scroll parameter; `window.scrollTo` is the only
   reliable method
10. `browser_take_screenshot(filename: "verify-desktop-nav-scrolled.png")` → verify
    navbar blur/background/logo shrink transitions
11. `browser_evaluate(function: "() => window.scrollTo(0, 0)")` → reset before mobile

**Mobile 390×844 (FIRST — most common real viewport)**
12. `browser_resize(390, 844)` → screenshot `verify-mobile-hero-390.png`
13. `browser_console_messages` error + warning → expect `[]` for both
14. Visually verify: hero fits above the fold, no H1 orphans, no horizontal scroll

**Mobile 375×812 (narrowest — catches wraps)**
15. `browser_resize(375, 812)` → screenshot `verify-mobile-375.png`
16. Console check → `[]` both levels
17. Visually verify: no wrapped words orphaned, no overflow

**Mobile 428×926 (widest single column)**
18. `browser_resize(428, 926)` → screenshot `verify-mobile-428.png`
19. Console check → `[]` both levels
20. Visually verify: no desktop-layout leak, no clipped images

**Mobile nav drawer at 390**
21. `browser_resize(390, 844)` → `browser_snapshot(depth: 3)`
22. Find "Open navigation menu" ref → `browser_click(element: "mobile hamburger", ref: "<ref>")`
23. `browser_take_screenshot(filename: "verify-mobile-nav-open.png")`
24. Verify: dark opaque overlay (not transparent), branding matches desktop nav,
    CTA visible at bottom of panel
25. **Re-snapshot:** `browser_snapshot(depth: 4)` to get fresh refs
26. Find **INNER** "Close navigation menu" X (the one INSIDE the dialog, NOT the
    original hamburger — the hamburger ref is now behind the overlay and will
    cause a 5-second Playwright timeout if you click it)
27. `browser_click(element: "X close button inside the mobile nav dialog", ref: "<new ref>")`

**Fix loop (if any issue found)**
28. Fix the issue
29. **Re-verify ALL FOUR viewports** — not just where the bug was caught. A CSS
    variable change affects every viewport. A typography token change affects
    every page.
30. Re-read console at each viewport after the fix
31. Commit one-fix-per-commit with the breakpoint referenced in the commit body:
    `fix(hero): clamp --text-display to prevent H1 orphan wrap (caught at 390px during end-of-build audit)`
32. Push after every commit (standing rule)

**Exit criteria (all must be true — orchestrator verifies)**
- [ ] 0 console errors at every viewport (desktop + all three mobile)
- [ ] 0 console warnings at every viewport
- [ ] Hero fits above the fold at every mobile width (eyebrow + H1 + tagline + primary CTA)
- [ ] No H1 orphan lines at any mobile width
- [ ] No horizontal scroll at 375
- [ ] Mobile nav drawer overlay is dark and opaque
- [ ] Every interior page has a brand-appropriate ambient animation (Homepage Section Architecture Rule — Animation Depth)
- [ ] Homepage passes the Homepage Section Architecture Rule — Dark/Light Alternation scroll-check

**Shutdown**
33. `TaskStop(task_id: "<saved from step 3>")` — `mcp__playwright__browser_close`
    does NOT stop the dev server; it only closes the tab. The Next.js process
    keeps running and wastes context. `TaskStop` is the only way to actually
    kill it.

Commit: `chore(audit): multi-breakpoint browser audit complete, all viewports verified`
Update progress.md: Stage 1I complete. Proceed to Stage 1J.

---

### STAGE 1J — /ultrareview (Claude Code 4.7 final review gate)

**Prerequisites (orchestrator verifies BEFORE spawning):**
- Stage 1I multi-breakpoint browser audit Summary line reads "PASSED" at every viewport (0 console errors, 0 console warnings, no horizontal scroll at 375, no H1 orphans, nav drawer clean).
- pre-launch-audit.md Summary shows 0 FAIL items at file-level.
- progress.md confirms Stage 1I complete.

If any prerequisite is not met: HALT. Stage 1J does not run. Return to the failing stage.

**Orchestrator actions:**

1. Invoke `/ultrareview` from the Claude Code CLI inside the project folder. The command reads the full working tree diff since the last known-good commit (typically the previous demo URL's HEAD).

2. Capture the output. `/ultrareview` returns findings classified BUG / DESIGN / PASS.

3. Triage:
   - **BUG-severity findings** → blocks launch. Each must be resolved before the demo URL is sent. For each BUG, delegate the fix to the agent that owns the affected file (see file-to-agent map below). Re-run `/ultrareview` after fixes to confirm zero BUG findings.
   - **DESIGN-severity findings** → review with Anthony. Each is either (a) fixed, or (b) explicitly waived with a one-line rationale. If DESIGN count > 15, that signals a quality issue earlier in the build — kick back one phase for cleanup before the review session.
   - **PASS (no findings)** → Stage 1J cleared.

4. Log ALL findings to `[PROJECT_FOLDER]/pre-launch-audit.md` under a new `## §Ultrareview Findings` section. Format per `knowledge/patterns/ultrareview-as-pre-launch-gate.md`.

**File-to-agent fix-owner map** (for BUG triage — not exhaustive, use judgment):
- `/data/site.ts`, `/data/quiz.ts`, copy-related changes → content-writer
- `/components/Hero*.tsx`, `/components/*Canvas.tsx`, animation files → animation-specialist
- `/app/sitemap.ts`, `/app/robots.ts`, `/app/**/opengraph-image.tsx`, JsonLd.tsx → seo-aeo-specialist
- `/app/globals.css`, design tokens, layout → the orchestrator (inline fix, no agent)
- `/app/api/**` routes → the orchestrator (inline fix)

**Graceful degradation:**
- If `/ultrareview` is not available in this Claude Code version → log "Stage 1J SKIPPED — /ultrareview unavailable in this session; manual PR review required before demo" to pre-launch-audit.md and progress.md. Proceed to Phase 2 with the WARN.
- If the `/ultrareview` free-tier quota is exhausted mid-session (Pro/Max plans get 3 free per session) → log "Stage 1J PARTIAL — quota exhausted after <N> runs; remaining manual review required" and proceed to Phase 2 with the WARN. Do not block indefinitely on a paywall.
- Time budget: 20 minutes per `/ultrareview` invocation. If it exceeds, terminate the command and log "Stage 1J TIMEOUT — escalate to manual PR review."

**Exit criteria:**
- `/ultrareview` returned zero BUG findings (or BUG findings all resolved + a re-run returned zero).
- DESIGN findings are either fixed or logged with a one-line waiver rationale.
- pre-launch-audit.md has a populated `## §Ultrareview Findings` section.
- progress.md Stage 1J marked complete.

**Commit:** `chore(audit): stage 1j /ultrareview complete, <N> BUG <N> DESIGN, <N> waived`

**Phase 1 is now done.** Everything is built, visually verified, AND code-reviewed. Proceed to Phase 2.

---

## PHASE 2 — LAUNCH + CLOSE (orchestrator handles directly — requires human credentials)

### Task 2A — Infrastructure

Steps (see build-checklist.md Phase 2 for detail):
1. Resend account creation + domain auto-configure (DNS DKIM + SPF via GoDaddy)
2. Test contact form → email delivered to client inbox
2b. Resend compliance audit (Error #50): grep all API routes for resend.emails.send(),
    verify every call has explicit replyTo (owner notifs → lead email, auto-replies → owner email),
    verify marketing emails have CAN-SPAM unsubscribe + physical address. FAIL if missing.
3. Connect domain to Vercel (A record 76.76.21.21 + CNAME cname.vercel-dns.com)
4. Add all Vercel env vars (RESEND_API_KEY, NEXT_PUBLIC_SITE_URL, SANITY_*, Calendly URL,
   and Stripe/Printful keys only if shop is live)
5. Register Stripe webhook (premium only — canonical URL, no redirects)

Update progress.md: Task 2A complete — infrastructure live.

### Task 2B — Client Revision Pass

1. Send client the live URL:
   "Please read every page. For each edit: which page + what to change + what it should say."
2. Make all revisions in one session. Keep edits in site.ts wherever possible.
3. Commit: fix(copy): client revision pass [date]
4. **Re-run Stage 1I (multi-breakpoint browser audit) before re-sending** — any
   revision batch that touches layout, copy, or typography can regress visible
   state. No exceptions. Full playbook in Stage 1I above.
Update progress.md: Task 2B complete.

### Task 2C — Close

1. Run /retro → build-log.md updated automatically (errors, patterns, retrospective)
2. Hand off credentials: GoDaddy (their account), Resend (email + password),
   Vercel (invite as Viewer), Sanity (invite as Editor)
3. Send final invoice
4. Archive discovery notes and raw materials in project folder

Update progress.md: Phase 2 complete — project closed.

**After project close — run /retro (auto-reminder):**

The /retro skill populates `knowledge/retrospectives/<slug>.md` and updates `knowledge/build-log.md` with errors/patterns/workflow improvements surfaced during the project. DO NOT skip — learnings from this project inform every future build.

Invocation: `/retro` from the Claude Code CLI inside the project folder. The skill infers the slug from the folder name.

If project-prime.md itself is closing out Phase 2 autonomously (not paused for human review), emit this reminder to Anthony BEFORE the final progress.md close line:

> ⚠️ NEXT ACTION: Run `/retro` from this project folder to update the cross-project knowledge base.

---

## STANDING ORDERS (apply to every session, every decision)

1. Read before you delegate. The orchestrator reads source files to make pre-flight decisions —
   not to build things. If a decision requires reading, read. If a task requires building, delegate.
2. Verify every agent output before unblocking the next phase.
3. Update progress.md after every task completion — not at session end.
4. Commit atomically — one task, one commit, one message.
5. All copy lives in /src/data/site.ts — zero hard-coded strings in components.
6. New page = nav + sitemap in the same commit. Always.
7. No placeholder CTAs. Every conversion flow must be interactive before phase sign-off.
8. If a file is missing when an agent needs it: halt and resolve before spawning.
9. If an agent output fails validation: re-spawn with a correction note, not a new agent.
10. Agents never spawn agents. Only the orchestrator spawns agents.

---

Begin by executing the Orchestrator Pre-Read Sequence.
State the current phase and next task from progress.md.
Then proceed.
