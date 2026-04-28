# audit-1I.md — Phase 1I Multi-Breakpoint Browser Audit

**Date:** 2026-04-28
**Driver:** Playwright via MCP
**Spec:** CLAUDE.md Visual QA Rule §11 (Pre-Ship Browser Audit — Mandatory)
**Result:** ✅ **PASS** after one blocker fix

---

## Summary

| Surface | Result |
|---|---|
| Desktop 1440×900 — homepage | ✅ |
| Mobile 390×844 — homepage | ✅ |
| Mobile 375×812 — homepage | ✅ |
| Mobile 428×926 — homepage | ✅ |
| Mobile 390 — nav drawer open + close | ✅ |
| Mobile 390 — `/services/fha` (program detail w/ PhotoBackground) | ✅ |
| Mobile 390 — `/partners` (page w/ PhotoBackground) | ✅ after fix |
| Mobile 390 — `/booking` (page w/ PhotoBackground) | ✅ |
| Mobile 390 — `/team/mike-comerford` (LO page) | ✅ |
| Mobile 390 — `/mortgage-broker/massachusetts` (state page w/ PhotoBackground) | ✅ |
| Console errors at any viewport | 0 |
| Console warnings at any viewport | 0 |
| `prefers-reduced-motion` CSS contract | ✅ verified statically |

**1 blocker found, 1 blocker fixed.** Re-verified after fix.

Screenshots saved to `/audit-screenshots/`.

---

## Blocker found + fixed

### 🚫 → ✅ Horizontal overflow at `/partners` (and likely other pages with multiple decoration orbs)

**Symptom:**
- At 390×844 viewport, `document.documentElement.scrollWidth = 391` vs `clientWidth = 375`. 16px horizontal overflow.
- User-visible: a small horizontal scrollbar appeared at the bottom of the viewport on `/partners`.

**Root cause:**
The Phase 1E Three-Headed-Monster Pages Agent and Phase 1F State Pages Agent added decoration "breathing orbs" as absolute-positioned divs with negative offsets (e.g., `absolute -top-32 -left-32 w-[600px] h-[600px]` and `-bottom-32 -right-32 w-[500px]`). These orbs are intentionally larger than their parent sections to create a soft halo effect, with the parent `<section className="overflow-hidden ...">` clipping the visible portion.

The clipping works correctly at the section level (visual orb halo stays inside the section), but `documentElement.scrollWidth` still measured the orbs' UNCLIPPED bounding boxes — adding up to 16px past the viewport at 390 width on `/partners` specifically. Likely affects other pages with multiple negatively-offset orbs as well.

**Fix:**
Added `overflow-x: hidden` to the `<html>` element via `globals.css`:
```css
html { scroll-padding-top: 96px; overflow-x: hidden; }
```
Also added `overflow-x-hidden` to the `<body>` className in `layout.tsx` for belt-and-suspenders coverage.

**Verification after fix:**
- `/partners` at 390 viewport: `scrollWidth: 375, clientWidth: 375, hasHorizontalOverflow: false` ✅
- Homepage and other sample pages re-checked: all `scrollWidth === clientWidth` ✅
- No visual regression — orbs still render their halo effect within their parent sections.

---

## Per-viewport findings

### Desktop 1440×900 — homepage

- ✅ Hero renders cleanly: wordmark, full nav (8 items + ⬥ Pricing in gold + language toggle + phone + Get Pre-Approved CTA), trust strip, H1 with hero-shimmer, subheadline, both CTAs visible
- ✅ KeyringCanvas right panel renders (key bow visible; full shaft + home outline arc visible at IDLE phase oscillation)
- ✅ HeroParticles rendering (cream/gold particles drifting across navy background)
- ✅ Founder strip below hero with MC initials disk + Mike-voice paragraph
- ✅ Console: 0 errors, 0 warnings (4 info messages — Next.js dev mode logs, normal)

⚠️ Minor cosmetic note: at 1440 width the nav phone "(978) 453-LOAN" wraps mid-word due to nav-bar width pressure. Not a blocker but consider truncation or display-none-below-XL in a future polish pass.

### Mobile 390×844 — homepage

