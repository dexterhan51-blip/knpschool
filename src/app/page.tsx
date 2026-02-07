import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SelfDiagnosis from "@/components/ui/SelfDiagnosis";
import YouTubeSection from "@/components/sections/YouTubeSection";
import AuthoritySection from "@/components/sections/AuthoritySection";
import CaseStudySection from "@/components/sections/CaseStudySection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FAQSection from "@/components/sections/FAQSection";
import ClosingCTASection from "@/components/sections/ClosingCTASection";
import StickyBottomBar from "@/components/layout/StickyBottomBar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProblemSection />
        <SelfDiagnosis />
        <YouTubeSection />
        <AuthoritySection />
        <CaseStudySection />
        <TestimonialSection />
        <FAQSection />
        <ClosingCTASection />
      </main>
      <Footer />
      <StickyBottomBar />

    </>
  );
}
