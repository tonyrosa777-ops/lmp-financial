/**
 * /booking — Brand-level scheduling page.
 *
 * Hosts the custom-branded BookingCalendar component as the page's primary
 * conversion surface. Per CLAUDE.md Conversion Flow Rule, the calendar is
 * inline (no Calendly redirect, no iframe). Per Always-Built Features Rule,
 * BookingCalendar lives here, on each /team/[lo-slug] page (per-LO Calendly),
 * AND as a homepage teaser section.
 *
 * Server wrapper — owns metadata. Translatable chrome (header + FAQ) lives
 * in BookingPageClient (uses useTranslation('booking')). Calendar UI labels
 * stay English in Phase E; a later phase migrates the calendar component.
 *
 * Page structure: dark hero → light calendar section → dark FAQ → footer.
 * Alternation honors the Homepage Section Architecture Rule.
 */

import type { Metadata } from 'next';
import BookingPageClient from './BookingPageClient';

export const metadata: Metadata = {
  title: 'Schedule a Call',
  description:
    "Pick a time. Our team will call you to walk through your situation, talk through programs, and answer questions. Free, no commitment.",
};

export default function BookingPage() {
  return <BookingPageClient />;
}