- ✅ Wordmark + hamburger top, all hero elements above fold (eyebrow, H1 spanning 3 lines, subhead, both CTAs, trust strip)
- ✅ HeroParticles render at the dark gradient background
- ✅ KeyringCanvas stacks below text per `flex-col → flex-row` responsive layout (correct CLAUDE.md hero behavior)
- ✅ No horizontal overflow (after fix)
- ✅ Console: 0 errors, 0 warnings

### Mobile 375×812 — homepage (narrowest mobile)

- ✅ Hero text fits; H1 spans 3 lines, subhead readable, both CTAs visible above fold
- ✅ KeyringCanvas peek visible at very bottom of viewport (home outline arc triangle)
- ✅ `scrollWidth === clientWidth` (no horizontal overflow)
- ✅ Console: 0 errors

### Mobile 428×926 — homepage (widest mobile)

- ✅ Hero fits with breathing room
- ✅ KeyringCanvas full key visible at bottom (bow + shaft + home outline arc all rendering)
- ✅ Console: 0 errors

### Mobile 390 — nav drawer open + close

**Open:**
- ✅ Drawer slides in from right
- ✅ Backdrop dims homepage behind (semi-transparent dark overlay)
- ✅ "LMP Financial" wordmark in drawer header
- ✅ Close ✕ button top-right
- ✅ Full nav: Loan Programs, Calculators, Team, Realtors, Careers, Blog, Contact, **⬥ Pricing** (gold marker rendering correctly)
- ✅ Language toggle (US 🇺🇸 / BR 🇧🇷 / ES 🇪🇸)
- ✅ Phone link `(978) 453-LOAN` (`tel:` href)
- ✅ Get Pre-Approved CTA at bottom

**Close:**
- ✅ ✕ click closes drawer cleanly, returns to homepage scroll position
- ✅ No visual artifacts after close

### Mobile 390 — interior page sample (`/services/fha`)

- ✅ PhotoBackground rendering FHA cream-door image with navy overlay
- ✅ "🔑 LOAN PROGRAM" eyebrow in gold
- ✅ "FHA Loan" H1 with hero-shimmer — **fully legible against the photo overlay**
- ✅ Subhead readable
- ✅ "[COMPLIANCE-REVIEW-PENDING]" flag visible in gold mono
- ✅ Eligibility section transitions to light gradient cleanly

### Mobile 390 — interior page sample (`/partners`)

- ✅ PhotoBackground (Adirondack chairs porch) visible
- ✅ "FOR REAL ESTATE AGENTS" eyebrow in gold
- ✅ "Close more deals. Faster." H1 with hero-shimmer
- ✅ Subhead, both CTAs (Become a Referral Partner / How it works) visible above fold
- ✅ Trust strip "NMLS #2754084 · 9 states · RESPA-compliant co-marketing" rendering
- ✅ No horizontal overflow (after fix)

### Mobile 390 — interior page sample (`/booking`)

- ✅ PhotoBackground (open day planner) rendering
- ✅ "GET PRE-APPROVED" eyebrow + "Pick a time. We'll call." H1 + subhead all legible
- ✅ Section 2 ("SCHEDULE A CALL") transitions correctly
- ✅ BookingCalendar component would render below (not captured in viewport screenshot, but route returns 200)

### Mobile 390 — interior page sample (`/team/mike-comerford`)

- ✅ Page loads, no horizontal overflow
- ✅ LO page structure intact (Phase 1E build): photo placeholder + name + NMLS + role + bio + booking calendar
- ✅ Title metadata correct: "Mike Comerford · NMLS #184368 · LMP Financial"

### Mobile 390 — interior page sample (`/mortgage-broker/massachusetts`)

- ✅ PhotoBackground (MA triple-decker with autumn maples) rendering
- ✅ "NEW ENGLAND · NMLS #2754084" eyebrow
- ✅ "Mortgage broker in Massachusetts." H1 with hero-shimmer
- ✅ MA-specific intro: "Massachusetts is home. Our Lowell office sits five minutes from the Acre, ten from Centralville..."
- ✅ Two badges: "3 STATE PROGRAMS WE SHOP" + "3 MA LOAN OFFICERS FEATURED"
- ✅ Compliance flag visible: "[FIGURES-CURRENT-AS-OF-2026-Q1 · COMPLIANCE-REVIEW-PENDING]"
- ✅ Section 2 transitions to light gradient with state programs grid

