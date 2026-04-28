/**
 * Auth.js v5 middleware — guards /account/* routes.
 *
 * The route gate logic lives in src/auth.ts → callbacks.authorized(). This file
 * is the entry point that Next.js middleware invokes; it re-exports `auth` as
 * the middleware function and configures the URL matcher.
 *
 * Matcher: only run on /account/* paths. Public pages skip middleware entirely
 * so we don't pay session-decode cost on every marketing page request. /api/auth
 * is excluded automatically by the matcher.
 */

export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/account/:path*'],
};
