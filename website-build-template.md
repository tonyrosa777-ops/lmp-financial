# Website Build Template — Luxury Personal Brand

> Universal scaffold for any service-based personal brand, coach, consultant, or creator website. The architecture, animation patterns, and conversion infrastructure are fixed. Every brand-specific value — colors, copy, quiz archetypes, service names, testimonials — is derived from that project's `initial-business-data.md` and `market-intelligence.md`. Never copy content from a prior build. Read the client's files.

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js (App Router) | ISR for blog/dynamic content |
| Styling | Tailwind CSS 4 + PostCSS | Custom design tokens in `globals.css` |
| Animations | Framer Motion + `react-intersection-observer` | All scroll-triggered |
| CMS | Sanity | Blog, testimonials, dynamic content |
| E-commerce | Stripe + Printful + Resend | Custom React cart, hosted checkout, POD fulfillment, owner alerts |
| Forms | React Hook Form + Zod | Quiz, contact, newsletter |
| Payments | Stripe | Checkout sessions |
| Analytics | Vercel Analytics | Core Web Vitals |
| Images | Next.js Image + Sharp | Responsive srcsets |

---

## Design Tokens

Define these CSS custom properties in `globals.css` before writing any components. Everything inherits from them.

```css
:root {
  /* Brand Colors — READ design-system.md, then fill these in */
  --primary: rgb(R, G, B);              /* Brand primary — from design-system.md */
  --primary-muted: rgba(R, G, B, 0.6);
  --accent: rgb(R, G, B);              /* Brand accent — from design-system.md */

  /* Background Scale (dark theme — standard across all builds) */
  --bg-base: #0a0a0a;
  --bg-elevated: #141414;
  --bg-card: #1a1a1a;

  /* Text Scale (standard across all builds) */
  --text-primary: #f5f5f5;
  --text-secondary: rgba(245, 245, 245, 0.7);
  --text-muted: rgba(245, 245, 245, 0.4);

  /* Spacing Scale (standard across all builds — Error #39) */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
}

/* Scroll padding — matches fixed header height at each breakpoint (Error #49).
   Without this, anchor links (#id) scroll the target behind the fixed navbar. */
html {
  scroll-padding-top: 96px;
}
@media (min-width: 640px) {
  html { scroll-padding-top: 112px; }
}
@media (min-width: 1024px) {
  html { scroll-padding-top: 128px; }
}
```

> Color values for `--primary` and `--accent` come exclusively from `design-system.md`.
> Never copy hex values from a prior project. Every brand has different tokens.

**Typography:**
- `font-display` — Headlines (large, bold, high impact)
- `font-body` — Paragraph text (readable, neutral)
- `font-mono` — Labels, eyebrows, UI micro-copy

**Typography Scale (define these utility classes in globals.css):**
```css
.text-display { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; }  /* Hero H1 */
.text-h1      { font-size: clamp(2rem, 4vw, 3rem);   line-height: 1.15; } /* Interior page H1s */
.text-h2      { font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.2; }
.text-h3      { font-size: clamp(1.25rem, 2.5vw, 1.75rem); line-height: 1.25; }
.text-h4      { font-size: clamp(1.1rem, 2vw, 1.35rem); line-height: 1.3; }
```
All interior page H1s use `hero-shimmer font-display text-h1`. The hero H1 uses
`hero-shimmer font-display text-display`. Do not reference a `text-h1` class without
defining it first — this has caused build failures when agents assume it exists.

---

## Directory Structure

```
/src
  /app
    page.tsx                     ← Homepage (compose sections here)
    layout.tsx                   ← Root layout (fonts, analytics, Snipcart)
    /about/page.tsx
    /services/page.tsx           ← Or /programs
    /services/[slug]/page.tsx    ← Individual service pages
    /pricing/page.tsx            ← ROI calculator + tier comparison
    /quiz/page.tsx               ← Multi-step quiz (QuizClient.tsx)
    /blog/page.tsx
    /blog/[slug]/page.tsx
    /shop/page.tsx
    /reviews/page.tsx
    /contact/page.tsx
    /studio/[[...tool]]/page.tsx ← Sanity CMS editor
    /api
      /contact/route.ts
      /newsletter/route.ts
      /printful/products/route.ts
      /printful/variants/[id]/route.ts  ← variant sizes + colors for picker
      /stripe/checkout/route.ts
      /stripe/webhook/route.ts          ← CRITICAL: fulfillment trigger
      /revalidate/route.ts

  /components
    /animations                  ← Reusable animation wrappers
    /layout                      ← Navbar, MobileNav, Footer
    /sections                    ← Full-width page sections
    /blog                        ← PostCard, PostBody, TOC, Newsletter
    /shop                        ← CartDrawer, ProductCard, VariantPicker
    /ui                          ← Button, Card, Badge, Input, Divider

  /data
    site.ts                      ← ALL copy/content lives here
    shop.ts                      ← Product catalog

  /lib
    cart.tsx                     ← React Context cart (NOT Snipcart)
    printful.ts                  ← Printful API client + TypeScript interfaces
    printful-seeded-products.json ← Fallback data when Printful API is down
    photos.ts                    ← Photo asset mappings
    utils.ts                     ← prefersReducedMotion, cn(), etc.

  /sanity
    /lib
      client.ts
      queries.ts                 ← GROQ queries
      image.ts
    /schemaTypes
      post.ts
      category.ts
      author.ts
      blockContent.ts
```

> **Rule:** All copy lives in `/data/site.ts`. No hard-coded strings in components. This makes client handoff and future edits trivial.

---

## Animation Library

Build these eight wrappers once. Use them everywhere. All respect `prefers-reduced-motion`.

```tsx
// /components/animations/FadeIn.tsx
// Opacity 0 → 1, scroll-triggered via useInView
// Props: delay?, duration?, threshold?

// /components/animations/FadeUp.tsx
// Opacity + Y translate (-20px → 0), scroll-triggered
// Most common wrapper for section content

// /components/animations/SlideIn.tsx
// X translate + fade, direction prop: "left" | "right"

// /components/animations/ScaleIn.tsx
// Scale (0.9 → 1) + opacity, good for cards

// /components/animations/StaggerContainer.tsx
// Wraps children, applies staggered delay to each child
// Props: staggerDelay? (default 0.1s)

// /components/animations/CountUp.tsx
// Animates a number from 0 to target when in view
// Props: end, duration?, decimals?, suffix?

// /components/animations/ParallaxWrapper.tsx
// Scroll-speed offset for depth effects

// /components/animations/RevealText.tsx
// Word-by-word or character reveal
// Props: text, type: "words" | "chars", stagger?
```

**Pattern for every scroll animation:**

```tsx
const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay }}
/>
```

---

## Section 1 — Luxury Hero

**Goal:** Stop the scroll, establish authority, drive two actions.

### Layout

```
[Left lg:w-1/2]                         [Right lg:w-1/2]
  Eyebrow label (mono, primary)            [BrandName]Canvas.tsx
  H1 = siteConfig.tagline + shimmer        position: relative
  Subheadline (emotional hook copy)        height: clamp(340px, 50vw, 540px)
  [CTA Primary: /booking]                  canvas fills container absolutely
  [CTA Secondary: /quiz]
  Trust micro-copy (★ · years · stat)
```

Mobile: `flex-col` — text first, canvas below. Canvas scales naturally to 100% width.

**NO photo in the hero. The client photo goes in the About section only.**
A photo placeholder in the hero is a build failure. The right panel contains the Brand Canvas, never a portrait.

```tsx
// Canonical hero layout — copy this structure
<section className="relative min-h-screen flex items-start pt-24 md:pt-40">
  <HeroParticles />  {/* Layer 1 — full background */}
  <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
    {/* Layer 3 — text, left panel */}
    <div className="w-full lg:w-1/2 lg:pr-12 relative z-10">
      <p className="font-mono text-primary">{eyebrow}</p>
      <h1 className="hero-shimmer font-display font-bold">{siteConfig.tagline}</h1>
      <p className="text-secondary">{hero.subheadline}</p>  {/* emotional hook copy goes here */}
      <div className="flex gap-4">
        <Button href="/booking">{hero.ctaPrimary}</Button>
        <Button href="/quiz" variant="ghost">{hero.ctaSecondary}</Button>
      </div>
    </div>
    {/* Layer 2 — Brand Canvas, right panel */}
    <div className="w-full lg:w-1/2 relative pointer-events-none" style={{ height: "clamp(340px, 50vw, 540px)" }}>
      <BrandNameCanvas />
    </div>
  </div>
</section>
```

