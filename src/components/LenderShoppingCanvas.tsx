'use client';

/**
 * LenderShoppingCanvas — Layer 2 of the LMP hero 3-layer stack.
 *
 * Visualizes LMP's actual moat: "we shop 30+ wholesale lenders on every file."
 * Lender chips stream in from the edges, settle into 3 concentric orbital rings,
 * three are highlighted and connected through the center, and they converge into
 * a single match card that breathes with a gentle gold glow. The IDLE phase keeps
 * orbits rotating, chips dimming/respawning, and the card breathing — the hero is
 * never frozen.
 *
 * Rendered at z-1 above HeroParticles, below text layer (z-10).
 *
 * 5-phase lifecycle:
 *   STREAM    (~1400ms) → 30 chips (or 18 on mobile) stream from edges along
 *                         quadratic bezier curves into orbit-ring slots.
 *   ORBIT     (~1000ms) → chips ease into 3 concentric rotating rings.
 *   MATCH     (~700ms)  → one chip per ring brightens; thin lines draw through
 *                         the center connecting them in a triangle.
 *   CONVERGE  (~600ms)  → highlighted chips spiral inward along a log spiral and
 *                         merge into a rounded "match card" with locale-aware text.
 *   IDLE      (∞)       → match card breathes (scale + glow), orbits keep rotating
 *                         at 25-35% chip opacity, and chips refresh every 8-12s.
 *
 * Reduced-motion contract: when `prefersReducedMotion()` is true at mount, render
 * the IDLE end-state immediately as a single static frame — 3 dim static rings +
 * static match card centered, no rotation, no breathing, no glow pulse.
 * ResizeObserver still re-renders the static frame on resize, and the match card
 * text still updates when the prop changes.
 *
 * Color tokens are resolved from CSS custom properties at runtime via
 * getComputedStyle on document.documentElement, with hex fallbacks for SSR /
 * missing values. Tokens map to design-system.md Section 2:
 *   --accent       (#C5A572) warm gold
 *   --accent-light (#E0C690) light gold
 *   --text-primary (#f5f5f5) cream text
 *   --primary      (#061021) deep navy (card fill base)
 */

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

// ---------- Tunables ----------

const STREAM_DURATION_MS = 1400;
const STREAM_STAGGER_MS = 600; // start times spread across this window
const ORBIT_DURATION_MS = 1000;
const MATCH_DURATION_MS = 700;
const CONVERGE_DURATION_MS = 600;

const MOBILE_BREAKPOINT_PX = 500;

// Desktop chip distribution (30 total: outer 13 + middle 10 + inner 7).
const DESKTOP_RING_COUNTS = [13, 10, 7] as const;

// Mobile chip distribution (18 total: outer 8 + middle 6 + inner 4).
const MOBILE_RING_COUNTS = [8, 6, 4] as const;

// Ring rotation periods (ms for one full revolution, clockwise).
const RING_PERIODS_MS = [24000, 16000, 10000] as const; // outer, middle, inner

// IDLE-phase chip opacity range.
const IDLE_CHIP_OPACITY_MIN = 0.25;
const IDLE_CHIP_OPACITY_MAX = 0.35;

// Chip refresh in IDLE: every 8-12s, dim 1-2 chips + stream replacements in.
const IDLE_REFRESH_MIN_MS = 8000;
const IDLE_REFRESH_MAX_MS = 12000;
const IDLE_REFRESH_FADE_MS = 600;

// Match card breathing.
const BREATHE_PERIOD_MS = 4000;
const BREATHE_SCALE_MIN = 1.0;
const BREATHE_SCALE_MAX = 1.04;
const GLOW_BLUR_MIN = 20;
const GLOW_BLUR_MAX = 28;
const GLOW_ALPHA = 0.3;

// SSR / missing-token fallbacks.
const FALLBACK_ACCENT = '#C5A572';
const FALLBACK_ACCENT_LIGHT = '#E0C690';
const FALLBACK_TEXT_PRIMARY = '#f5f5f5';
const FALLBACK_PRIMARY = '#061021';

// ---------- Types ----------

type Phase = 'STREAM' | 'ORBIT' | 'MATCH' | 'CONVERGE' | 'IDLE';

