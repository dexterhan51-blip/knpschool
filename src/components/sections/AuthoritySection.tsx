import Image from "next/image";
import { SECTION_ID } from "@/lib/constants";
import { AUTHORITY, MEDIA } from "@/lib/content";

export default function AuthoritySection() {
  return (
    <section
      id={SECTION_ID.authority}
      className="bg-warm-gray-50 px-6 py-20 md:py-28"
      aria-label="담당 변호사 소개"
    >
      <div className="mx-auto max-w-3xl">
        {/* 섹션 라벨 */}
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {AUTHORITY.sectionLabel}
        </p>

        <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12" itemScope itemType="https://schema.org/Person">
          {/* 프로필 이미지 */}
          <div className="shrink-0">
            <div className="h-56 w-56 overflow-hidden rounded-2xl bg-warm-gray-200 shadow-xl">
              <Image
                src={AUTHORITY.photo}
                alt={`${AUTHORITY.name} 프로필 사진`}
                width={224}
                height={224}
                className="h-full w-full object-cover object-top"
                itemProp="image"
                priority
              />
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-navy md:text-3xl" itemProp="name">
              {AUTHORITY.name}
            </h3>
            <p className="mt-1 text-base text-navy/60" itemProp="jobTitle">
              {AUTHORITY.title}
            </p>

            {/* 약력 */}
            <ul className="mt-6 space-y-2">
              {AUTHORITY.credentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-navy/80">
                  <svg className="mt-0.5 w-4 h-4 shrink-0 text-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 주요 성공 사례 */}
        <div className="mt-10">
          <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-navy/50">
            주요 성공 사례
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {AUTHORITY.caseHighlights.map((highlight, i) => (
              <div
                key={i}
                className="rounded-xl border border-navy/10 bg-white p-4 shadow-sm"
              >
                <p className="text-sm leading-relaxed text-navy/80">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 철학 */}
        <blockquote className="mt-12 rounded-2xl bg-navy p-8 text-center">
          <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-white/90 italic md:text-xl">
            {AUTHORITY.philosophy}
          </p>
        </blockquote>

        {/* 미디어 출연 로고 스트립 */}
        <div className="mt-12">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-navy/40">
            {MEDIA.sectionLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            {MEDIA.outlets.map((outlet) => (
              <span
                key={outlet.name}
                className="text-sm font-bold text-navy/60 md:text-base"
                aria-label={`${outlet.name} 출연`}
              >
                {outlet.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
