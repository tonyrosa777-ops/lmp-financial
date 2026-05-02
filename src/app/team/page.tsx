// src/app/team/page.tsx
//
// /team — Team index. Server wrapper — owns the `metadata` export and
// renders TeamIndexClient. All translatable copy lives in the client
// component (uses useTranslation('team')).
//
// Phase 1F — Team Page Agent. Wave 2B — i18n migration.

import type { Metadata } from 'next';
import TeamIndexClient from './TeamIndexClient';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description:
    '22 loan officers across 9 states. Each licensed individually with NMLS, each with their own specialty. Bilingual capacity in English, Portuguese, and Spanish.',
};

export default function TeamPage() {
  return <TeamIndexClient />;
}