**Hero click-safety rule (Error #48):** Any decorative background element in the hero
(fill images, overlay divs, canvas containers) must have `pointer-events-none`.
The content wrapper div must have `relative z-10`. Without these, invisible background
elements intercept CTA clicks — impossible to catch visually during dev, only caught
by actually clicking the buttons in Playwright.

**H1 = siteConfig.tagline always.** The tagline is the brand identity statement and always gets
the H1 slot. Emotional hook copy ("Stop paying twice your mortgage") goes in the subheadline `<p>`.
Never put ad-hook copy in the H1. Never use a separate `hero.headline` field in the H1.

**Shimmer is mandatory on the H1.** Two shimmer classes — define both in globals.css, pick one:

```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Use for brands with gold/amber/warm primary token */
.hero-shimmer {
  background: linear-gradient(
    90deg,
    var(--text-primary) 0%,
    var(--primary) 40%,   /* gold/amber sweep */
    var(--text-primary) 60%,
    var(--primary) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

/* Use for brands with sage/green/cool/neutral primary token */
.hero-shimmer-sage {
  background: linear-gradient(
    90deg,
    var(--text-primary) 0%,
    var(--primary) 40%,   /* sage/cool sweep */
    #ffffff 55%,
    var(--primary) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
```

Pick by checking design-system.md brand axes: warm brands → `.hero-shimmer`, cool brands → `.hero-shimmer-sage`.

**Hero text contrast check (pre-phase-complete):** After building, scroll the hero in the browser
and confirm every word is readable without highlighting. If text blends into the background,
the color token is wrong. Always use `color: var(--text-primary)` for headings and body on dark
backgrounds. This check applies to ALL page headers, not just the homepage hero.

### Page Header Standard (all interior pages)

Every interior page (`/about`, `/services`, `/testimonials`, `/blog`, `/contact`, `/booking`,
`/faq`, `/shop`, `/gallery`, `/quiz`) uses this exact structure for its page header. No agent
should invent a different structure. This is the reference pattern:

```tsx
// Page root: fragment — never <main> with inline background
export default function PageName() {
  return (
    <>
      <Navigation />
      {/* Page header section */}
      <section className="relative overflow-hidden bg-[var(--primary)] pt-32 pb-20">
        {/* Ambient canvas — RisingAsh or brand-appropriate variant */}
        <RisingAsh />
        {/* Content sits above canvas */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="hero-shimmer font-display text-h1 font-bold">
            Page Title
          </h1>
          <p className="text-secondary mt-4 max-w-2xl mx-auto">
            Subtitle text
          </p>
        </div>
      </section>
      {/* Page body sections below */}
    </>
  );
}
```

Key rules:
- Fragment `<>` root — never `<main>` with an inline background style
- Header section: `relative overflow-hidden`, dark gradient background
- H1: `hero-shimmer font-display text-h1` — always shimmer, always `text-h1` (not `text-display`)
- Heading + subtitle in the same gradient section (never split across sections)
- Ambient canvas (RisingAsh or breathing orbs) inside the header section
- Content div gets `relative z-10` to sit above the canvas
- Every interior page must have this header — a page that opens with plain text is not finished

### Animation 1 — Canvas Particle System (`HeroParticles.tsx`)

Replace the static background. Three particle types rendered on `<canvas>`:

| Type | Count | Behavior | Color |
|------|-------|----------|-------|
| Stars | ~145 | Twinkle, slow drift | White/primary |
| Embers | ~58 | Rise upward, fade out | Primary/accent |
| Glimmers | Occasional | 4-point star burst, flash | White |

```tsx
// Initialization pattern
const STAR_COUNT = 145;
const EMBER_COUNT = 58;

// Each particle has: x, y, vx, vy, opacity, targetOpacity, size, color
// requestAnimationFrame loop at 60fps
// Canvas resizes with window via ResizeObserver
```

### Animation 2 — [BrandName]Canvas.tsx (Brand Canvas)

A custom canvas animation that lives in the right panel. Named after the brand. Built by the
animation-specialist agent. Every brand canvas follows the same 5-phase lifecycle:

```
Phase 1 — STREAM:    N particles spawn at canvas edges, follow quadratic bezier curves
                     toward a center target. t += speed per frame.
                     When all particles reach t >= 0.94 → fire Phase 2.

Phase 2 — RISE:      Particles cleared. Brand shape extrudes using springOut(t):
                     springOut(t) = 1 - 2^(-9t) * cos(t * 10π * 0.68)
                     Physical spring overshoot. Duration: ~500ms.

Phase 3 — COOL:      Shape color animates: white-hot → brand accent → brand primary.
                     heatRGB(t) interpolates between RGB stops.

Phase 4 — ARC:       Secondary element draws progressively via ctx.arc().
                     (Rail for fence, protective arc for shield, etc.)

Phase 5 — IDLE:      breathe = sin(elapsed * 0.00088). Oscillates coolingT + arc alpha.
                     Ambient living pulse. No new particles.
```

**Per-brand customization (only these change — everything else is identical):**

| Brand | Shape drawn | Secondary element | Heat endpoint |
|-------|-------------|-------------------|---------------|
| Placed Right Fence | `drawPicket()` — spear-point rects | Rail across tops | Gold |
| Helen Grondin (health) | `drawCross()` — two roundRect arms | Arc around cross | Sage green |
| [Your brand] | Brand-specific shape | Brand-specific accent | Brand primary |

**Implementation rules:**
```tsx
// Always cast — never leave as nullable
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Container sizing
<div className="w-full lg:w-1/2 relative" style={{ height: "clamp(340px, 50vw, 540px)" }}>
  <BrandNameCanvas />  {/* fills container with position: absolute; inset: 0 */}
</div>
```

**Breathing orbs (fallback):** For simpler/interior-page use cases where a full brand canvas is
too heavy, use breathing orbs as a lightweight CSS alternative:
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.15); opacity: 0.25; }
}
.orb { animation: breathe 12s ease-in-out infinite; }
.orb-2 { animation-delay: -4s; }
```
Orbs are valid on interior page headers (services, contact, booking). They are NOT a substitute
for the Brand Canvas in the homepage hero.

### Animation Sequence (Hero Load Order)

| Element | Delay | Animation |
|---------|-------|-----------|
| Eyebrow | 0.1s | FadeIn |
| Headline | 0.3s | FadeIn + Y up |
| Tagline | 0.9s | Word-by-word reveal (0.06s stagger per word) |
| CTAs | 2.4s | FadeIn |
| Trust copy | 2.8s | FadeIn |

### CTA Pair Pattern

**The secondary CTA is ALWAYS the quiz. Never a webinar, info session, events link, or external URL.**
If the hero data in site.ts doesn't have a quiz CTA, add one. The quiz link is non-negotiable.

```tsx
<div className="flex gap-4 flex-wrap">
  <Button variant="gold" size="lg" href="/booking">
    {hero.ctaPrimary}         {/* label from site.ts hero.ctaPrimary */}
  </Button>
  <Button variant="ghost" size="lg" href="/quiz">
    {hero.ctaSecondary}       {/* "Take the Quiz" — always /quiz, always */}
  </Button>
</div>

{/* Trust micro-copy below buttons */}
<p className="text-muted font-mono text-sm mt-4">
  {hero.trustCopy}             {/* from site.ts — e.g. star rating · years in business · key stat */}
