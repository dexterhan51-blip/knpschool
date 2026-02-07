import { SECTION_ID, CONTACT } from "@/lib/constants";
import { CLOSING_CTA } from "@/lib/content";
import CTAButton from "@/components/ui/CTAButton";
import ConfidentialityBadge from "@/components/ui/ConfidentialityBadge";
import ResponseTimeBadge from "@/components/ui/ResponseTimeBadge";
import ConsultationForm from "@/components/ui/ConsultationForm";

export default function ClosingCTASection() {
  return (
    <section
      id={SECTION_ID.closingCta}
      aria-label="무료 상담 신청"
      className="bg-navy px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* 헤드라인 */}
        <h2 className="text-3xl font-extrabold leading-tight text-white whitespace-pre-line md:text-5xl md:leading-tight">
          {CLOSING_CTA.headline}
        </h2>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-white/70 md:text-xl">
          {CLOSING_CTA.subheadline}
        </p>

        {/* 긴급 메시지 */}
        <p className="mt-8 rounded-xl bg-orange/10 border border-orange/20 px-6 py-3 text-sm font-medium text-orange">
          {CLOSING_CTA.urgency}
        </p>

        {/* 응답 시간 보장 배지 */}
        <div className="mt-6 flex justify-center">
          <ResponseTimeBadge />
        </div>

        {/* CTA 버튼 그룹 */}
        <div className="mt-8 flex flex-col gap-4">
          <CTAButton
            variant="primary"
            href={CONTACT.phoneHref}
            icon="phone"
            pulse
          >
            {CLOSING_CTA.ctaPhone}
          </CTAButton>
          <CTAButton
            variant="kakao"
            href={CONTACT.kakao}
            icon="kakao"
          >
            {CLOSING_CTA.ctaKakao}
          </CTAButton>
        </div>

        {/* 비밀보장 */}
        <div className="mt-8 flex justify-center">
          <ConfidentialityBadge text={CLOSING_CTA.confidentiality} />
        </div>

        {/* 간편 상담 신청 폼 */}
        <ConsultationForm />
      </div>
    </section>
  );
}
