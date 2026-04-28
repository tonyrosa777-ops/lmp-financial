import type { Metadata } from 'next';
import FadeUp from '@/components/animations/FadeUp';
import { siteConfig } from '@/data/site';

// /terms-of-use
//
// Phase 1F (Legal Re-scrape Agent). Compliance-critical per CLAUDE.md Compliance Rule.
//
// Source of truth: live site https://www.lmpfinancial.com/terms-of-use (re-scraped via
// Firecrawl 2026-04-27, last updated January 1, 2025). Body prose is preserved VERBATIM
// from the live site, including the AAA arbitration clause and the 1-year limitation on
// time to file a claim. The live site duplicates the "Limitation on Time to File Claims"
// heading + paragraph back-to-back; the duplication is preserved verbatim per scope rules.
//
// DO NOT modify clauses without compliance sign-off. DO NOT add or remove clauses.
// DO NOT rewrite without re-running the Firecrawl scrape and diffing against this file.
//
// Section rhythm (text-heavy exception per design-system.md §14: gradient yes, motion off):
//   1. Header → dark gradient (static orb)  → context (Legal · Terms of Use · last updated)
//   2. Body   → light gradient (static)     → verbatim live-site terms

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms governing use of lmpfinancial.com. Includes eligibility, prohibited uses, disclaimers, limitation of liability, arbitration, and the one-year limitation on filing a claim. Last updated January 1, 2025.',
};

