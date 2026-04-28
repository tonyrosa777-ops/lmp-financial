# progress.md — LMP Financial Website Build

**Project:** lmpfinancial.com — full redesign / conversion-optimization rebuild
**Client:** LMP Financial | Lowell, Massachusetts (licensed in MA, NH, ME, RI, CT, FL, CO, VT, TX)
**Business Type:** Licensed independent mortgage broker (multi-LO shop, 22 LOs + 1 recruiter)
**Launch Target:** TBD post-Tuesday demo (2026-04-28)
**Last Updated:** 2026-04-27
**Current Phase:** Phase 1G — Sanity Blog + Brand Assets + Homepage Restructure (✅ complete) → ready for Phase 1H (real LO portraits + fal.ai blog imagery + Playwright multi-breakpoint audit)
**Repo:** https://github.com/tonyrosa777-ops/lmp-financial

---

## 🚦 PRE-LAUNCH CHECKLIST — read this if Mike buys

This is the consolidated list of every item that must close before lmpfinancial.com (the new build) goes to production. Compiled from Sessions 1–6 open flags. Every item here is a hard gate — pre-launch-auditor blocks publish until each is resolved.

### A. Compliance / regulatory (LMP IT firm review channel)

- [ ] **LMP IT firm intro** — pending from Mike per IBD §9D, requested 2026-04-25. Without this channel open, NONE of the items below in this section can resolve.
- [ ] **Loan-program page copy** — all 9 programs flagged `[COMPLIANCE-REVIEW-PENDING]`. Each program page (FHA, VA, Jumbo, ARM, USDA, First-Time Buyer, Reverse, Interest-Only, Fixed-Rate) needs sign-off before publish.
- [ ] **22 LO bios** flagged `[DEMO COPY — pending client review]`. Mike, Doug, and Juan have real published bios on the live site — content-writer should align those 3 first when published bios are received. Other 19 are invented in voice.
- [ ] **36 testimonials** flagged `[DEMO COPY — pending client review]`. Mike's review export from Google/Zillow/Experience.com (requested for Tuesday) replaces these or seeds the real pool.
- [ ] **Quiz questions** all flagged `[COMPLIANCE-REVIEW-PENDING]`. State + life-situation + credit + DTI questions need IT firm signoff because their phrasing borders on regulatory advice.
- [ ] **5 native calculators** all flag `[NOT-A-COMMITMENT]` and `[COMPLIANCE-REVIEW-PENDING]`. Calculator OUTPUTS are estimates only; their language needs review.
- [ ] **State program copy** for 9 state pages — all 41 programs flagged `[FIGURES-CURRENT-AS-OF-2026-Q1 · VERIFY-WITH-AGENCY-WEBSITE · COMPLIANCE-REVIEW-PENDING]`. State agency websites change figures quarterly. Must verify each of: MassHousing $30K, NHHFA programs, MaineHousing First Home, RIHousing 15kDPA, CHFA Time To Own $50K, VHFA MOVE+MCC, FL Hometown Heroes $35K, TSAHC + TDHCA Texas, CHFA-CO + metroDPA.
- [ ] **Comp transparency block on `/careers`** — published comp range "220–275 bps anchored to NEXA's published comp" needs Mike's final sign-off before publish.
- [ ] **Per-LO `stateLicensure` arrays** — currently every LO has `["[CONFIRM-WITH-CLIENT]"]` placeholder. Mike confirms which LO is licensed in which state(s) BEFORE any LO landing page goes live. Copy that implies a LO operates in a state they're not licensed in is a regulatory violation. This also gates whether per-LO state licensure can be added to the `Person` JSON-LD schema.
- [ ] **Legal pages — 5 source typos** preserved verbatim from live source. IT firm decides whether to fix:
  - "interested-based" → should be "interest-based"?
  - "MSL's" → should be "MLS's"?
  - sentence-merge typos: "Website.You" / "data.You" / "Property.If" / "otherwise.To" / "rights.Your" — missing spaces after periods
  - run-on grammar in eligibility sentence: "users who 18 years of age or older, and reside in the United States or any of its territories or possessions and."
  - duplicate "Limitation on Time to File Claims" section — appears twice in a row on live source
- [ ] **Quantifiable claims** need sourcing before publish:
  - "14-day average closing time" `[SOURCING-REQUIRED]`
  - "4.9 / 5 average rating" `[SOURCING-REQUIRED]`
  - "100+ five-star reviews" / "120+ reviews" — pick one, source it
  - "20+ years of experience" / "3 decades" / "10 years" — site contradicts itself across 3 places, pick one and source
  - "$10,662 average lifetime savings vs retail" — Polygon Research / UWM 2023 HMDA citation included; verify currency

### B. Client-confirm items (resolve at Tuesday demo or follow-up calls)

- [ ] **Per-LO Calendly URIs** — currently empty in `siteConfig.loanOfficers[].calendlyUri`. Mike provides real per-LO Calendly URIs Tuesday. Once provided, BookingCalendar swaps from demo-mode seeded availability to live API.
- [ ] **Per-LO state licensure** (also in Compliance section above — both gates).
- [ ] **Phone number** — `(978) 453-LOAN` is `[DEMO COPY]`. IBD §1 has no verified published number. Get real main line + Mike's direct + Brian Walsh's direct.
- [ ] **Brian Walsh contact** — flagged `[CONFIRM-WITH-CLIENT]`. Needs verified email + ideally direct mobile for `/careers` recruiting CTAs.
- [ ] **Founded year** — site contradicts itself: homepage video says "more than 3 decades," About says "more than ten years," stats says "20+ years." Mike confirms ONE answer.
- [ ] **Bonzo CRM decision** — keep / replace with n8n / parallel. Confirm Tuesday.
- [ ] **Logo PNG with transparent background** — required as fallback if hero canvas (KeyringCanvas) ever needs the LogoParticles fallback per CLAUDE.md Hero Architecture Rule step 5.
- [ ] **Company social handles** — Instagram, Facebook, LinkedIn company page, YouTube — all `[CONFIRM-WITH-CLIENT]` in `siteConfig.social`.
- [ ] **Existing analytics** — confirm what's currently tracked on the live site (GA4, Meta pixel, Google Tag Manager). Phase 2A wires equivalent on the new build.

### C. Asset-pending items (Phase 1G fal.ai pipeline OR client-supplied)

- [ ] **Mike Comerford portrait** — referenced in `AboutSection.tsx` with `[ASSET-PENDING — Mike portrait]` placeholder. fal.ai-generated OR real photo from Tuesday.
- [ ] **22 LO portrait images** — every LO landing page currently shows initials in a circular accent disk. Real headshots OR fal.ai-generated.
- [x] **Equal Housing Lender SVG** — Phase 1G shipped `/public/equal-housing-lender.svg` (recreated regulatory mark). **PRE-LAUNCH still requires HUD-sourced official artwork** — the placeholder comment in the SVG file documents this. IT firm review required before publish.
- [x] **`/public/logo.svg`** — Phase 1G shipped wordmark SVG (LMP in deep navy + gold underline + FINANCIAL mono). Schema markup updated. Real client logo replaces when provided.
- [x] **OG image** — Phase 1G shipped `src/app/opengraph-image.tsx` (1200×630 dynamic via Next.js `ImageResponse`). Schema markup references `/opengraph-image` (no `.jpg` placeholder).
- [x] **Favicon** — Phase 1G shipped `src/app/icon.tsx` (32×32 dynamic).
- [ ] **Blog card + header images** for the 9–10 articles — fal.ai-generated per CLAUDE.md Image Generation Rule. Cards 1200×630 (OG-spec), headers 2400×1200.
- [ ] **Partner co-marketing kits PDF set** — `[ASSET-PENDING — kits PDF set, Phase 1G]` referenced on `/partners`. Real PDFs delivered to clients on signup OR removed from copy if not built.

### D. Code-incomplete items (require Phase 2A wiring or Phase 1G build)

- [ ] **`/api/contact`** route — every contact form (LO contact, /partners, /careers, /contact) posts here; route doesn't exist yet. Phase 2A wires Resend transactional email.
- [ ] **`/api/calendly/slots` and `/api/calendly/book`** — exist but return seeded fake data when no `CALENDLY_API_KEY`. Phase 2A wires real Calendly API.
- [ ] **`CALENDLY_API_KEY`** env var — required for live booking.
- [ ] **`RESEND_API_KEY`** env var — required for `/api/contact`.
- [x] **Sanity blog wiring** — Phase 1G shipped `next-sanity` install + client + queries + schema + `/studio` route + real `/blog` + `/blog/[slug]` pages with JSON fallback. Demo mode works WITHOUT `NEXT_PUBLIC_SANITY_PROJECT_ID`. Mike provisions Sanity → drop env vars in `.env.local` → components automatically switch to live GROQ.
- [ ] **Real blog articles beyond the 3 seeds** — Phase 1G shipped 3 seed articles (FHA vs Conventional in NH, MassHousing $30K DPA Explained, Wholesale vs Retail). Per CLAUDE.md Blog rule, target 9–10 minimum. Phase 1H+ adds: per-state explainers (9 states), "UWM Wholesale Explained," "Rate-Shopping Guide for First-Time Buyers."
- [ ] **Multilingual full stack (PT/ES)** per MI §9 Exploit #1 — Lowell-Lawrence-Boston is densest Brazilian metro in US. Visual language flags already in nav from Phase 1C; actual i18n routing + translated content is a Phase 1G+ project. Portuguese first, Spanish second.
- [ ] **9 individual `/mortgage-broker-massachusetts` SEO-friendly URLs** (currently `/mortgage-broker/massachusetts`) — if hyphen-prefixed URLs are required for SEO competitiveness, restructure to 9 static directories. Current single dynamic route `/mortgage-broker/[state]` is functional and SEO-equivalent.

### E. Structural / UX items (Phase 1G)

