import type { Metadata } from 'next';
import SignInClient from './SignInClient';

export const metadata: Metadata = {
  title: 'Sign In to Your Borrower Portal',
  description:
    'Sign in to your LMP Financial Borrower Portal to see upcoming consultations, your saved quiz result, and your application progress.',
  robots: { index: false, follow: false },
};

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string; demo?: string }>;
}) {
  return <SignInClient searchParamsPromise={searchParams} />;
}
