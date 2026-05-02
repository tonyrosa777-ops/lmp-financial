// /contact — Direct Contact Page
//
// Phase 1E (Static Pages Bundle Agent). Server wrapper — owns metadata.
// Translatable chrome lives in ContactPageClient (uses useTranslation('contact')).
// SMS opt-in disclaimer + broker disclosure remain VERBATIM ENGLISH in BOTH
// locales per CLAUDE.md Compliance Rule.

import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact LMP Financial',
  description:
    'Talk to a Lowell-based mortgage broker who answers texts the same day. Twenty-two loan officers across nine states. One application, one team, one closing.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