- [x] **Tone-adjacency on homepage** — Phase 1G folded AboutSection into HeroSection as a founder strip (55-word Mike-voice paragraph + MC initials disk + Meet the team link, FadeUp delay 2.0). Homepage now 9 sections with strict D-L-D-L-D-L-D-L-D rhythm.
- [ ] **Real interactive 9-state map** on `/service-areas` — current implementation is a 9-card grid grouped by region. CSS-only "map" works; an interactive SVG state map would be richer if Mike values it.
- [ ] **Filter UI on `/team` and `/testimonials`** — currently visual-stub badges. Phase 1G makes them interactive.
- [ ] **8 additional calculators** beyond the 5 priority ones — IBD §9C lists 13 total.

### F. Pre-launch audit gates (CLAUDE.md non-negotiable)

- [ ] **Multi-Breakpoint Browser Audit** (CLAUDE.md Visual QA Rule §11) — Playwright drives the site through 4 viewports (1440 desktop, 390 mobile, 375 mobile narrow, 428 mobile wide) + nav drawer state. Zero console errors / warnings at every viewport. No H1 orphan lines. No horizontal scroll at 375. Hero fits above the fold. All gradients render (no flat-color sections). `prefers-reduced-motion` graceful degradation. **MANDATORY before any production deploy.** This was deferred through Phases 1C–1F because section components were placeholder-heavy until 1E and depth-additions land in 1F. Run for the FIRST time at end of Phase 1G when all sections + animations + assets are in place.
- [ ] **`/ultrareview`** cross-AI peer review — not yet run. CLAUDE.md mentions it as a pre-ship gate.
- [ ] **`/pricing` deletion** — internal Optimus sales tool, must be removed from nav + sitemap before launch. (Already excluded from sitemap.ts; nav still shows `⬥ Pricing` per CLAUDE.md instruction. Pre-launch-auditor enforces removal.)
- [ ] **`metadataBase` URL** — currently `https://lmpfinancial.com` placeholder. Confirm final domain Tuesday (per CLAUDE.md DOMAIN variable: "lmpfinancial.com (current) — new domain TBD").
- [ ] **Vercel deploy + DNS** — Phase 2A.
- [ ] **Google Search Console + Bing Webmaster** sitemap submission — post-launch.

---

## Phase Overview

| Phase | Name | Status |
|-------|------|--------|
| 0 | Project Initialization | ✅ Complete |
| 1A | Repo Scan | ⬜ Not Started |
| 1B | Research + Design System | ✅ Complete (market-intelligence.md + design-system.md both exist) |
| 1C | Scaffold | ✅ Complete (Next.js 16 + Tailwind v4 + tokens + Navigation + Footer + site.ts) |
| 1D | Content + Animation | ✅ Complete (3-layer hero + 8 animation wrappers + 36 testimonials + 22 LO bios + 9 program blurbs) |
| 1E | All Pages (core + LMP-specific) | ✅ Complete (40 new files, 21 routes returning HTTP 200, sitemap.ts, homepage wired to section components) |
| 1F | SEO + AEO + state pages + calculators | ✅ Complete (legal verbatim, schema markup, 5 calculators, 9 state pages, robots.ts, 36 routes verified) |
| 1G | Sanity blog + brand assets + homepage restructure | ✅ Complete (3 seed articles, logo SVG + EHL SVG + dynamic OG/icon, 9-section rhythm) |
| 1H | LO portraits + fal.ai blog imagery + Playwright audit | ⬜ Not Started |
| 1G | Assets (fal.ai blog cards/headers, LO photos) | ⬜ Not Started |
| 1H | Pre-Launch Audit (file-level) | ⬜ Not Started |
| 1I | Multi-Breakpoint Browser Audit (Playwright) | ⬜ Not Started |
| 1J | /ultrareview gate | ⬜ Not Started |
| 2A | Infrastructure (DNS, Vercel, Resend, Calendly) | ⬜ Not Started |
| 2B | Client Revision Pass | ⬜ Not Started |
| 2C | Close (/retro + handoff) | ⬜ Not Started |

---

## Operating Principles (LMP-specific — survives session resets)

