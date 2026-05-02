import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/Providers';
import { I18nProvider } from '@/contexts/I18nContext';
import { siteConfig } from '@/data/site';
import { type Locale, DEFAULT_LOCALE, LOCALE_COOKIE, SUPPORTED_LOCALES, ogLocale } from '@/lib/i18n';
import {
  financialServiceSchema,
  localBusinessSchema,
  schemaScript,
} from '@/lib/schema';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const generalSans = localFont({
  src: [
    { path: '../../public/fonts/GeneralSans-Variable.woff2', style: 'normal', weight: '200 700' },
    { path: '../../public/fonts/GeneralSans-VariableItalic.woff2', style: 'italic', weight: '200 700' },
  ],
  variable: '--font-body',
  display: 'swap',
});

async function readLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return SUPPORTED_LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readLocale();
  return {
    title: {
      default: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
      template: `%s · ${siteConfig.business.name}`,
    },
    description: siteConfig.hero.subheadline,
    metadataBase: new URL('https://lmpfinancial.com'),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      siteName: siteConfig.business.name,
      title: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
      description: siteConfig.hero.subheadline,
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E1B33',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await readLocale();
  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[var(--primary)] text-[var(--text-primary)] antialiased">
        {/* JSON-LD: FinancialService (root org) + LocalBusiness (Lowell office) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(financialServiceSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaScript(localBusinessSchema())}
        />
        <I18nProvider initialLocale={locale}>
          <Providers>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
