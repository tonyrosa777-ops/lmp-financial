// src/app/robots.ts
//
// Phase 1F (Schema Markup + robots.ts Agent). Next.js App Router robots
// metadata file. Generates /robots.txt at build time.
//
// Per CLAUDE.md Always-Built Features Rule, /pricing is an internal Optimus
// sales tool deleted before client launch — but during demo/build, it's
// disallowed from indexing so search engines never cache it. /api/* is
// server routes (no index value). /studio/* is the future Sanity Studio
// (Phase 1G), pre-emptively disallowed.

import type { MetadataRoute } from 'next';

const BASE_URL = 'https://lmpfinancial.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/pricing', // Internal Optimus sales tool — never indexed
          '/api/', // Server routes
          '/studio/', // Future Sanity studio (Phase 1G)
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
