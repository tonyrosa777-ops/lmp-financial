'use client';

/**
 * KeyringCanvas — Layer 2 of the LMP hero 3-layer stack.
 *
 * A brass key forging animation. Particles stream in along quadratic bezier
 * paths, "load the spring," and a brass key extrudes via spring overshoot.
 * The key cools from white-hot to aged brass, then a roof-outline arc draws
 * progressively above it. In the IDLE phase the key breathes — heat drifts
 * subtly, the home outline pulses softly.
 *
 * Metaphor: shopping multiple wholesale lenders to find the right key for the
 * right home. (Per harsh-critic selection — design-system.md §13.)
 *
 * Rendered at z-1 above HeroParticles, below text layer (z-10).
 *
 * 5-phase lifecycle (per website-build-template.md lines 364–406):
 *   STREAM (~1.6s)  → 64 particles edge → center via bezier
 *   RISE   (~500ms) → key extrudes via springOut(t)
 *   COOL   (~1200ms)→ heat color ramps white-hot → aged brass
 *   ARC    (~600ms) → home roof outline draws progressively
 *   IDLE   (∞)      → breathing oscillation on heat + arc alpha
 *
 * Reduced-motion contract: when `prefersReducedMotion()` is true at mount,
 * render a single static frame — fully-cooled gold key + fully-drawn arc,
 * no RAF loop. ResizeObserver still re-renders the static frame on resize.
 *
 * Color values are hardcoded hex (canvas cannot read CSS custom properties
 * without getComputedStyle). They match design-system.md Section 2 tokens:
 *   #F5EFE2 = cream (--cream)
 *   #E0C690 = light gold (--accent-light)
 *   #C5A572 = warm gold (--accent)
 *   #FFF5E1 = white-hot (heat ramp start)
 */

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

// ---------- Tunables ----------

const STREAM_PARTICLE_COUNT = 64;
const STREAM_TRANSITION_THRESHOLD = 0.94; // all particles >= this t triggers Phase 2

const RISE_DURATION_MS = 500;
const COOL_DURATION_MS = 1200;
const ARC_DURATION_MS = 600;

// IDLE breathing
const BREATHE_FREQ = 0.00088; // sin(elapsed * BREATHE_FREQ) — ~7s period
const BREATHE_HEAT_AMP = 0.08; // ±0.08 around fully-cooled (1.0)
const ARC_BASE_ALPHA = 0.25;
const ARC_BREATHE_AMP = 0.075; // 0.20 ↔ 0.35

// Stream particle palette — cream, light gold, warm gold (warm side of design system).
const STREAM_COLORS = ['#F5EFE2', '#E0C690', '#C5A572'];

// Key geometry (in CSS pixels, applied at scale).
const KEY_BOW_R = 28;
const KEY_HOLE_R = 16;
const KEY_SHAFT_LEN = 80;
const KEY_SHAFT_H = 10;

// Mobile minimums — never let the key collapse below these regardless of canvas width.
const MIN_BOW_R = 20;
const MIN_SHAFT_LEN = 56;

// ---------- Types ----------

type Phase = 'STREAM' | 'RISE' | 'COOL' | 'ARC' | 'IDLE';

interface StreamParticle {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  t: number;
  speed: number;
  color: string;
  size: number;
}

// ---------- Helpers ----------

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

/**
 * Heat ramp: white-hot (#FFF5E1) → light gold (#E0C690) → warm gold (#C5A572).
 * t: 0 → 1.
 */
function heatRGB(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped < 0.5) {
    const u = clamped * 2; // 0 → 1
    const r = lerp(0xff, 0xe0, u);
    const g = lerp(0xf5, 0xc6, u);
    const b = lerp(0xe1, 0x90, u);
    return `rgb(${r}, ${g}, ${b})`;
  }
  const u = (clamped - 0.5) * 2; // 0 → 1
  const r = lerp(0xe0, 0xc5, u);
  const g = lerp(0xc6, 0xa5, u);
  const b = lerp(0x90, 0x72, u);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Spring overshoot easing — physical spring landing on rest.
 * springOut(0) = 0, springOut(1) = 1, with overshoot wobble through the middle.
 */
