import { CONTACT } from "@/lib/constants";

export default function BlogCTA() {
  return (
    <div className="mt-16 rounded-2xl bg-navy p-8 text-center md:p-12">
      <h3 className="text-xl font-bold text-white md:text-2xl">
        학교폭력, 혼자 고민하지 마세요
      </h3>
      <p className="mt-3 text-sm text-white/60">
        전문 변호사가 48시간 내 초기 대응 전략을 세워드립니다
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={CONTACT.phoneHref}
          className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-light"
        >
          무료 상담 신청
        </a>
        <a
          href={CONTACT.kakao}
          className="inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-6 py-3 text-sm font-bold text-[#191919] transition-colors hover:bg-[#F5DC00]"
        >
          카카오톡 상담
        </a>
      </div>
    </div>
  );
}
