'use client';

/**
 * Client-side providers wrapper. Currently mounts NextAuth's SessionProvider
 * so any Client Component (Navigation, MobileNav, future Save-to-account
 * buttons) can call useSession() without prop-drilling the session through.
 *
 * The SessionProvider's first call hits /api/auth/session — server-rendered
 * pages still get their session via the server-side `auth()` helper from
 * src/auth.ts; this provider is purely for client-side reactive consumers.
 */

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