1. **Compliance before creativity.** Every loan-program page, LO bio, blog article, and rate disclaimer must pass the LMP compliance IT firm review before it ships. Until that channel opens, flag with `// [COMPLIANCE-REVIEW-PENDING]`. See CLAUDE.md → Compliance Rule.
2. **Three-headed monster, three funnels.** Borrowers / realtors / LO recruits each get their own primary nav slot and their own page architecture. Do not bury `/partners` or `/careers` in the footer — that's the default mortgage-broker pattern Mike explicitly rejected.
3. **The product is the LO, not the brand.** Per Mike's discovery quote — relationship-led, not brand-led. LO landing pages are conversion engines. Each LO gets: own Calendly, own pre-approval URL (existing `*.my1003app.com/register`), own attribution, own NMLS display.
4. **Verbatim compliance copy is non-negotiable.** SMS opt-in disclaimer, broker disclosure (all caps), Privacy Policy, Terms of Use, ADA statement — preserve word-for-word from `reference/lmp-financial-data-scrape.md`. No paraphrasing.
5. **Quantifiable claims need sourcing.** "14-day close," "100+/120+ reviews," "20+/3-decade experience," "4.9 rating" — every one needs substantiation before re-use. Pre-launch-auditor enforces.
6. **No deferred cleanup** (Pattern #46). When violations are noticed inside any file being edited, fix in the same commit. Defer only when physically blocked (missing client asset, missing API key, pending compliance signoff).
7. **Conversion-first friction audit before any wizard** (Pattern #54). Mortgage-readiness quiz, pre-approval pre-picker, native calculators — all require a friction map before build, with 🚩 on any field a user enters twice.
8. **Feature-flag tier-gated features** (Pattern #53) — when the merch shop scaffold runs and Mike doesn't want it, hide behind `NEXT_PUBLIC_SHOP_ENABLED=false`, do NOT delete. Cheaper to flip if he ever changes his mind.

---

## Session Log

### Session 1 — 2026-04-27 (this session)

**Completed:**
- Firecrawl scrape of www.lmpfinancial.com (49 pages) → `reference/lmp-financial-data-scrape.md`
- Discovery call captured + synthesized → `initial-business-data.md` (10/10 sections, including LMP-specific Section 9 Strategic Brief and Section 10 LO roster)
- Project doc map established (`reference/` folder created)
- CLAUDE.md merged from Optimus standardized template + LMP project doc map; all 10 variables filled; LMP-specific Compliance Rule added
- Phase 0 Task 0A confirmed (variables filled)
- Phase 0 Task 0B complete (this file created)
- Phase 0 Task 0C complete (filled prime.md saved to `.claude/commands/prime.md`)

**Discovered:**
- 4 unsubstantiated quantifiable claims on the live site (14-day, 100+/120+, 20+/3-decades, 4.9 rating) — all need sourcing before re-use
- 3 inconsistencies / bugs on existing site (jumbo card uses VA copy, `/reviews` 404, `/calculators` 404, sitemap stragglers `/adam` and `/james-parker`)
- Email mojibake in 3 LO mailto links on existing site (Allen → mike@, Lew/Lily leading-space, Jayne → alexa@) — do NOT replicate on new build
- Compliance IT firm intro is pending from Mike (loop-in requested 2026-04-25)

**Decisions Made:**
- New build owns the conversion point; existing site is reference only
- Compliance copy preserved verbatim per Section 9D
- Brand voice rebuilt from scratch (existing corporate voice not preserved)
- Per-LO landing page system is a non-negotiable architectural requirement (Mike's "Jill & Co problem")
- Native calculator rebuild over rates.now embed for AEO + speed
- my1003app.com per-LO flow preserved (regulatory app of record)

**Next Session Starts At:** Phase 0 Task 0D — Phase 0 Debrief + blocker triage. Then user must choose how to unblock Stage 1B (market-intelligence.md required before design-synthesizer can run).

**Blockers:**
- ✅ `market-intelligence.md` exists (550 lines, 24-competitor scan).
- ✅ `design-system.md` written 2026-04-27 — Phase 1C (scaffold) is now unblocked.
- ⚠️ Compliance IT firm intro pending → does NOT block Phase 1 build but blocks production publish of any rate / loan / quantifiable claim copy. All such copy will ship with `// [COMPLIANCE-REVIEW-PENDING]` until intro opens.
- ⚠️ Several `initial-business-data.md` fields flagged ⚠️ NOT FOUND — most are non-blocking (analytics stack, social handles, exact LO state-licensure subset, professional headshots availability). All to be confirmed Tuesday demo.
- ⚠️ Hero brand canvas — 10 candidates brainstormed in `design-system.md` Section 8. Final selection deferred to harsh-critic agent in Phase 1D per CLAUDE.md Hero Architecture Rule. Do NOT pick inline.
- ⚠️ Logo PNG with transparent background — required as fallback if hero canvas winner fails (per Hero Architecture Rule step 5). Request from Mike Tuesday.

---

### Session 3 — 2026-04-27 (Phase 1C scaffold)

**Completed:**
- Phase 1C executed end-to-end via plan-mode-approved 3-wave plan ([plan file](file:///C:/Users/Anthony/.claude/plans/linear-splashing-eagle.md)).
- **Wave 0** (inline): Node 24.12 + npm 11.7 verified, Next.js 16.2.4 scaffolded via temp-dir merge (avoiding the create-next-app non-empty-dir block), `framer-motion` + `react-intersection-observer` + `react-hook-form` + `zod` installed, General Sans variable + italic woff2 downloaded from Fontshare CDN to `public/fonts/`, `package.json` renamed to `lmp-financial-website`, `__scaffold__/` added to `.gitignore` (Windows file lock leftover, harmless).
- **Wave 1** (3 parallel general-purpose subagents, non-overlapping file ownership per CLAUDE.md Agent System Rules):
  - **Tokens Agent** → [src/app/globals.css](src/app/globals.css) (256 lines) — full LMP `:root` token block (brand core, surface scale, dark + light text scales, semantic colors, spacing, radius, shadows), scroll-padding-top media queries, type-scale utility classes (`.text-display` through `.text-micro`), `.hero-shimmer` warm-gold variant + reduced-motion fallback, `.section-dark-gradient` + `.section-light-gradient`, container + padding utilities, Tailwind v4 `@import "tailwindcss";` and `@theme inline` block exposing brand colors + fonts as Tailwind utilities, global `prefers-reduced-motion` reset.
  - **Layout Agent** → [src/components/layout/Navigation.tsx](src/components/layout/Navigation.tsx) (162 lines), [src/components/layout/MobileNav.tsx](src/components/layout/MobileNav.tsx) (197 lines), [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) (202 lines) — desktop nav with scroll-state backdrop, mobile drawer with body-scroll lock, footer with verbatim broker disclosure ALL CAPS + NMLS Consumer Access link + 4-column band + state-licensure footer strip. `⬥ Pricing` internal-tool marker rendered in gold per CLAUDE.md Always-Built Features Rule. All copy via `siteConfig` (zero hardcoded English strings — verified by grep). Both `/partners` and `/careers` in primary nav (three-headed-monster funnel surfacing).
  - **Site-Data Agent** → [src/data/site.ts](src/data/site.ts) (743 lines) — full `SiteConfig` schema with 12 inline interfaces, populated `business`, `nav` (9 items including `⬥ Pricing` flagged `isInternal: true` and `Get Pre-Approved` flagged `isCta: true`), `hero`, 9 `loanPrograms` with correct emojis, 6 `painPoints`, 6 `processSteps`, 5 `stats` (with `[SOURCING-REQUIRED]` and `[COMPLIANCE-REVIEW-PENDING]` flags), 22 `loanOfficers` from IBD §10 roster (5 multilingual flagged: en/es, en/pt, en/es/pt), `compliance` block with 3 verbatim strings, `social`, `footer`. Zero em dashes in any string value. Testimonials array intentionally empty — Phase 1D content-writer populates 36.
- **Wave 2** (inline orchestrator):
  - [src/app/layout.tsx](src/app/layout.tsx) — Fraunces (Google) + General Sans (local woff2) + JetBrains Mono (Google) wired as `--font-display` / `--font-body` / `--font-mono`. Metadata + viewport + theme-color #0E1B33. Renders `<Navigation />` + `<main>{children}</main>` + `<Footer />`.
  - [src/app/page.tsx](src/app/page.tsx) — minimal 9-section homepage rhythm scaffold per design-system.md §14 + CLAUDE.md Homepage Section Architecture Rule. Strict dark/light alternation. Each section is a placeholder with eyebrow + h2 — Phase 1E will replace each with finished section components.
  - Tailwind v4 config verified — `@import "tailwindcss";` + `@theme inline` block + `@tailwindcss/postcss` plugin in `postcss.config.mjs`. No v3 `@tailwind base|components|utilities` or `@apply` directives anywhere.

**Verified:**
- Dev server starts in 317ms (Turbopack), HTTP 200 on `/` in 1.5s first-compile / 43ms second-load.
- Zero compile errors, zero warnings in dev-server log.
- 14 `@font-face` declarations resolve in generated stylesheet: 3× Fraunces, 9× JetBrains Mono (multi-subset), 2× General Sans (Variable + VariableItalic). All woff2 sources reachable.
- All 10 expected CSS variables present in rendered HTML inline styles: `--accent`, `--accent-deep`, `--border-dark`, `--primary`, `--primary-deep`, `--radius-md`, `--text-muted`, `--text-on-light`, `--text-primary`, `--text-secondary`.
- Compliance markers in HTML: `MORTGAGE BROKER ONLY, NOT A MORTGAGE LENDER OR MORTGAGE CORRESPONDENT LENDER` (verbatim ALL CAPS), `NMLS #2754084`, `nmlsconsumeraccess.org`, `175 Cabot St`.
- Three-headed-monster nav: both `/partners` and `/careers` rendered in HTML (primary nav, not footer-buried).
- `⬥ Pricing` internal-tool marker present (1 ⬥ + 1 Pricing).
- Hero shimmer applied: `class="hero-shimmer font-display text-display"` rendered on hero H1.
- No hardcoded human copy in `src/components/` (grep on 4-word capitalized sequences returned 0 matches).
- Dev server stopped cleanly via TaskStop per CLAUDE.md.

**Decisions made:**
- **Repo structure:** scaffolded Next.js at project root (not subdirectory). Spec docs (CLAUDE.md, design-system.md, etc.) live alongside code per Optimus convention. Required temp-folder-then-merge to bypass create-next-app's "directory must be empty" guard.
- **Default scaffold's CLAUDE.md and AGENTS.md DELETED before merge** to prevent overwriting our 60KB project rules file. README.md also dropped (we have CLAUDE.md as the canonical project rule).
- **Tailwind v4 over v3.** Confirmed by the scaffold default + design-system.md spec. v4 syntax: `@import "tailwindcss";` + `@theme inline` block. v3 directives forbidden.
- **Compliance verbatim copy stored in `siteConfig.compliance.*`**, not hardcoded in Footer/forms. Same source of truth used by future SMS opt-in form components in Phase 1E.
- **`__scaffold__/` empty dir** left at root due to Windows file lock. Added to `.gitignore` defensively. Will release on session end or machine restart. Does not affect anything.
- **Equal Housing Lender SVG inline placeholder** — Layout Agent built a simple house outline + equal-sign accent inline. Real asset replacement in Phase 1G.

**Open flags rolling forward into Phase 1D:**
- All 22 LO bios are `[DEMO COPY — pending client review]`. Mike, Doug, Juan have real published bios — content-writer agent should align those 3 first if/when published bios are received.
- Hero tagline + business tagline currently use existing site copy (`"Settle into your home, not a rate you'll regret."`) — flagged `[PHASE-1D]` for content-writer rewrite per voice anchor.
- 5 stats flagged for sourcing/compliance review before publish (14-day close, 4.9 rating, $10,662 savings).
- Per-LO `stateLicensure` arrays all `[CONFIRM-WITH-CLIENT]` — regulatory gate before any LO page goes live in Phase 1E.
- Per-LO `calendlyUri` empty — populated when Tuesday client meeting confirms per-LO Calendly URIs.
- Phone number `(978) 453-LOAN` is `[DEMO COPY]` — IBD §1 has no verified published number.
- Founded year `[DEMO COPY]` — site contradicts itself across 3 claims (20+ years / 3 decades / 10 years), Tuesday confirmation needed.

**Next session starts at:** Phase 1D — Content + Animation.

Phase 1D tasks (in order):
1. **Hero canvas selection** — spawn harsh-critic agent per CLAUDE.md Hero Architecture Rule step 3. Score the 10 candidates listed in design-system.md §8 (KeyringCanvas, BlueprintCanvas, DoorwayCanvas, CompassRoseCanvas, MerrimackCanvas, HearthCanvas, MailboxCanvas, MortarBrickCanvas, WindowFrameCanvas, HandshakeCanvas) on niche relevance + visual impact + technical feasibility + uniqueness. Pick ONE winner. Build only the winner. Halt with `[FALLBACK-REQUIRED]` if winner blocks on >2 fix commits.
2. **HeroParticles.tsx** — slow-drift gold-cream particle system per Brand Personality Axes (warm, quiet-confident).
3. **Animation wrappers** — `/components/animations/` with FadeIn, FadeUp, SlideIn, ScaleIn, StaggerContainer, CountUp, ParallaxWrapper, RevealText (8 wrappers per the Explore agent's directory contract).
4. **content-writer agent** — populate the remaining `siteConfig` fields: hero tagline rewrite (voice-anchor-grounded), 36 testimonials (zero em dashes, real-borrower-on-phone tone), loan-program blurbs, pain-point bodies, process-step bodies, LO bios (model on Mike/Doug/Juan voice). All flagged `[COMPLIANCE-REVIEW-PENDING]` until LMP IT firm intro opens.

Phase 1D should be delegated per CLAUDE.md Subagent Delegation Rule (≥3 discrete tasks). Recommended split: harsh-critic agent → animation-specialist agent → content-writer agent.

---

### Session 2 — 2026-04-27 (continuation)

**Completed:**
- Confirmed Phase 0 was already done (CLAUDE.md, intake, scrape, market-intel all in place — earlier session log was stale).
- Verified `market-intelligence.md` exists (550 lines) — Phase 1B half-complete, only design-system.md missing.
- Built `design-system.md` (full brand constitution — 15 sections + 2 appendices).
- Updated this file (progress.md) with reasoning.

**Decisions Made — Color Palette: Deep Navy + Warm Gold + Cream**

User originally floated black + gold. Pushed back with the following research-backed reasoning before building:

1. **Audience mismatch.** LMP's volume programs are FHA (3.5% down, anxious first-time buyers), USDA (rural/lower income), VA, and state DPA programs. These borrowers are price-sensitive and trust-anxious. Black + gold reads "premium / exclusive / expensive" — opposite of the wholesale-shopping-best-rate value prop. (Source: IBD §2 + §3, MI §2 personas.)
2. **Strategic positioning conflict.** Mike's pitch is "we shop multiple wholesale lenders to beat retail giants on rate." That's a value + access message. Black + gold is a status + scarcity message. They fight each other.
3. **Visual differentiation lane validated by competitive scan.** MI §8 shows: 70% of competitor sites use blue/navy + white (generic), 15% green, 10% red/orange (Rocket/Doce), and only **5% black/gold luxury (mostly FL boutiques)**. The uncontested visual lane is editorial-financial-services applied to mortgage — the Ramp / Mercury / Stripe aesthetic. Deep navy + warm gold + cream lands LMP in that lane without joining the 5% FL-luxury cluster (wrong audience) or the 70% generic-navy cluster (commodity).
4. **Borrower-base inclusivity.** Cream replaces stark white to break the "white-paper-form-dread" feel that dominates mortgage UX (MI §7 friction map). Warm aged-brass gold (#C5A572) replaces yellow-bright or icy-platinum gold — premium without exclusionary cold.

User accepted the recommendation ("yes choose the recommended"). Final tokens written to design-system.md Section 2:
- `--primary: #0E1B33` (deep navy — darker than Bootstrap navy, blue undertone)
- `--accent: #C5A572` (warm aged brass)
- `--bg-base: #F5EFE2` (warm cream — light section bg)
- `--text-primary: #F5EFE2` (cream text on navy — warm, never stark white)
- `--text-on-light: #0E1B33` (navy text on cream)

Black + gold preserved as a future option specifically for any Jumbo / Reverse / Interest-Only sub-brand surface (the genuinely affluent slice of LMP's book), if the client ever wants segmentation. Documented in design-system.md but NOT in the primary build.

**Decisions Made — Typography**

Editorial-financial-services aesthetic per MI §8 visual differentiation opportunity.
- **Display: Fraunces** (variable serif, Google Fonts free, axes for OPSZ + SOFT + WONK lets us tune from luxury to architectural per surface). Avoids the obvious Playfair / EB Garamond.
- **Body: General Sans** (Fontshare, free for commercial). Distinctive modern sans. Avoids Inter / Roboto / Space Grotesk (all explicit forbidden in frontend-design.md).
- **Mono: JetBrains Mono** for NMLS, license #s, eyebrow labels.

**Decisions Made — Brand Personality Axes** (drives hero canvas, photo direction, motion language)

7 axes set in design-system.md Section 8:
- WARM (75/100) — cream + gold, golden-hour photography, handshake metaphors
- QUIET-CONFIDENT (60/100) — restrained motion, single signature hero moment
- MODERN-CLASSICAL HYBRID (50/50) — variable serif + modern sans, editorial layout
- SERIOUS (75/100) — compliance + trust, no sarcasm
- REFINED (85/100) — luxury floor (Optimus Positioning Rule mandated)
- PERSONAL (80/100) — "the product is the LO, not the brand" (Mike's discovery quote)
- LOCAL-FIRST + 9-state-aware (70/100) — Lowell HQ as moat, hero must surface "9 states. 22 LOs. Three languages." per MI §9 Avoid #3

**Decisions Made — Hero Brand Canvas (10-candidate brainstorm)**

Per CLAUDE.md Hero Architecture Rule, brainstormed 10 conceptually distinct visual metaphors tied to mortgage / home-financing / keys-to-a-home. Listed in design-system.md Section 8. Top 3 strong candidates flagged:
- KeyringCanvas (#1) — keys-to-a-home, immediately legible
- BlueprintCanvas (#2) — architectural editorial, distinctive
- HearthCanvas (#6) — warmth + domesticity, rare in mortgage category

**Final selection deferred to Phase 1D harsh-critic agent** per Hero Architecture Rule step 3. Do NOT pick inline. Build only the winner. Fallback (per rule step 5): LogoParticles chaos→convergence→explosion using LMP logo PNG (request Tuesday).

**Decisions Made — Visual Differentiation Strategy**

Per MI §8 + §9 — we are NOT trying to be a "better looking mortgage broker." We are placing LMP in an uncontested aesthetic lane. The deliberate moves:
- Editorial-Vox-Explainer state-program pages (NOT brochure-style, NOT generic-blog).
- Real Lowell + state-specific photography (NOT stock-photo families — MI §8 anti-pattern, ~80% of competitors).
- Three-headed-monster nav surfacing (`/partners` and `/careers` in PRIMARY nav, NOT footer-buried — Mike's explicit directive, IBD §9).
- Portuguese-FIRST language toggle in upper-right header (Lowell-Lawrence-Boston is densest Brazilian metro in US — MI §9 Exploit #1).
- `$10,662 average lifetime savings` as cornerstone trust signal (Polygon Research / UWM 2023 HMDA — MI §4).
- `14-day close` claim retained but flagged for sourcing before publish.

**Discovered:**
- Phase 0 / Phase 1 status mismatch — earlier progress.md said "Phase 0 Task 0D" was current and market-intelligence.md was a blocker. Both were stale; market-intelligence.md was already in place (550 lines).
- Visual lane validated harder than expected — MI §8 explicitly calls out "editorial-financial-services applied to mortgage" as the differentiation opportunity in the 24-competitor scan. Direction was already in the research, not invented.
- The 5% FL black/gold cluster is real but excludes LMP's borrower base. Black/gold is a future sub-brand option (Jumbo/Reverse/IO surface), not the primary brand.

**Next Session Starts At:** Phase 1C — Scaffold.

Phase 1C tasks (in order):
1. Initialize Next.js 16 (App Router) + Tailwind CSS 4 + PostCSS repo per `website-build-template.md` Stack section.
2. Drop ALL CSS variables from `design-system.md` Appendix A + Section 2 + Section 4 + Section 5 into `globals.css`. Verify CSS Scaffold Completeness Rule passes (grep `var(--` and confirm every reference is declared).
3. Install fonts via `next/font`: Fraunces (Google), JetBrains Mono (Google), General Sans (Fontshare — self-host woff2 in `/public/fonts/`).
4. Define type-scale utility classes in `globals.css` per design-system.md Section 3.
5. Build `<Navbar />` + `<MobileNav />` + `<Footer />` with compliance bands (NMLS, broker disclosure all-caps, Equal Housing Lender logo, NMLS Consumer Access link).
6. Set up `/data/site.ts` with siteConfig stub (tagline, nav, footer copy — all compliance-verbatim from `reference/lmp-financial-data-scrape.md`).
7. Verify dev server runs at 390px mobile width without horizontal scroll, no console warnings.

Phase 1C should be delegated per CLAUDE.md Subagent Delegation Rule (≥3 discrete tasks). Recommended split: scaffold-agent (Next.js + tokens + fonts), navigation-agent (Navbar + MobileNav + Footer), site-data-agent (`/data/site.ts` stub).

---

### Session 4 — 2026-04-27 (Phase 1D Content + Animation)

**Completed:**
- Phase 1D executed end-to-end via plan-mode-approved 3-wave plan with 5 subagents (4 parallel in Wave 1 + 1 sequential in Wave 2 + orchestrator inline Wave 3).
- **Wave 1 — 4 parallel subagents:**
  - **Harsh-Critic Agent** scored all 10 hero canvas candidates from `design-system.md` §8 on niche relevance + visual impact + technical feasibility + uniqueness (1–10 each). **Winner: KeyringCanvas (34/40).** Runners-up: HearthCanvas (30) lost on "post-purchase metaphor for pre-purchase product"; BlueprintCanvas (29) lost on Phase 2 contract incompatibility. Two risks flagged: mobile-width key collapse (mitigated via minimum-dimension lock) and bit-notch desync during spring overshoot (mitigated via single-path geometry).
  - **Animation Wrappers Agent** wrote 9 files / 457 lines: `src/lib/utils.ts` (cn, prefersReducedMotion, easings, durations) + 8 wrappers (FadeIn, FadeUp, SlideIn, ScaleIn, StaggerContainer, CountUp, ParallaxWrapper, RevealText). All `'use client'`, all reduced-motion compliant, no `any` types.
  - **HeroParticles Agent** wrote `src/components/HeroParticles.tsx` (320 lines): 120 cream/light-gold stars + 50 warm-gold rising embers + occasional 4-point glimmers. DPR capped at 2×, `dt` clamped to 48ms for tab-switch resilience, no `createRadialGradient` for fillrate. Reduced-motion → static stars-only frame.
  - **Content-Writer Agent** modified `src/data/site.ts` (743 → 1059 lines): 36 testimonials populated with 4-per-state across all 9 licensed states, 22 LO bios (60–100 words each, first-person, geographic + language + personal detail), 9 program blurbs, 6 pain-point bodies, 6 process-step bodies, hero subheadline rewrite ("Twenty-two loan officers, nine licensed states, thirty-plus wholesale lenders shopping every file we touch"). Direct MI §2 persona traces embedded in 11 testimonials (Lowell Maria/Brockton Carlos/Brazilian PT-speakers/Salem NH move-up/Cape Coral self-employed/Naples snowbird/Houston TSAHC/Front-Range CHFA/VHFA Burlington/Portland aging-in-place). Zero em dashes (verified via grep). All copy `[DEMO COPY — pending client review]` flagged; quantifiable claims `[SOURCING-REQUIRED]` or `[COMPLIANCE-REVIEW-PENDING]`.
- **Wave 2 — Brand Canvas Agent (sequential after Harsh-Critic returned):**
  - **KeyringCanvas Agent** wrote `src/components/KeyringCanvas.tsx` (456 lines): full 5-phase canvas lifecycle (STREAM 64 particles via quadratic bezier → RISE springOut overshoot → COOL heat ramp white-hot → light-gold → aged-brass → ARC progressive home-outline draw → IDLE breathe oscillation). Bit-notch single-path geometry (risk #2 mitigated). Mobile minimum-dimension lock (risk #1 mitigated). Style-consistent with HeroParticles (same DPR cap, ResizeObserver, dt clamp, reduced-motion early-return). NO `[FALLBACK-REQUIRED]` flag — implementation clean.
- **Wave 3 — orchestrator inline:**
  - Rewrote hero in [src/app/page.tsx](src/app/page.tsx) to canonical 3-layer structure: Layer 1 `<HeroParticles />` (full bg, pointer-events-none, z-0) + Layer 3 wrapper `<div className="container-wide ... relative z-10">` containing left text panel (eyebrow + H1 with hero-shimmer + subheadline + CTAs + trust strip — each wrapped in `<FadeUp>` with staggered delays 0.1/0.3/0.5/1.4/1.8s) + Layer 2 right panel `<div ... pointer-events-none>` containing `<KeyringCanvas />`.
  - Stale Phase 1C dev server PID 59340 was found running (TaskStop only stopped the bash wrapper, not the underlying Windows process). New `npm run dev` errored with "Another next dev server is already running." Verified the existing server picked up the hot-reloaded code: `curl http://localhost:3000/` returned 200 in 165ms with both `<canvas>` elements rendered, `pointer-events:none` on both, `z-10` on text wrapper, hero-shimmer on H1, FadeUp wrappers emitting initial `opacity:0;transform:translateY(20px)` (correct SSR state pre-hydration). Compile log clean — "Compiled in 21ms / 73ms," zero errors. Killed PID 59340 to leave a clean state.

**Verified:**
- 2 canvas elements in rendered HTML (HeroParticles + KeyringCanvas)
- Both canvases have `pointer-events: none` (CLAUDE.md hero click-safety rule)
- Hero text wrapper has `relative z-10` (above canvases)
- `.hero-shimmer font-display text-display` on H1 (warm-gold variant per design-system.md)
- Hero subheadline text rendered: real-voice copy with specific numbers (22 LOs / 9 states / 30+ wholesale lenders)
- Trust strip: NMLS #2754084 · 9 states licensed · 22 loan officers · Lowell, MA · EN · PT · ES
- Compile log: zero errors, zero warnings.

**Decisions made:**
- **Hero canvas: KeyringCanvas wins.** Harsh-critic's reasoning: a key is the *exact* glyph of mortgage closing (not adjacent like HearthCanvas), it inverts MI §8's dominant 80%-stock-photo-couple-with-keys anti-pattern (same emotional anchor, opposite craft), and decomposes cleanly into primitives (no PNG dependency, no bezier paths, fits the 5-phase contract). Score 34/40 vs HearthCanvas 30 vs BlueprintCanvas 29.
- **Bit-notch geometry: single-path approach.** drawKey walks the perimeter as one closed `ctx.beginPath()` → `lineTo()` chain, ensuring notches scale atomically with the spring overshoot (avoiding the 1–2px desync that punch-out compositing would produce during negative-t segments).
- **Content-writer scope kept as one agent.** ~5000 words of copy in a single pass — same skill repeated 80+ times. The agent embedded direct MI §2 persona traces in 11 of 36 testimonials, giving Mike specific characters to recognize at the Tuesday demo.
- **Hero tagline kept** as "Settle into your home, not a rate you'll regret." Voice-anchor compatible. 3 alternate suggestions added as code comments above the field for Mike to pick at Tuesday demo.
- **Stale dev server PID stays alive across TaskStop on Windows.** Worth flagging for future phases — explicit `Stop-Process -Force` is the cleanup, not bash-level TaskStop.

**Open flags rolling forward into Phase 1E:**
- All loan-program blurbs are `[COMPLIANCE-REVIEW-PENDING]` — every loan-program-specific claim needs LMP IT firm signoff before publish.
- Stats: 14-day close + 4.9 rating still `[SOURCING-REQUIRED]`. $10,662 stat retains Polygon Research / UWM citation but `[COMPLIANCE-REVIEW-PENDING]`.
- 36 testimonials are `[DEMO COPY]` — Mike's review export from Google/Zillow/Experience.com (requested for Tuesday) replaces these or seeds the real pool.
- Per-LO `stateLicensure` arrays still `[CONFIRM-WITH-CLIENT]` — regulatory gate before any LO landing page goes live in Phase 1E.
- Per-LO `calendlyUri` empty — Tuesday client meeting confirms per-LO Calendly URIs.
- Hero canvas optional re-glimmer beat (Phase 5 IDLE bow-ring pulse every ~6s) was omitted by the KeyringCanvas Agent for motion-budget safety. Can be added later if desired.

**Next session starts at:** Phase 1E — All Pages.

Phase 1E tasks (in order, all delegated per CLAUDE.md Subagent Delegation Rule — ≥3 tasks):
1. **Section components for homepage** — replace each placeholder section in `app/page.tsx` with a finished component from `/src/components/sections/`: HeroSection (extract current inline hero), PainPointsSection, ServicesSection (9 loan-program cards), AboutSection (Mike + Lowell story), StatsSection (with CountUp animations), TestimonialsSection (3-quote teaser → /testimonials), QuizCTASection, MeetTheTeamSection (LO grid teaser → /team), BlogPreviewSection, PreApprovalCTASection.
2. **UI primitives** — `/components/ui/`: Button, Card, Badge, Input, Divider.
3. **Loan-program pages** — `/services/page.tsx` (9-card index) + `/services/[slug]/page.tsx` (per-program detail with eligibility, FAQ, CTA, optional CountUp savings calc).
4. **22 LO landing pages** — `/team/[lo-slug]/page.tsx` template + LO-grid index `/team/page.tsx`. Each LO page: hero (LO photo placeholder + name + NMLS), bio, Calendly inline placeholder, my1003appUrl, contact form routing.
5. **Three-headed-monster pages** — `/partners/page.tsx` (realtor referral funnel), `/careers/page.tsx` (LO recruiting page with Brian Walsh contact + comp transparency).
6. **Native calculators** — `/calculators/page.tsx` index + 5 priority calculators (affordability, monthly payment, refinance, down-payment, DTI).
7. **State coverage** — `/service-areas/page.tsx` (9-state map) + 9 state pages (`/mortgage-broker-[state]/page.tsx`).
8. **Quiz** — `/quiz/page.tsx` with `QuizClient.tsx` (mortgage-readiness archetype quiz, 5–8 questions, output: program + LO recommendation, all questions compliance-flagged).
9. **Booking calendar** — `/booking/page.tsx` + `BookingCalendar` custom-branded component (Calendly API under the hood, demo-mode seeded availability fallback).
10. **Testimonials index** — `/testimonials/page.tsx` (4 paginated pages × 9 = 36, filter by program).
11. **Pricing** — `/pricing/page.tsx` (Optimus internal sales tool — 3 tiers, ROI calculator, comparison chart, deleted before launch).
12. **Blog scaffold** — `/blog/page.tsx` + `/blog/[slug]/page.tsx` template. Sanity setup deferred to Phase 1E mid-task.
13. **Legal pages** — `/privacy-policy`, `/terms-of-use`, `/ada-accessibility-statement` — verbatim from `reference/lmp-financial-data-scrape.md`.
14. **Contact + FAQ** — `/contact/page.tsx`, `/faq/page.tsx`.

Phase 1E will be the longest phase. Recommended split: 5–8 parallel waves of agents. The orchestrator picks each wave based on file-ownership independence (e.g., loan-program pages and LO pages are independent; section components and UI primitives are independent; legal pages can run in parallel with anything).

---

### Session 5 — 2026-04-27 (Phase 1E All Pages)

**Completed:**
- Phase 1E executed via plan-mode-approved 4-wave plan with 11 subagents (4 parallel in Wave 1 + 4 parallel in Wave 2 + 3 parallel in Wave 3 + orchestrator inline Wave 4).
- **Wave 1 — 4 parallel:**
  - **UI Primitives Agent** → `src/components/ui/` (5 files, 436 lines): Button (3 variants × 3 sizes × href/no-href × loading/disabled), Card (dark/light + hover lift), Badge (4 colors), Input (text + textarea + error/focus/SMS-disclaimer-ready, gold required marker), Divider (3 widths). All TypeScript strict, all forward `className` via `cn()`, no icon libraries.
  - **Section Components Agent** → `src/components/sections/` (10 files, 671 lines): HeroSection (extracted from inline page.tsx), PainPoints, Services, About (Mike-voice founder copy), Stats (CountUp), Testimonials (3 featured + see-all), QuizCTA, MeetTheTeam (LO grid teaser, 8 visible), BlogPreview (3 stub articles tied to MI §6 AEO topics), PreApprovalCTA (final closing CTA with HeroParticles ambient). All `'use client'`. Strict tone alternation per design-system.md §14.
  - **Loan-Program Pages Agent** → `src/app/services/page.tsx` + `src/app/services/[slug]/page.tsx` (2 files, 307 lines): 9-card index + dynamic detail template with `generateStaticParams` SSG for all 9 program slugs. Per-program FAQ + document checklist + CTA. All copy `[COMPLIANCE-REVIEW-PENDING]` flagged.
  - **LO Landing Pages Agent** → `src/app/team/page.tsx` + `src/app/team/[lo-slug]/page.tsx` (2 files, 391 lines): 22-LO grid + dynamic per-LO detail template with `generateStaticParams` SSG for all 22 LO slugs. Per-LO NMLS double-display (header + bottom trust strip), state licensure with `[CONFIRM-WITH-CLIENT]` placeholder rendering, BookingCalendar inline, my1003app pre-approval link, contact form routing per LO. SMS opt-in disclaimer verbatim.
- **Wave 2 — 4 parallel:**
  - **Three-Headed-Monster Pages Agent** → `src/app/partners/page.tsx` (601 lines, 7 sections) + `src/app/careers/page.tsx` (729 lines, 8 sections): Realtor referral funnel + LO recruiting page. `/careers` features Brian Walsh as recruiter, 220–275 bps comp transparency block (`[COMPLIANCE-REVIEW-PENDING]`), 4 LO archetype cards, 6-capability badge grid, 3 LO testimonial cards. Strict alternation. The agent caught a tone-adjacency bug in my plan (two adjacent dark sections in /careers) and corrected it — good catch, documented inline.
  - **Quiz Page Agent** → `src/data/quiz.ts` (314 lines) + `src/app/quiz/page.tsx` (44 lines) + `src/app/quiz/QuizClient.tsx` (436 lines): 4 archetypes (FirstTimeFoundation → Mike Comerford, VeteranPath → Doug Danzey, MoveUpBuyer → Tim Anderson, RefinanceOptimizer → Lew Calhoun). 6 questions × 4 emoji-prefixed answers each. 3-phase state machine (intro → question → results) with auto-advance + 400ms glow + AnimatePresence slide transitions + back-nav re-highlight. Results render `<BookingCalendar loSlug={slug} />` inline (no `/api/quiz` route, no email gate). All quiz copy `[COMPLIANCE-REVIEW-PENDING]`.
  - **Booking + Calendar Agent** → `src/components/BookingCalendar.tsx` (362 lines) + `src/app/booking/page.tsx` (111 lines) + `src/app/api/calendly/slots/route.ts` (81 lines) + `src/app/api/calendly/book/route.ts` (73 lines): Custom-branded 4-step calendar (date → time → form → confirmed), 14-day calendar with weekends disabled, deterministic seeded fake availability when no `CALENDLY_API_KEY` (3-5 slots between 9am-4pm based on date hash). Demo mode confirmed via inline status badge. SMS opt-in verbatim. Per-LO support via `loSlug` prop. Zero iframes, zero Calendly logos.
  - **Static Pages Bundle Agent** → `src/app/contact/page.tsx` (340 lines) + `src/app/faq/page.tsx` (245 lines) + `src/app/calculators/page.tsx` (180 lines, STUB) + `src/app/blog/page.tsx` (165 lines, STUB) + `src/app/blog/[slug]/page.tsx` (80 lines, catch-all stub). Contact has functional 5-field form + SMS disclaimer + contact info card with Mike's email/LinkedIn. FAQ has 12 questions in 3 groups using native `<details>`/`<summary>`. Calculators + Blog clearly stubbed for Phase 1F.
- **Wave 3 — 3 parallel:**
  - **Testimonials Index Agent** → `src/app/testimonials/page.tsx` (21 lines) + `src/app/testimonials/TestimonialsClient.tsx` (351 lines): 36/9 = 4 pages exact. Filter chips reflect unique programs in data with counts. 3-col × 3-row grid (mobile 1-col, tablet 2-col). Featured pull-quote auto-selected (Pam G., Portland ME, Reverse Mortgage — longest quote). ScaleIn cards with computed staggered delays.
  - **Pricing Page Agent** → `src/app/pricing/page.tsx` (42 lines) + `src/app/pricing/PricingClient.tsx` (673 lines): Optimus internal sales tool. 3 tiers ($1,500/$3,000/$5,500) with Pro getting "Most Popular" gold badge. ROI calculator with 2 sliders + tier selector (defaults: $3,500 commission/loan × 4 loans/month → $14,000 monthly revenue, 7-day breakeven, 5,500% 12-mo ROI for Pro). Comparison chart in real `<table>` with 5 categorized row groups. CTA per tier opens `<BookingCalendar />` in modal (ESC + backdrop click + ✕ all close). `metadata.robots = noindex, nofollow`. Zero "Google" mentions verified by grep. Zero deposit/upfront language verified by grep.
  - **Legal Pages Agent** → `src/app/privacy-policy/page.tsx` (237 lines) + `src/app/terms-of-use/page.tsx` (238 lines) + `src/app/ada-accessibility-statement/page.tsx` (134 lines). Server components, dark page header + light body, h2/h3 hierarchy preserved.
- **Wave 4 — orchestrator inline:**
  - **Reconciled `/services` vs `/programs` mismatch:** ran PowerShell replace on `src/data/site.ts` — `/programs` → `/services` in 10 locations (1 nav item + 9 footer column links). Now consistent with the directory structure (`src/app/services/`).
  - **Wired homepage** [src/app/page.tsx](src/app/page.tsx) — replaced inline hero + 8 placeholder sections with imports of 9 section components + HeroSection. Final page.tsx is 50 lines (was 173). Comment block at top documents the rhythm map and a flagged tone-adjacency anomaly (AboutSection + StatsSection both light — to be fixed in Phase 1H).
  - **Created** [src/app/sitemap.ts](src/app/sitemap.ts) — Next.js `MetadataRoute.Sitemap` with 15 static routes + 9 program routes + 22 LO routes = 46 total URLs. `/pricing` intentionally excluded (internal sales tool, deleted before launch).

**Verified:**
- Dev server starts in 295ms (Turbopack), zero compile errors / warnings.
- **All 21 demo-critical routes return HTTP 200:**
  - `/` (308ms first compile, then 56-340ms warm)
  - `/services` + `/services/fha` + `/services/va`
  - `/team` + `/team/mike-comerford`
  - `/partners`, `/careers`
  - `/quiz`, `/booking`
  - `/testimonials`, `/pricing`
  - `/privacy-policy`, `/terms-of-use`, `/ada-accessibility-statement`
  - `/contact`, `/faq`
  - `/calculators` (stub), `/blog` (stub), `/blog/[any-slug]` (catch-all stub)
  - `/sitemap.xml` (Next.js MetadataRoute.Sitemap)
- Homepage rendered HTML shows correct dark/light section gradient class sequence (D-L-D-L-L-D-L-D-L-D — the L-L adjacency is the AboutSection/StatsSection issue flagged for Phase 1H).
- Dev server stopped via `Stop-Process -Force` per Phase 1D learning.

**Decisions made:**
- **`/services` over `/programs`** — chose `/services` to match `website-build-template.md` directory structure. Single PowerShell replace fixed `siteConfig.nav` + `siteConfig.footer.columns`.
- **`/pricing` excluded from sitemap** — internal Optimus sales tool, deleted before launch.
- **AboutSection + StatsSection both light** — design-system.md §14 forbids two adjacent same-tone sections. Section Components Agent built both as light (Mike's founder + stats both feel "trust" surface, hence light). Flagged for Phase 1H pre-launch audit. Fix options: flip StatsSection to dark, or merge them into one combined "Mike + numbers" block, or put the QuizCTASection between them.
- **Pricing modal pattern** — every tier CTA opens `<BookingCalendar />` inline rather than linking to `/booking`. Keeps the click on the sales surface.
- **Quiz LO matching** — Mike (FirstTime), Doug (Veteran), Tim (MoveUp), Lew (Refi). All 4 are real LO slugs; agent selected based on bio content signals.

**Open flags rolling forward into Phase 1F (or production launch blockers):**

🚨 **LAUNCH BLOCKER — Legal prose verbatim missing.** Per Legal Pages Agent's compliance flag: the scrape `reference/lmp-financial-data-scrape.md` only contains "Key points" SUMMARIES of Privacy Policy + Terms of Use — NOT the full live-site verbatim prose. The pages I shipped are clause-faithful (every documented clause from the scrape is rendered) but they are NOT verbatim copies of the live-site Privacy Policy + Terms of Use. **Required remediation before launch:**
1. Re-scrape `https://www.lmpfinancial.com/privacy-policy` and `/terms-of-use` to capture full prose.
2. Replace bodies of `src/app/privacy-policy/page.tsx` + `src/app/terms-of-use/page.tsx` with verbatim text.
3. Compliance IT firm review (pending Mike's loop-in per IBD §9D) before publish.
This is the regulatory disclosure the Communication Rule requires. ADA statement is verbatim per `siteConfig.compliance.adaStatement` (sourced correctly from scrape).

⚠️ **Tone-adjacency anomaly on homepage** — AboutSection + StatsSection both light. Phase 1H pre-launch audit must reorder or flip tones.

⚠️ **`/api/contact` route not implemented** — all forms (LO contact, /partners, /careers, /contact) post to `/api/contact` which doesn't exist. Phase 2A wires Resend.

⚠️ **All program-page copy + LO bios + 36 testimonials + quiz questions still `[DEMO COPY]` and `[COMPLIANCE-REVIEW-PENDING]`** — same as prior sessions. Phase 1H pre-launch-auditor blocks publish without LMP IT firm signoff.

⚠️ **`[COMPLIANCE-REVIEW-PENDING]` on the 220–275 bps comp transparency block** — final published comp range pending Mike's sign-off Tuesday.

⚠️ **`[CONFIRM-WITH-CLIENT]` placeholders rendered visibly** for: per-LO `stateLicensure`, Brian Walsh contact, founded year, quantifiable claims (14-day, 4.9 rating, $10,662 — see Session 4 flags).

⚠️ **`[ASSET-PENDING]`** flags for: Mike portrait, 22 LO portraits, Equal Housing Lender SVG, partner co-marketing kits PDF set.

**Files added this session (40 new + 1 modified + 1 new sitemap):**
- 5 UI primitives in `src/components/ui/`
- 10 section components in `src/components/sections/`
- 2 loan-program routes (`src/app/services/`)
- 2 LO routes (`src/app/team/`)
- 2 three-headed-monster routes (`src/app/partners/`, `src/app/careers/`)
- 3 quiz files (`src/app/quiz/`, `src/data/quiz.ts`)
- 4 booking files (`src/app/booking/`, `src/components/BookingCalendar.tsx`, 2 `src/app/api/calendly/` routes)
- 5 static page bundle (`src/app/contact/`, `/faq/`, `/calculators/`, `/blog/`, `/blog/[slug]/`)
- 2 testimonials files (`src/app/testimonials/`)
- 2 pricing files (`src/app/pricing/`)
- 3 legal pages (`src/app/privacy-policy/`, `/terms-of-use/`, `/ada-accessibility-statement/`)
- Modified: `src/app/page.tsx` (173 → 50 lines), `src/data/site.ts` (`/programs` → `/services` reconciliation)
- New: `src/app/sitemap.ts` (46 routes)

**Next session starts at:** Phase 1F — SEO + AEO + state pages + calculators + Sanity blog.

Phase 1F tasks:
1. **9 state-specific landing pages** (`/mortgage-broker-massachusetts`, etc.) per MI §9 Do #2 — each with current 2026 program figures (MassHousing $30K DPA, NHHFA Home Flex Plus, MaineHousing First Home, RIHousing 15kDPA, CHFA-CT Time To Own, VHFA MOVE + MCC, FL Hometown Heroes $35K, TSAHC Homes for Texas Heroes, CHFA-CO + metroDPA).
2. **`/service-areas/page.tsx`** — interactive 9-state map (or CSS-only state grid if interactive map blocks).
3. **5 native calculators** — affordability, monthly payment, refinance, down-payment, DTI. Each with real math + CountUp outputs + breakeven analysis where applicable. Replace `/calculators/page.tsx` stub.
4. **Sanity blog setup** — install `next-sanity`, add `src/sanity/` with client + queries + schema (post, category, author, blockContent), build `/blog/page.tsx` real index + `[slug]/page.tsx` real article template, `/studio/[[...tool]]/page.tsx` editor. Replace stubs.
5. **Schema markup + AEO optimization** per design-system.md §11 + MI §6 — JSON-LD `FinancialService` (root) + `LocalBusiness` (footer office) + `Person` per LO (NMLS as identifier) + `FAQPage` schema on /faq + Speakable schema on cornerstone state-program pages.
6. **`robots.ts`** in `src/app/`.
7. **Tone-adjacency fix on homepage** — flip StatsSection to dark or insert QuizCTASection between About + Stats.
8. **Re-scrape Privacy Policy + Terms of Use** → replace with verbatim prose (LAUNCH BLOCKER from this session).

Recommended Phase 1F split: 4-5 parallel waves. State pages + calculators + Sanity setup are largely independent; schema markup orchestrator runs after all pages exist. The legal prose fix is its own quick task — just re-scrape + edit two files.

---

### Session 7 — 2026-04-27 (Phase 1G Sanity Blog + Brand Assets + Homepage Restructure)

**Completed:** 3 parallel subagents in Wave 1 + orchestrator inline Wave 2. Atomic commits per CLAUDE.md guidance now that the repo has a remote.

**Wave 1 — 3 parallel:**

**A — Sanity Blog Scaffold Agent.** 13 new + 2 rewrites + package.json/lock modifications. Installed `next-sanity` + `@sanity/image-url` + `@sanity/vision` + `sanity` (867 packages). Built `src/sanity/` module tree: `client.ts` returns null when no `NEXT_PUBLIC_SANITY_PROJECT_ID`; `lib/posts.ts` exposes `getPosts()` + `getPostBySlug()` with JSON fallback; `queries.ts` defines GROQ + simplified `BlockContent` shape; `schemaTypes/{post,category,author,blockContent,index}.ts` for Sanity Studio. `sanity.config.ts` at project root. `src/app/studio/[[...tool]]/page.tsx` renders graceful "Studio not configured" notice when env vars absent (intentional safe stub — better than crashing on missing project ID). `/blog/page.tsx` + `/blog/[slug]/page.tsx` rewritten as real server components fetching from `getPosts()`. 3 seed articles (~2,300 words total) in `seed-posts.json`:
  - "FHA vs Conventional in NH: When 3.5% Down Beats 5% Down" by Mike Comerford
  - "MassHousing $30K DPA: Three Income Tiers Explained" by Doug Danzey (slug: `masshousing-30k-down-payment-assistance` — agent picked clearer slug than my spec's `-explained` suffix)
  - "Wholesale vs Retail: Why It Matters" by Aisha Barbosa (bilingual LO)
  All flagged `[DEMO COPY · COMPLIANCE-REVIEW-PENDING]` with sourcing notes (Polygon Research / 2023 HMDA for the $10,662 savings figure; `[VERIFY-WITH-AGENCY-WEBSITE]` for MassHousing AMI tables). Zero em dashes in body text. Server components throughout.

**B — Brand Assets Agent.** 4 new + 2 modified. `public/logo.svg` (LMP wordmark — deep navy serif + warm gold underline + FINANCIAL mono subtext, system-fallback fonts so it renders without web fonts). `public/equal-housing-lender.svg` (recreated regulatory mark — house outline + door + equal-sign bars in cream + gold; **PRE-LAUNCH placeholder comment flags HUD-sourced artwork as required before publish**). `src/app/opengraph-image.tsx` (1200×630 dynamic via `next/og` ImageResponse on edge runtime; cream background, navy "LMP Financial" wordmark, gold underline, current tagline, NMLS mono footer). `src/app/icon.tsx` (32×32 navy/gold favicon). Footer.tsx updated to use `<img src="/equal-housing-lender.svg">`. schema.ts updated to reference `/logo.svg` and `/opengraph-image` (removing `.png`/`.jpg` placeholders).

**C — Tone-Adjacency Fix Agent.** 2 modified + 1 deleted. Folded AboutSection content into HeroSection as a founder strip below the trust strip. Founder paragraph (55 words, voice-anchor compatible, [DEMO COPY] flagged): *"We started LMP in Lowell because the borrowers we wanted to serve were our neighbors. Today we are 22 loan officers across 9 states, shopping 30-plus wholesale lenders on every file. We answer Saturday calls. We come to closings. Lowell handshake, Stripe execution."* MC initials disk on left, paragraph + Meet the team link on right. FadeUp delay 2.0 (lands after the trust strip stagger). HeroSection now 4 visual layers (HeroParticles + KeyringCanvas + stagger text + founder strip) inside one dark `<section>`. AboutSection.tsx deleted. page.tsx rhythm comment block updated. Result: 9 sections, strict D-L-D-L-D-L-D-L-D alternation.

**Wave 2 — orchestrator inline:**

- **Dev server boot 417ms (Turbopack), zero compile errors / zero warnings.**
- **Verified 24 routes returning HTTP 200**, including:
  - All 3 new asset/image routes: `/opengraph-image`, `/icon`, `/logo.svg`, `/equal-housing-lender.svg`
  - `/studio` (renders Sanity-not-configured graceful notice)
  - All 3 seed blog articles at correct slugs (1 slug variant: `masshousing-30k-down-payment-assistance` instead of spec's `-explained` — accepted as agent's clearer naming)
  - All Phase 1E/1F routes still pass (homepage hero now with founder strip, 9 sections, all interior pages, calculators, state pages, legal pages, sitemap.xml, robots.txt)
- **Three atomic commits to `origin/main`** (per CLAUDE.md "atomic commits per subtask" now that repo has a remote):
  1. `9aab39d feat(assets): add logo, EHL mark, dynamic OG image, favicon`
  2. `47c3086 refactor(homepage): fold AboutSection into HeroSection founder strip`
  3. `<sanity-commit-sha> feat(blog): scaffold Sanity blog with JSON fallback and 3 seed articles`
- Dev server stopped via `Stop-Process -Force` (killed 2 stale Node PIDs).

**Decisions made:**

- **Sanity Studio kept as graceful stub** until Mike provisions a Sanity project. Wiring real `<NextStudio>` requires a `'use client'` wrapper + the actual project ID. The stub renders a clear "Studio not configured" message with instructions; better UX than a crash.
- **JSON fallback over real CMS for demo.** `getPosts()` checks `sanityClient` (null when no env var) → returns seeded JSON. Same component code drives both paths. Demo works without ANY Sanity setup.
- **EHL SVG is a recreation, not HUD-sourced.** Composed from primitives (house outline + equals bars). The placeholder comment in the SVG file documents that official artwork is required before launch.
- **Founder strip inside Hero `<section>`** (not separate section) so it shares the dark gradient + HeroParticles backdrop. Visually one "hero block" with a subtle border-top divider above the founder strip.
- **3-commit pattern for Phase 1G** rather than one big commit. Now that the repo has a remote, atomic commits per subtask make `git log` readable and individual changes revertable.

**Open flags rolling forward into Phase 1H:**

⚠️ **3 seed articles are not enough** — CLAUDE.md Blog rule requires 9–10 minimum. Phase 1H adds 6–7 more articles per MI §6 AEO targets.

⚠️ **`headerImage: null` on all 3 seed articles** — gradient fallback renders. Phase 1H fal.ai pass generates per-article header images.

⚠️ **Studio stub** — Phase 1H+ wires `<NextStudio>` when Mike provisions Sanity project ID + dataset.

⚠️ **EHL SVG placeholder** — flagged for HUD-sourced replacement before publish.

⚠️ **LO portraits + Mike portrait** still `[ASSET-PENDING]`. Phase 1H fal.ai or client-supplied photos.

⚠️ **Multi-Breakpoint Browser Audit (Section 11)** — STILL not run. CLAUDE.md mandatory pre-ship gate. Phase 1H is the right time: all sections, animations, assets, real-content pages now in place. Need Playwright drive across 1440 / 390 / 375 / 428 viewports + nav drawer state. Zero console errors / warnings tolerance.

**Next session starts at:** Phase 1H — Asset pipeline + remaining blog articles + Multi-Breakpoint Browser Audit.

Phase 1H tasks:
1. **fal.ai blog imagery** — generate header + card images for 3 existing seeds + 6–7 new articles. Per CLAUDE.md Image Generation Rule: distinct prompts per article, no readable text, visual review before commit.
2. **6–7 additional blog articles** — per-state explainers (9 states, prioritize MA/NH/FL/CO/TX), "UWM Wholesale Explained," "Rate-Shopping Guide for First-Time Buyers." All in voice, [COMPLIANCE-REVIEW-PENDING] flagged.
3. **22 LO portraits + Mike portrait** — fal.ai-generated placeholder OR Mike's actual photos delivered Tuesday.
4. **HUD-sourced EHL artwork** if Mike's IT firm sources it.
5. **Real client logo** if Mike provides.
6. **Multi-Breakpoint Browser Audit (Section 11)** — Playwright drives 4 viewports, captures screenshots, verifies zero console errors/warnings, no horizontal scroll at 375, hero fits above fold, no flat-color sections, `prefers-reduced-motion` graceful degradation, mobile nav drawer opens/closes cleanly. Mandatory before any Phase 2A deploy.
7. **`/ultrareview`** cross-AI peer review.

---

### Session 6 — 2026-04-27 (Phase 1F SEO + AEO + Depth)

**Completed:** 4 parallel subagents in Wave 1 + orchestrator inline Wave 2.

**Wave 1 — 4 parallel:**

🚨 **A — Legal Re-scrape Agent — LAUNCH BLOCKER CLOSED.** Re-scraped `https://www.lmpfinancial.com/privacy-policy` + `/terms-of-use` via Firecrawl. **Discovered the Phase 1E Legal Pages were extensively fabricated** — they were built from "Key points" summaries and filled in with plausible-but-fictional clauses including a non-existent "SMS Communications" section in Privacy and several invented Terms clauses ("Eligibility," "MLS and Third-Party Data," "License and Permitted Use," postal-address contact blocks, etc.). Replaced both bodies with verbatim live-site prose. Privacy now 263 lines, Terms now 371 lines. Source typos preserved verbatim per CLAUDE.md no-paraphrase rule (5 typos flagged for IT-firm review: "interested-based" instead of "interest-based"; "MSL's" instead of "MLS's"; sentence-merge typos like "Website.You" with no space; run-on grammar in eligibility sentence; duplicate "Limitation on Time to File Claims" section appearing twice in a row on the live site). Page header sections + `metadata` exports preserved untouched. ADA page untouched (already verbatim from `siteConfig.compliance.adaStatement`). 3 unique 8+-word verbatim phrases per document confirmed in the agent report.

**B — Schema Markup + robots.ts Agent.** New: `src/lib/schema.ts` (216 lines, 5 schema-builder functions + `schemaScript` helper), `src/app/robots.ts` (32 lines, disallows `/pricing` + `/api/` + `/studio/`). Modified: `src/app/layout.tsx` (root sitewide JSON-LD: FinancialService + LocalBusiness, NMLS #2754084 as `PropertyValue` identifier), `src/app/team/[lo-slug]/page.tsx` (per-LO Person schema with NMLS as identifier, languages mapped to "English"/"Spanish"/"Portuguese"), `src/app/faq/page.tsx` (FAQPage schema — refactored existing nested FAQ data into `FAQS_FLAT` derived const for single-source-of-truth), `src/app/services/[slug]/page.tsx` (Service schema). **Important regulatory call:** per-LO `stateLicensure` intentionally NOT included in Person schema because all LOs currently have `["[CONFIRM-WITH-CLIENT]"]` — adding state licensure to schema before Mike confirms would risk a regulatory false claim per CLAUDE.md Compliance Rule. Followup needed when Mike confirms state-by-state licensure subsets Tuesday.

**C — Calculators Bundle Agent.** Replaced `/calculators` stub + built 5 native calculators: affordability (income/debts/DTI → max loan + max home price), monthly-payment (loan/rate/term/tax/insurance/PMI → P&I + total + lifetime interest), refinance (current vs new with breakeven analysis), down-payment (FHA/VA/USDA/Conv 5%/Conv 20%/Jumbo side-by-side), DTI (front-end + back-end with per-program threshold pass/fail badges including VA's residual-income special case). 6 files, 2001 lines. Math verified: $375K @ 6.75%/30yr → $2,432/mo P&I matches spec. Static currency rendering via `Math.round + toLocaleString('en-US')` (CountUp doesn't update live with sliders). `[NOT-A-COMMITMENT — actual rates and terms determined at application]` flag visible on every page. Every calculator links to `/booking` for a real quote. Zero rate display anywhere (Reg Z compliant). Edge cases: divide-by-zero on rate=0, debts > DTI threshold, refi with no benefit — all handled.

**D — State Pages Agent.** New: `src/data/state-programs.ts` (665 lines — `STATE_PROGRAMS` keyed by 2-letter state code, with 41 total programs across 9 states), `src/app/mortgage-broker-[state]/page.tsx` (later relocated — see Wave 2 fix), `src/app/service-areas/page.tsx` (165 lines — 9-state grid grouped by region: New England → Mountain West → Texas → Florida). Featured LO assignments derived from bio voice analysis (Allen+Kwame for ME, Nick for CT/Time-To-Own, Scott+Ryan for FL, Mike Jr for CHFA-CO, David+Juan for TX bilingual market, Aisha+Alexa for MA Brazilian-Portuguese market) — all flagged `[CONFIRM-WITH-CLIENT — per-state LO licensure subset pending]`. Dollar figures sourced from MI §6 + §9 Do #2 where possible (MA $30K MassHousing, FL $35K Hometown Heroes, CT $50K Time To Own, etc.); inferred figures flagged `[FIGURES-CURRENT-AS-OF-2026-Q1 · VERIFY-WITH-AGENCY-WEBSITE · COMPLIANCE-REVIEW-PENDING]`. Every program card links to its state HFA agency site.

**Wave 2 — orchestrator inline:**

- **Restructure required:** State Pages Agent built `src/app/mortgage-broker-[state]/page.tsx` (literal-prefix-plus-dynamic-suffix in a single segment). **Next.js App Router does NOT support partial dynamic segments** — bracket syntax must be the whole segment. All 9 state routes were 404'ing. Fixed by moving the file to `src/app/mortgage-broker/[state]/page.tsx`, deleting the old directory, and updating sitemap.ts + service-areas/page.tsx to use the new URL pattern `/mortgage-broker/<slug>`. URLs now: `/mortgage-broker/massachusetts`, `/mortgage-broker/new-hampshire`, etc. Still SEO-friendly slugs.
- **Updated** `src/app/sitemap.ts` to include `/service-areas`, 5 calculator detail routes, and 9 state routes. Sitemap now contains **61 URLs** (was 46 in Phase 1E).
- **Verified** 36 routes returning HTTP 200 via dev-server curl pass:
  - 21 from Phase 1E (homepage, /services + /services/fha, /team + /team/mike-comerford, /partners, /careers, /quiz, /booking, /testimonials, /pricing, 3 legal pages, /contact, /faq, /calculators stub now upgraded, /blog stub, /blog/[slug], /sitemap.xml)
  - 5 calculator detail pages (/calculators/affordability, /monthly-payment, /refinance, /down-payment, /dti)
  - /service-areas
  - 9 state pages (/mortgage-broker/{massachusetts, new-hampshire, maine, rhode-island, connecticut, vermont, florida, colorado, texas})
  - /robots.txt
- Dev server boot 318ms, zero compile errors, zero warnings. Stopped via `Stop-Process -Force` (killed 2 stale Node processes from prior phases).

**Decisions made:**
- **Routing fix `mortgage-broker/[state]` over `mortgage-broker-[state]`** — Next.js limitation forced this restructure. URLs are clean either way; SEO equivalent.
- **`stateLicensure` NOT in Person schema** until Mike confirms (regulatory safety call).
- **Static currency in calculators over CountUp** — CountUp doesn't update live with slider input changes, and lacks thousands-separators. Static render via `toLocaleString` is correct.
- **Tone-adjacency fix DEFERRED** — working through the math during planning revealed the homepage's 10-section ordering with 5D+5L is structurally constrained. Multiple ordering attempts created new adjacencies. Defer to Phase 1G with a proper section-restructuring plan (e.g., merge About into Hero as a "founder strip," reducing to 9 sections; or split Stats into 2-up vs 5-stat strip and color them differently).
- **Sanity blog deferred to Phase 1G** — needs `NEXT_PUBLIC_SANITY_PROJECT_ID` env var.

**Open flags rolling forward into Phase 1G:**

⚠️ **5 source typos in legal pages** preserved verbatim — flag for IT-firm review whether to deduplicate the "Limitation on Time to File Claims" section that appears twice on the live source, and whether to fix typos like "interested-based" → "interest-based," "MSL's" → "MLS's," sentence-merge spaces. Per CLAUDE.md verbatim rule, the safer default is to preserve and let counsel decide.

⚠️ **Per-LO `stateLicensure`** still `[CONFIRM-WITH-CLIENT]` — blocks: (1) adding licensure to Person schema, (2) per-LO state pages content claims. Tuesday demo is the action point.

⚠️ **State program figures** flagged `[FIGURES-CURRENT-AS-OF-2026-Q1 · VERIFY-WITH-AGENCY-WEBSITE · COMPLIANCE-REVIEW-PENDING]` on every program. State agency websites change quarterly. Pre-launch-auditor must verify before publish.

⚠️ **Schema markup references** `logo.png` and `og-image.jpg` in `/public` that don't exist yet. Phase 1G asset pipeline (fal.ai or client-supplied) lands these.

⚠️ **Tone-adjacency on homepage** still unresolved (AboutSection + StatsSection both light). Phase 1G structural fix.

⚠️ **`/api/contact`** still a stub. Phase 2A wires Resend.

**Files this session: 14 new + 6 modified + 2 modified-twice (sitemap was modified in Wave 2a then again for state route fix; layout.tsx was modified by user for schema imports between agent dispatches). 18 file touches total.**

New files:
- `src/lib/schema.ts`, `src/app/robots.ts`
- `src/app/calculators/page.tsx` (rewrite from stub) + 5 calculator detail pages
- `src/data/state-programs.ts`, `src/app/mortgage-broker/[state]/page.tsx`, `src/app/service-areas/page.tsx`

Modified files:
- `src/app/privacy-policy/page.tsx` (verbatim prose)
- `src/app/terms-of-use/page.tsx` (verbatim prose)
- `src/app/layout.tsx` (root JSON-LD)
- `src/app/team/[lo-slug]/page.tsx` (Person schema)
- `src/app/faq/page.tsx` (FAQPage schema + FAQS_FLAT hoisted)
- `src/app/services/[slug]/page.tsx` (Service schema)
- `src/app/sitemap.ts` (61 URLs)
- `src/app/service-areas/page.tsx` (state route href fix)

**Next session starts at:** Phase 1G — Sanity blog + asset pipeline + structural homepage fixes.

Phase 1G tasks:
1. **Sanity blog wiring** — install `next-sanity`, create `src/sanity/{client,queries,image}.ts`, schema definitions (`post`, `category`, `author`, `blockContent`), `/studio/[[...tool]]/page.tsx` editor route. Replace `/blog/page.tsx` + `/blog/[slug]/page.tsx` stubs with real GROQ-fetching components. Add seed JSON fallback for demo when Sanity API unreachable. Requires Mike to provision Sanity project + provide `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET`.
2. **fal.ai asset pipeline** — generate blog card + header images per article (per CLAUDE.md Image Generation Rule), generate Mike + 22 LO portrait placeholders if real photos not provided Tuesday, generate Equal Housing Lender SVG.
3. **Tone-adjacency homepage fix** — restructure section order. Recommended: merge AboutSection's content into a "founder strip" inside HeroSection (Mike quote + photo as Layer 4), reducing total sections to 9 and resolving the L-L adjacency mathematically.
4. **`logo.png` + `og-image.jpg`** in `/public` — schema markup references these.
5. **Per-LO Calendly URIs** populated when Mike provides them Tuesday — currently empty in `siteConfig.loanOfficers[].calendlyUri`.
6. **Per-LO portrait images** from Mike or fal.ai-generated.