function springOut(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * 10 * Math.PI * 0.68);
}

/**
 * Spawn a single STREAM particle at a random edge with a bezier path
 * landing at the canvas center.
 */
function makeStreamParticle(width: number, height: number): StreamParticle {
  const cx = width * 0.5;
  const cy = height * 0.5;

  // Random edge entry.
  const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
  let p0x = 0;
  let p0y = 0;
  switch (edge) {
    case 0: // top
      p0x = Math.random() * width;
      p0y = -10;
      break;
    case 1: // right
      p0x = width + 10;
      p0y = Math.random() * height;
      break;
    case 2: // bottom
      p0x = Math.random() * width;
      p0y = height + 10;
      break;
    default: // left
      p0x = -10;
      p0y = Math.random() * height;
      break;
  }

  // Random midpoint within ±25% of canvas center.
  const p1x = cx + rand(-width * 0.25, width * 0.25);
  const p1y = cy + rand(-height * 0.25, height * 0.25);

  return {
    p0: { x: p0x, y: p0y },
    p1: { x: p1x, y: p1y },
    p2: { x: cx, y: cy },
    t: 0,
    speed: rand(0.005, 0.012),
    color: pick(STREAM_COLORS),
    size: rand(1.0, 2.5),
  };
}

/**
 * Quadratic bezier point at t.
 */
function bezier(p: StreamParticle): { x: number; y: number } {
  const t = p.t;
  const inv = 1 - t;
  const x = inv * inv * p.p0.x + 2 * inv * t * p.p1.x + t * t * p.p2.x;
  const y = inv * inv * p.p0.y + 2 * inv * t * p.p1.y + t * t * p.p2.y;
  return { x, y };
}

/**
 * Particle alpha envelope: 0 → 0.85 over first 30%, hold 40%, fade to 0 over last 30%.
 */
function streamAlpha(t: number): number {
  if (t < 0.3) return (t / 0.3) * 0.85;
  if (t < 0.7) return 0.85;
  return Math.max(0, 0.85 * (1 - (t - 0.7) / 0.3));
}

/**
 * Compute key scale factor. Uses canvas dimensions to keep the key on-screen,
 * with a hard minimum so mobile widths don't collapse the key below readable size.
 */
function computeKeyScale(width: number, height: number): number {
  // Default unscaled key spans roughly 56 (bow center to bit) × ~56 tall.
  // Fit within ~70% of the smaller dimension for breathing room.
  const fitDim = Math.min(width, height);
  const targetSpan = fitDim * 0.7;
  const naturalSpan = KEY_BOW_R * 2 + KEY_SHAFT_LEN; // outer bow + shaft
  const scale = targetSpan / naturalSpan;

  // Enforce minimums: never let bow shrink below MIN_BOW_R or shaft below MIN_SHAFT_LEN.
  const minBowScale = MIN_BOW_R / KEY_BOW_R;
  const minShaftScale = MIN_SHAFT_LEN / KEY_SHAFT_LEN;
  const minScale = Math.max(minBowScale, minShaftScale);

  return Math.max(minScale, scale);
}

/**
 * Draw the brass key as a single filled path (bow + shaft + bit notches).
 * Single-path approach prevents bit-notch desync during spring overshoot
 * (harsh-critic risk #2 mitigation).
 *
 * cx, cy: anchor center of key (geometric midpoint horizontally,
 *         vertical midline of shaft).
 * scale:  uniform scale (typically `computeKeyScale * springOut(t)`).
 * color:  fill color (rgb string from heatRGB or hex).
 */
