import type { Metadata, Viewport } from 'next';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/Providers';
import { siteConfig } from '@/data/site';
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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
    template: `%s · ${siteConfig.business.name}`,
  },
  description: siteConfig.hero.subheadline,
  metadataBase: new URL('https://lmpfinancial.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.business.name,
    title: `${siteConfig.business.name} — ${siteConfig.business.tagline}`,
    description: siteConfig.hero.subheadline,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E1B33',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
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
        <Providers>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