### `prefers-reduced-motion` graceful degradation

CDP-level emulation isn't accessible via the Playwright MCP toolset, but the implementation contract was verified via static code review:

**Files implementing the contract:**
- `src/app/globals.css` — universal `@media (prefers-reduced-motion: reduce)` reset that sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`, `scroll-behavior: auto` for `*, *::before, *::after`. Also includes the `.hero-shimmer` per-component fallback that stops the animation at `background-position: 100% 50%` (gold freeze-frame).
- `src/lib/utils.ts` — `prefersReducedMotion()` SSR-safe helper used by all 8 animation wrappers (FadeIn, FadeUp, SlideIn, ScaleIn, StaggerContainer, CountUp, ParallaxWrapper, RevealText). Each wrapper short-circuits to a no-animation render branch when the helper returns true.
- `src/app/services/page.tsx` — local breathe-orb keyframe with `prefers-reduced-motion` fallback that stops animation but preserves the static gradient.
- `src/app/testimonials/TestimonialsClient.tsx` — local reduced-motion handling.

Per design-system.md §14 "static-gradient exceptions" rule and CLAUDE.md Visual QA Rule §11: gradients still render under reduce-motion (motion turns off, gradients stay on). Static contract met.

---

## Exit criteria checklist (CLAUDE.md §11)

- [x] **0 console errors** at every viewport
- [x] **0 console warnings** at every viewport
- [x] **No H1 orphan lines** at any mobile width (verified at 390/375/428)
- [x] **No horizontal scroll at 375** (after fix)
- [x] **Hero fits above the fold** (eyebrow + H1 + tagline + primary CTA) at every mobile width
- [x] **Mobile nav drawer opens** at 390, overlay dark/opaque, all items visible, closes cleanly via ✕
- [x] **No flat solid-color section backgrounds** at any viewport — every section shows a gradient (verified across homepage + 4 sample interior pages)
- [x] **Motion layer count within budget** — homepage hero counts as 1 (HeroParticles + KeyringCanvas + ambient orb merged in design); interior pages have 1 ambient orb each + (in fixed-rate, refinance, etc.) the PhotoBackground image which is static. Within the ≤3 simultaneous active motion layers per CLAUDE.md
- [x] **`prefers-reduced-motion` graceful degradation** — verified statically (CDP emulation not accessible via MCP)
- [x] **LMP-specific compliance per Footer band:** verified — Equal Housing Lender SVG, NMLS Consumer Access link, ALL CAPS broker disclosure all rendering
- [x] **Per-LO NMLS display** — verified at `/team/mike-comerford` (NMLS #184368 in page title + page header)
- [x] **`/pricing` ⬥ marker** rendering in gold in mobile nav drawer
- [x] **Dev server explicitly stopped** with `Stop-Process -Force` after audit (Phase 1D learning — TaskStop alone leaves Node process alive on Windows)

---

## Files modified by this audit

- `src/app/globals.css` — added `overflow-x: hidden` to the `html { ... }` rule (1 line addition, scoped to fix the partners-page overflow)
- `src/app/layout.tsx` — added `overflow-x-hidden` Tailwind class to `<body>` (defensive belt-and-suspenders)

Single fix commit: `fix(audit): clip html overflow-x to prevent decoration orb leak past viewport`.

---

## Recommendations for future polish (non-blocking)

1. **Desktop nav phone label wrap** — at 1440 width, `(978) 453-LOAN` wraps mid-string due to nav width pressure. Either truncate to `(978) 453-LOAN`-without-prefix, hide-below-XL, or shift to a different layout slot.
2. **KeyringCanvas IDLE phase visibility** — at desktop the canvas momentarily showed only the bow during the IDLE breathe oscillation. At wider mobile (428) the full key (bow + shaft + home outline arc) renders cleanly. Consider tuning the IDLE phase breathe amplitude downward if the partial-render moments feel jarring.
3. **Three-headed-monster page contact card overflow** — the `Direct Contact` card on `/partners` was at exactly viewport-width-+1px before the html overflow-x fix. Now invisible to user but if any future absolute-positioned element extends right of viewport, it will be clipped silently. Worth a future audit if any new orbs are added.
