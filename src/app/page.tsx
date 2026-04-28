import HeroSection from '@/components/sections/HeroSection';
import PainPointsSection from '@/components/sections/PainPointsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import QuizCTASection from '@/components/sections/QuizCTASection';
import MeetTheTeamSection from '@/components/sections/MeetTheTeamSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import PreApprovalCTASection from '@/components/sections/PreApprovalCTASection';

// Homepage rhythm — strict dark/light alternation, distinct purpose per section.
// Each section is a self-contained component pulling from siteConfig.
//
// Hero (with founder strip)  → dark  → conversion + relationship
// Pain Points                → light → empathy
// Services                   → dark  → education
// Stats                      → light → social proof
// Testimonials               → dark  → social proof
// Quiz CTA                   → light → conversion (mid-page)
// Meet the Team              → dark  → relationship
// Blog Preview               → light → content preview
// Pre-Approval CTA           → dark  → conversion (final)
//
// Phase 1G — AboutSection content folded into HeroSection as a founder strip.
// Resolves the L-L adjacency from Sessions 5+6 by reducing to 9 sections.
// Strict alternation D-L-D-L-D-L-D-L-D.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <QuizCTASection />
      <MeetTheTeamSection />
      <BlogPreviewSection />
      <PreApprovalCTASection />
    </>
  );
}