function drawKey(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string,
): void {
  if (scale <= 0) return;

  const bowR = KEY_BOW_R * scale;
  const holeR = KEY_HOLE_R * scale;
  const shaftLen = KEY_SHAFT_LEN * scale;
  const shaftH = KEY_SHAFT_H * scale;

  // Bow center sits to the LEFT of cx, shaft extends RIGHT.
  const bowCx = cx - shaftLen * 0.5;

  // ----- Bow ring (filled, then hole punched via destination-out) -----
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(bowCx, cy, bowR, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(bowCx, cy, holeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ----- Shaft + bit notches as ONE atomic path -----
  // Shaft starts roughly at the bow's right edge (slightly inset for visual continuity).
  const shaftLeft = bowCx + bowR * 0.6;
  const shaftRight = cx + shaftLen * 0.5;
  const shaftTop = cy - shaftH * 0.5;
  const shaftBot = cy + shaftH * 0.5;

  // Notch tooth depths (proportional to scale so they grow with the spring).
  const tooth1Depth = 6 * scale;
  const tooth2Depth = 4 * scale;
  const toothWidth = 6 * scale;
  const gapWidth = 6 * scale;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(shaftLeft, shaftTop);
  ctx.lineTo(shaftRight, shaftTop);
  // Right edge of first tooth (extends below shaft).
  ctx.lineTo(shaftRight, shaftBot + tooth1Depth);
  ctx.lineTo(shaftRight - toothWidth, shaftBot + tooth1Depth);
  // Up to shaft bottom (gap between teeth).
  ctx.lineTo(shaftRight - toothWidth, shaftBot);
  ctx.lineTo(shaftRight - toothWidth - gapWidth, shaftBot);
  // Down into second tooth.
  ctx.lineTo(shaftRight - toothWidth - gapWidth, shaftBot + tooth2Depth);
  ctx.lineTo(shaftRight - toothWidth - gapWidth - toothWidth, shaftBot + tooth2Depth);
  // Up to shaft bottom.
  ctx.lineTo(shaftRight - toothWidth - gapWidth - toothWidth, shaftBot);
  // Across to shaft left.
  ctx.lineTo(shaftLeft, shaftBot);
  ctx.closePath();
  ctx.fill();
}

/**
 * Draw the home-outline arc (roof + eave) above the key, progressively from
 * 0 → 1 across three line segments.
 *
 * progress: 0 → 1.
 *   0    → 0.34 = roof-left growing
 *   0.34 → 0.67 = roof-right growing
 *   0.67 → 1.0  = eave growing
 */
function drawHomeArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  progress: number,
  alpha: number,
): void {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0 || alpha <= 0) return;

  const halfBase = 60 * scale;
  const peakY = cy - 130 * scale;
  const eaveY = cy - 80 * scale;

  const roofLeftStart = { x: cx - halfBase, y: eaveY };
  const peak = { x: cx, y: peakY };
  const roofRightEnd = { x: cx + halfBase, y: eaveY };

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = '#E0C690'; // --accent-light
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Segment 1: roof-left diagonal (0 → 0.34)
  if (p > 0) {
    const seg1 = Math.min(1, p / 0.34);
    const ex = roofLeftStart.x + (peak.x - roofLeftStart.x) * seg1;
    const ey = roofLeftStart.y + (peak.y - roofLeftStart.y) * seg1;
    ctx.beginPath();
    ctx.moveTo(roofLeftStart.x, roofLeftStart.y);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  // Segment 2: roof-right diagonal (0.34 → 0.67)
  if (p > 0.34) {
    const seg2 = Math.min(1, (p - 0.34) / 0.33);
    const ex = peak.x + (roofRightEnd.x - peak.x) * seg2;
    const ey = peak.y + (roofRightEnd.y - peak.y) * seg2;
    ctx.beginPath();
    ctx.moveTo(peak.x, peak.y);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }

  // Segment 3: eave (0.67 → 1.0)
  if (p > 0.67) {
    const seg3 = Math.min(1, (p - 0.67) / 0.33);
    const ex = roofLeftStart.x + (roofRightEnd.x - roofLeftStart.x) * seg3;
    ctx.beginPath();
    ctx.moveTo(roofLeftStart.x, roofLeftStart.y);
    ctx.lineTo(ex, roofLeftStart.y);
    ctx.stroke();
  }

  ctx.restore();
}

// ---------- Component ----------

export default function KeyringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // ----- Reduced-motion path: single static frame, no RAF loop. -----
    if (prefersReducedMotion()) {
      const renderStatic = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        const cx = cssWidth * 0.5;
        const cy = cssHeight * 0.5;
        const scale = computeKeyScale(cssWidth, cssHeight);
        // Fully-cooled key.
        drawKey(ctx, cx, cy, scale, heatRGB(1));
        // Fully-drawn home arc at base alpha.
        drawHomeArc(ctx, cx, cy, scale, 1, ARC_BASE_ALPHA);
      };

      renderStatic();

      const ro = new ResizeObserver(() => {
        resize();
        renderStatic();
      });
      ro.observe(canvas);

      return () => {
        ro.disconnect();
      };
    }

    // ----- Animated path -----

    let phase: Phase = 'STREAM';
    let phaseStartedAt = performance.now();

    // Initialize STREAM particles.
    let particles: StreamParticle[] = Array.from(
      { length: STREAM_PARTICLE_COUNT },
      () => makeStreamParticle(cssWidth, cssHeight),
    );

    // Re-seed particles on resize so bezier targets track the new center.
    const ro = new ResizeObserver(() => {
      resize();
      if (phase === 'STREAM') {
        particles = Array.from({ length: STREAM_PARTICLE_COUNT }, () =>
          makeStreamParticle(cssWidth, cssHeight),
        );
      }
    });
    ro.observe(canvas);

    let rafId = 0;
    let lastT = performance.now();

    const tick = (now: number) => {
      const dtMs = Math.min(48, now - lastT); // clamp big tab-switch deltas
      const dt = dtMs / 16.6667; // normalize to ~60fps frame units
      lastT = now;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const cx = cssWidth * 0.5;
      const cy = cssHeight * 0.5;
      const baseScale = computeKeyScale(cssWidth, cssHeight);

      // ----- Phase 1: STREAM -----
      if (phase === 'STREAM') {
        let allFinished = true;
        for (const p of particles) {
          p.t += p.speed * dt;
          if (p.t < STREAM_TRANSITION_THRESHOLD) allFinished = false;
          if (p.t >= 1) continue; // absorbed; skip render

          const pos = bezier(p);
          const a = streamAlpha(p.t);
          if (a <= 0) continue;

          ctx.globalAlpha = a;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (allFinished) {
          phase = 'RISE';
          phaseStartedAt = now;
          particles = []; // free memory; no longer needed
        }
      }

      // ----- Phase 2: RISE -----
      else if (phase === 'RISE') {
        const t = Math.min(1, (now - phaseStartedAt) / RISE_DURATION_MS);
        const s = springOut(t);
        // y-offset starts slightly below rest, springs to 0.
        const yOffset = (1 - s) * 12;
        drawKey(ctx, cx, cy + yOffset, baseScale * s, heatRGB(0));

        if (t >= 1) {
          phase = 'COOL';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 3: COOL -----
      else if (phase === 'COOL') {
        const t = Math.min(1, (now - phaseStartedAt) / COOL_DURATION_MS);
        drawKey(ctx, cx, cy, baseScale, heatRGB(t));

        if (t >= 1) {
          phase = 'ARC';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 4: ARC -----
      else if (phase === 'ARC') {
        const t = Math.min(1, (now - phaseStartedAt) / ARC_DURATION_MS);
        // Key already cooled; render at full heat (1.0).
        drawKey(ctx, cx, cy, baseScale, heatRGB(1));
        drawHomeArc(ctx, cx, cy, baseScale, t, ARC_BASE_ALPHA);

        if (t >= 1) {
          phase = 'IDLE';
          phaseStartedAt = now;
        }
      }

      // ----- Phase 5: IDLE -----
      else if (phase === 'IDLE') {
        const elapsed = now - phaseStartedAt;
        const breathe = Math.sin(elapsed * BREATHE_FREQ);
        const heatT = 1.0 - Math.abs(breathe) * BREATHE_HEAT_AMP; // drift between 1.0 and (1.0 - amp)
        const arcAlpha = ARC_BASE_ALPHA + breathe * ARC_BREATHE_AMP;

        drawKey(ctx, cx, cy, baseScale, heatRGB(heatT));
        drawHomeArc(ctx, cx, cy, baseScale, 1, arcAlpha);
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
