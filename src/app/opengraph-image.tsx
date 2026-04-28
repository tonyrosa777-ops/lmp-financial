// src/app/opengraph-image.tsx
//
// Phase 1G (Brand Assets Agent). Next.js App Router file convention: this file
// at the app root produces the site-wide Open Graph image at /opengraph-image.
// Renders via Vercel's edge runtime + Satori-backed ImageResponse — no static
// PNG asset required, no design tool round-trips. Brand tokens come straight
// from design-system.md Section 2 (deep navy / warm gold / cream).

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'LMP Financial — Independent mortgage broker. 9 states. 22 loan officers.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5EFE2', // cream
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(197, 165, 114, 0.18), transparent)',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#C5A572',
            marginBottom: 24,
          }}
        >
          NMLS #2754084
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 144,
            fontWeight: 700,
            color: '#0E1B33',
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          LMP Financial
        </div>

        {/* Gold underline */}
        <div
          style={{
            width: 240,
            height: 4,
            backgroundColor: '#C5A572',
            marginTop: 32,
            marginBottom: 32,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(14, 27, 51, 0.72)',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Settle into your home, not a rate you'll regret.
        </div>

        {/* Footer strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontFamily: 'ui-monospace, monospace',
            fontSize: 18,
            color: 'rgba(14, 27, 51, 0.42)',
            letterSpacing: 2,
          }}
        >
          9 STATES · 22 LOAN OFFICERS · LOWELL, MA
        </div>
      </div>
    ),
    { ...size }
  );
}
