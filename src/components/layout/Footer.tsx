import Link from 'next/link';
import { siteConfig } from '@/data/site';

export default function Footer() {
  const { business, compliance, footer } = siteConfig;
  const { address } = business;

  return (
    <footer
      className="pt-16 lg:pt-24 pb-8"
      style={{ background: 'var(--primary-deep)', color: 'var(--text-secondary)' }}
    >
      <div className="container-base px-6">
        {/* ============================================================
            BAND 1 — Brand cluster + 3 link columns
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — brand identity */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="font-display text-h3"
              style={{ color: 'var(--text-primary)' }}
            >
              {business.name}
            </Link>

            <p
              className="text-body-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {business.tagline}
            </p>

            <address className="not-italic font-mono text-micro mt-2" style={{ color: 'var(--text-muted)' }}>
              {address.street}
              <br />
              {`Ste ${address.suite}`}
              <br />
              {`${address.city}, ${address.state} ${address.zip}`}
            </address>

            {business.phone ? (
              <a
                href={`tel:${business.phone.replace(/[^0-9+]/g, '')}`}
                className="font-mono text-body-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {business.phone}
              </a>
            ) : null}

            {business.emailMain ? (
              <a
                href={`mailto:${business.emailMain}`}
                className="font-mono text-body-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {business.emailMain}
              </a>
            ) : null}
          </div>

          {/* Columns 2-4 — link clusters from siteConfig.footer.columns */}
          {footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h2
                className="text-eyebrow"
                style={{ color: 'var(--accent)' }}
              >
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-body-sm transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ============================================================
            BAND 2 — Compliance band (border above + below)
            Equal Housing Lender · Broker disclosure · NMLS Consumer Access
            ============================================================ */}
        <div
          className="mt-12 py-8 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8"
          style={{
            borderTop: '1px solid var(--border-dark)',
            borderBottom: '1px solid var(--border-dark)',
          }}
        >
          {/* Left — Equal Housing Lender mark (regulatory placeholder) */}
          <img
            src="/equal-housing-lender.svg"
            alt="Equal Housing Lender"
            width={64}
            height={64}
            style={{ width: 64, height: 64 }}
          />

          {/* Center — broker disclosure (verbatim, all caps, never modified) */}
          <p
            className="text-eyebrow text-center max-w-md"
            style={{ color: 'var(--text-secondary)' }}
          >
            {compliance.brokerDisclosure}
          </p>

          {/* Right — NMLS Consumer Access link */}
          <a
            href="https://www.nmlsconsumeraccess.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm transition-colors hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            NMLS Consumer Access
          </a>
        </div>

        {/* ============================================================
            BAND 3 — Legal links + copyright + licensed states
            ============================================================ */}
        <div
          className="mt-8 pt-8 flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-dark)' }}
        >
          <p
            className="font-mono text-micro"
            style={{ color: 'var(--text-muted)' }}
          >
            {footer.copyright}
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-sm transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Licensed states strip */}
        <p
          className="mt-4 font-mono text-micro"
          style={{ color: 'var(--text-muted)' }}
        >
          {business.licensedStatesLong.join(' · ')}
        </p>

        {/* ============================================================
            BAND 4 — Final NMLS strip (centered, bottom)
            ============================================================ */}
        <p
          className="mt-8 text-center font-mono text-micro"
          style={{ color: 'var(--text-muted)' }}
        >
          {`${business.name} · NMLS #${business.nmls} · ${address.street}, Ste ${address.suite}, ${address.city}, ${address.state} ${address.zip}`}
        </p>
      </div>
    </footer>
  );
}
