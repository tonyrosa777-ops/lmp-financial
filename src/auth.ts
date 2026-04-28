/**
 * src/auth.ts — Auth.js v5 (next-auth@beta) configuration for the LMP
 * Financial Borrower Portal.
 *
 * Phase 1J. Demo-mode email sign-in: the user types their email at
 * /account/sign-in, we immediately issue a JWT session keyed to that email,
 * no password / no magic link / no database. This deliberately sidesteps
 * Auth.js's adapter requirement (which Email/Resend providers need to
 * persist verification tokens in a database) so the portal ships ready for
 * Tuesday demo with zero database setup.
 *
 * Phase 2A migration path: swap the Credentials provider below for a Resend
 * provider + Drizzle adapter (or @auth/unstorage-adapter). The portal pages,
 * middleware, and useSession() consumers do not change — they only see the
 * `session.user.email` field, which both providers populate identically.
 *
 * Environment:
 *   - AUTH_SECRET   — required. Signs/encrypts the session JWT cookie.
 *   - AUTH_TRUST_HOST — set automatically below for Vercel / non-localhost.
 *
 * [COMPLIANCE-REVIEW-PENDING] — sign-in copy + the eventual Resend email
 * template should be reviewed by Mike's compliance IT firm before launch.
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // Single field: email. No password. The "credential" is just identity.
      // Production (Phase 2A) replaces this with Resend + a real adapter so
      // sign-in requires a one-click email link.
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        if (typeof email !== 'string' || !email.includes('@')) return null;
        // Strip whitespace, lowercase for stable identity.
        const normalized = email.trim().toLowerCase();
        return {
          id: normalized,
          email: normalized,
          name: normalized.split('@')[0],
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/account/sign-in',
  },
  // Trust the host header on Vercel preview/prod. Locally Auth.js infers
  // from the request — this is a noop in dev.
  trustHost: true,
  callbacks: {
    /**
     * Middleware-level route gate. Returning false redirects the user to the
     * configured `pages.signIn` (with a callbackUrl). Returning true lets the
     * request through. Public marketing pages always pass; /account/* requires
     * a session except for /account/sign-in (the sign-in page itself).
     */
    authorized({ auth: session, request: { nextUrl } }) {
      const path = nextUrl.pathname;
      const isAccount = path.startsWith('/account');
      const isSignIn = path === '/account/sign-in';

      if (isAccount && !isSignIn) {
        return Boolean(session);
      }
      // Everything else is public.
      return true;
    },
  },
});
