'use client';

/**
 * HeroParticles — Layer 1 of the LMP hero 3-layer stack.
 *
 * Ambient cream + gold particle system reflecting LMP's brand axes (WARM 75/100,
 * QUIET-CONFIDENT 60/100, REFINED 85/100). Three particle types: stars (twinkling
 * drift), embers (slow upward rise + fade), and glimmers (occasional 4-point flash).
 *
 * Rendered behind the hero at z-0 with pointer-events: none.
 *
 * Color values are hardcoded hex (canvas cannot read CSS custom properties without
 * getComputedStyle). They match design-system.md Section 2 tokens:
 *   #F5EFE2 = cream (--cream)
 *   #E0C690 = light gold (--accent-light)
 *   #C5A572 = warm gold (--accent)
 *   #A8895F = aged brass (--accent-muted)
 *
 * Reduced-motion contract: when `prefersReducedMotion()` is true at mount, render
 * a single static draw of stars only (no embers, no glimmers, no RAF loop).
 */

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

// ---------- Tunables ----------

const STAR_COUNT = 120;
const EMBER_COUNT = 50;

const MAX_GLIMMERS = 2;
const GLIMMER_MIN_INTERVAL_MS = 3000;
const GLIMMER_MAX_INTERVAL_MS = 5000;
const GLIMMER_DURATION_MS = 300;
const GLIMMER_PEAK_LENGTH = 12;

// Brand colors — match design-system.md Section 2 tokens.
const STAR_COLORS = ['#F5EFE2', '#EFE4CE', '#E8D9B8', '#E0C690'];
const EMBER_COLORS = ['#C5A572', '#B79865', '#A8895F'];
const GLIMMER_COLOR = '#E0C690';

// ---------- Types ----------

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
  targetOpacity: number;
  opacity: number;
  life: number;
}

interface Glimmer {
  x: number;
  y: number;
  startedAt: number;
}

// ---------- Helpers ----------

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeStar(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: rand(-0.05, 0.05),
    vy: rand(-0.05, 0.05),
    size: rand(0.8, 2.4),
    color: pick(STAR_COLORS),
    phase: Math.random() * Math.PI * 2,
    targetOpacity: rand(0.3, 0.85),
    opacity: 0,
    life: 0,
  };
}

function makeEmber(width: number, height: number, fromBottom = false): Particle {
  const startY = fromBottom
    ? height + rand(0, 30)
    : height * rand(0.4, 1.0);
  return {
    x: Math.random() * width,
    y: startY,
    vx: rand(-0.15, 0.15),
    vy: rand(-0.4, -0.15),
    size: rand(1.2, 2.8),
    color: pick(EMBER_COLORS),
    phase: Math.random() * Math.PI * 2,
    targetOpacity: rand(0.4, 0.6),
    opacity: 0,
    life: 0,
  };
}

// ---------- Component ----------

export default function HeroParticles() {
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

    // Initialize particles AFTER first sizing.
    const stars: Particle[] = Array.from({ length: STAR_COUNT }, () =>
      makeStar(cssWidth, cssHeight)
    );

    // Reduced-motion path — single static draw of stars only, no RAF loop.
    if (prefersReducedMotion()) {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      for (const s of stars) {
        ctx.globalAlpha = s.targetOpacity;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Re-render the static frame on resize so it doesn't stretch/blur.
      const ro = new ResizeObserver(() => {
        resize();
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        for (const s of stars) {
          ctx.globalAlpha = s.targetOpacity;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
      ro.observe(canvas);

      return () => {
        ro.disconnect();
      };
    }

    const embers: Particle[] = Array.from({ length: EMBER_COUNT }, () => {
      const e = makeEmber(cssWidth, cssHeight, false);
      // Stagger initial life so they don't all fade together.
      e.life = Math.random();
      e.opacity = e.targetOpacity * Math.min(1, e.life / 0.2);
      return e;
    });

    const glimmers: Glimmer[] = [];
    let nextGlimmerAt =
      performance.now() + rand(GLIMMER_MIN_INTERVAL_MS, GLIMMER_MAX_INTERVAL_MS);

    let rafId = 0;
    let lastT = performance.now();

    const tick = (now: number) => {
      const dtMs = Math.min(48, now - lastT); // clamp big tab-switch deltas
      const dt = dtMs / 16.6667; // normalize to ~60fps frame units
      lastT = now;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // ----- Stars -----
      for (const s of stars) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.phase += 0.008 * dt;

        // Wrap edges so the field stays full.
        if (s.x < -2) s.x = cssWidth + 2;
        else if (s.x > cssWidth + 2) s.x = -2;
        if (s.y < -2) s.y = cssHeight + 2;
        else if (s.y > cssHeight + 2) s.y = -2;

        // Twinkle: sin curve mapped from [-1,1] → [0.3, 0.85].
        const twinkle = 0.575 + Math.sin(s.phase) * 0.275;
        const alpha = Math.min(s.targetOpacity, twinkle);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ----- Embers -----
      const lifeStep = (dtMs / 1000) * 0.08; // ~12.5s nominal lifespan
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += lifeStep;
        e.phase += 0.02 * dt;

        // Horizontal sway modulated by sin.
        const swayVx = e.vx + Math.sin(e.phase) * 0.05;
        e.x += swayVx * dt;
        e.y += e.vy * dt;

        // Opacity envelope: 0 → 0.6 (first 20%) → hold → fade in last 25%.
        let envelope: number;
        if (e.life < 0.2) {
          envelope = e.life / 0.2;
        } else if (e.life > 0.75) {
          envelope = Math.max(0, 1 - (e.life - 0.75) / 0.25);
        } else {
          envelope = 1;
        }
        e.opacity = e.targetOpacity * envelope;

        // Respawn when it floats off the top, drifts off horizontally, or dies.
        if (e.y < -10 || e.life >= 1 || e.x < -20 || e.x > cssWidth + 20) {
          embers[i] = makeEmber(cssWidth, cssHeight, true);
          continue;
        }

        ctx.globalAlpha = e.opacity;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ----- Glimmers -----
      // Spawn next glimmer if interval elapsed and slot available.
      if (now >= nextGlimmerAt && glimmers.length < MAX_GLIMMERS) {
        glimmers.push({
          x: rand(cssWidth * 0.05, cssWidth * 0.95),
          y: rand(cssHeight * 0.05, cssHeight * 0.95),
          startedAt: now,
        });
        nextGlimmerAt =
          now + rand(GLIMMER_MIN_INTERVAL_MS, GLIMMER_MAX_INTERVAL_MS);
      }

      ctx.strokeStyle = GLIMMER_COLOR;
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      for (let i = glimmers.length - 1; i >= 0; i--) {
        const g = glimmers[i];
        const t = (now - g.startedAt) / GLIMMER_DURATION_MS; // 0 → 1
        if (t >= 1) {
          glimmers.splice(i, 1);
          continue;
        }
        // Symmetric grow/shrink via sin(πt) — peak at t=0.5.
        const k = Math.sin(Math.PI * t);
        const L = GLIMMER_PEAK_LENGTH * k;
        const a = 0.85 * k;

        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.moveTo(g.x - L, g.y);
        ctx.lineTo(g.x + L, g.y);
        ctx.moveTo(g.x, g.y - L);
        ctx.lineTo(g.x, g.y + L);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

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
