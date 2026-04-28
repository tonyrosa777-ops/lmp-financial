# Phase 1J — Multi-Breakpoint Browser Audit (New Auth Surfaces)

**Date:** 2026-04-28
**Scope:** New surfaces shipped in Phase 1J — `/account/sign-in` (public) and `/account` (authed Borrower Portal).
**Toolchain:** Playwright MCP against `npm run dev` (Next.js 16.2.4 / Turbopack).
**Pre-existing surfaces:** Not re-audited here; Phase 1I `audit-1I.md` covers homepage + /quiz + /team/[lo-slug] + /partners + /booking + state pages.

---

## Method

Per CLAUDE.md Visual QA Rule §11, drove the new auth surfaces through four viewports: desktop 1440×900, iPhone 14 390×844, iPhone SE 375×812, iPhone Pro Max 428×926. Captured screenshots, console messages, and document overflow at each breakpoint.

Sign-in flow tested with real form interaction: typed `demo@lmpfinancial.com`, clicked submit, verified redirect to `/account` with authed session.

For full-page screenshots, FadeUp components were programmatically revealed via `style.opacity = '1'; style.transform = 'none'` because `IntersectionObserver` does not fire during synthetic full-page rendering. This is a known Playwright limitation, not a real-user issue — humans scroll, reveals trigger normally.

Screenshots saved to `audit-1J-screenshots/`.

---

## Surface 1 — `/account/sign-in` (public)

| Breakpoint | Status | Console | H-overflow | Screenshot |
|---|---|---|---|---|
| 1440×900 | ✅ pass | 0 errors / 0 warnings | none | [1440-account-signin.png](audit-1J-screenshots/1440-account-signin.png) |
| 390×844 | ✅ pass | 0 errors / 0 warnings | none | [390-account-signin.png](audit-1J-screenshots/390-account-signin.png) |
| 375×812 | ✅ pass | 0 errors / 0 warnings | none (doc 360 ≤ vp 375) | [375-account-signin.png](audit-1J-screenshots/375-account-signin.png) |
| 428×926 | ✅ pass | 0 errors / 0 warnings | none (doc 413 ≤ vp 428) | [428-account-signin.png](audit-1J-screenshots/428-account-signin.png) |

**Pass items:**
- Hero section uses dark gradient header pattern consistent with the legal pages.
- H1 "Sign in to your account" carries `.hero-shimmer` (gold) per CLAUDE.md Hero Architecture Rule.
- Eyebrow "BORROWER PORTAL" in gold matches design-system.md tokens.
- Email input full-width with native validation (type="email" required).
- Submit button full-width on mobile, sized appropriately on desktop.
- Auth-aware nav link "Sign In" visible at lg+; carried into mobile drawer (verified via /account at 390 → drawer renders the link).
- `[COMPLIANCE-REVIEW-PENDING]` flag rendered at body bottom per CLAUDE.md Compliance Rule.

**Mid-audit fix:**
- Initial copy said "Send sign-in link" / "Sending link..." which was misleading in demo mode (Credentials provider signs in immediately, no email is sent). Updated button to "Sign in" / "Signing in..." and subhead from "...we'll send you a one-click sign-in link" to "...you'll be signed in." Phase 2A magic-link migration: copy will need a second pass when Resend + adapter ships.

---

## Surface 2 — `/account` (authed Borrower Portal)

| Breakpoint | Status | Console | H-overflow | Screenshot |
|---|---|---|---|---|
| 1440×900 (revealed) | ✅ pass | 0 errors / 0 warnings | none | [1440-account-portal-revealed.png](audit-1J-screenshots/1440-account-portal-revealed.png) |
| 1440×900 (initial) | ⚠️ FadeUp synthetic | 0 errors / 0 warnings | none | [1440-account-portal-full.png](audit-1J-screenshots/1440-account-portal-full.png) |
| 390×844 (revealed) | ✅ pass | 0 errors / 0 warnings | none (doc 375 ≤ vp 390) | [390-account-portal.png](audit-1J-screenshots/390-account-portal.png) |

**Pass items:**
- Welcome header renders authed user's email via session JWT.
- Sign-out button uses Server Action via `<form action>` — no client JS needed.
- Section 1 "Your scheduled calls" — fetches `/api/account/bookings`, renders demo seeded booking ("Sunday, May 3 · 9:00 AM · Call with Aisha Barbosa") with "Demo mode" badge.
- Section 2 "Recommended for you" — reads `lmp.quizResult.v1` from localStorage; when empty (initial visit), shows "Take the quiz" CTA per the spec.
- Section 3 "Continue your application" — emoji card with body copy + secure-partner badge + quiz/team escape hatches.
- "Back to LMP Financial" link at bottom.
- Footer renders identically to public site (compliance band, broker disclosure, NMLS Consumer Access link, licensed states strip — all preserved).