</p>
```

---

## Section 2 — Pain Points

**Goal:** Mirror the prospect's internal struggle so they feel seen.

```tsx
// 4 cards in a 2x2 grid (desktop) / 1-col (mobile)
// Each card: emoji + headline + 1-2 line description
// ScaleIn animation, staggered 0.1s per card
// Border: 1px var(--primary-muted) on hover
// No CTAs — this section is only empathy
```

Data shape:
```ts
// Content sourced from initial-business-data.md + market-intelligence.md
// Emoji must match the semantic meaning of the pain point, not be decorative
painPoints: [
  { emoji: "[relevant emoji]", headline: "[pain point from audience research]", body: "..." },
  { emoji: "[relevant emoji]", headline: "[pain point from audience research]", body: "..." },
  { emoji: "[relevant emoji]", headline: "[pain point from audience research]", body: "..." },
  { emoji: "[relevant emoji]", headline: "[pain point from audience research]", body: "..." },
]
```

---

## Section 3 — About / Founder Story

**Goal:** Build trust through credibility + vulnerability. One human, not a brand.

### Layout Options

**Option A (Text-heavy, intimate):**
```
Eyebrow: "Meet [Name]"
H2: Origin story headline
2-3 paragraphs: journey, turning point, mission
Credentials list (inline badges or simple list)
Photo: full-bleed right side or below
```

**Option B (Stats + story):**
```
Stats row: [X years] [X clients] [X rating]  ← CountUp animations
Narrative below
Photo left
```

### Animation Pattern
- SlideIn from left for photo, from right for copy
- Stats row: CountUp triggers on scroll
- Stagger paragraphs with FadeUp (0.15s between each)

---

## Section 4 — Services / Programs

**Goal:** Show the range of engagement levels. One should feel like the obvious right fit.

### 3-Card Layout (Standard)

```tsx
// Card structure:
// Badge (optional: "Most Popular", "Limited Spots")
// Icon or photo
// Service name (H3)
// One-line positioning statement
// 3-4 bullet points
// Price anchor (optional at this stage)
// CTA button → individual service page
```

**Highlight the middle tier** with a border, background lift, or badge. This anchors perception and drives that choice.

```tsx
// Featured card gets: border border-primary, bg-elevated vs bg-card
// Non-featured: opacity-90, hover lifts to match featured styling
```

### Individual Service Pages (`/services/[slug]`)

Each service page follows this skeleton:
```
1. Hero (service name, who it's for, primary CTA)
2. What you get (bullet list with icons)
3. Who it's for (3 persona cards)
4. How it works (numbered steps)
5. Testimonials specific to this service
6. FAQ (Radix Accordion)
7. Final CTA
```

---

## Section 5 — Testimonials / Reviews

**Goal:** Social proof from people who look like the prospect.

### Homepage Section (3-4 featured)

```tsx
// Grid: 3-col desktop, 1-col mobile
// Each card:
//   Avatar (circular, 60px)
//   Name + identifier (e.g., "J.M. · [service type] client")
//   Star rating (5 gold stars)
//   Quote (2-4 sentences, first-person)
//   Optional: transformation stat (outcome specific to this brand's results)
```

### Full Testimonials Page (`/testimonials`)

- 36 total testimonials from `site.ts` — always write all 36, never use fewer
- **Pagination: 9 per page, 4 pages = 36 total.** This is the only correct page size.
  - 9 per page fills a 3-column grid as exactly 3 rows × 3 columns on every page.
  - 8 per page (old rule — DO NOT USE) produces 2 full rows + 2 orphans = broken layout.
  - Do not hard-code any other value. 9 per page. 4 pages. 36 total.
- Featured quote at top (full-width, large type) — not counted in the 36
- Paginated grid below: `grid-cols-1 md:grid-cols-3`, 9 items per page
- Filter by service/program type (optional, use URL params)
- Booking CTA teaser section at the bottom — must be animated (gradient or orb), never static
- Video testimonials section (if available) — YouTube embeds

### Data Shape

```ts
// All 36 testimonials written by content-writer agent from initial-business-data.md
// Voice, outcomes, and service types must match THIS client's audience — never copied from another build
testimonials: [
  {
    name: string,                  // First name + last initial only (e.g. "J.M.")
    identifier: string,            // Service type + duration (e.g. "6-month client")
    rating: 5,
    quote: string,                 // Human voice — no em dashes, specific details, phone-review tone
    program: string,               // Slug matching a service in site.ts services[]
    stat?: string,                 // Optional outcome metric relevant to THIS brand's results
    photo?: string,                // Key into photos.ts if available
  }
]
```

---

## Section 6 — Blog Architecture

**CMS:** Sanity (headless, schema-driven)

### Sanity Schema — Post

```ts
// Fields:
title: string (required)
slug: slug (auto from title, required)
publishedAt: datetime (required)
mainImage: image (with alt text)
excerpt: text (max 300 chars)
categories: array<reference to category>
body: blockContent (Portable Text)
seo: {
  metaTitle: string (max 60 chars)
  metaDescription: string (max 160 chars)
}
```

### Blog Index Page

```
1. Featured post — large card, full-width (first/pinned post)
2. Post grid — 3-col desktop, 1-col mobile
3. Category filter (optional)
4. Newsletter signup CTA at bottom
```

### Blog Post Page (`/blog/[slug]`)

```
Layout: 70/30 split (article / sidebar) on desktop

Article:
  - Hero image (full-width)
  - Title, date, category badge, reading time
  - PostBody (Portable Text → semantic HTML)
  - NewsletterSignup (end of post)

Sidebar:
  - TableOfContents (auto from h2/h3 headers)
  - Author card
  - Related posts (by category)
```

### TableOfContents Implementation

```tsx
// Parse heading nodes from Portable Text body
// Build anchor IDs (slugified heading text)
// Render sticky sidebar nav
// Highlight active section on scroll via IntersectionObserver
```

### ISR + Revalidation

```ts
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // hourly

// Sanity webhook → /api/revalidate → revalidatePath('/blog')
// This means live edits in Sanity appear within seconds
```

---

## Section 7 — Shop Architecture

**Stack:** Custom React Context cart + Stripe hosted checkout + Printful API (POD fulfillment) + Resend (owner order alerts)

> This architecture was battle-tested in production on a live e-commerce build (see `tonyrosa777-ops/andrea-abella-marie`). Every gotcha below was discovered in a real live-money transaction. Follow it exactly.

### Fulfillment Model

Two product types with different fulfillment paths — both flow through the same cart and Stripe checkout:

| Type | Fulfillment | Who ships | Examples |
|------|-------------|-----------|---------|
| POD (Print-on-Demand) | Printful API — automatic | Printful ships to customer | Tees, hoodies, mugs, tumblers |
| Manual / Handmade | Flagged in owner email — manual | Owner ships | Jewelry, signed prints, handmade items |

The webhook splits cart items by product ID at checkout time. POD items go straight to Printful. Manual items get flagged in the owner alert email.

---

### Data Shape (`/data/shop.ts` or `/src/lib/products.ts`)

```ts
export interface Product {
  id: string | number       // For POD: use Printful sync product ID (number)
                            // For manual: use a stable slug string (e.g. "handmade-item-name")
  name: string
  price: number
  description: string
  category: string
  badge?: string            // "LIMITED STOCK", "NEW", etc.
  image?: string            // absolute URL or /public path
  printful_variant_id?: number  // pre-set if you want to skip variant resolution at checkout
  variants?: Variant[]      // loaded dynamically from /api/printful/variants/[id]
}
```

**Manual fulfillment items** use a string slug as their ID. Register those slugs in the webhook's `RESILIENCE_IDS` set (see webhook section below). As long as the ID is in that set, it routes to manual — never to Printful.

---

### Shop Page Layout

```
1. Page hero (eyebrow + headline + 1-line description)
2. Category filter tabs: All / [category names]
3. Product grid: 3-col desktop, 2-col tablet, 1-col mobile
4. Each ProductCard:
     - Product image (next/image, absolute URLs for Printful CDN images)
     - Badge ("LIMITED STOCK" for manual items)
     - Name, price
     - Short description
     - Variant picker: color swatches + size chips (see below)
     - "Add to Cart" button
5. Skeleton loaders while variants fetch (never show broken UI)
6. ?success=true query param → success toast/banner after Stripe return
```

---

### Cart Context (`/src/lib/cart.tsx`)

Do NOT use Snipcart. Build a custom React Context cart. This gives full control over what metadata goes to Stripe, which is critical for the webhook.

```tsx
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string | number
  name: string
  price: number
  quantity: number
  image?: string
  selectedSize?: string
  selectedColor?: string
  printful_variant_id?: number  // CRITICAL — must be passed to Stripe → webhook → Printful
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string | number) => void
  updateQuantity: (id: string | number, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: number
  count: number
}

// Persist to localStorage — cart survives page refresh
// Key: "cart" — serialize/deserialize on mount
// CartDrawer: slides in from right, shows items + checkout button
// Navbar: shows item count badge via useCart()
```

**On "Add to Cart":** The item must include `printful_variant_id` (the Printful sync variant ID). This ID flows through Stripe metadata and is used by the webhook to create the Printful order. If it's missing, the webhook falls back to resolving the first available variant — which may be wrong for size-specific items.

---

### Variant Picker (`VariantPicker` or inline in `ProductCard`)

Variants are fetched live from `/api/printful/variants/[syncProductId]` when a user clicks a product.

```tsx
// Show skeleton while loading
// Render:
//   - Color swatches: circular buttons with hex color fill, border on selected
//   - Size chips: text buttons, border on selected
// Color-only products (tumblers, mugs) have no size selector
// Size-only products have no color selector
// On select: update state, look up matching variant, set printful_variant_id on cart item
```

**Color Swatch Map** — Add these to `ShopContent.tsx` or a shared `colorMap.ts`. Lookup MUST be case-insensitive (Printful returns inconsistent casing):

```ts
const COLOR_MAP: Record<string, string> = {
  "Black": "#1a1a1a",
  "White": "#ffffff",
  "Navy": "#1a2744",
  "Navy Blue": "#1a2744",
  "Forest Green": "#2d4a2d",
  "Military Green": "#4a5c3a",
  "Bottle Green": "#1e3d2f",
  "Sport Grey": "#9a9a9a",
  "Dark Heather": "#5a5a5a",
  "Heather": "#b0b0b0",
  "Maroon": "#6b1a1a",
  "Red": "#cc2200",
  "Royal Blue": "#1a4799",
  "Royal": "#1a4799",
  "Purple": "#5a2d82",
  "Gold": "#c8a96e",
  "Ash": "#d4d4d4",
  "Sand": "#d4c4a0",
  "Charcoal": "#3a3a3a",
  "Storm": "#6a7a8a",
  "Light Blue": "#87b8d4",
  "Vintage White": "#f5f0e8",
  // ... add more as needed
};

// Case-insensitive lookup helper:
const normalizeKey = (k: string) =>
  k.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const getColorHex = (color: string): string =>
  COLOR_MAP[color] ?? COLOR_MAP[normalizeKey(color)] ?? "#999999";