interface Chip {
  ringIndex: number; // 0 outer, 1 middle, 2 inner
  slotAngle: number; // baseline angle within the ring (radians)
  size: number; // chip radius in CSS px
  baseOpacity: number; // 0.55–0.85 used during STREAM/ORBIT/MATCH
  // Bezier spawn path (used for STREAM and IDLE refresh-respawn).
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  // STREAM timing.
  streamStartMs: number; // delay from phase start before chip begins streaming
  // IDLE refresh state.
  fadeOut?: { startedAt: number };
  fadeIn?: { startedAt: number; p0: { x: number; y: number }; p1: { x: number; y: number } };
  highlighted: boolean; // true for the 3 chips picked at MATCH
}

interface Tokens {
  accent: string; // rgb-ish string
  accentLight: string;
  textPrimary: string;
  primary: string;
}

// ---------- Helpers ----------

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function getCSSVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function resolveTokens(): Tokens {
  return {
    accent: getCSSVar('--accent', FALLBACK_ACCENT),
    accentLight: getCSSVar('--accent-light', FALLBACK_ACCENT_LIGHT),
    textPrimary: getCSSVar('--text-primary', FALLBACK_TEXT_PRIMARY),
    primary: getCSSVar('--primary', FALLBACK_PRIMARY),
  };
}

/**
 * Pick a random edge entry point for a streaming chip.
 */
function makeEdgePoint(width: number, height: number): { x: number; y: number } {
  const edge = Math.floor(Math.random() * 4);
  switch (edge) {
    case 0:
      return { x: Math.random() * width, y: -12 };
    case 1:
      return { x: width + 12, y: Math.random() * height };
    case 2:
      return { x: Math.random() * width, y: height + 12 };
    default:
      return { x: -12, y: Math.random() * height };
  }
}

/**
 * Quadratic bezier point at t (0..1), from p0 through p1 control to p2 target.
 */
function bezierAt(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
): { x: number; y: number } {
  const inv = 1 - t;
  return {
    x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
    y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
  };
}

/**
 * Compute the orbit ring radii for the current canvas size. Inner < middle < outer.
 */
function computeRingRadii(width: number, height: number): [number, number, number] {
  const fit = Math.min(width, height);
  const outer = fit * 0.4;
  const middle = fit * 0.28;
  const inner = fit * 0.16;
  return [outer, middle, inner];
}

/**
 * Compute the orbit-ring angle for a chip at time `now`, accounting for the
 * ring's clockwise rotation period. `slotAngle` is the chip's baseline angle
 * within the ring at t=0; we add 2π * (now / period) to rotate clockwise.
 */
function chipOrbitAngle(slotAngle: number, ringIndex: number, now: number): number {
  const period = RING_PERIODS_MS[ringIndex];
  return slotAngle + (now / period) * Math.PI * 2;
}

function chipOrbitPosition(
  chip: Chip,
  cx: number,
  cy: number,
  ringRadii: readonly [number, number, number],
  now: number,
): { x: number; y: number } {
  const r = ringRadii[chip.ringIndex];
  const a = chipOrbitAngle(chip.slotAngle, chip.ringIndex, now);
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
}

/**
 * Compute match-card dimensions for the current canvas width.
 */
function computeCardDims(width: number): { w: number; h: number; font: number } {
  if (width < MOBILE_BREAKPOINT_PX) {
    return { w: 85, h: 30, font: 10 };
  }
  return { w: 110, h: 36, font: 11 };
}

/**
 * Draw the match card centered at (cx, cy) with the given scale, glow, and text.
 */