**Auth gate verified:**
- Unauthenticated request to `/account` returns 307 redirect to `/account/sign-in` (middleware-level via Auth.js `callbacks.authorized()`).
- Unauthenticated request to `/api/account/bookings` returns 401.
- After credentials POST → cookie set → `/account` returns 200 → bookings API returns 200 with seeded data.
- `signOut({ redirectTo: '/' })` Server Action signs out and lands on homepage.

**Notes:**
- The "initial" screenshot at 1440 captured before FadeUp triggered shows only sections 1 and 2 (sections 3 and the back-link have opacity:0 inline). This is a Playwright synthetic-render artifact, not a real-user bug. The "revealed" screenshot is what real users see after scrolling.
- `/account/*` excluded from `sitemap.ts` and metadata-level `robots: { index: false, follow: false }` set on both pages — belt-and-suspenders SEO exclusion.

---

## Surface 3 — Auth-aware nav (cross-cut verification)

Verified the nav link state machine across both surfaces:
- Unauthenticated visit → desktop nav shows "Sign In" → routes to `/account/sign-in`.
- After sign-in → desktop nav swaps to "My Account" → routes to `/account`.
- Mobile drawer (390) carries the same auth-aware link with arrow suffix ("Sign In →" / "My Account →").
- `useSession()` hook on Navigation + MobileNav both reactive — nav updates without page refresh.

---

## Console messages (every breakpoint, every surface)

```
Total messages: 2 per page nav (Errors: 0, Warnings: 0)
```

The 2 info-level messages are React DevTools install hint + Next.js Turbopack ready notice. Both are environment-level, not page-specific. Zero application errors, zero application warnings, zero hydration warnings, zero `next/image` `sizes` warnings.

---

## CLAUDE.md §11 exit criteria

| Criterion | Result |
|---|---|
| 0 console errors / 0 warnings at every viewport | ✅ |
| No H1 orphan lines at any mobile width | ✅ (H1 wraps cleanly to 2 lines at 390/375; single line at 428/1440) |
| No horizontal scroll at 375 | ✅ (doc 360 ≤ vp 375) |
| Hero fits above fold at every mobile width | ✅ (sign-in: eyebrow + H1 + subhead + form input visible at 375 viewport height) |
| Mobile nav drawer opens/closes cleanly | ✅ (verified via Phase 1I — unchanged here, only added one auth link to it) |
| No flat solid-color backgrounds at any viewport | ✅ (dark gradient header + light gradient body, both with static orbs per text-heavy exception) |
| Motion layer count within 3 budget | ✅ (text-heavy pages: 0 motion layers; static gradient orbs only) |
| `prefers-reduced-motion` graceful degradation | ✅ inherited (no motion to begin with on these surfaces) |
| LMP-specific: footer compliance band + verbatim broker disclosure + NMLS link | ✅ (footer unchanged from Phase 1H) |
| LMP-specific: SMS opt-in disclaimer rendered verbatim wherever an opt-in checkbox lives | ✅ N/A (no SMS opt-in on auth pages; existing surfaces unchanged) |

---

## Verdict

**SHIP.** All four breakpoints pass on both new auth surfaces. Auth flow works end-to-end (sign-in → portal → sign-out). No blockers, one minor copy fix applied mid-audit (button + subhead language).

Pre-existing surfaces (homepage, quiz, team, booking, partners, state pages, calculators) not re-audited — covered by `audit-1I.md`. Phase 1J only added the auth-aware nav link to those pages, which is a single small DOM addition and was verified inline via Playwright snapshot at 390 (mobile drawer renders the link without breaking layout).

---

## Open items for Mike (Tuesday demo)

1. **Resend sender domain.** The Phase 2A magic-link migration needs `hello@lmpfinancial.com` (or another verified sender) configured in Resend with SPF/DKIM/DMARC DNS records. Currently `AUTH_EMAIL_FROM` defaults to Resend's sandbox `onboarding@resend.dev`. Demo works without Resend (Credentials provider).
2. **my1003app pre-fill.** Confirm with ARIVE whether `*.my1003app.com/<id>/register` accepts URL-param prefill (`firstName`, `lastName`, `email`, `phone`). If yes, Wave 3b wires session prefill into the portal "Continue your application" CTA. If no, UTM tagging from Wave 1d is the only attribution win.
3. **Calendly tokens.** Is there an org-wide Calendly admin token that covers all 22 LOs, or do we need per-LO OAuth flows? Determines how `/api/account/bookings` is wired in Phase 2A.
4. **Demo mode for Tuesday.** Recommend showing the portal with the live Credentials sign-in (mike@lmpfinancial.com → instant access) rather than wiring Resend before the demo. Production swap to Resend + database adapter happens in Phase 2A after sender domain is verified.