```

---

### Variant Name Parser (`/api/printful/variants/[id]/route.ts`)

Printful variant names come in two formats. The parser must handle both correctly or color/size assignment breaks.

```ts
// KNOWN_COLORS — used to detect if a name segment is a color vs a size
const KNOWN_COLORS = new Set([
  "Black", "White", "Navy", "Navy Blue", "Red", "Forest Green", "Military Green", "Bottle Green",
  "Storm", "Sport Grey", "Dark Heather", "Heather", "Maroon", "Ash", "Sand",
  "Royal", "Royal Blue", "Purple", "Orange", "Gold", "Yellow", "Pink", "Light Pink",
  "Charcoal", "Light Blue", "Vintage White", "Carolina Blue", "Heather Blue", "Olive",
  "Brown", "Chocolate", "Burgundy", "Mustard", "Cream", "Cranberry", "Dark Navy",
  "Slate", "Mint", "Coral", "Teal", "Indigo", "Green", "Blue", "Grey", "Gray",
  "Silver", "Rose Gold", "Rose", "Lavender", "Sky Blue", "Cobalt", "Aqua",
]);

function parseVariantName(name: string): { size: string; color: string } {
  const parts = name.split(" / ").map((p) => p.trim());

  if (parts.length === 1) {
    // e.g. "One Size" — no color
    return { size: parts[0], color: "" };
  }

  if (parts.length === 2) {
    // e.g. "Insulated tumbler / Black" → color=Black, size=""
    // e.g. "S / Black" → size=S, color=Black
    // e.g. "L / Forest Green" → size=L, color=Forest Green
    const [a, b] = parts;
    if (KNOWN_COLORS.has(b)) {
      return { size: a === name.split(" / ")[0] && !KNOWN_COLORS.has(a) ? a : "", color: b };
    }
    return { size: b, color: a };
  }

  if (parts.length >= 3) {
    // e.g. "Unisex Hoodie / S / Black" → size=S, color=Black
    // Last segment is usually color, middle is size
    const candidate1 = parts[parts.length - 2]; // size candidate
    const candidate2 = parts[parts.length - 1]; // color candidate
    if (KNOWN_COLORS.has(candidate2)) {
      return { size: candidate1, color: candidate2 };
    }
    // Guard: sometimes order is reversed — "Product / Black / S"
    if (KNOWN_COLORS.has(candidate1) && !KNOWN_COLORS.has(candidate2)) {
      return { size: candidate2, color: candidate1 };
    }
    return { size: candidate1, color: candidate2 };
  }

  return { size: "", color: "" };
}
```

---

### Seeded Fallback Data (`/src/lib/printful-seeded-products.json`)

The Printful API can be slow or unavailable. Keep a seeded JSON snapshot so the shop always renders.

```json
{
  "storeId": 12345678,
  "products": [
    {
      "printful_id": 987654321,
      "slug": "black-glossy-mug-15oz",
      "name": "Black Glossy Mug 15oz",
      "description": "...",
      "price": 21.00,
      "category": "drinkware",
      "images": ["https://cdn.printful.com/..."]
    }
  ]
}
```

The `/api/printful/products` route tries the live API first, falls back to the seeded file on error. `storeId` in this file is used by the webhook — keep it accurate.

---

### API Route: Stripe Checkout (`/api/stripe/checkout/route.ts`)

```ts
export async function POST(req: NextRequest) {
  const { items }: { items: CartItemPayload[] } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_creation: "always",  // ← REQUIRED: ensures Stripe sends receipt email to customer
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // Only pass images if they are absolute HTTPS URLs
          // Local /public paths will cause Stripe to silently drop the image
          ...(item.image?.startsWith("http") ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
    },
    success_url: `${siteUrl}/shop?success=true`,
    cancel_url: `${siteUrl}/shop`,
    metadata: {
      // Store full cart as JSON — webhook reads this to create Printful order
      cart: JSON.stringify(
        items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          printful_variant_id: i.printful_variant_id, // ← CRITICAL
        }))
      ),
    },
  });

  return NextResponse.json({ url: session.url });
}
```

---

### API Route: Stripe Webhook (`/api/stripe/webhook/route.ts`)

This is the fulfillment engine. It fires after every successful payment.

```ts
// Manual-fulfillment item IDs — anything in this set routes to owner email, NOT Printful
// Populate with the slug IDs of any manual/handmade items for THIS client
// These route to owner email for manual fulfillment — NOT to Printful
const MANUAL_ITEM_IDS = new Set([
  // "[handmade-item-slug-1]",
  // "[handmade-item-slug-2]",
  // Source from this project's shop.ts or printful-seeded-products.json
]);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  // Always verify the signature — never skip this
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // 1. Parse cart from metadata
    const cart: CartItem[] = JSON.parse(session.metadata?.cart ?? "[]");

    // 2. Collect shipping address
    const shipping = (session as any).collected_information?.shipping_details
      ?? (session as any).shipping_details;

    // 3. Split POD vs manual
    const manualItems = cart.filter((i) => MANUAL_ITEM_IDS.has(String(i.id)));
    const podItems = cart.filter((i) => !MANUAL_ITEM_IDS.has(String(i.id)));

    // 4. Create Printful order for POD items
    if (podItems.length > 0 && shipping?.address) {
      const orderPayload = {
        recipient: {
          name: shipping.name ?? session.customer_details?.name ?? "Customer",
          address1: shipping.address.line1 ?? "",
          city: shipping.address.city ?? "",
          state_code: shipping.address.state ?? "",
          country_code: shipping.address.country ?? "US",
          zip: shipping.address.postal_code ?? "",
          email: session.customer_details?.email ?? undefined,
        },
        items: podItems.map((i) => ({
          sync_variant_id: i.printful_variant_id,  // must be the sync variant ID, not catalog ID
          quantity: i.quantity,
        })),
        confirm: true,  // passed as query param in printful.ts — NOT in this body
      };

      await createOrder(seededProducts.storeId, orderPayload);
    }

    // 5. Send owner alert via Resend (non-fatal — wrap in try/catch)
    await sendOrderAlertToOwner(session, cart, manualItems.length > 0);
  }

  return NextResponse.json({ received: true });
}
```

---

### Printful API Client (`/src/lib/printful.ts`)

Critical implementation details:

```ts
// ── createOrder: confirm MUST be a query param, NOT a body field ──
export async function createOrder(storeId: number, orderData: OrderData): Promise<Order> {
  const { confirm, ...body } = orderData;
  const path = confirm ? "/orders?confirm=true" : "/orders";
  //           ↑ query param — Printful ignores confirm in the request body
  return pfetch<Order>(path, {
    method: "POST",
    storeId,
    body: JSON.stringify(body),  // body does NOT include confirm
  });
}

// ── Store ID header: required for all store-scoped endpoints ──
function getHeaders(storeId?: number) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
  if (storeId) headers["X-PF-Store-Id"] = String(storeId);
  return headers;
}
```

---

### Owner Order Alert (`sendOrderAlertToOwner`)

```ts
import { Resend } from "resend";

async function sendOrderAlertToOwner(
  session: Stripe.Checkout.Session,
  cart: CartItem[],
  hasManualItems: boolean
) {
  if (!process.env.RESEND_API_KEY) return; // skip silently if not configured

  const resend = new Resend(process.env.RESEND_API_KEY);
  const total = ((session.amount_total ?? 0) / 100).toFixed(2);
  const customer = session.customer_details;

  const manualFlag = hasManualItems
    ? "\n⚠️  MANUAL FULFILLMENT REQUIRED — ship these items yourself.\n"
    : "";

  const itemLines = cart
    .map((i) => `  • ${i.name} x${i.quantity} — $${i.price.toFixed(2)}`)
    .join("\n");

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,   // e.g. orders@[client-domain].com — Resend-verified
      to: process.env.OWNER_EMAIL!,           // client's notification email — set in Vercel env vars
      replyTo: customer?.email,               // REQUIRED — owner hits Reply, goes to customer (Error #50)
      subject: `New Order — $${total}`,
      text: `New order!\n${manualFlag}\nCustomer: ${customer?.name} <${customer?.email}>\nTotal: $${total}\n\nItems:\n${itemLines}\n\nStripe: ${session.id}`,
    });
  } catch (err) {
    console.error("[webhook] Failed to send order alert:", err); // non-fatal
  }
}
```

**Resend setup:**
1. Create account at resend.com (free — 3,000 emails/month)
2. Add and verify your sending domain (GoDaddy: use "Auto-configure" — it sets DKIM + SPF automatically)
3. Create an API key → add to Vercel as `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL=orders@[client-domain].com` in Vercel — must match the verified domain
5. Set `OWNER_EMAIL=owner@gmail.com` in Vercel — the business owner's real inbox.
   This is the single source of truth for where lead notifications go and where customer
   replies land. Every API route reads `process.env.OWNER_EMAIL` — never hardcode an email.
   During demo, set to Anthony's email. At launch, swap to the client's real email. One change, done.
6. **Every `resend.emails.send()` must have explicit `replyTo`** (Error #50):
   - Owner notification emails: `replyTo: customerEmail` (so owner Reply reaches the customer)
   - Auto-reply emails to customer: `replyTo: process.env.OWNER_EMAIL` (so customer Reply reaches owner)
   - Marketing emails (VIP, newsletter): must also include CAN-SPAM unsubscribe line + physical address
   The branded `from` address (e.g. orders@domain.com) is NOT a real inbox — replies to it bounce.

---

### Infrastructure Gotchas — Learn From Production

These bugs cost real money to discover. Don't repeat them:

**1. Stripe webhook URL must match canonical domain exactly — no redirects**
- If your domain redirects `example.com` → `www.example.com`, register the webhook as `https://www.example.com/api/stripe/webhook`
- Stripe does NOT follow HTTP redirects. A 307 redirect = webhook silently fails
- Fix: check Stripe Dashboard → Webhooks → your endpoint URL. Must be the final URL, not the redirecting one
- Also set `NEXT_PUBLIC_SITE_URL=https://www.example.com` (with www) in Vercel

