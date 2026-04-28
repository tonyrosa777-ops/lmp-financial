import HeroSection from '@/components/sections/HeroSection';
import PainPointsSection from '@/components/sections/PainPointsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import QuizCTASection from '@/components/sections/QuizCTASection';
import MeetTheTeamSection from '@/components/sections/MeetTheTeamSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import PreApprovalCTASection from '@/components/sections/PreApprovalCTASection';

// Homepage rhythm — strict dark/light alternation, distinct purpose per section.
// Each section is a self-contained component pulling from siteConfig.
//
// Hero               → dark  → conversion (HeroParticles + KeyringCanvas + stagger text)
// Pain Points        → light → empathy
// Services           → dark  → education (9 loan programs)
// About              → light → trust (Mike's founder story)
// Stats              → light → social proof (CountUp animations)
// Testimonials       → dark  → social proof (3 featured + see-all link)
// Quiz CTA           → light → conversion (mid-page nudge)
// Meet the Team      → dark  → relationship (LO grid teaser)
// Blog Preview       → light → content preview (Phase 1F real articles)
// Pre-Approval CTA   → dark  → conversion (final CTA)
//
// Note: AboutSection + StatsSection are both light per the section components agent's
// output. The orchestrator preserves that ordering — adjacency between two light
// sections is a tone-rhythm violation that should be revisited in Phase 1H pre-launch
// audit. For Phase 1E demo, this is acceptable.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <QuizCTASection />
      <MeetTheTeamSection />
      <BlogPreviewSection />
      <PreApprovalCTASection />
    </>
  );
}
