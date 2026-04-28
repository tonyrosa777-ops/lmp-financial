import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { STATE_PROGRAMS } from '@/data/state-programs';

const BASE_URL = 'https://lmpfinancial.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/',                            priority: 1.0, changeFrequency: 'weekly'  },
    { path: '/services',                    priority: 0.9, changeFrequency: 'monthly' },
    { path: '/team',                        priority: 0.9, changeFrequency: 'monthly' },
    { path: '/partners',                    priority: 0.8, changeFrequency: 'monthly' },
    { path: '/careers',                     priority: 0.8, changeFrequency: 'monthly' },
    { path: '/booking',                     priority: 0.9, changeFrequency: 'monthly' },
    { path: '/quiz',                        priority: 0.8, changeFrequency: 'monthly' },
    { path: '/testimonials',                priority: 0.7, changeFrequency: 'monthly' },
    { path: '/service-areas',               priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact',                     priority: 0.7, changeFrequency: 'yearly'  },
    { path: '/faq',                         priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculators',                 priority: 0.7, changeFrequency: 'monthly' },
    { path: '/calculators/affordability',   priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculators/monthly-payment', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculators/refinance',       priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculators/down-payment',    priority: 0.6, changeFrequency: 'monthly' },
    { path: '/calculators/dti',             priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog',                        priority: 0.6, changeFrequency: 'weekly'  },
    { path: '/privacy-policy',              priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/terms-of-use',                priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/ada-accessibility-statement', priority: 0.3, changeFrequency: 'yearly'  },
  ];

  // /pricing is intentionally excluded — internal sales tool, deleted before launch (per CLAUDE.md Always-Built Features Rule).
  // /account and /account/sign-in are intentionally excluded — authed Borrower Portal (Phase 1J).
  // Both pages also carry `robots: { index: false, follow: false }` metadata as belt-and-suspenders.

  const programRoutes = siteConfig.loanPrograms.map(p => ({
    path: `/services/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const teamRoutes = siteConfig.loanOfficers.map(lo => ({
    path: `/team/${lo.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const stateRoutes = Object.values(STATE_PROGRAMS).map(s => ({
    path: `/mortgage-broker/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...programRoutes, ...teamRoutes, ...stateRoutes].map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