**2. Printful `confirm=true` is a query param, NOT a body field**
- Orders created without `?confirm=true` land as **Draft** — Printful will not fulfill them
- The `confirm` field in the request body is silently ignored by Printful
- Pattern: `POST /orders?confirm=true` with confirm removed from the JSON body

**3. Stripe guest checkout does not send customer receipts by default**
- Add `customer_creation: "always"` to the Stripe checkout session
- Without this, guest customers get no receipt email

**4. Printful billing card must be on file with sufficient funds**
- When Printful creates and confirms an order, they immediately charge the store owner's card
- If the card fails, the order stays in "Waiting for transaction approval" and will not ship
- Ensure the owner has an active payment method in Printful → Billing → Payments

**5. Only pass absolute HTTPS image URLs to Stripe**
- `/public/images/product.jpg` will cause Stripe to silently drop the image
- Printful CDN URLs (`https://cdn.printful.com/...`) work fine

**6. Printful variant IDs: sync variant ID ≠ catalog variant ID**
- `sync_variant_id` (used in order creation) is the ID from the store's sync product
- `variant_id` is the catalog variant — cannot be used to create orders
- Fetch sync variant IDs via `GET /store/products/{syncProductId}` → `sync_variants[].id`

**7. Resend API key security**
- Never paste your Resend API key in a screenshot or share it in any channel
- If exposed: immediately go to Resend → API Keys → revoke + create new → update Vercel env var + redeploy

---

### Checklist: Printful Store Setup

Before any live purchase:
- [ ] Printful store created, connected to your account
- [ ] Products synced to store (create sync products via dashboard or API)
- [ ] Store ID noted — goes in `printful-seeded-products.json`
- [ ] Printful billing: active payment method on file
- [ ] In Printful → Store → Settings: confirm "Send shipping notifications to end customers" is ON
- [ ] Test order created in Printful manually to verify card works

### Checklist: Stripe Setup

- [ ] Stripe account in live mode
- [ ] Webhook registered at `https://www.[client-domain].com/api/stripe/webhook` (with www if that's your canonical)
- [ ] Webhook event: `checkout.session.completed` only
- [ ] Webhook secret copied → Vercel `STRIPE_WEBHOOK_SECRET`
- [ ] `shipping_address_collection` allowed countries match your Printful shipping zones

---

## Section 8 — Quiz (Scored Lead Funnel)

**Goal:** Type the prospect, compute a result archetype, show results instantly on screen,
and notify the client of a qualified lead. This is a lead magnet funnel, not a contact form.
The user gets instant gratification on screen — no email to the user. Calendly collects
their email as part of the booking flow on the results screen.

**Critical distinction:** The quiz is a client-side scored funnel — it does NOT post to any API.
There is no `/api/quiz` route. Scoring happens in the browser via `scoreQuiz()`. The client
is notified of bookings through Calendly's own booking confirmation (the calendar is inline
on the results screen). The quiz has its own data layer but no email logic.

---

### Data Layer (`src/data/quiz.ts`) — write this first, before any UI

All quiz logic lives here. Zero UI dependency. Fully testable in isolation.

```ts
// 4 result archetypes — derived from initial-business-data.md + market-intelligence.md
// Name these for THIS brand's actual audience segments. Read both files before writing.
// Never copy archetypes from a prior build — they reflect a different brand's audience.
// Reference builds for structure only: tonyrosa777-ops/gray-method-training (quiz.ts)
export type QuizType = "archetype-a" | "archetype-b" | "archetype-c" | "archetype-d";
// Replace with meaningful slugs: e.g. "first-timer" | "relapsed" | "skeptic" | "ready-now"

export interface QuizAnswer {
  text: string;       // Display label (with leading emoji)
  type: QuizType;     // Which archetype this answer maps to
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];  // Always exactly 4
}

export interface QuizResult {
  name: string;               // Archetype name
  tagline: string;            // One-liner shown large on results screen
  body: string[];             // 3-4 paragraphs of personalized copy
  recommendedProgram: {
    name: string;
    href: string;
    reason: string;           // 1-2 sentence explanation of why this fits
  };
}

// 8 questions, each with 4 answers tagged to a QuizType
export const QUIZ_QUESTIONS: QuizQuestion[] = [ /* ... 8 questions ... */ ];

// Results keyed by archetype
export const QUIZ_RESULTS: Record<QuizType, QuizResult> = { /* ... */ };

// Scoring: pure function, deterministic, testable
export function scoreQuiz(answers: QuizType[]): QuizType {
  const counts = {} as Record<QuizType, number>;
  for (const a of answers) counts[a] = (counts[a] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as QuizType;
}
```

---

### UI Layer (`src/app/quiz/QuizClient.tsx`) — 3 phases

```tsx
"use client";
type Phase = "intro" | "question" | "results";
// No emailgate phase. No name/email collected by the quiz.
// Calendly collects name + email as part of its own booking flow.

// State
const [phase, setPhase] = useState<Phase>("intro");
const [questionIndex, setQuestionIndex] = useState(0);       // 0–7
const [answers, setAnswers] = useState<QuizType[]>([]);      // accumulates one per question
const [pendingAnswer, setPendingAnswer] = useState<QuizType | null>(null);
const [direction, setDirection] = useState(1);               // 1=forward, -1=back
const [resultType, setResultType] = useState<QuizType | null>(null);
```

**Phase: question — answer interaction**
```tsx
function handleAnswer(type: QuizType) {
  setPendingAnswer(type);                          // triggers glow animation (400ms)
  setTimeout(() => {
    const next = [...answers.slice(0, questionIndex), type];
    setAnswers(next);
    setPendingAnswer(null);
    setDirection(1);
    if (questionIndex < 7) {
      setQuestionIndex(i => i + 1);
    } else {
      setResultType(scoreQuiz(newAnswers));        // score immediately on Q8
      setPhase("results");                         // straight to results, no gate
    }
  }, 400);
}

// Answer button styles (apply per-answer inside the map):
// selected (answers[questionIndex] === answer.type): full opacity, gold border
// pending (pendingAnswer === answer.type): glows brand primary
// others when pending: opacity-30
// default: normal card style
```

**Phase: question — back navigation**
```tsx
function goBack() {
  if (questionIndex > 0) {
    setDirection(-1);
    setQuestionIndex(i => i - 1);
    setAnswers(prev => prev.slice(0, questionIndex - 1));  // discard future answers
  } else {
    setPhase("intro");
  }
}
// Re-entering a question: answers[questionIndex] highlights the previously saved answer
```

**Progress bar**
```tsx
// Shows during "question" phase only
const progress = (questionIndex / 8) * 100;
// Hits 100% on Q8 answer → instantly transitions to results
```

**AnimatePresence slides (direction-aware)**
```tsx
const variants = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

<AnimatePresence mode="wait" custom={direction}>
  <motion.div key={questionIndex} custom={direction} variants={variants}
    initial="enter" animate="center" exit="exit"
    transition={{ duration: 0.25 }}>
    {/* current question */}
  </motion.div>
</AnimatePresence>
```

**Phase: results**
```tsx
const result = QUIZ_RESULTS[resultType!];
// Render in order:
// 1. result.name — large, prominent
// 2. result.tagline — shimmer class
// 3. result.body[] — 3-4 paragraphs of personalized copy
// 4. result.recommendedProgram card — name, reason, link to program page
// 5. <BookingCalendar name="" email="" /> — INLINE, not a link to /booking
//    Calendly's booking form collects name + email itself — pass empty strings.
//    User typed themselves → saw their result → calendar is right there.
//    One decision, one click. This is the conversion moment.
```

---

### API Layer

**There is no `/api/quiz` route.** The quiz does not collect name or email — there is nothing
to POST. The client is notified of bookings through Calendly's own booking confirmation
notifications. No Resend call. No API route needed.

---

### Homepage Quiz CTA Section

```tsx
// Full-width section linking to /quiz
// Headline: "Not sure where to start?"
// Sub: "Take the 2-minute quiz — get a personalized recommendation instantly."
// CTA button → /quiz (not inline — the full quiz lives on its own page)
// Background: subtle ambient animation (breathing orb or shimmer overlay)
```

---

## Section 9 — Pricing Page

**Goal:** Eliminate price objection, show ROI, drive tier selection.

> **IMPORTANT:** The Tier Comparison Chart and ROI Calculator are **development/sales tools**. Remove or comment them out before the public page goes live. They exist to help the client understand value during the sales process — not to confuse public visitors.

---

### 9a — Three-Tier Pricing Cards

**Architecture principle:** Three tiers create anchoring. The middle tier should look "right." The top tier makes the middle look reasonable.

