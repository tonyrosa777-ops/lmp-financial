<!--
DESIGN SYSTEM — LMP FINANCIAL
Generated: 2026-04-27
Sources:
  - initial-business-data.md (intake — 10 sections, 22-LO roster, 9-state footprint, three-headed monster)
  - market-intelligence.md (24-competitor scan, design landscape, audience personas, AEO/SEO gaps)
  - frontend-design.md (Optimus UI/UX rules)
  - website-build-template.md (token schema + scaffold contract)
  - CLAUDE.md (Optimus positioning rule, compliance rule, hero architecture rule, homepage section architecture rule)

Posture:
  - This file is the BRAND CONSTITUTION. Per CLAUDE.md Reference File Hierarchy Rule, design-system.md > frontend-design.md > website-build-template.md when they conflict.
  - No deviation from values in this file without explicit written approval and a matching update to this file.
  - All color, type, motion, and tone decisions trace back to research cited inline (MI = market-intelligence.md, IBD = initial-business-data.md).
-->

# Design System — LMP Financial

**Brand:** LMP Financial
**Positioning:** The independent mortgage broker that beats retail giants on rate AND treats borrowers like neighbors — across 9 states, 22 LOs, and three languages.
**Visual direction:** Editorial-financial-services. Deep navy + warm gold + cream. Serif display + modern sans body. Generous whitespace. Real photography, never stock.
**Approved direction family** (per CLAUDE.md Optimus Positioning Rule): **luxury/refined hybridized with editorial/magazine**. Never playful/toy-like. Never brutalist/raw. Never retro-futuristic.

---

## Section 1 — Brand Foundation

### Three audiences (the "three-headed monster" — IBD §9, MI §2)
1. **Borrowers** in 9 licensed states (MA, NH, ME, RI, CT, FL, CO, VT, TX). Skewed first-time-buyer + working/middle class. Dominant programs: FHA, VA, USDA, conventional, MassHousing/CHFA/state DPA, jumbo (Northeast metros), reverse (boomers), bank-statement/DSCR (FL/TX investors), ITIN (Lowell-Brockton-Lawrence Brazilian + Hispanic borrowers).
2. **Realtor referral partners** — co-marketing, fast pre-approval, RESPA-compliant. Not buried in footer.
3. **LO recruits** — the Brian Walsh recruiting funnel. Comp transparency, in-person Lowell HQ option, bilingual marketing support, multi-state license expansion.

### Voice anchor (one-sentence test)
> *"Built like a Lowell handshake, runs like Stripe."*

If a copy block, color choice, or component decision can be defended by both halves of that sentence — local + warm + trustworthy AND modern + precise + premium — it is on-brand. If only one half holds, it's drifting.

### What we are NOT
- Not Rocket. Not a digital-first commodity rate-shop.
- Not a small-town bank. Not bland-blue-and-white.
- Not a luxury-jumbo-only boutique. Black/gold luxury is 5% of competitors (mostly FL) and excludes 80% of LMP's borrower base.
- Not a Webflow corporate template. The current `lmpfinancial.com` is the anti-pattern — generic stock photos, hero carousel, bio-light About, footer-buried legal.

---

## Section 2 — Color System

### Why deep navy + warm gold + cream (research-backed)
- **70% of competitor sites use blue-navy + white** (MI §8). Generic blue-navy reads "we are like everyone else." We need the trust signal of navy WITHOUT the commodity feel — go DEEPER (near-black navy) and pair with warm cream instead of stark white.
- **5% use black/gold luxury** (MI §8 — mostly FL boutiques). Pure black/gold reads "we charge more" and alienates FHA/USDA/first-time buyers (60%+ of LMP volume per IBD §2). Wrong for the three-headed monster.
- **Editorial-financial-services aesthetic** (Ramp / Mercury / Stripe applied to mortgage) is **validated by MI §8 as an uncontested visual lane** in the 24-competitor set. Deep navy + warm gold + cream IS that lane.
- **Warm cream over stark white** breaks the white-paper feel that signals "form, paperwork, dread" — the dominant emotional baggage of mortgage UX (MI §7 friction analysis).
- **Warm gold (aged brass, not yellow)** signals premium without being cold or status-exclusionary. Pairs with cream to feel approachable, pairs with navy to feel serious.

### Primary palette (CSS custom properties — final values)

```css
:root {
  /* === BRAND CORE === */
  --primary:        #0E1B33;   /* Deep navy — dark section base. Near-midnight, blue undertone. */
  --primary-deep:   #061021;   /* Even deeper — footer, deepest accents */
  --primary-soft:   #1A2A47;   /* Slightly elevated navy — cards on dark, hover states */
  --primary-muted:  rgba(14, 27, 51, 0.6);

  --accent:         #C5A572;   /* Warm aged gold (brass) — primary accent, CTAs, shimmer */
  --accent-deep:    #A8895F;   /* Darker brass — hover/pressed states */
  --accent-light:   #E0C690;   /* Lighter gold — soft emphasis, glow halos */
  --accent-muted:   rgba(197, 165, 114, 0.5);

  /* === SURFACE SCALE === */
  /* LIGHT sections (homepage alternation) — cream-based */
  --bg-base:        #F5EFE2;   /* Warm cream — primary light section bg */
  --bg-elevated:    #FAF6EC;   /* Lighter cream — elevated bands within light sections */
  --bg-card:        #FFFFFF;   /* Pure white — content cards on cream */

  /* DARK section card surfaces (when --primary is the section bg) */
  --bg-card-dark:   rgba(255, 255, 255, 0.04);
  --border-dark:    rgba(255, 255, 255, 0.08);
  --border-dark-strong: rgba(197, 165, 114, 0.25);

  /* === TEXT — DARK SECTIONS (text on navy) === */
  --text-primary:        #F5EFE2;                       /* Warm cream — H1, H2, body on dark */
  --text-secondary:      rgba(245, 239, 226, 0.72);
  --text-muted:          rgba(245, 239, 226, 0.42);

  /* === TEXT — LIGHT SECTIONS (text on cream) === */
  --text-on-light:        #0E1B33;                       /* Deep navy — H1, H2, body on light */
  --text-on-light-secondary: rgba(14, 27, 51, 0.72);
  --text-on-light-muted:     rgba(14, 27, 51, 0.42);

  /* === SEMANTIC === */
  --success:        #5C8A6F;   /* Sage — qualified, closed, paid */
  --warning:        #D4A93C;   /* Warm amber — pending, attention */
  --error:          #B85450;   /* Muted brick — declined, error (no harsh red on financial pages) */
  --info:           #6B8CAE;   /* Slate blue — neutral notice */

  /* === SPACING — STANDARD ACROSS ALL OPTIMUS BUILDS (do not modify) === */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
}

html { scroll-padding-top: 96px; }
@media (min-width: 640px)  { html { scroll-padding-top: 112px; } }
@media (min-width: 1024px) { html { scroll-padding-top: 128px; } }
```

