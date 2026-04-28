/**
 * Auth.js v5 catch-all route handler. The actual config lives in src/auth.ts.
 * This file is the App Router entry point for /api/auth/* — sign-in, sign-out,
 * session, providers, csrf. Keep this file thin.
 *
 * Auth.js v5 returns `handlers` as an object with GET and POST methods (not
 * top-level GET/POST exports), so we destructure here.
 */

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
