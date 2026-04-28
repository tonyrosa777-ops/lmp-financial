import type { Metadata } from 'next';
import FadeUp from '@/components/animations/FadeUp';
import { siteConfig } from '@/data/site';

// /privacy-policy
//
// Phase 1F (Legal Re-scrape Agent). Compliance-critical per CLAUDE.md Compliance Rule.
//
// Source of truth: live site https://www.lmpfinancial.com/privacy-policy (re-scraped via
// Firecrawl 2026-04-27, last updated January 1, 2025). Body prose is preserved VERBATIM
// from the live site. No paraphrasing, no omission, no summarizing.
//
// DO NOT modify clauses without compliance sign-off. DO NOT add or remove clauses.
// DO NOT rewrite without re-running the Firecrawl scrape and diffing against this file.
//
// Section rhythm (text-heavy exception per design-system.md §14: gradient yes, motion off):
//   1. Header → dark gradient (static orb)  → context (Legal · Privacy Policy · last updated)
//   2. Body   → light gradient (static)     → verbatim live-site policy

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How LMP Financial collects, uses, and protects information across lmpfinancial.com. Last updated January 1, 2025.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header — dark gradient + static orb (text-heavy: motion off, gradient on) */}
      <section className="relative overflow-hidden section-dark-gradient pt-32 pb-12">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.10), transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(197, 165, 114, 0.06), transparent 60%)' }}
        />
        <div className="container-narrow px-6 relative z-10">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow text-[var(--accent)]">Legal</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="hero-shimmer font-display text-h1 mt-3">Privacy Policy</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="font-mono text-eyebrow text-[var(--accent)] mt-6">
              Last updated: {siteConfig.compliance.privacyPolicyLastUpdated}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body — light gradient (text-heavy: motion off, gradient on) */}
      {/* VERBATIM from https://www.lmpfinancial.com/privacy-policy (Firecrawl 2026-04-27). */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <article className="space-y-6">
            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Introduction
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              LMP Financial (&ldquo;Company&rdquo; or &ldquo;We&rdquo;) respect your privacy and are committed to protecting it through our compliance with this policy.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This policy describes the types of information we may collect from you or that you may provide when you visit the website{' '}
              <a
                href="https://www.lmpfinancial.com/"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                lmpfinancial.com
              </a>
              (our &ldquo;Website&rdquo;) and our practices for collecting, using, maintaining, protecting and disclosing that information.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This policy applies to information we collect:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>On this Website.</li>
              <li>In e-mail, text and other electronic messages between you and this Website.</li>
              <li>Through any mobile and desktop applications you download from this Website, which provide dedicated non-browser-based interaction between you and this Website.</li>
              <li>When you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this policy.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              It does not apply to information collected by:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>us offline or through any other means, including on any other website operated by Company or any third party (including our affiliates and subsidiaries); or</li>
              <li>any third party (including our affiliates and subsidiaries), including through any application or content (including advertising) that may link to or be accessible from or on the Website.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using this Website, you agree to this privacy policy. This policy may change from time to time. Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Persons Under the Age of 18
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Our Website is not intended for persons under 18 years of age. No one under age 18 may provide any information to or on the Website. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Website or on or through any of its features/register on the Website, make any purchases through the Website, use any of the interactive or public comment features of this Website or provide any information about yourself to us, including your name, address, telephone number, e-mail address or any screen name or user name you may use. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 18, please contact us at{' '}
              <a
                href="mailto:mike@lmpfinancial.com"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                mike@lmpfinancial.com
              </a>
              .
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Information We Collect About You and How We Collect It
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We collect several types of information from and about users of our Website, including information:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>by which you may be personally identified, such as name, postal address, e-mail address or telephone number (&ldquo;personal information&rdquo;);</li>
              <li>that is about you but individually does not identify you; and/or</li>
              <li>about your internet connection, the equipment you use to access our Website and usage details.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We collect this information:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>Directly from you when you provide it to us.</li>
              <li>Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses and information collected through cookies and other tracking technologies.</li>
              <li>From third parties, for example, our business partners.</li>
              <li>Information You Provide to Us.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The information we collect on or through our Website may include:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>Information that you provide by filling in forms on our Website. This includes information provided at the time of registering to use our Website, subscribing to our service, or requesting further services. We may also ask you for information when you report a problem with our Website.</li>
              <li>Records and copies of your correspondence (including e-mail addresses), if you contact us.</li>
              <li>Your responses to surveys that we might ask you to complete for research purposes.</li>
              <li>Your search queries on the Website</li>
              <li>You also may provide information to be published or displayed (hereinafter, &ldquo;posted&rdquo;) on public areas of the Website, or transmitted to other users of the Website or third parties (collectively, &ldquo;User Contributions&rdquo;). Your User Contributions are posted on and transmitted to others at your own risk. Although we limit access to certain pages, please be aware that no security measures are perfect or impenetrable. Additionally, we cannot control the actions of other users of the Website with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed by unauthorized persons.</li>
              <li>Usage Details, IP Addresses And Cookies/, Cookies and Other Technologies. As you navigate through and interact with our Website, we may automatically collect certain information about your equipment, browsing actions and patterns, including: Details of your visits to our Website, including traffic data, location data, logs and other communication data and the resources that you access and use on the Website.</li>
              <li>Information about your computer and internet connection, including your IP address, operating system and browser type.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The information we collect automatically is statistical data. It helps us to improve our Website and to deliver a better and more personalized service by enabling us to:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>Estimate our audience size and usage patterns.</li>
              <li>Store information about your preferences, allowing us to customize our Website according to your individual interests.</li>
              <li>Speed up your searches.</li>
              <li>Recognize you when you return to our Website.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The technologies we use for this automatic data collection may include:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>Cookies (or browser cookies). A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website.</li>
              <li>Flash Cookies. Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies.</li>
              <li>Third-party Advertiser Use of Cookies and Other Tracking Technologies. Some advertisements on the Website are served by third-party advertisers, ad networks and ad servers. These third parties may use cookies to collect information about our users. This may include information about users&rsquo; behavior on this and other websites to serve them interested-based (behavioral) advertising. We do not control these third parties&rsquo; tracking technologies or how they may be used. If you have any questions about an advertisement, you should contact the responsible advertiser directly.</li>
              <li>Recognize you when you return to our Website.</li>
            </ul>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We use information that we collect about you or that you provide to us, including any personal information:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>To present our Website and its contents to you.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
              <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
              <li>To allow you to participate in interactive features on our Website.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              In any other way we may describe when you provide the information.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              For any other purpose with your consent.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may also use your information to contact you about our own and third-parties&rsquo; goods and services that may be of interest to you.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may use the information we have collected from you to enable us to display advertisements to our advertisers&rsquo; target audiences. Even though we do not disclose your personal information for these purposes without your consent, if you click on or otherwise interact with an advertisement, the advertiser may assume that you meet its target criteria.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Disclosure of Your Information
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may disclose aggregated information about our users without restriction.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may disclose personal information that we collect or you provide as described in this privacy policy:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>To our subsidiaries and affiliates.</li>
              <li>To contractors, service providers and other third parties we use to support our business.</li>
              <li>To third parties to market their products or services to you if you have not opted out of these disclosures.</li>
              <li>For any other purpose disclosed by us when you provide the information.</li>
              <li>With your consent.</li>
            </ul>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may also disclose your personal information:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>To comply with any court order, law or legal process, including to respond to any government or regulatory request.</li>
              <li>To enforce or apply our terms of use and other agreements, including for billing and collection purposes.</li>
              <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of LMP Financial, our customers or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.</li>
            </ul>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Choices About How We Use and Disclose Your Information
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We strive to provide you with choices regarding the personal information you provide to us. We have created mechanisms to provide you with the following control over your information:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              <li>Tracking Technologies and Advertising. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe&rsquo;s website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly.</li>
              <li>We do not control third parties&rsquo; collection or use of your information to serve interest-based advertising. However these third parties may provide you with ways to choose not to have your information collected or used in this way. You can opt out of receiving targeted ads from members of the Network Advertising Initiative (&ldquo;NAI&rdquo;) on the NAI&rsquo;s website.</li>
            </ul>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Your California Privacy Rights
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              California Civil Code Section &sect; 1798.83 permits users of our Website that are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please send an e-mail to{' '}
              <a
                href="mailto:mike@lmpfinancial.com"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                mike@lmpfinancial.com
              </a>
              .
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Changes to Our Privacy Policy
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              It is our policy to post any changes we make to our privacy policy on this page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable e-mail address for you, and for periodically visiting our Website and this privacy policy to check for any changes.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Contact Information
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              To ask questions or comment about this privacy policy and our privacy practices, contact us at:{' '}
              <a
                href="mailto:mike@lmpfinancial.com"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                mike@lmpfinancial.com
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