### Color usage rules

**Navy (`--primary`)**
- Dark section backgrounds (homepage alternation, hero, footer, every other section per Homepage Section Architecture Rule).
- H1 / H2 on cream backgrounds (use `--text-on-light`, which IS navy).
- Primary navigation when scrolled.
- Footer.

**Warm gold (`--accent`)**
- Primary CTA button background ("Get Pre-Approved," "Start Pre-Approval," "Take the Quiz").
- Hero shimmer (`.hero-shimmer` warm variant — see Typography section).
- Active/selected states on quiz options, calendar dates, form fields.
- Underlines on key trust phrases ("$10,662 saved on average").
- Pricing page Pro tier "Most Popular" badge.
- Stat counters, NMLS callout boxes.
- Compliance-reviewed claim citations (small superscript, gold).
- The ⬥ marker on the internal `Pricing` nav link (per CLAUDE.md Always-Built Pricing Rule).

**Cream (`--bg-base`)**
- Light section backgrounds (homepage alternation).
- Body of long-form content: blog articles, legal pages, FAQ answers.
- Form-dense pages: contact, pre-approval intake, booking confirmation.
- Pricing page comparison table background.

**White (`--bg-card`)**
- Content cards inside cream sections (loan-program cards, LO grid cards, testimonial cards on cream backgrounds).
- Calculator output panels.
- NEVER the section background itself. White is for cards on cream, never standalone.

