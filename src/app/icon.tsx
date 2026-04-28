// src/app/icon.tsx
//
// Phase 1G (Brand Assets Agent). Next.js App Router file convention: this file
// at the app root produces the dynamic favicon at /icon. Next.js automatically
// references it in HTML <link> tags. The existing /public/favicon.ico from
// create-next-app remains as a fallback if this dynamic icon ever fails.
// Brand tokens come from design-system.md Section 2 (navy bg + gold "LMP").

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0E1B33', // navy
          color: '#C5A572', // gold
          fontFamily: 'Georgia, serif',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        LMP
      </div>
    ),
    { ...size }
  );
}