```tsx
// Tier data shape
tiers: [
  {
    name: "Starter",
    price: 1500,           // or monthly, or range
    badge: null,
    headline: "Get started",
    description: "...",
    features: string[],    // 5-7 bullet points
    cta: "Get Started",
    ctaHref: "/contact?tier=starter",
    featured: false,
  },
  {
    name: "Pro",
    price: 3000,
    badge: "Most Popular",
    headline: "The complete solution",
    description: "...",
    features: string[],    // 8-10 bullet points (more than Starter)
    cta: "Get Started",
    ctaHref: "/contact?tier=pro",
    featured: true,        // ← highlighted, larger card
  },
  {
    name: "Premium",
    price: 5500,
    badge: "Full Service",
    headline: "Done for you",
    description: "...",
    features: string[],
    cta: "Get Started",
    ctaHref: "/contact?tier=premium",
    featured: false,
  }
]
```

**Card layout:**
```
┌─────────────────────┐
│ [Badge if featured] │
│ Tier name           │
│ $X,XXX              │
│ Positioning line    │
│ ─────────────────── │
│ ✓ Feature 1         │
│ ✓ Feature 2         │
│ ✓ Feature 3         │
│ ...                 │
│ [CTA Button]        │
└─────────────────────┘
```

Featured card: `border border-primary`, larger `scale(1.02)` on desktop, full gold CTA button. Others: ghost/outline CTA.

---

### 9b — ROI Calculator (Dev/Sales Only — Remove Before Launch)

Interactive tool that helps the client see the financial return on their investment before committing.

**Three input sliders:**

| Slider | Range | Default | Label |
|--------|-------|---------|-------|
| Monthly leads from site | 1–20 | 10 | "Monthly website leads" |
| Close rate | 5%–50% | 25% | "Lead-to-client conversion rate" |
| Average client value | $500–$10,000 | $3,000 | "Average client lifetime value" |

**Calculated outputs (real-time, with CountUp animations):**

```ts
const closedPerMonth = leads * (closeRate / 100);
const revenuePerMonth = closedPerMonth * avgClientValue;
const revenuePerYear = revenuePerMonth * 12;
const breakEvenMonths = selectedTierPrice / revenuePerMonth;
const breakEvenClients = selectedTierPrice / avgClientValue;
```

**Display cards:**
```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Monthly Revenue  │  │ Annual Revenue   │  │ Break-even Time  │
│   $X,XXX         │  │   $XX,XXX        │  │   X.X months     │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**Package selector tabs** above the calculator — switching tier updates all calculations instantly.

**Implementation:**

```tsx
// PricingClient.tsx (client component for interactivity)
const [selectedTier, setSelectedTier] = useState(1); // default: middle tier
const [leads, setLeads] = useState(10);
const [closeRate, setCloseRate] = useState(25);
const [avgValue, setAvgValue] = useState(3000);

// Use useMemo for calculated values
const metrics = useMemo(() => ({
  closedPerMonth: leads * (closeRate / 100),
  revenuePerMonth: leads * (closeRate / 100) * avgValue,
  revenuePerYear: leads * (closeRate / 100) * avgValue * 12,
  breakEvenMonths: tiers[selectedTier].price / (leads * (closeRate / 100) * avgValue),
  breakEvenClients: tiers[selectedTier].price / avgValue,
}), [leads, closeRate, avgValue, selectedTier]);
```

---

### 9c — Tier Comparison Chart (Dev/Sales Only — Remove Before Launch)

Feature matrix showing exactly what each tier includes. Helps client understand what they're buying.

```tsx
// Feature rows with ✓ / — indicators
const features = [
  { label: "Custom homepage & hero", starter: true, pro: true, premium: true },
  { label: "About / Contact / Services pages", starter: true, pro: true, premium: true },
  { label: "Mobile responsive", starter: true, pro: true, premium: true },
  { label: "Basic SEO setup", starter: true, pro: true, premium: true },
  { label: "Blog / CMS integration", starter: false, pro: true, premium: true },
  { label: "Instagram feed integration", starter: false, pro: true, premium: true },
  { label: "Testimonials section", starter: false, pro: true, premium: true },
  { label: "Quiz / lead capture", starter: false, pro: true, premium: true },
  { label: "Shop / e-commerce", starter: false, pro: false, premium: true },
  { label: "Revenue architecture", starter: false, pro: false, premium: true },
  { label: "Priority revisions", starter: false, pro: false, premium: true },
  { label: "1-on-1 training handoff", starter: false, pro: false, premium: true },
];

// Table header: Tier names with prices
// Featured column (Pro): highlighted background
// ✓ = checkmark icon in primary color
// — = dash in muted color
```

> **Remove before launch:** Wrap both the ROI Calculator and Comparison Chart in a `DEV_MODE` environment variable check, or simply delete the components once the client has signed.

```tsx
// Safest pattern:
{process.env.NEXT_PUBLIC_SHOW_PRICING_TOOLS === 'true' && (
  <>
    <ROICalculator />
    <TierComparisonChart />
  </>
)}
// Set NEXT_PUBLIC_SHOW_PRICING_TOOLS=false in production .env
```

---

## Navigation

### Navbar

```tsx
// Fixed header, full width
// Transparent on page load → blurred/dark bg on scroll
// Transition: useEffect listening to window.scrollY

// Left: Logo
// Center: Nav links (desktop only)
// Right: [Cart icon + count] [CTA button]

// Scroll detection:
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);

// className: scrolled ? 'bg-bg-base/90 backdrop-blur-md' : 'bg-transparent'
```

### Mobile Nav

```tsx
// Hamburger icon opens drawer from right
// Spring animation (Framer Motion)
// Full-height overlay with nav links
// Closes on: link click, outside click, Escape key
// Include cart icon + CTA at bottom of drawer
```

### Nav Link Count Rule

If total nav links > 4:
- Primary nav: max 3 items (conversion-critical only — booking, services, contact)
- Remaining links: grouped under a "More" dropdown
- Never let the nav overflow or wrap to a second line at 390px

### Dropdown Behavior Rule

Category nav items (Services, Service Areas, and any multi-page grouping) use a
hover-open container + `<Link href="/parent">` as the trigger — never a `<button>`.

- Hovering the trigger reveals the sub-page list (CSS group-hover or onMouseEnter/Leave on the container div)
- Clicking the trigger navigates to the category parent page (`/services`, `/service-areas`, etc.)
- Sub-page links in the dropdown navigate to their respective child routes

**Never** make a category nav item a `<button>` that only toggles the dropdown.
A button with no href means clicking "Services" does nothing — the user can't reach
the services page without accidentally hovering first. This breaks UX on touch and is
the most common nav friction point.

See Pattern #26 in build-log.md for full implementation.

---

## Asset Placement Rules

All project media must live inside `/public`. Never commit assets to the repo root.

| Asset type | Directory | Naming convention |
|------------|-----------|-------------------|
| Hero video | `/public/videos/` | `hero-[descriptor].mp4` |
| Section images | `/public/images/` | `[section]-[descriptor].jpg` |
| AI-generated photos | `/public/images/` | `[section]-ai-[descriptor].jpg` |
| Client-provided photos | `/public/photos/` | original filename — do not rename |
| Logos / icons | `/public/brand/` | `logo.[ext]`, `favicon.[ext]` |
| OG / meta images | `/public/og/` | `og-[page].jpg` |

**Rule:** Claude must flag any media file not in `/public` before committing.
**Rule:** Video elements must always include `autoPlay muted loop playsInline` and a `poster` fallback image.

---

## AI Asset Generation

**Hero sections always use animated SVG — never a photo, never fal.ai.**
fal.ai is strictly for blog post card thumbnail images. Do not use it for heroes,
about pages, service cards, or OG images.

Service cards, about page, and OG images use real client photos when provided.
If not provided, build sections that work without photo content until photos arrive.

### Blog Card Images — fal.ai

Used for blog post card thumbnails only. Requires `FAL_KEY` in `.env.local`.

Prompt source: `design-system.md` → Section 6 (Photography & Media Direction)
Output: `/public/images/blog/` — commit immediately after generation

```ts
// scripts/generate-blog-images.ts
import * as fal from "@fal-ai/serverless-client";

fal.config({ credentials: process.env.FAL_KEY });

// Pull mood, setting, and prohibited content from design-system.md Section 6
// Generate one card image per blog article
// Save to /public/images/blog/ with slug-matching filenames
// Commit all outputs in the same commit as the script run
```

See: `knowledge/patterns/fal-ai-image-generation.md` for full implementation.

### Videos — Kling (manual step)

Kling (kling.ai) is a web app — not automatable via API.

1. Write scene prompt from `design-system.md` brand identity + photography direction
2. Generate in Kling → download as MP4
3. Place in `/public/videos/hero-[descriptor].mp4`
4. Implement:

```tsx
<video autoPlay muted loop playsInline poster="/images/hero-fallback.jpg">
  <source src="/videos/hero-[descriptor].mp4" type="video/mp4" />