export default function TermsOfUsePage() {
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
            <h1 className="hero-shimmer font-display text-h1 mt-3">Terms of Use</h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="font-mono text-eyebrow text-[var(--accent)] mt-6">
              Last updated: {siteConfig.compliance.termsOfUseLastUpdated}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body — light gradient (text-heavy: motion off, gradient on) */}
      {/* VERBATIM from https://www.lmpfinancial.com/terms-of-use (Firecrawl 2026-04-27). */}
      <section className="section-light-gradient section-pad-base">
        <div className="container-narrow px-6">
          <article className="space-y-6">
            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Acceptance of the Terms of Use
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The following terms and conditions, together with any documents they expressly incorporate by reference (collectively, these &ldquo;Terms&rdquo;), govern your (&ldquo;You&rdquo; or &ldquo;User&rdquo;) access to and use of{' '}
              <a
                href="https://www.lmpfinancial.com/"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                lmpfinancial.com
              </a>
              , including any content, functionality and services offered on or through{' '}
              <a
                href="https://www.lmpfinancial.com/"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                lmpfinancial.com
              </a>
              (the &ldquo;Website&rdquo;) of our service.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Please read these Terms carefully before you start to use the Website. By using the Website, you accept and agree to be bound and abide by these Terms and our Privacy Policy, incorporated herein by reference. If you do not want to agree to these Terms or the Privacy Policy, you must not access or use the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This Website is offered and available to users who 18 years of age or older, and reside in the United States or any of its territories or possessions and. By using this Website, you represent and warrant that you meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You acknowledge that the individual Multiple Listing Service (&ldquo;MLS&rdquo;), other real estate agents and other third parties, which supplies listing data to us, owns such data and you acknowledge the validity of the MSL&rsquo;s copyright to such data.You will not copy, redistribute, or retransmit any of the information provided except in connection with your consideration of the purchase or sale of an individual property.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Changes to these Terms
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Your continued use of the Website following the posting of a revised version of these Terms means that you accept and agree to the changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Accessing the Website and Account Security
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Website, or the entire Website, to users, including registered users.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You are responsible for:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Making all arrangements necessary for you to have access to the Website.Ensuring that all persons who access the Website through your internet connection are aware of these Terms and comply with them.To access the Website or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the Website that all the information you provide on the Website is correct, current and complete. You agree that all information you provide to register with this Website or otherwise, including but not limited to through the use of any interactive features on the Website, is governed by our Privacy Policy, and you consent to all actions we take with respect to your information consistent with our Privacy Policy.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Intellectual Property Rights
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The Website and its entire contents, features and functionality (including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof), are owned by the Company, its licensors or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              These Terms permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of the material on our Website, except as follows:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials. You may store files that are automatically cached by your Web browser for display enhancement purposes. You may print one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication or distribution.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              If we provide desktop, mobile or other applications for download, you may download a single copy to your computer or mobile device solely for your own personal, non-commercial use, provided you agree to be bound by our end user license agreement for such applications. If we provide social media features with certain content, you make take such actions as are enabled by such features.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You must not:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Modify copies of any materials from this site.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Use any illustrations, photographs, video or audio sequences or any graphics with proper attribution. Delete or alter any copyright, trademark or other proprietary rights notices from copies of materials from this site.You must not access or use for any commercial purposes any part of the Website or any services or materials available through the Website.If you print, copy, modify, download or otherwise use or provide any other person with access to any part of the Website in breach of these Terms, your right to use the Website will cease immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by the Company. Any use of the Website not expressly permitted by these Terms is a breach of these Terms and may violate copyright, trademark and other laws.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Trademarks
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The Company name and all related names, logos, product and service names, designs and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written permission of the Company. All other names, logos, product and service names, designs and slogans on this Website are the trademarks of their respective owners.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Prohibited Uses
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to use the Website:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              In any way that violates any applicable federal, state, local or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the United States or other countries).For the purpose of exploiting, harming or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information or otherwise.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              To transmit, or procure the sending of, any advertising or promotional material, including any &ldquo;junk mail&rdquo;, &ldquo;chain letter&rdquo; or &ldquo;spam&rdquo; or any other similar solicitation.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              To impersonate or attempt to impersonate the Company, a Company employee, another user or any other person or entity (including, without limitation, by using e-mail addresses associated with any of the foregoing).To engage in any other conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of the Website, or which, as determined by us, may harm the Company or users of the Website or expose them to liability.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Additionally, you agree not to:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Use the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party&rsquo;s use of the Website, including their ability to engage in real time activities through the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Use any robot, spider or other automatic device, process or means to access the Website for any purpose, including monitoring or copying any of the material on the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Use any manual process to monitor or copy any of the material on the Website or for any other unauthorized purpose without our prior written consent.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Use any device, software or routine that interferes with the proper working of the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Introduce any viruses, trojan horses, worms, logic bombs or other material which is malicious or technologically harmful.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Attempt to gain unauthorized access to, interfere with, damage or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer or database connected to the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Otherwise attempt to interfere with the proper working of the Website.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Monitoring and Enforcement; Termination
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We have the right to:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Website.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Terminate or suspend your access to all or part of the Website for any or no reason, including without limitation, any violation of these Terms.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Without limiting the foregoing, we have the right to fully cooperate with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Website. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY THE COMPANY/ANY OF THE FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER THE COMPANY/SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              However, we do not undertake to review all material before it is posted on the Website, and cannot ensure prompt removal of objectionable material after it has been uploaded. Accordingly, we assume no liability for any action or inaction regarding transmissions, communications or content provided by any user or third party. We have no liability or responsibility to anyone for performance or nonperformance of the activities described in this section.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Reliance on Information Posted
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              The information presented on or through the Website is made available solely for general information purposes. WE DO NOT WARRANT THE ACCURACY, COMPLETENESS OR USEFULNESS OF THIS INFORMATION. ANY RELIANCE YOU PLACE ON SUCH INFORMATION IS STRICTLY AT YOUR OWN RISK. WE DISCLAIM ALL LIABILITY AND RESPONSIBILITY ARISING FROM ANY RELIANCE PLACED ON SUCH MATERIALS BY YOU OR ANY OTHER VISITOR TO THE WEBSITE, OR BY ANYONE WHO MAY BE INFORMED OF ANY OF ITS CONTENTS.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We are not responsible for any errors in displayed information or delays in displaying information. Issues of data accuracy may be brought to our attention by sending feedback but it is likely that such information accuracy cannot be corrected by us and the entity or person that generated the information must be appealed to.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This Website may include content provided by third parties, including materials provided by other users, bloggers and third-party licensors, syndicators, aggregators and/or reporting services. All statements and/or opinions expressed in these materials, and all articles and responses to questions and other content, other than the content provided by the Company, are solely the opinions and the responsibility of the person or entity providing those materials. These materials do not necessarily reflect the opinion of the Company. We are not responsible, or liable to you or any third party, for the content or accuracy of any materials provided by any third parties.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Information About You and Your Visits to the Website
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              All information we collect on this Website is subject to our Privacy Policy. By using the Website, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Other Terms and Conditions
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Additional terms and conditions may also apply to specific portions, services or features of the Website. All such additional terms and conditions are hereby incorporated by this reference into these Terms.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Linking to the Website and Social Media Features
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You may link to our homepage, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part without our express consent.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This Website may provide certain social media features that enable you to:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Link from your own or certain third-party websites to certain content on this Website. Send e-mails or other communications with certain content, or links to certain content, on this Website. Cause limited portions of content on this Website to be displayed or appear to be displayed on your own or certain third-party websites. You may use these features solely as they are provided by us solely with respect to the content they are displayed with and otherwise in accordance with any additional terms and conditions we provide with respect to such features. Subject to the foregoing, you must not:
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Establish a link from any website that is not owned by you.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Cause the Website or portions of it to be displayed, or appear to be displayed by, for example, framing, deep linking or in-line linking, on any other site.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Link to any part of the Website other than the homepage.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              Otherwise take any action with respect to the materials on this Website that is inconsistent with any other provision of these Terms.You agree to cooperate with us in causing any unauthorized framing or linking immediately to cease. We reserve the right to withdraw linking permission without notice.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We may disable all or any social media features, if any, and any links at any time without notice in our discretion.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Links from the Website
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              If the Website contains links to other sites and resources provided by third parties, these links are provided for your convenience only. This includes links contained in advertisements, including banner advertisements and sponsored links. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third party websites linked to this Website, you do so entirely at your own risk and subject to these Terms and conditions of use for such websites.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Geographic Restrictions
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              We provide this Website for use only by persons located in the United States. We make no claims that the Website or any of its content is accessible or appropriate outside of the United States. Access to the Website may not be legal by certain persons or in certain countries. If you access the Website from outside the United States, you do so on your own initiative and are responsible for compliance with local laws.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You understand that we cannot and do not guarantee or warrant that files available for downloading from the internet or the Website will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data. WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              YOUR USE OF THE WEBSITE, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY OR AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Limitation on Liability
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              IN NO EVENT WILL THE COMPANY, ITS AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Indemnification
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              You agree to defend, indemnify and hold harmless the Company, its affiliates, licensors and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses or fees (including reasonable attorneys&rsquo; fees) arising out of or relating to your violation of these Terms or your use of the Website, including, but not limited to, any use of the Website&rsquo;s content, services and products other than as expressly authorized in these Terms or your use of any information obtained from the Website.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Arbitration
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              At Company&rsquo;s sole discretion, it may require You to submit any disputes arising from the use of these Terms or the Website, including disputes arising from or concerning their interpretation, violation, invalidity, non-performance, or termination, to final and binding arbitration under the Rules of Arbitration of the American Arbitration Association.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Limitation on Time to File Claims
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </p>

            {/* The live site duplicates this heading + paragraph back-to-back. Preserved verbatim. */}
            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Limitation on Time to File Claims
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Waiver and Severability
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              No waiver of by the Company of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms will continue in full force and effect.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Entire Agreement
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              These Terms and our Privacy Policy constitute the sole and entire agreement between you and the Company with respect to the Website and supersede all prior and contemporaneous understandings, agreements, representations and warranties, both written and oral, with respect to the Website.
            </p>

            <h2 className="font-display text-h3 text-[var(--text-on-light)] mt-12 mb-4">
              Your Comments and Concerns
            </h2>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              This website is operated by the Company.
            </p>
            <p className="text-body text-[var(--text-on-light-secondary)] leading-relaxed">
              All feedback, comments, requests for technical support and other communications relating to the Website should be directed to:{' '}
              <a
                href="mailto:mike@lmpfinancial.com"
                className="text-[var(--accent-deep)] underline hover:text-[var(--accent)]"
              >
                mike@lmpfinancial.com
              </a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
