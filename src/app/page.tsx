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
      <main itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="학교폭력 전문 변호사 | 48시간 골든타임 긴급 대응" />
        <meta itemProp="description" content="학교폭력 전문 허소현 변호사. 500건+ 학폭 사건 처리, 처분 경감 성공률 92%. 48시간 골든타임 내 긴급 대응. 무료 초기상담." />
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