</video>
```

See: `knowledge/patterns/kling-video-hero.md` for full implementation.

---

## Homepage Teaser Rule

**Every page on the site must have a teaser section on the homepage.**

The homepage is a curated preview of the entire site. Each internal page (services, blog,
about, quiz, booking, shop) gets a teaser block on the homepage that:
- Introduces the page in 1–3 sentences
- Shows enough to create desire (3 featured posts, 3 featured services, etc.)
- Has a clear CTA link to the full page

This keeps visitors on the homepage longer, signals depth to search engines, and ensures
every page gets organic discovery through the homepage.

| Page | Homepage Teaser Component |
|------|--------------------------|
| Services | `<ServicesPreview />` — 3 service cards with 1-line description + CTA |
| Blog | `<BlogPreview />` — 3 latest posts with title + excerpt + "Read more" |
| About | `<FounderStory />` — Origin paragraph + photo + link to full about page |
| Quiz | `<QuizCTA />` — "Not sure where to start?" hook + quiz launch button |
| Booking | `<BookingPreview />` — Calendly widget embedded inline (see Calendly section) |
| Shop | `<ShopPreview />` — 3 featured products + "Shop all" link |

Never create a page that has no presence on the homepage. If the page exists, it gets a teaser.

---

## Booking Calendar (Custom UI — Calendly API)

**Build a custom date picker, not a Calendly iframe.**

The booking calendar looks 100% native to the site — brand colors, brand typography, brand
button style. A visitor should not be able to tell it uses Calendly under the hood.
Under the hood, two API routes call Calendly to fetch slots and submit bookings.

### Environment Variables

```env
CALENDLY_API_KEY=                        # Server-side only — never NEXT_PUBLIC
NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI=     # The event type URI (safe to expose)
```

`CALENDLY_API_KEY` is server-only. Never expose it to the client bundle.

### API Routes

```ts
// /api/calendly/slots — GET ?date=2026-04-10
// Calls: GET https://api.calendly.com/event_type_available_times
//   ?event_type={NEXT_PUBLIC_CALENDLY_EVENT_TYPE_URI}
//   &start_time={date}T00:00:00Z&end_time={date}T23:59:59Z
// Returns: { slots: string[] }  (ISO datetime strings)

// /api/calendly/book — POST { slot, name, email }
// Calls: POST https://api.calendly.com/scheduling_links  (or direct event creation)
// Returns: { success: boolean, confirmationUrl?: string }
```

### Component Structure (`BookingCalendar.tsx`)

```
Month grid — navigate prev/next month
  → Click date → fetch /api/calendly/slots?date=YYYY-MM-DD
  → Render time slot buttons (brand-colored, disabled for unavailable)
  → Click time → show confirm form: name + email + submit
  → POST /api/calendly/book → success state with confirmation
```

```tsx
// Styled to the brand — example selected state
<button
  className="bg-[var(--primary)] text-[var(--bg-base)] font-mono rounded-lg px-4 py-2"
  onClick={() => selectSlot(slot)}
>
  {formatTime(slot)}
</button>
```

**Placement** — render `<BookingCalendar />` in `/app/booking/page.tsx` and as a teaser
section on the homepage (show current week only, full calendar on /booking).

### Demo Mode (No API Key)

When `CALENDLY_API_KEY` is not set, the `/api/calendly/slots` route returns deterministic
seeded availability — same pattern as build-log.md Pattern #25. The calendar is fully
interactive: dates are clickable, slots appear, the confirm form works (posts to a mock
success endpoint). A visitor cannot tell it is seeded.

Decision logic in the API route:
```ts
if (!process.env.CALENDLY_API_KEY) {
  return NextResponse.json({ slots: seededSlots(date) });
}
// ...real Calendly call
```

A blank or broken calendar kills the demo. A seeded working calendar closes the sale.

See Pattern #13 and #25 in build-log.md for seeded availability implementation.

**Default fallback:** implement the demo-booking-calendar-seeded-availability pattern —
a visually realistic calendar UI with seeded available/unavailable slots, a time-slot
picker, and a mock confirmation state. The visitor sees a working interactive calendar.
The data is local; no Calendly account is required.

Decision logic in `BookingWidget.tsx`:
```tsx
const calendlyUrl = url ?? process.env.NEXT_PUBLIC_CALENDLY_URL;
if (!calendlyUrl) return <DemoBookingCalendar />;  // seeded fallback
```

See Pattern #25 in build-log.md for the full seeded calendar implementation.

---

## Google Maps Embed

**Always use the real Google Maps iframe. No API key required.**

Center the map on the client's service area — not just their address. For service-area
businesses (fence contractors, mobile services, regional consultants), set the zoom level
to show the full territory they cover, not a street-level pin.

```tsx
// components/sections/ServiceAreaMap.tsx
export function ServiceAreaMap({
  location,
  zoom = 11,
}: {
  location: string;   // e.g. "Nashua, NH" or "New England, USA"
  zoom?: number;
}) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=${zoom}&output=embed`;

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${location} service area map`}
      />
    </div>
  );
}
```

**Zoom guide:**
| Business type | Recommended zoom |
|---------------|-----------------|
| Single address (office, studio) | 15–16 |
| City-wide service area | 12–13 |
| Multi-city / regional | 9–11 |
| State or multi-state | 7–8 |

See Pattern #11 in build-log.md for notes on iframe compatibility.

---

## Homepage Composition

Assemble sections in this order. Each is a separate component, full viewport width.

```tsx
// app/page.tsx
//
// Section rhythm — no two adjacent sections share a background.
// D = dark (var(--primary)), L = light (var(--bg-base) / var(--bg-elevated))
// Verify this map before building. Update it when adding or reordering sections.
//
//  1. Hero            → D
//  2. PainPoints      → L
//  3. FounderStory    → D
//  4. Philosophy      → L
//  5. Services        → D
//  6. ShopPreview     → L
//  7. Stats           → D
//  8. Testimonials    → L
//  9. InstagramFeed   → D  (optional — if removed, QuizCTA becomes D)
// 10. QuizCTA         → L
// 11. BlogPreview     → D
// 12. BookingPreview  → L
// 13. FinalCTA        → D
//
export default function HomePage() {
  return (
    <>
      <Hero />              {/* 1.  D — Hook */}
      <PainPoints />        {/* 2.  L — Empathy */}
      <FounderStory />      {/* 3.  D — Trust — teaser for /about */}
      <Philosophy />        {/* 4.  L — Methodology / Why */}
      <Services />          {/* 5.  D — What you offer — teaser for /services */}
      <ShopPreview />       {/* 6.  L — Products — teaser for /shop (if applicable) */}
      <Stats />             {/* 7.  D — Social proof — numbers */}
      <Testimonials />      {/* 8.  L — Social proof — humans */}
      <InstagramFeed />     {/* 9.  D — Live / current (optional) */}
      <QuizCTA />           {/* 10. L — Engagement hook — teaser for /quiz */}
      <BlogPreview />       {/* 11. D — Authority content — teaser for /blog */}
      <BookingPreview />    {/* 12. L — Calendly widget inline — teaser for /booking */}
      <FinalCTA />          {/* 13. D — Last chance CTA */}
    </>
  );
}
```

---

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form → owner notification email |
| `/api/newsletter` | POST | Newsletter/VIP signup → welcome email (CAN-SPAM required) |
| `/api/printful/products` | GET | Fetch Printful sync catalog; falls back to seeded JSON |
| `/api/printful/variants/[id]` | GET | Fetch variant sizes + colors for picker; parses KNOWN_COLORS |
| `/api/stripe/checkout` | POST | Create Stripe checkout session; stores cart in metadata |
| `/api/stripe/webhook` | POST | **Fulfillment trigger** — splits POD/manual, creates Printful order, alerts owner |
| `/api/instagram` | GET | Proxy Instagram Graph API |
| `/api/revalidate` | POST | ISR webhook from Sanity |

### Contact Form Route — `/api/contact/route.ts` (Error #50 compliance)

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  // Owner notification — replyTo = lead's email so owner Reply goes to customer
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.OWNER_EMAIL!,
    replyTo: email,                         // REQUIRED (Error #50)
    subject: `New Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  });

  // Auto-reply to customer — replyTo = owner's real email so customer Reply reaches owner
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    replyTo: process.env.OWNER_EMAIL!,      // REQUIRED (Error #50)
    subject: `We got your message, ${name}!`,
    text: `Thanks for reaching out! We'll get back to you within 24 hours.\n\n— ${process.env.NEXT_PUBLIC_SITE_URL}`,
  });

  return Response.json({ ok: true });
}
```

### Newsletter/VIP Route — `/api/newsletter/route.ts` (CAN-SPAM required)

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  // Welcome email — this promises future communication, so CAN-SPAM applies
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    replyTo: process.env.OWNER_EMAIL!,      // REQUIRED (Error #50)
    subject: "Welcome — you're on the list!",
    text: [
      "Thanks for signing up! You'll be the first to know about new offerings and updates.",
      "",
      "— [BUSINESS_NAME]",
      "[PHYSICAL_ADDRESS]",                  // CAN-SPAM: physical mailing address required
      "",
      "—",
      'Don\'t want to hear from us? Reply to this email with "UNSUBSCRIBE" and we\'ll remove you from the list.',
    ].join("\n"),
  });

  return Response.json({ ok: true });
}
```