### Forbidden color moves
- ❌ Pure black (#000) anywhere. Always use `--primary-deep` (#061021) — deep navy reads "premium" while pure black reads "fashion." We are not fashion.
- ❌ Stark white (#FFFFFF) as a section background. White-paper-form feel is the enemy.
- ❌ Bright/saturated red anywhere. Mortgage pages with bright red trigger "denied / overdue / debt" associations. Use `--error` (#B85450) only for actual error states.
- ❌ Purple gradients. Generic AI/SaaS aesthetic — frontend-design.md explicit forbidden.
- ❌ Bootstrap navy (#001f3f). Generic. We use #0E1B33 — deeper, warmer undertone.
- ❌ Yellow gold. Cheap, candy-bright. We use aged brass (#C5A572) — warm, sophisticated, prestige without garish.

### Gradient vocabulary (per Homepage Section Architecture Rule — no flat backgrounds, ever)

All section backgrounds are **gradient + motion** by default. Pick ONE motion type per section (do not stack):

**Dark section gradient base:**
```css
background:
  radial-gradient(ellipse 60% 80% at 20% 10%, rgba(197, 165, 114, 0.08), transparent 60%),
  radial-gradient(ellipse 70% 60% at 80% 90%, rgba(26, 42, 71, 0.6), transparent 70%),
  var(--primary);
```

**Light section gradient base:**
```css
background:
  radial-gradient(ellipse 60% 80% at 80% 10%, rgba(197, 165, 114, 0.06), transparent 60%),
  radial-gradient(ellipse 70% 60% at 20% 90%, rgba(14, 27, 51, 0.04), transparent 70%),
  var(--bg-base);
```

**Motion options** (max 3 active layers in any viewport — performance budget):
1. **Breathing orb** — 1–2 radial blobs, CSS-only, 12s cycle (scale + opacity).
2. **Mesh drift** — animated `background-position` shift, 20–30s cycle.
3. **Aurora sweep** — diagonal conic gradient sweeping across, 15–25s cycle.
4. **Grain shimmer** — fine-grain noise overlay, 8s loop.

**Reduced-motion fallback (mandatory):** under `@media (prefers-reduced-motion: reduce)`, every animated background degrades to its STATIC gradient form — never to flat color.

---

## Section 3 — Typography

### Type stack (final picks)

| Role | Font | Why |
|---|---|---|
| **Display** (H1, hero, page heroes) | **Fraunces** (variable, `OPSZ`, `WONK`, `SOFT` axes) — Google Fonts, free | Editorial-financial serif. Variable axes let us tune from "soft/luxury" to "serious/architectural" per surface. Distinctive — not Playfair, not EB Garamond, not the obvious choices. |
| **Body** (paragraph, UI, navigation) | **General Sans** — Fontshare, free for commercial | Modern characterful sans. Distinctive without being trendy. NOT Inter, NOT Roboto, NOT Space Grotesk (per frontend-design.md forbidden list). |
| **Mono** (NMLS numbers, license #s, code, eyebrows, micro-labels) | **JetBrains Mono** — Google Fonts, free | Clean monospace. Used for license numbers, NMLS IDs, calculator readouts, eyebrow labels. |

### Loading

```tsx
// app/layout.tsx — use next/font for self-hosting + zero CLS
import { Fraunces } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// General Sans is on Fontshare, not Google Fonts. Self-host:
const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "../public/fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});
```

### Type scale (declared in `globals.css` — required by CSS Scaffold Completeness Rule)

```css
.text-display { font-size: clamp(2.75rem, 5.5vw, 4.5rem); line-height: 1.05; letter-spacing: -0.02em; }  /* Hero H1 */
.text-h1      { font-size: clamp(2.25rem, 4.2vw, 3.25rem); line-height: 1.1; letter-spacing: -0.015em; } /* Interior page H1 */
.text-h2      { font-size: clamp(1.625rem, 3.2vw, 2.5rem); line-height: 1.18; letter-spacing: -0.01em; }
.text-h3      { font-size: clamp(1.375rem, 2.6vw, 1.875rem); line-height: 1.25; letter-spacing: -0.005em; }
.text-h4      { font-size: clamp(1.125rem, 2vw, 1.375rem); line-height: 1.3; }
.text-body    { font-size: clamp(1rem, 1.4vw, 1.125rem); line-height: 1.6; }
.text-body-sm { font-size: 0.9375rem; line-height: 1.5; }
.text-eyebrow { font-size: 0.8125rem; line-height: 1.4; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--font-mono); }
.text-micro   { font-size: 0.75rem; line-height: 1.4; }   /* Disclaimer, fine print, NMLS */
```

### Font-family assignments

- **`font-display` (Fraunces)** — H1, H2 on hero/marketing pages, large stat counters, testimonial pull-quotes
- **`font-body` (General Sans)** — H3, H4, all paragraph text, UI buttons, navigation, form labels
- **`font-mono` (JetBrains Mono)** — eyebrow labels, NMLS IDs, license numbers, calculator outputs, code/data, the ⬥ Pricing nav marker

### Hero shimmer — `.hero-shimmer` (warm variant, MANDATORY on every hero H1 and interior page H1 per CLAUDE.md)

```css
.hero-shimmer {
  background: linear-gradient(
    100deg,
    var(--text-primary) 0%,
    var(--accent-light) 30%,
    var(--accent) 50%,
    var(--accent-light) 70%,
    var(--text-primary) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-sweep 8s ease-in-out infinite;
}

@keyframes shimmer-sweep {
  0%, 100% { background-position: 200% 50%; }
  50%      { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-shimmer { animation: none; background-position: 100% 50%; }
}
```

LMP is a **warm brand** (cream + gold). Use `.hero-shimmer` (warm gold variant). Do not use `.hero-shimmer-sage`.

### Forbidden type moves
- ❌ Inter, Roboto, Arial, system-ui as primary fonts — generic AI aesthetic, frontend-design.md forbidden.
- ❌ Space Grotesk — explicit forbidden in frontend-design.md.
- ❌ Lobster, Comic Sans, Pacifico, any decorative script — kills financial trust.
- ❌ All-uppercase paragraph text — only eyebrows + button labels can be uppercase.
- ❌ Center-aligned long-form body copy — left-align only for paragraph blocks > 3 lines.

---

## Section 4 — Spacing & Layout

### Container widths
```css
.container-narrow { max-width: 720px; margin-inline: auto; }   /* Long-form prose, blog, legal */
.container-base   { max-width: 1080px; margin-inline: auto; }  /* Standard section content */
.container-wide   { max-width: 1280px; margin-inline: auto; }  /* Hero, full-bleed grids */
.container-full   { max-width: 1440px; margin-inline: auto; }  /* Edge-to-edge layouts */
```

### Section padding
```css
.section-pad-tight  { padding-block: clamp(2.5rem, 5vw, 4rem); }
.section-pad-base   { padding-block: clamp(4rem, 8vw, 7rem); }   /* Default for homepage sections */
.section-pad-loose  { padding-block: clamp(6rem, 12vw, 10rem); } /* Hero, dramatic transitions */
```

### Grid baseline
- 12-column on desktop (≥1024px)
- 6-column on tablet (640–1023px)
- 4-column on mobile (<640px) — design mobile-first per CLAUDE.md
- Gutter: `var(--space-lg)` (24px) desktop, `var(--space-md)` (16px) mobile

### Border radius scale
```css
--radius-sm:  6px;   /* Inline tags, badges */
--radius-md:  10px;  /* Buttons, inputs */
--radius-lg:  16px;  /* Cards, sections */
--radius-xl:  24px;  /* Featured cards, hero panel */
--radius-2xl: 32px;  /* Pricing tier cards */
--radius-pill: 9999px;
```

### Shadow scale (subtle — luxury restraint)
```css
--shadow-sm:  0 1px 2px rgba(14, 27, 51, 0.06);
--shadow-md:  0 4px 12px rgba(14, 27, 51, 0.08);
--shadow-lg:  0 12px 32px rgba(14, 27, 51, 0.10);
--shadow-xl:  0 24px 60px rgba(14, 27, 51, 0.14);
--shadow-glow-gold: 0 0 32px rgba(197, 165, 114, 0.25);  /* Hover on primary CTAs */
```

---

## Section 5 — Motion & Animation Language

### Stack
- **Framer Motion** — scroll reveals, page transitions, stagger sequences (per CLAUDE.md website-build-template.md)
- **react-intersection-observer** — trigger thresholds for scroll-linked animations
- **CSS keyframes** — section background motion (breathing orb / mesh drift / aurora sweep / grain shimmer)
- **`<canvas>`** — hero brand canvas + HeroParticles (hero only — interior pages get ambient effects, never full canvas)

### Easing curves
```ts
export const easings = {
  // Standard — most UI motion
  standard: [0.4, 0, 0.2, 1],          // ease-in-out, Material standard
  // Entrance — content arriving on scroll
  entrance: [0.25, 0.46, 0.45, 0.94],  // ease-out, soft landing
  // Exit — content leaving
  exit: [0.55, 0.085, 0.68, 0.53],     // ease-in
  // Confident — primary CTAs, hero text reveal
  confident: [0.16, 1, 0.3, 1],        // expo-out, snappy + premium
  // Soft — luxurious, longer-form (testimonial pulls, hero subhead)
  soft: [0.65, 0.05, 0.36, 1],         // sine-like
};
```

### Duration scale
```ts
export const durations = {
  instant: 0.12,   // hover state
  fast:    0.24,   // small UI movement
  base:    0.4,    // standard reveal
  slow:    0.65,   // hero stagger interval reference
  cinema:  1.0,    // pull-quote arrival, pricing tier reveal
};
```

### Stagger sequences
- **Hero stagger** (3-layer rule): H1 at 0s, subheadline at 0.15s, CTAs at 0.3s. Easing `confident`. Duration `base`.
- **Card grid reveal**: 60ms stagger between cards. Easing `entrance`. Threshold 0.15 (start when 15% in viewport).
- **Stat counter**: number counts from 0 → final over 1.6s. Easing `confident`. Triggered on viewport entry.

### Reduced-motion contract (mandatory per CLAUDE.md)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Plus per-component overrides for backgrounds (degrade to static gradient, never to flat color) and shimmer (stop at 100% gold).

---

## Section 6 — Photography & Media Direction

### What to shoot / generate

**Approved subjects:**
1. **Real Lowell exterior** — 175 Cabot St, Ste 500 façade, the Boott Mills brickwork, the Merrimack River backdrop. Anchors the local moat (MI §9 "exploit local + bilingual").
2. **The 22 LO portraits** — natural light, half-body, mid-distance, candid expressions. Each LO photographed in the Lowell HQ OR a setting that signals their state of operation (Cape coastline for ME LO, Denver foothills for CO LO, etc.).
3. **Mike Comerford in-office** — desk shot, in conversation with a borrower or LO. Documentary, not portrait. Signals the working business, not the ad.
4. **Real borrower moments at closing** — hands signing, keys exchanging, family on a porch. Lit warmly. Faces visible only with explicit RESPA-compliant signed release. Otherwise: hands, keys, doors, mailboxes — never stock-photo families.
5. **State landscapes** — used as subtle hero backdrop ambient layers per state landing page (NH White Mountains, ME coastline, CT colonial homes, FL palms-meet-stucco, CO foothills, TX hill country, VT covered bridge, RI Newport, MA triple-decker).
6. **Architectural details** — handshakes (real), keys, deeds, blueprint corners, real estate signs (LMP-branded only — never competitor signs). Macro shots, 35mm-feel, warm light.

**Mood direction:**
- Warm-light photography: golden hour, late afternoon, soft window light. Never harsh midday or flash.
- Documentary > portrait. Candid > composed.
- Wide tonal range: pulled-down highlights, lifted shadows. Looks like editorial film photography (think *The Atavist*, Mercury's "About" pages, Stripe Press).
- Color grading: subtle warm shift in shadows, neutral mid-tones, slightly desaturated highlights. Consistent across all imagery.

### Anti-patterns (forbidden — MI §8 confirmed competitor anti-patterns)
- ❌ Stock-photo families. Anyone who's seen the iStock "happy diverse couple holding house keys" image will identify it immediately. Kills trust.
- ❌ Stock-photo "professional" handshakes in suits.
- ❌ Glassy CGI 3D renders of houses. Reads like a real-estate-tech startup deck, not a broker.
- ❌ Aerial drone shots of generic suburban subdivisions.
- ❌ Auto-rotating hero carousels (MI §8 forbidden).
- ❌ Smiling-businesswoman-with-headset call-center imagery.

### fal.ai prompt template (when no real photo is available — per CLAUDE.md Image Generation Rule)

```
Editorial documentary photograph, [SCENE], natural late-afternoon golden hour light from
camera-left, warm tonal grade with pulled highlights and lifted shadows, 35mm full-frame
look, shallow depth of field, [SUBJECT detail — hands / architectural detail / candid moment
— NEVER readable text, NEVER stock-photo composition], [LOCATION cue — Lowell brick mill
exterior / New England triple-decker / state-specific landscape], color palette of warm
cream, deep navy, aged brass, no neon or saturated colors, no logos visible, photographed
on Kodak Portra 400.
```

**Never include readable text in fal.ai prompts** (per CLAUDE.md — image models produce garbled text). For any image that would naturally include signage or documents, describe the object visually without specifying its text.

### Blog imagery rule
Every blog article ships with both a **card image** (1200×630, OG-spec) and a **header image** (2400×1200) per CLAUDE.md Image Generation Rule. Both grounded in this section's mood direction.

---

## Section 7 — Voice & Tone

### Voice anchor (re-stated for in-section reference)
> *"Built like a Lowell handshake, runs like Stripe."*

Translated to copy mechanics:
- **Local + warm + trustworthy** — first-person plural, specific places ("Lowell," "Cabot Street," "Boott Mills"), specific names (LOs, real borrowers when permitted), specific dollar figures (the $10,662 average savings number from Polygon Research / UWM, MI §4).
- **Modern + precise + premium** — short sentences. Real numbers. No "best rates guaranteed" hedging. No corporate-mortgage hedge phrases ("at our company we strive to..."). Active verbs.

### Sentence rules
- **No em dashes (—)** anywhere in user-facing copy. Em dashes are the AI / press-release tell. Use commas, periods, semicolons, ellipses.
- **First-person plural for LMP voice** ("we shop 30+ wholesale lenders for you"). First-person singular only inside LO bios and testimonials.
- **Specific over abstract.** Instead of "fast closings," say "14-day average close" (with sourcing — see Compliance section). Instead of "great service," name the LO and the program.
- **Short sentences first, then longer.** Each section opens with a punchy claim, then earns it across 2–4 longer sentences.

### Tone slider per surface

| Surface | Tone | Example opener |
|---|---|---|
| Hero | Confident + warm | "Settle into your home, not a rate you'll regret." |
| Loan-program page | Specific + reassuring | "FHA loans need 3.5% down and a 580 credit score. We walk you through both." |
| LO bio | Personal + warm | "Hi, I'm Mike. I've been originating loans in Lowell since 2003 and I still take Saturday calls." |
| Realtor partner page | Professional + capable | "We close in 14 days. We co-brand at no cost. We come to your closings." |
| LO recruiting | Direct + transparent | "220–275 bps. In-person Lowell training. Bilingual marketing assets. You bring the book; we bring the rest." |
| Compliance / legal | Verbatim — DO NOT REWRITE | (See CLAUDE.md Compliance Rule.) |
| Blog (state-program explainer) | Editorial-Vox-Explainer | "MassHousing's $30,000 down-payment grant has three income tiers. Here's which one applies if you make $96K in Brockton." |
| Error / 404 | Helpful + brief | "This page doesn't exist anymore. Most folks looking for it want our calculators or our team." |

### Forbidden phrases
- ❌ "Best rates guaranteed" / "We beat any rate" — Reg Z exposure (MI §9 avoid #2).
- ❌ "We strive to..." / "Our mission is..." / "At our company..." — corporate hedge.
- ❌ "Click here" / "Learn more" — non-specific CTAs. Always action-specific.
- ❌ "Apply now" mid-paragraph as a CTA — friction (MI §8 anti-pattern).
- ❌ Any rate display, anywhere on the site (MI §4, §9 avoid #1).

### Demo-copy convention
When `initial-business-data.md` lacks a fact, write it in-voice and mark:
```html
<!-- [DEMO COPY — pending client review] -->
```
Per CLAUDE.md Copy Writing Rule — never leave blanks, never write `[MISSING]`, never hassle the client for things we can plausibly write ourselves.

---

## Section 8 — Brand Personality Axes

These axes drive: HeroParticles selection, hero shimmer color, animation depth, photography pick, copy tone calibration. Read this section before selecting hero canvas, picking testimonial pulls, or commissioning new photography.

| Axis | Position | Implications |
|---|---|---|
| **Warm ↔ Cool** | **WARM** (75/100 toward warm) | Cream + gold palette. `.hero-shimmer` warm gold variant (not sage). Photography: golden-hour light. Copy: handshake metaphors, neighbor language. |
| **Quiet ↔ Loud** | **QUIET-CONFIDENT** (60/100 toward quiet) | Restrained motion. No marquee animations. Single signature hero moment, then editorial calm. CTA buttons assert without shouting (no all-caps screaming). |
| **Modern ↔ Classic** | **HYBRID — modern execution, classical substance** (50/100) | Variable serif (Fraunces) + modern sans (General Sans). Editorial layout. Numbers and data foregrounded, but typeset like *The Atavist*, not like a fintech dashboard. |
| **Playful ↔ Serious** | **SERIOUS** (75/100 toward serious) | Compliance + trust. No sarcasm. Emoji used as semantic UI markers (per CLAUDE.md Code Standards), never as personality signals. |
| **Refined ↔ Raw** | **REFINED** (85/100) | Optimus Positioning Rule mandates luxury floor. Subtle shadows, generous whitespace, careful tracking, restrained shadows. Premium without ornamental excess. |
| **Personal ↔ Corporate** | **PERSONAL** (80/100) | Per Mike's discovery quote: "the product is the LO, not the brand." Every page surfaces a named human. LO grid is prominent. Mike's Lowell-handshake voice anchors the brand. |
| **Local ↔ Global** | **LOCAL-FIRST + 9-state-aware** (70/100 toward local) | Hero must surface "9 states. 22 LOs. Three languages." (MI §9 Avoid #3 — do not over-index on Lowell). Lowell HQ shown but as moat, not as limit. |

### Axis → Hero canvas concept implications
LMP's axes (warm, quiet-confident, modern-classical hybrid, serious, refined, personal, local) point toward hero canvas concepts that are:
- Warm-lit (gold and cream particles, never icy white or laser blue)
- Slow + deliberate motion (not frantic — quiet-confident)
- Architectural / domestic-object-derived (keys, blueprints, doors, brick textures — local + personal)
- Editorial in execution (think Mercury's gradient mesh hero, not Klarna's pastel pop)

10 brainstormed hero canvas concepts to feed the harsh-critic agent (per CLAUDE.md Hero Architecture Rule, step 2):
1. **KeyringCanvas** — slow drift of stylized brass keys, occasionally aligning into a "house" silhouette before scattering. Metaphor: the right key for the right home, found among many.
2. **BlueprintCanvas** — architectural blueprint lines drawing themselves across a navy field, occasionally resolving into a familiar New England house silhouette.
3. **DoorwayCanvas** — abstract doorways receding in perspective, light gradients suggesting "passing through" milestones.
4. **CompassRoseCanvas** — slow rotation of brass compass roses (homage to the 9-state navigation), aligning briefly into a star pattern.
5. **MerrimackCanvas** — abstract topographic lines suggesting the Merrimack River + Lowell mill geometry, gold particles drifting downstream.
6. **HearthCanvas** — warm ember particles rising slowly from a virtual hearth, occasionally forming a window-frame outline. Cozy domestic warmth.
7. **MailboxCanvas** — silhouettes of New England rural mailboxes drifting against a navy field, occasionally aligning into a row that suggests "neighborhood."
8. **MortarBrickCanvas** — Lowell mill brick texture forming and dissolving, gold mortar lines pulsing between bricks.
9. **WindowFrameCanvas** — multiple home window frames overlapping, lit from inside, gold light spilling out at intervals.
10. **HandshakeCanvas** — abstracted geometric handshake form (two hands meeting), navy and gold lines weaving.

**Recommended next step:** spawn harsh-critic agent (per Hero Architecture Rule step 3) to score these 10 against niche relevance, visual impact, technical feasibility, uniqueness. Pick winner. Build only the winner. Do NOT iterate mid-implementation per the rule.

**Fallback (per Hero Architecture Rule step 5):** if winner produces TypeScript/runtime/mobile-overflow issues requiring >2 fix commits, halt and use the LogoParticles chaos→convergence→explosion pattern (Pattern #36, JCM Graphics) with the LMP logo. This requires the LMP logo PNG with transparent background — request from Mike Tuesday.

---

## Section 9 — Iconography & Emoji

Per CLAUDE.md Code Standards — **emoji over SVG icon libraries**. No Lucide, no Heroicons, no react-icons. Emoji renders natively, costs zero KB, looks clean at display size.

### Required emoji locations (per CLAUDE.md Code Standards)
- **Quiz answer options** — every option leads with a semantic emoji
- **Loan-program cards** — each program gets one (sourced from `site.ts loanPrograms[].emoji`)
- **Pain-point cards** — each gets one (`site.ts painPoints[].emoji`)
- **Process steps (How It Works)** — each gets one (`site.ts processSteps[].emoji`)
- **Stats bar** — each stat leads with an emoji (`site.ts stats[].emoji`)
- **About-section beliefs / values** — each gets one
- **Pricing feature lists** — ✅ included, ❌ not included (never plain text)
- **Trust checklists on service-area pages** — ✅ or context-specific emoji per bullet

### Emoji map for LMP (loan programs, pain points, stats — start here)

**Loan programs:**
| Program | Emoji |
|---|---|
| Fixed-Rate Mortgage | 🏠 |
| FHA | 🔑 |
| VA | 🇺🇸 (or 🎖️) |
| Jumbo | 🏛️ |
| ARM | ⚖️ |
| USDA | 🌾 |
| First-Time Buyer | 🌱 |
| Reverse | 🌅 |
| Interest-Only | 📊 |

**Pain points:**
| Pain | Emoji |
|---|---|
| Shopping multiple banks | 🔍 |
| Confusing rates / fees | 💰 |
| Slow underwriting | ⏳ |
| Uncertain approval | ❓ |
| Language barriers | 🗣️ |
| Self-employed income | 📈 |

**Process steps (6-step):** 1️⃣ → 6️⃣ as anchors, plus a thematic emoji per step (🤝 intro call, 📋 documents, 🔍 lender shop, 📝 application, 🏠 underwriting, 🎉 close).

**Stats bar:** ⚡ for "14-day close," ⭐ for "4.9 rating," 🌎 for "9 states," 👥 for "22 LOs," 💰 for "$10,662 saved" (with sourcing).

### Forbidden emoji usage
- ❌ Decorative ✨ on every list bullet — meaning-free, lazy
- ❌ Repeated emoji on adjacent UI elements — "✨ ✨ ✨" patterns
- ❌ Emoji in compliance copy or legal pages — gravity required
- ❌ Emoji larger than 2× the surrounding type size

---

## Section 10 — Components

### Buttons

```tsx
// Primary CTA — gold on navy or gold-on-cream depending on context
<button className="btn-primary">Get Pre-Approved</button>

// Secondary — outlined in gold, transparent fill
<button className="btn-secondary">Take the Quiz</button>

// Tertiary — text-only, gold underline animates in on hover
<button className="btn-tertiary">See all loan programs →</button>
```

```css
.btn-primary {
  background: var(--accent);
  color: var(--primary-deep);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  letter-spacing: -0.005em;
}
.btn-primary:hover {
  background: var(--accent-deep);
  box-shadow: var(--shadow-glow-gold);
  transform: translateY(-1px);
}
.btn-primary:active { transform: translateY(0); }

.btn-secondary {
  background: transparent;
  color: var(--accent);
  border: 1.5px solid var(--accent);
  /* same padding, radius, font as btn-primary */
}
.btn-secondary:hover {
  background: rgba(197, 165, 114, 0.08);
}
```

### Cards (loan-program, LO grid, testimonial)
- Border-radius: `--radius-xl` (24px)
- Background on dark sections: `--bg-card-dark` with `--border-dark` 1px
- Background on light sections: `--bg-card` with `--shadow-md`
- Hover lift: `translateY(-2px)`, transition 200ms ease
- Hover border (light): `border-color: var(--accent-muted)`

### Forms (intake, contact, pre-approval)
- Input border: 1.5px `--border-dark` (dark) or `rgba(14, 27, 51, 0.15)` (light)
- Focus state: border `--accent`, 4px `var(--accent-muted)` outer halo
- Label: `text-eyebrow` style, 8px gap above input
- Error state: border `--error`, error message in `--error` text below input
- Required field marker: gold `*` (not red)
- Disclaimer text: `text-micro`, `--text-muted`
- SMS opt-in: verbatim disclaimer per Compliance Rule, never paraphrased

### Trust strip (above hero, per MI §7 above-the-fold spec)
- Single horizontal row, gold accent left border (4px)
- Order: NMLS #2754084 · 9 states licensed · 22 LOs · Lowell, MA
- Mono font (`--font-mono`), `text-micro` size, `--text-secondary` color

### Footer (compliance-critical — see Section 12)
- Background: `--primary-deep`
- Equal Housing Lender logo: top-right, 64px tall
- All-caps broker disclosure: full-width centered band, `--text-secondary`, `text-eyebrow` styling
- NMLS Consumer Access link: in legal-link cluster, gold underline
- 4-column grid on desktop, single column on mobile

---

## Section 11 — Feature Mix

This section governs which Optimus features are scoped IN, scoped OUT, and which are LMP-specific custom builds beyond the standard Optimus base. Per CLAUDE.md Always-Built Features Rule, every project ships ALL of the universal features regardless of client tier — the customization happens in feature DEPTH and CONTENT, not in feature INCLUSION.

### Universal Optimus features (built on every project — ALWAYS-IN)

| Feature | LMP-specific implementation |
|---|---|
| **Pricing page** | Standard 3-tier ($1,500 / $3,000 / $5,500). Pro gets "Most Popular" badge. ROI calculator's "average job value" slider defaults to a mortgage commission range (e.g., $3,500 default per closing). Deleted before launch. |
| **Interactive quiz** | Mortgage-readiness / loan-type qualifier. 5–8 questions max. Output: archetype + recommended program + recommended LO matched on state + program specialty. **All questions compliance-reviewed before publishing.** |
| **Inline booking calendar** | Custom `<BookingCalendar />` component, Calendly API under the hood, fully LMP-branded. One per LO landing page (per-LO Calendly URI). Demo-mode: seeded fake availability when `CALENDLY_API_KEY` not set. |
| **Testimonials page** | 36 testimonials, 9 per page × 4 pages. Voice = real-borrower-on-phone (no em dashes, no press-quote tone). Filter by loan program. Mike's review export from Google/Zillow/Experience.com seeds, remainder written in-voice and marked `[DEMO COPY — pending client review]`. |
| **Blog** | 9–10 articles minimum. AEO-target: state programs (MassHousing, NHHFA, MaineHousing, RIHousing, CHFA-CT, VHFA, FL Hometown Heroes, TSAHC + TDHCA, CHFA-CO + metroDPA). Plus "FHA vs Conventional in NH," "UWM Wholesale Explained," "Rate-Shopping Guide." All compliance-reviewed. |
| **Shop scaffold** | Built per universal rule. **Almost certainly deleted at decision gate** — branded merch is implausible for a regulated mortgage broker. Scaffold first, decide after, per the rule. |

### LMP-specific custom builds (beyond Optimus standard — IBD §9C)

| Feature | Notes |
|---|---|
| **Per-LO landing page system** | 22 LOs × templated component. Each: hero (LO photo + name + NMLS), bio, Calendly inline, my1003app.com pre-approval link, contact form routing. Slugs per IBD §10 roster. |
| **Realtor partner page** (`/partners`) | Co-marketing pitch, fast pre-approval promise, partner portal concept. Audience 2 of three-headed monster. Primary nav slot. |
| **LO recruiting page** (`/careers`) | Brian Walsh as recruiter contact. 220–275 bps comp transparency (anchored to NEXA published comp). In-person Lowell HQ option. Bilingual marketing support. Audience 3. Primary nav slot. |
| **State coverage page + 9 state pages** | Interactive map of 9 licensed states. Each gets `/mortgage-broker-[state]` SEO landing page with state-program operator content (current 2026 figures). |
| **Native mortgage calculators** | Rebuilt natively (not rates.now embed) for AEO + speed. Phase 1 minimum: affordability, monthly payment, refinance, down-payment, DTI. Phase 2: 8 more. |
| **Rate-drop subscription** | Email + SMS opt-in. Verbatim SMS disclaimer (compliance). Triggers via Bonzo CRM or n8n routing — decision pending Tuesday. |
| **Bonzo CRM integration decision** | Keep / replace with n8n / parallel. Confirm Tuesday. |
| **Portuguese-language full stack** (MI §9 Exploit #1) | Lowell-Lawrence-Boston is the densest Brazilian metro in US. Portuguese FIRST, Spanish second. Language toggle conspicuous in upper-right header. |
| **22 state-program operator pages** (MI §9 Do #2) | MassHousing, NHHFA, MaineHousing, RIHousing, CHFA-CT, VHFA, FL Hometown Heroes, TSAHC, TDHCA, CHFA-CO, metroDPA — current 2026 dollar figures. |
| **ITIN / Foreign National / Bank Statement / DSCR / Asset Depletion product pages** (MI §9 Do #4) | Real LO contacts per product. |

### Out of scope (do not build)
- ❌ Rate display anywhere (compliance trap, MI §9 Avoid #1)
- ❌ "Best Rates Guaranteed" / "We Beat Any Rate" copy (Reg Z exposure, MI §9 Avoid #2)
- ❌ Auto-rotating hero carousel (MI §8 anti-pattern)
- ❌ Stock-photo couple-with-keys imagery (MI §8 anti-pattern)
- ❌ Generic blog disconnected from state programs (MI §8 anti-pattern)
- ❌ Phone-only contact (kills WhatsApp/SMS-preferring borrowers, MI §8)

---

## Section 12 — Compliance Treatment (LMP-Specific)

Compliance posture is set by `initial-business-data.md` Section 9D and CLAUDE.md Compliance Rule. The design system enforces it through three mechanisms:

### Verbatim copy preservation (cannot be paraphrased)
1. SMS Opt-In Disclaimer — full text in `reference/lmp-financial-data-scrape.md` Legal Pages section. Wherever any SMS opt-in checkbox lives.
2. Broker Disclosure (all caps): *"MORTGAGE BROKER ONLY, NOT A MORTGAGE LENDER OR MORTGAGE CORRESPONDENT LENDER"* — footer, every page.
3. Equal Housing Lender logo — footer, every page.
4. NMLS Consumer Access link — footer, every page.
5. Privacy Policy — verbatim (last updated 2025-01-01).
6. Terms of Use — verbatim (last updated 2025-01-01); arbitration clause + 1-year filing limitation.
7. ADA Accessibility Statement — verbatim.

### Visual presentation rules
- All-caps broker disclosure: `text-eyebrow` style on `--text-secondary`, full-width centered footer band, never broken into multiple lines on desktop.
- Equal Housing Lender logo: `--bg-base` (cream) treatment of the logo, 64px tall, top-right of footer.
- Per-LO NMLS: `text-mono`, `text-eyebrow` size, immediately under the LO's name on every LO landing page. Gold accent color (`--accent`).
- LMP company NMLS #2754084: trust strip above hero, footer, every page.

### Quantifiable claims — sourcing required before re-use
Per IBD §9D + CLAUDE.md Compliance Rule, the following claims need substantiation before they ship:
- "14-day average closing time"
- "100+ five-star reviews" (or 120+ — pick one, source it)
- "20+ years of mortgage experience" / "3 decades" / "10 years" — pick one, source it
- "4.9 / 5 average rating"

Any of these on the new build without a source = build failure (pre-launch-auditor enforces).

### Compliance-review-pending convention
Until the LMP compliance IT firm intro is open (pending from Mike, requested 2026-04-25), every copy block that needs review ships with:
```html
<!-- [COMPLIANCE-REVIEW-PENDING] -->
```
This includes: loan-program page copy, LO bios, blog articles, rate-quote disclaimers ("Free & non binding," "No impact on credit score," "No hidden costs," "No documents required"), any state-specific advertising copy (per-state rules apply for MA, NH, ME, RI, CT, FL, CO, VT, TX).

### State-licensure display per LO
Every LO landing page displays the LO's individual NMLS number AND a clear state-licensure subset. Per-LO state coverage MUST be confirmed before any LO page goes live — copy implying an LO operates in a state they're not licensed in is a regulatory violation.

---

## Section 13 — Hero Concept Brief (the homepage hero only)

Per CLAUDE.md Hero Architecture Rule — every hero ships with exactly 3 layers, no exceptions, **no photos in the hero**.

### Layer 1 — `HeroParticles.tsx`
Selected from frontend-design.md Section 8 (Brand Personality Axes) treatment. LMP's axes (warm, quiet-confident, modern-classical hybrid, serious, refined) suggest: **slow-drift gold-cream particles** with occasional convergence into a faint home-shape silhouette before scattering. Density: 80–120 particles. Color tokens: `--accent`, `--accent-light`, `--accent-muted`. NEVER icy white or blue particles. z-0.

### Layer 2 — Brand canvas (LMP-niche-specific)
Selection process — see Section 8 of THIS document. 10 candidates listed. Spawn harsh-critic agent to pick ONE. Build only the winner. Do not iterate mid-implementation. **Strong candidates** (Section 8 brainstorm):
- KeyringCanvas (#1) — keys-to-a-home metaphor, immediately legible
- BlueprintCanvas (#2) — architectural, editorial, distinctive
- HearthCanvas (#6) — warmth + domesticity, rare in mortgage category

Container: `position: relative`, explicit height `clamp(340px, 50vw, 540px)`. Canvas fills with `position: absolute; inset: 0`. Lifecycle: STREAM → RISE → COOL → ARC → IDLE per pattern doc.

### Layer 3 — Framer Motion stagger text
- **H1 = `siteConfig.tagline`** with `.hero-shimmer` class (warm gold variant — Section 3).
- Subheadline at 0.15s, easing `confident`, soft entry from 16px below.
- CTAs at 0.3s.

### Above-the-fold CTA contract
- **Primary CTA: "Get Pre-Approved"** (or "Start Your Pre-Approval"). Drives directly to per-LO Calendly OR brand-level pre-approval funnel. NEVER "Call Now" — phone CTA belongs in nav. NEVER "Learn More" or "See Our Programs."
- **Secondary CTA: "Take the Quiz"** → `/quiz`.
- Both CTAs funnel to conversion. Two paths, same destination.

### Trust strip above hero (per MI §7 above-the-fold spec)
Single horizontal row, mono type, gold accent border-left:
> NMLS #2754084 · 9 states licensed · 22 LOs · Lowell, MA · 🇺🇸 EN / 🇧🇷 PT / 🇪🇸 ES

Language toggle visible AT this layer, not buried in nav.

### What NEVER goes in the hero
- ❌ Stock photo of a couple holding keys (MI §8 anti-pattern, dominant 80% of competitors)
- ❌ Mike Comerford's photo (belongs in About section, NOT hero — CLAUDE.md hero rule)
- ❌ Auto-rotating carousel (MI §8 explicit anti-pattern)
- ❌ A live rate display (compliance trap)
- ❌ A phone number as primary CTA (kills WhatsApp/SMS-preferring borrowers, MI §8)

---

## Section 14 — Section Background Patterns

Per CLAUDE.md Homepage Section Architecture Rule — three requirements: animation depth by page type, purpose-level deduplication, dark/light alternation. **No flat solid backgrounds at any viewport.**

### Homepage rhythm (LMP-flavored — required at top of `app/page.tsx` as comment block)

```
// Hero               → dark  → conversion (primary CTA + quiz CTA)
// Three Audiences    → light → empathy (borrowers / realtors / LO recruits — three-headed monster)
// Loan Programs      → dark  → education (9 programs grid)
// Stats              → light → social proof (14-day close, 4.9 rating, 9 states, 22 LOs, $10,662 saved)
// Testimonials       → dark  → social proof
// Quiz CTA           → light → conversion (mid-page nudge, different format than hero)
// Meet the Team      → dark  → relationship (LO grid teaser → /team)
// Blog Preview       → light → content preview
// Pre-Approval CTA   → dark  → conversion (final CTA — only ONE at bottom)
```

Verify before scaffolding: no two adjacent sections share a tone (dark/light alternates strictly), and no two adjacent sections share a purpose. Update this block if reordering.

### Per-section motion picks (each section gets ONE of: breathing orb / mesh drift / aurora sweep / grain shimmer)
- **Hero (dark)** — particles + canvas + breathing-orb gold halo behind H1
- **Three Audiences (light)** — mesh drift, very slow (30s)
- **Loan Programs (dark)** — grain shimmer (8s), keeps the 9-card grid quiet
- **Stats (light)** — aurora sweep (gold sweep, 20s)
- **Testimonials (dark)** — breathing orb (12s, gold halo)
- **Quiz CTA (light)** — mesh drift (25s)
- **Meet the Team (dark)** — grain shimmer (8s)
- **Blog Preview (light)** — breathing orb (12s, navy halo)
- **Pre-Approval CTA (dark)** — aurora sweep (15s, gold-and-cream)

### Performance budget (per CLAUDE.md)
- Maximum **3 active motion layers visible in any viewport simultaneously**. Hero counts as 1 (its particle canvas + ambient orb).
- **CSS-only** for section backgrounds. Never JavaScript-driven. Canvas reserved for hero + intentional interior-page ambient effects.
- GPU-cheap properties only: `transform`, `opacity`, `background-position`. No `filter`, no `backdrop-filter`, no `blur` on animated layers.
- Test at 390px mobile — if FPS drops below 50 on mid-range device, reduce motion layer count before shipping.

### Interior-page ambient minimums
Per CLAUDE.md Animation Depth subsection. Loan-program pages get rising ash. Testimonials gets shimmer header + ash. Blog index gets shimmer or animated gradient. About gets SlideIn + FadeUp. Contact + Booking get breathing orb. Quiz gets slide left/right transitions. LO landing pages get subtle ambient (NOT the hero canvas — that's homepage-only).

---

## Section 15 — Build Sequence Pointer

This file is read by the design-synthesizer / scaffold / content-writer / animation-specialist agents. Build order under CLAUDE.md:

1. **Phase 1A — Repo scan + scaffold** with these tokens. globals.css MUST contain every CSS variable in this file before any component is built (CSS Scaffold Completeness Rule).
2. **Phase 1B — Already complete** (this file is the output).
3. **Phase 1C — Scaffold** — drop tokens into globals.css, define type scale, install fonts, ship base layout + navigation + footer with compliance bands.
4. **Phase 1D — Content + Animation** — content-writer ships `/data/site.ts`. animation-specialist picks hero canvas (10-candidate brainstorm above → harsh-critic → winner → build only winner).
5. **Phase 1E — All pages** — homepage, loan-program pages, LO landing pages, /partners, /careers, state pages, calculators, quiz, testimonials, blog, pricing, booking, contact.
6. **Phase 1F — SEO + AEO** — schema (FinancialService + LocalBusiness + Person-per-LO), state-program-operator pages, Speakable schema on AEO targets.
7. **Phase 1G — Assets** — fal.ai card + header images per blog article (mood per Section 6 above). LO portraits if not yet shot — flag for Tuesday.
8. **Phase 1H — Pre-launch audit** (file-level) → **1I — Multi-breakpoint browser audit** (Playwright, MANDATORY) → **1J — /ultrareview** gate.
9. **Phase 2A — Infrastructure** (DNS, Vercel, Resend, Calendly per LO).
10. **Phase 2B — Client revision pass** (re-run 1I after every revision batch).
11. **Phase 2C — Close** (/retro + handoff).

---

## Appendix A — Token quick-reference (for AI/human scanning)

```
Brand:       --primary #0E1B33    --accent #C5A572    --bg-base #F5EFE2
Text-dark:   --text-primary #F5EFE2 (cream on navy)
Text-light:  --text-on-light #0E1B33 (navy on cream)
Display:     Fraunces (variable serif)
Body:        General Sans (Fontshare)
Mono:        JetBrains Mono
Shimmer:     warm-gold (.hero-shimmer), NOT sage
H1 class:    "hero-shimmer font-display text-display" (hero) / "hero-shimmer font-display text-h1" (interior)
```

## Appendix B — Approved emoji shortlist for site.ts

🏠 🔑 🇺🇸 🎖️ 🏛️ ⚖️ 🌾 🌱 🌅 📊 🤝 🌎 ⚡ ⭐ 💰 ✅ ❌ 🔍 ⏳ ❓ 🗣️ 📈 📋 📝 🎉 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣
