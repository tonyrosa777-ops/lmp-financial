/**
 * Utility helpers + animation constants for LMP Financial.
 * - cn(): minimal className merger (no tailwind-merge dependency)
 * - prefersReducedMotion(): SSR-safe motion-preference check
 * - easings / durations: shared timing tokens for Framer Motion wrappers
 */

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const easings = {
  standard: [0.4, 0, 0.2, 1] as const,
  entrance: [0.25, 0.46, 0.45, 0.94] as const,
  exit: [0.55, 0.085, 0.68, 0.53] as const,
  confident: [0.16, 1, 0.3, 1] as const,
  soft: [0.65, 0.05, 0.36, 1] as const,
};

export const durations = {
  instant: 0.12,
  fast: 0.24,
  base: 0.4,
  slow: 0.65,
  cinema: 1.0,
};