**CAN-SPAM rule:** Any email that promises future sends (VIP welcome, newsletter, drip)
is marketing under CAN-SPAM. Must include: (1) opt-out mechanism, (2) physical business
address. Transactional emails (order confirmation, booking confirmation, contact auto-reply)
do NOT require these — they are one-time responses to a user action.

---

## Content Data Structure (`/data/site.ts`)

Every piece of copy should live here. Zero hard-coded strings in components.

```ts
export const siteData = {
  brand: {
    name: string,
    tagline: string,
    logo: string,
  },
  nav: {
    links: Array<{ label: string, href: string }>,
    cta: { label: string, href: string },
  },
  hero: {
    eyebrow: string,
    headline: string,
    tagline: string,
    ctaPrimary: { label: string, href: string },
    ctaSecondary: { label: string, href: string },
    trustCopy: string,
  },
  painPoints: Array<{ emoji, headline, body }>,
  about: { headline, paragraphs[], credentials[], stats[] },
  philosophy: { headline, pillars: Array<{ icon, title, body }> },
  services: Array<{ slug, name, tagline, description, features[], badge? }>,
  stats: Array<{ value: number, suffix: string, label: string }>,
  testimonials: Array<{ name, identifier, rating, quote, program?, stat?, photo? }>,
  quizCTA: { headline, subtext, cta },
  finalCTA: { headline, subtext, cta },
  footer: { links[], social[], legal },
  pricing: {
    tiers: Array<{ name, price, badge?, headline, features[], cta, featured }>,
  },
}
```

---

## Checklist: Before Launch

### Remove Dev-Only Components
- [ ] ROI Calculator (or set `NEXT_PUBLIC_SHOW_PRICING_TOOLS=false`)
- [ ] Tier Comparison Chart (same env flag)
- [ ] Any `console.log` statements
- [ ] Hardcoded test emails in API routes

### Environment Variables

**Local development (`.env.local`):**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
OWNER_EMAIL=anthonyrosa14@icloud.com
RESEND_FROM_EMAIL=hello@[client-domain].com
PRINTFUL_API_KEY=...
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/clientname/meeting
NEXT_PUBLIC_SITE_URL=https://www.[client-domain].com
NEXT_PUBLIC_SHOW_PRICING_TOOLS=true
```

**Vercel production (add all of the above, plus):**
- [ ] `SANITY_PROJECT_ID`, `SANITY_DATASET`
- [ ] `PRINTFUL_API_KEY` — from Printful → Settings → API
- [ ] `STRIPE_SECRET_KEY` — use live key (not test key) in production
- [ ] `STRIPE_WEBHOOK_SECRET` — from Stripe → Webhooks → your endpoint → Signing secret
- [ ] `RESEND_API_KEY` — from Resend → API Keys (see onboarding checklist — domain must be verified first)
- [ ] `OWNER_EMAIL` — business owner's real inbox (swap from Anthony's email to client's at launch)
- [ ] `RESEND_FROM_EMAIL` — branded sending address matching Resend verified domain (e.g. `hello@clientdomain.com`)
- [ ] `NEXT_PUBLIC_CALENDLY_URL` — client's Calendly event link
- [ ] `NEXT_PUBLIC_SITE_URL` — canonical domain with protocol and www (e.g. `https://www.[client-domain].com`)
- [ ] `INSTAGRAM_ACCESS_TOKEN`
- [ ] `NEXT_PUBLIC_SHOW_PRICING_TOOLS=false`

### Content
- [ ] All copy reviewed by client
- [ ] Real photos replacing placeholders
- [ ] Real testimonials (with permission)
- [ ] Sanity schema deployed (`npx sanity deploy`)
- [ ] At least 3 blog posts in Sanity

### Technical
- [ ] `next.config.ts` image domains updated for client's CDN
- [ ] Analytics connected (Vercel Analytics or GA)
- [ ] OG images created for all major pages
- [ ] Sitemap generated (`next-sitemap`)
- [ ] robots.txt configured
- [ ] DNS + Vercel project connected
- [ ] Vercel Root Directory: blank (Next.js at repo root)

### Visual QA — Multi-Breakpoint Browser Audit (MANDATORY)
This is the final gate before shipping. Nothing gets handed to the client
until every item below is green. File-reading audits cannot catch visible-only
bugs — only a live browser at the right viewport width can.

Full playbook + gotchas:
`C:\Projects\Optimus Assets\knowledge\patterns\end-of-build-multi-breakpoint-browser-audit.md`

**Setup**
- [ ] Dev server started with `run_in_background: true`
- [ ] Output file read until `✓ Ready in Xms` appears
- [ ] Background task ID saved (needed for `TaskStop` at the end)

**Desktop 1440×900**
- [ ] `browser_resize(1440, 900)` → navigate → `browser_wait_for` post-hydration text
- [ ] Screenshot: hero top of page — hero renders correctly
- [ ] `window.scrollTo(0, 400)` via `browser_evaluate` → screenshot scrolled nav state
- [ ] Console: 0 errors, 0 warnings
- [ ] Scroll back to top before switching viewports

**Mobile 390×844 (iPhone 14/15 — most common real viewport, audit FIRST)**
- [ ] `browser_resize(390, 844)` → screenshot
- [ ] Hero fits above the fold (eyebrow + H1 + tagline + primary CTA all visible)
- [ ] No H1 orphan lines, no horizontal scroll
- [ ] Console: 0 errors, 0 warnings

**Mobile 375×812 (iPhone SE — narrowest, catches wraps first)**
- [ ] `browser_resize(375, 812)` → screenshot
- [ ] No wrapped words orphaned, no overflow, no horizontal scroll
- [ ] Console: 0 errors, 0 warnings

**Mobile 428×926 (iPhone Pro Max — widest single column)**
- [ ] `browser_resize(428, 926)` → screenshot
- [ ] No desktop-layout leak, no clipped images
- [ ] Console: 0 errors, 0 warnings

**Mobile nav drawer @ 390**
- [ ] `browser_snapshot` → find "Open navigation menu" ref → click → screenshot
- [ ] Overlay is dark and opaque, not transparent
- [ ] Branding header matches desktop nav
- [ ] CTA visible at bottom of panel
- [ ] Re-snapshot → click INNER "Close navigation menu" X (NOT the hamburger ref —
      the hamburger is behind the overlay and causes a 5s Playwright timeout)

**Homepage Section Architecture Rule — Animation Depth check**
- [ ] Every interior page (services, testimonials, blog, about, contact, booking, quiz)
      ships with a brand-appropriate ambient animation in its header — no static pages

**Homepage Section Architecture Rule — Dark/Light Alternation check**
- [ ] Homepage alternates dark / light section backgrounds with zero adjacent matches

**Homepage Section Architecture Rule — Purpose-Level Deduplication check**
- [ ] No adjacent homepage sections share messaging, purpose, or CTA —
      e.g. two "Ready to X?" blocks back-to-back = FAIL

**Stage 1J — `/ultrareview` pass**
- [ ] Stage 1J `/ultrareview` pass — see knowledge/patterns/ultrareview-as-pre-launch-gate.md

**If you fix a bug mid-audit**
- [ ] Re-verify ALL affected breakpoints, not just the one where you caught it
      (a CSS variable change affects every viewport)
- [ ] Re-read console at each viewport after the fix

**Commit + shutdown**
- [ ] One commit per distinct fix (do not bundle unrelated fixes)
- [ ] Breakpoint referenced in commit body (`caught at 390px`)
- [ ] Pushed after every commit
- [ ] `TaskStop(task_id)` — `mcp__playwright__browser_close` does NOT stop the dev
      server, it only closes the tab; `TaskStop` is the only way to actually kill it

---

## Applying This Template to a New Client

1. **Clone the repo** → rename → new git remote
2. **Update `globals.css`** → swap design tokens (primary color, accent, fonts)
3. **Update `/data/site.ts`** → swap all copy with client's brand voice
4. **Update `/data/shop.ts`** → client's products (or remove shop entirely)
5. **Update `/lib/photos.ts`** → map client's photo assets
6. **Swap Sanity project ID** → new project in Sanity dashboard
7. **Update pricing tiers** → client's actual offer names and prices
8. **Update quiz options** → client's specific pain points and goals
9. **Connect environment variables** → `PRINTFUL_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL` (with www if canonical), Sanity keys
10. **Deploy to Vercel** → connect domain

Sections to remove if not applicable:
- Shop → delete `/shop`, `/api/printful`, `/api/stripe/checkout`, `/api/stripe/webhook`, `CartDrawer`, cart context, seeded JSON fallback; remove `STRIPE_*`, `PRINTFUL_API_KEY`, `RESEND_API_KEY` env vars
- Blog → delete `/blog`, `/studio`, Sanity config
- Instagram → delete `InstagramFeed` section, `/api/instagram`
- Quiz → delete `/quiz`, `QuizCTA` section

The hero animations (particles + orbs), the layout system, the animation library, and the pricing architecture are **always kept** — they are the core conversion infrastructure.
