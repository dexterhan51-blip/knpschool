// 사이트 기본 정보
export const SITE = {
  url: "https://school.kimnpartners-law.com",
  name: "학교폭력 전문 변호사 | 법무법인 김앤파트너스",
  locale: "ko_KR",
} as const;

// 법인 정보
export const ORGANIZATION = {
  name: "법무법인 김앤파트너스",
  legalName: "법무법인 김앤파트너스",
  url: "https://www.knp-law.com",
  address: {
    streetAddress: "서울특별시 서초구 서초대로 330, 4층",
    addressLocality: "서울특별시",
    addressRegion: "서초구",
    postalCode: "06631",
    addressCountry: "KR",
  },
  phone: "+82-1577-2896",
} as const;

// 변호사 정보
export const LAWYER = {
  name: "허소현",
  fullName: "허소현 변호사",
  jobTitle: "학교폭력 전문 변호사",
  image: "/images/lawyer-profile.png",
  organization: ORGANIZATION.name,
} as const;

// Naver 검색엔진 인증 (플레이스홀더 — 실제 값으로 교체)
export const NAVER_VERIFICATION = "naver09291088e2e8e87fcb4f277438ea2d4a" as const;

// 연락처
export const CONTACT = {
  phone: "010-2914-2896",
  phoneHref: "tel:01029142896",
  phoneMain: "1577-2896",
  phoneMainHref: "tel:15772896",
  kakao: "https://go.knp-law.com/48ZL0ea",
  pdfDownload: "/documents/school-violence-guide.pdf",
} as const;

// 섹션 ID (네비게이션, 스크롤)
export const SECTION_ID = {
  hero: "hero",
  problem: "problem",
  youtube: "youtube",
  authority: "authority",
  caseStudy: "case-study",
  closingCta: "closing-cta",
} as const;

// YouTube 비디오 ID
export const YOUTUBE_VIDEOS = {
  urgentResponse: "bT8D0vqhv9A",
  defenseStrategy: "rZWMOIBEfHo",
  realityCheck: "uMJiMRATsD8",
} as const;

// 새 섹션 ID
export const NEW_SECTION_ID = {
  process: "process",
  faq: "faq",
  testimonials: "testimonials",
  selfDiagnosis: "self-diagnosis",
} as const;

// 카운트다운 설정
export const COUNTDOWN = {
  totalHours: 48,
  storageKey: "knp-countdown-start",
} as const;