function drawMatchCard(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  scale: number,
  glowBlur: number,
  text: string,
  tokens: Tokens,
): void {
  const dims = computeCardDims(width);
  const w = dims.w * scale;
  const h = dims.h * scale;
  const radius = Math.min(w, h) * 0.25;

  ctx.save();

  // Glow (drawn as a shadow on the stroke pass).
  if (glowBlur > 0) {
    ctx.shadowColor = `rgba(224, 198, 144, ${GLOW_ALPHA})`;
    ctx.shadowBlur = glowBlur;
  }

  // Fill (semi-translucent dark navy).
  ctx.fillStyle = 'rgba(6, 16, 33, 0.78)';
  ctx.beginPath();
  roundedRectPath(ctx, cx - w / 2, cy - h / 2, w, h, radius);
  ctx.fill();

  // Border.
  ctx.strokeStyle = tokens.accentLight;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  roundedRectPath(ctx, cx - w / 2, cy - h / 2, w, h, radius);
  ctx.stroke();

  ctx.restore();

  // Text (no glow on text — separate save/restore so shadow doesn't bleed).
  ctx.save();
  ctx.fillStyle = tokens.textPrimary;
  ctx.font = `600 ${dims.font * scale}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Build the chip array with ring assignments and randomized slot angles per ring.
 */
function buildChips(
  width: number,
  height: number,
  ringCounts: readonly [number, number, number],
): Chip[] {
  const chips: Chip[] = [];
  const cx = width * 0.5;
  const cy = height * 0.5;

  for (let ringIndex = 0; ringIndex < 3; ringIndex++) {
    const count = ringCounts[ringIndex];
    // Evenly distribute baseline slot angles around the ring with a small
    // per-chip jitter so the formation doesn't feel too regimented.
    for (let i = 0; i < count; i++) {
      const baseAngle = (i / count) * Math.PI * 2;
      const slotAngle = baseAngle + rand(-0.05, 0.05);
      const p0 = makeEdgePoint(width, height);
      const p1 = {
        x: cx + rand(-width * 0.25, width * 0.25),
        y: cy + rand(-height * 0.25, height * 0.25),
      };
      chips.push({
        ringIndex,
        slotAngle,
        size: rand(4, 7),
        baseOpacity: rand(0.55, 0.85),
        p0,
        p1,
        streamStartMs: rand(0, STREAM_STAGGER_MS),
        highlighted: false,
      });
    }
  }

  return chips;
}

/**
 * Pick the chip in the given ring whose CURRENT (now=0) orbit angle is closest
 * to angle 0. Deterministic given the chip array.
 */
function pickHighlightedForRing(chips: Chip[], ringIndex: number, now: number): number {
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < chips.length; i++) {
    const c = chips[i];
    if (c.ringIndex !== ringIndex) continue;
    const a = chipOrbitAngle(c.slotAngle, ringIndex, now);
    // Wrap to [-π, π] and measure distance to 0.
    let wrapped = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    if (wrapped > Math.PI) wrapped -= Math.PI * 2;
    const d = Math.abs(wrapped);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

// ---------- Component ----------

interface LenderShoppingCanvasProps {
  /** Match card text — locale-aware. Caller passes the resolved string from useTranslation. */
  matchCardText: string;
}

export default function LenderShoppingCanvas({ matchCardText }: LenderShoppingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const matchTextRef = useRef(matchCardText);
  const reducedRedrawRef = useRef<(() => void) | null>(null);

  // Keep latest text accessible inside the RAF loop without re-creating the effect.
  useEffect(() => {
    matchTextRef.current = matchCardText;
    // Reduced-motion path: redraw the static frame immediately so the new
    // locale text is visible without waiting for a resize event.
    if (reducedRedrawRef.current) {
      reducedRedrawRef.current();
    }
  }, [matchCardText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) return;

    let cssWidth = 0;
    let cssHeight = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, Math.floor(rect.width));
      cssHeight = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    const tokens = resolveTokens();

    // Pick chip distribution based on initial width.
    const isMobile = () => cssWidth < MOBILE_BREAKPOINT_PX;
    const ringCountsFor = (mobile: boolean) =>
      mobile ? MOBILE_RING_COUNTS : DESKTOP_RING_COUNTS;

    // ----- Reduced-motion path: draw IDLE end-state once, never animate. -----
    if (prefersReducedMotion()) {
      const renderStatic = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        const cx = cssWidth * 0.5;
        const cy = cssHeight * 0.5;
        const ringRadii = computeRingRadii(cssWidth, cssHeight);
        const counts = ringCountsFor(isMobile());

        // Draw 3 rings of dim chips at 25% opacity, no rotation (now = 0).
        for (let ringIndex = 0; ringIndex < 3; ringIndex++) {
          const count = counts[ringIndex];
          const r = ringRadii[ringIndex];
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = tokens.accent;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;

        // Static match card at scale 1.0, no glow.
        drawMatchCard(ctx, cx, cy, cssWidth, 1.0, 0, matchTextRef.current, tokens);
      };

      reducedRedrawRef.current = renderStatic;
      renderStatic();

      const ro = new ResizeObserver(() => {
        resize();
        renderStatic();
      });
      ro.observe(canvas);

      return () => {
        reducedRedrawRef.current = null;
        ro.disconnect();
      };
    }

    // ----- Animated path -----

    let phase: Phase = 'STREAM';
    let phaseStartedAt = performance.now();
    let chips = buildChips(cssWidth, cssHeight, ringCountsFor(isMobile()));
    let nextRefreshAt =
      performance.now() + rand(IDLE_REFRESH_MIN_MS, IDLE_REFRESH_MAX_MS);

    // Re-seed on resize so orbit ring radii + bezier targets track the new size.
    const ro = new ResizeObserver(() => {
      const wasMobile = isMobile();
      resize();
      const nowMobile = isMobile();
      // If we crossed the mobile breakpoint OR we're still in STREAM (chips
      // haven't reached orbits yet), rebuild the chip set to match the new
      // dimensions. Otherwise let chips keep their slot assignments — the
      // ring radii recompute every frame from cssWidth/cssHeight.
      if (wasMobile !== nowMobile || phase === 'STREAM') {
        chips = buildChips(cssWidth, cssHeight, ringCountsFor(nowMobile));
        if (phase !== 'STREAM') {
          phase = 'STREAM';
          phaseStartedAt = performance.now();
        }
      }
    });
    ro.observe(canvas);

    let rafId = 0;

    const tick = (now: number) => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const cx = cssWidth * 0.5;
      const cy = cssHeight * 0.5;
      const ringRadii = computeRingRadii(cssWidth, cssHeight);

      // ----- Phase 1: STREAM -----
      if (phase === 'STREAM') {
        const elapsed = now - phaseStartedAt;
        let allArrived = true;

        for (const chip of chips) {
          const localElapsed = elapsed - chip.streamStartMs;
          if (localElapsed < 0) {
            allArrived = false;
            continue;
          }
          const t = clamp(localElapsed / STREAM_DURATION_MS, 0, 1);
          if (t < 1) allArrived = false;

          const eased = easeOutCubic(t);
          // Target = chip's slot position on its ring at t=0 (rings haven't
          // started rotating yet from the user's POV).
          const target = chipOrbitPosition(chip, cx, cy, ringRadii, 0);
          const pos = bezierAt(chip.p0, chip.p1, target, eased);

          const alpha = chip.baseOpacity * Math.min(1, eased * 1.4);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = tokens.accent;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (allArrived && elapsed >= STREAM_DURATION_MS + STREAM_STAGGER_MS) {
          phase = 'ORBIT';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 2: ORBIT -----
      else if (phase === 'ORBIT') {
        const elapsed = now - phaseStartedAt;
        const t = clamp(elapsed / ORBIT_DURATION_MS, 0, 1);
        const eased = easeInOutCubic(t);

        // Blend from "static slot at angle 0 spin baseline" to full rotating
        // orbit. Full rotation is at fictional `now` value of `eased * elapsed`
        // — this gradually ramps angular velocity from 0 to nominal.
        const fictionalNow = eased * elapsed;

        for (const chip of chips) {
          const pos = chipOrbitPosition(chip, cx, cy, ringRadii, fictionalNow);
          ctx.globalAlpha = chip.baseOpacity;
          ctx.fillStyle = tokens.accent;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (t >= 1) {
          // Pick highlighted chip per ring at MATCH start (deterministic given
          // the chip array + the current `now` reading).
          const matchStartNow = now;
          for (let ringIndex = 0; ringIndex < 3; ringIndex++) {
            const idx = pickHighlightedForRing(chips, ringIndex, matchStartNow);
            if (idx >= 0) chips[idx].highlighted = true;
          }
          phase = 'MATCH';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 3: MATCH -----
      else if (phase === 'MATCH') {
        const elapsed = now - phaseStartedAt;
        const t = clamp(elapsed / MATCH_DURATION_MS, 0, 1);
        const lineAlpha = clamp(elapsed / 400, 0, 1); // fade in 400ms

        // Draw all chips in their current orbit position. Highlighted chips
        // grow + brighten; the other chips render at base opacity.
        const highlightedPositions: { x: number; y: number }[] = [];

        for (const chip of chips) {
          const pos = chipOrbitPosition(chip, cx, cy, ringRadii, now);
          if (chip.highlighted) {
            highlightedPositions.push(pos);
            const grow = 1 + t * 0.6; // grow from 1.0× to 1.6×
            ctx.globalAlpha = clamp(chip.baseOpacity + t * 0.3, 0, 1);
            ctx.fillStyle = tokens.accentLight;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, chip.size * grow, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = chip.baseOpacity;
            ctx.fillStyle = tokens.accent;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw triangle through the center: each highlighted chip → center →
        // next highlighted chip.
        if (highlightedPositions.length === 3 && lineAlpha > 0) {
          ctx.save();
          ctx.globalAlpha = lineAlpha * 0.7;
          ctx.strokeStyle = tokens.accentLight;
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            const a = highlightedPositions[i];
            const b = highlightedPositions[(i + 1) % 3];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(cx, cy);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
          ctx.restore();
        }

        ctx.globalAlpha = 1;

        if (t >= 1) {
          phase = 'CONVERGE';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 4: CONVERGE -----
      else if (phase === 'CONVERGE') {
        const elapsed = now - phaseStartedAt;
        const t = clamp(elapsed / CONVERGE_DURATION_MS, 0, 1);
        const eased = easeInOutCubic(t);

        // Non-highlighted chips keep orbiting at base opacity, fading to IDLE
        // opacity range as t → 1.
        const idleOpacityTarget = (IDLE_CHIP_OPACITY_MIN + IDLE_CHIP_OPACITY_MAX) / 2;

        for (const chip of chips) {
          const pos = chipOrbitPosition(chip, cx, cy, ringRadii, now);

          if (chip.highlighted) {
            // Logarithmic spiral from chip position → center.
            // Compute polar coords relative to center.
            const dx = pos.x - cx;
            const dy = pos.y - cy;
            const r0 = Math.sqrt(dx * dx + dy * dy);
            const a0 = Math.atan2(dy, dx);
            // Spiral: shrink radius exponentially, add extra rotation.
            const r = r0 * Math.pow(1 - eased, 1.4);
            const a = a0 + eased * Math.PI * 1.2;
            const sx = cx + Math.cos(a) * r;
            const sy = cy + Math.sin(a) * r;

            // Fade chip out as it approaches center.
            const chipAlpha = (1 - eased) * 0.9;
            ctx.globalAlpha = chipAlpha;
            ctx.fillStyle = tokens.accentLight;
            ctx.beginPath();
            ctx.arc(sx, sy, chip.size * (1 + (1 - eased) * 0.6), 0, Math.PI * 2);
            ctx.fill();
          } else {
            const fadedOpacity =
              chip.baseOpacity + (idleOpacityTarget - chip.baseOpacity) * eased;
            ctx.globalAlpha = fadedOpacity;
            ctx.fillStyle = tokens.accent;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;

        // Match card materializes — scale up + opacity fade in.
        const cardScale = eased; // 0 → 1
        if (cardScale > 0.05) {
          ctx.globalAlpha = clamp(eased * 1.4, 0, 1);
          drawMatchCard(
            ctx,
            cx,
            cy,
            cssWidth,
            cardScale,
            GLOW_BLUR_MIN * eased,
            matchTextRef.current,
            tokens,
          );
          ctx.globalAlpha = 1;
        }

        if (t >= 1) {
          // Reset highlight flags so IDLE-refresh respawns can pick fresh chips
          // later if we ever re-enter MATCH (we don't in the current loop, but
          // this keeps state clean).
          for (const chip of chips) chip.highlighted = false;
          phase = 'IDLE';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 5: IDLE -----
      else if (phase === 'IDLE') {
        const elapsed = now - phaseStartedAt;

        // (1) Orbits keep rotating; chips draw at 25-35% opacity, with each
        // chip's individual baseOpacity mapped into that range so we keep some
        // variance.
        for (const chip of chips) {
          // Skip chips currently fading out / in if their state says so.
          let chipAlpha =
            IDLE_CHIP_OPACITY_MIN +
            (chip.baseOpacity - 0.55) * 0.33; // 0.55..0.85 → 0.25..0.35

          // Refresh fade-out: chip has been picked to dim out + respawn.
          if (chip.fadeOut) {
            const fT = clamp((now - chip.fadeOut.startedAt) / IDLE_REFRESH_FADE_MS, 0, 1);
            chipAlpha *= 1 - fT;
            if (fT >= 1) {
              // Convert fade-out → fade-in along a fresh edge → orbit path.
              const target = chipOrbitPosition(chip, cx, cy, ringRadii, now);
              chip.fadeIn = {
                startedAt: now,
                p0: makeEdgePoint(cssWidth, cssHeight),
                p1: {
                  x: cx + rand(-cssWidth * 0.25, cssWidth * 0.25),
                  y: cy + rand(-cssHeight * 0.25, cssHeight * 0.25),
                },
              };
              // Use target to shape p1 trajectory; not strictly needed beyond
              // randomization since we pull the live target each frame in
              // fade-in render below.
              void target;
              chip.fadeOut = undefined;
              chipAlpha = 0;
            }
          }

          // Render fade-in chip on its bezier from edge → current orbit slot.
          if (chip.fadeIn) {
            const fT = clamp((now - chip.fadeIn.startedAt) / STREAM_DURATION_MS, 0, 1);
            const eased = easeOutCubic(fT);
            const target = chipOrbitPosition(chip, cx, cy, ringRadii, now);
            const pos = bezierAt(chip.fadeIn.p0, chip.fadeIn.p1, target, eased);
            const alpha =
              IDLE_CHIP_OPACITY_MIN +
              (chip.baseOpacity - 0.55) * 0.33;
            ctx.globalAlpha = alpha * Math.min(1, eased * 1.4);
            ctx.fillStyle = tokens.accent;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
            ctx.fill();
            if (fT >= 1) chip.fadeIn = undefined;
            continue;
          }

          if (chipAlpha <= 0.01) continue;
          const pos = chipOrbitPosition(chip, cx, cy, ringRadii, now);
          ctx.globalAlpha = chipAlpha;
          ctx.fillStyle = tokens.accent;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, chip.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // (2) Chip refresh — every 8-12s, pick 1-2 chips that aren't currently
        // fading and start a fade-out. They'll respawn via the fade-in branch
        // above.
        if (now >= nextRefreshAt) {
          const refreshCount = Math.random() < 0.5 ? 1 : 2;
          for (let n = 0; n < refreshCount; n++) {
            // Pick a random chip not currently in a fade.
            const candidates: number[] = [];
            for (let i = 0; i < chips.length; i++) {
              if (!chips[i].fadeOut && !chips[i].fadeIn) candidates.push(i);
            }
            if (candidates.length === 0) break;
            const pick = candidates[Math.floor(Math.random() * candidates.length)];
            chips[pick].fadeOut = { startedAt: now };
            // Pre-randomize a fresh slot angle so the respawn doesn't return
            // to literally the same spot.
            chips[pick].slotAngle = Math.random() * Math.PI * 2;
          }
          nextRefreshAt = now + rand(IDLE_REFRESH_MIN_MS, IDLE_REFRESH_MAX_MS);
        }

        // (3) Match card breathes — scale + glow pulse on a 4s sinusoidal
        // cycle. sin range [-1,1] → [0,1] via (sin+1)/2.
        const breatheT = (Math.sin((elapsed / BREATHE_PERIOD_MS) * Math.PI * 2) + 1) / 2;
        const cardScale =
          BREATHE_SCALE_MIN + (BREATHE_SCALE_MAX - BREATHE_SCALE_MIN) * breatheT;
        const glowBlur = GLOW_BLUR_MIN + (GLOW_BLUR_MAX - GLOW_BLUR_MIN) * breatheT;

        drawMatchCard(
          ctx,
          cx,
          cy,
          cssWidth,
          cardScale,
          glowBlur,
          matchTextRef.current,
          tokens,
        );
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
