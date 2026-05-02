import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { siteConfig } from '@/data/site';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'Your Borrower Portal',
  description:
    'Your LMP Financial Borrower Portal: upcoming consultations, your saved quiz match, and your application progress.',
  robots: { index: false, follow: false },
};

/**
 * /account — Borrower Portal home.
 *
 * Phase 1J + bilingual migration. Server Component reads the session from
 * Auth.js. If somehow unauthed (middleware should have caught it), redirect
 * to sign-in. Otherwise hands off to AccountClient (Client Component) which
 * owns the translation chrome via useTranslation('account').
 *
 * The four-section structure (welcome / bookings / saved quiz / continue app)
 * lives in AccountClient. The server-side sign-out action is passed in as a
 * prop so it stays a real Server Action under the hood.
 *
 * No database. Quiz and bookings come from client (localStorage) + Calendly API
 * respectively. Application status is the deep-link only — until ARIVE/my1003app
 * confirms a status feed (Mike-question, Phase 3).
 *
 * [COMPLIANCE-REVIEW-PENDING] — auth flow + email templates pending review by
 * Mike's compliance IT firm.
 */
export default async function AccountPage() {
  const session = await auth();

  // Defense in depth: middleware should have redirected, but if a session was
  // somehow stripped between middleware and render, send them to sign-in.
  if (!session?.user?.email) {
    redirect('/account/sign-in');
  }

  const userEmail = session.user.email;

  async function handleSignOut() {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <AccountClient
      userEmail={userEmail}
      businessName={siteConfig.business.name}
      signOutAction={handleSignOut}
    />
  );
}
