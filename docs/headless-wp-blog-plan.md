# 헤드리스 WordPress 블로그 초기 세팅 계획

## Context
기존 Next.js 16 단일 랜딩페이지(`school.kimnpartners-law.com`)에 `/blog` 경로로 블로그를 추가. WordPress를 헤드리스 CMS로 새로 구축하여 SEO 콘텐츠 마케팅(학교폭력 관련 검색 유입) 목적의 블로그 운영. WordPress REST API → Next.js App Router ISR 구조.

---

## API 선택: WordPress REST API (WPGraphQL 아님)

**이유:**
- REST API는 WordPress 코어 내장 → 추가 플러그인 불필요
- 단순 블로그(목록/상세) 패턴에 GraphQL의 복잡성 불필요
- Next.js `fetch()` + ISR과 자연스럽게 호환
- npm 의존성 추가 없음 (현재 production dep이 3개뿐인 린한 구조 유지)

---

## Phase 1: WordPress 설치 & 헤드리스 설정 (체크리스트)

### 1-1. 호스팅 & 설치
- [ ] 호스팅 선택 (Cafe24/Cloudways 서울 등)
- [ ] 서브도메인 DNS 설정: `cms.school.kimnpartners-law.com`
- [ ] SSL 인증서 설치
- [ ] WordPress 설치, 언어=한국어, 시간대=Asia/Seoul
- [ ] 고유주소(permalink) → "글 이름(/%postname%/)" 설정

### 1-2. 필수 플러그인
- [ ] **Yoast SEO** — 글별 meta title/description, og:image 관리
- [ ] Application Passwords (WP 5.6+ 내장) — 드래프트 미리보기용

### 1-3. 헤드리스 테마 (functions.php)
- 프론트엔드 접속 시 → Next.js로 301 리다이렉트
- REST API에 CORS 헤더 추가 (`school.kimnpartners-law.com` 허용)
- `featured_image_url` 커스텀 REST 필드 등록
- WP 자체 `robots.txt`에서 전체 Disallow (인덱싱 차단)

### 1-4. 콘텐츠 모델
**카테고리:** 학폭위 대응, 행정심판, 처분 경감, 학교폭력 유형별, 학부모 가이드, 법률 상식, 사례 분석
**태그:** 학교폭력, 학폭위, 행정심판, 처분경감, 사이버괴롭힘, 생활기록부, 전학처분 등

### 1-5. 테스트 글 2~3개 작성 (featured image 포함)

---

## Phase 2: Next.js 블로그 인프라 (코딩 시작)

### 2-1. `.env.local` 생성 (신규)
```
WORDPRESS_API_URL=https://cms.school.kimnpartners-law.com/wp-json
WORDPRESS_REVALIDATE_SECONDS=3600
```

### 2-2. `src/lib/types/wordpress.ts` (신규)
- `WPPost`, `WPCategory`, `WPTag`, `WPYoastSEO` — REST API 응답 타입
- `BlogPost`, `PaginatedPosts`, `CategoryInfo`, `TagInfo` — 프론트엔드용 변환 타입

### 2-3. `src/lib/wordpress.ts` (신규) — API 클라이언트
- `wpFetch<T>()` — ISR revalidate 옵션 포함 fetch 래퍼
- `getPosts(page)` → 페이지네이션 목록
- `getPostBySlug(slug)` → 단일 글
- `getAllPostSlugs()` → 전체 slug 배열 (sitemap/generateStaticParams용)
- `getCategories()` → 카테고리 목록
- WP 응답 → `BlogPost` 변환 로직 (HTML 스트립, 날짜 포맷, Yoast SEO 매핑)

### 2-4. `next.config.ts` (수정)
- `images.remotePatterns`에 WordPress 이미지 도메인 추가:
  ```
  { hostname: "cms.school.kimnpartners-law.com", pathname: "/wp-content/uploads/**" }
  ```

---

## Phase 3: 블로그 라우트 & 페이지

### 파일 구조
```
src/app/blog/
├── layout.tsx              ← 블로그 전용 레이아웃 (헤더+푸터)
├── page.tsx                ← /blog 글 목록 (페이지네이션)
└── [slug]/
    ├── page.tsx            ← /blog/[slug] 글 상세
    └── opengraph-image.tsx ← 글별 동적 OG 이미지

src/components/
├── blog/
│   ├── BlogCard.tsx        ← 목록용 카드 컴포넌트
│   ├── BlogPagination.tsx  ← 페이지네이션
│   ├── BlogContent.tsx     ← WP HTML 콘텐츠 렌더러
│   └── BlogCTA.tsx         ← 글 하단 상담 유도 배너
└── layout/
    └── BlogHeader.tsx      ← 블로그 페이지용 미니 헤더
```

### 3-1. `src/app/blog/layout.tsx`
- `BlogHeader` + `<main className="bg-warm-gray-50 pt-16">` + `Footer`
- 랜딩페이지의 다크(navy) 배경 대신 라이트(warm-gray-50) 배경 → 장문 읽기 최적화
- 기존 `StickyBottomBar` 미포함

### 3-2. `src/components/layout/BlogHeader.tsx`
- 고정 헤더: 로고(← `/` 링크) + "블로그" 링크 + "무료 상담" CTA 버튼
- `bg-white/95 backdrop-blur-md` 스타일

### 3-3. `src/app/blog/page.tsx` — 글 목록
- `getPosts(page)` 서버 컴포넌트에서 호출
- 카테고리 필터 (가로 스크롤 칩)
- `BlogCard` 그리드 (md:2열, lg:3열)
- `BlogPagination` 페이지네이션
- `generateMetadata`로 동적 메타데이터

### 3-4. `src/app/blog/[slug]/page.tsx` — 글 상세
- `getPostBySlug(slug)` 서버 컴포넌트에서 호출
- `generateStaticParams()` → 빌드 시 모든 slug 프리렌더
- Breadcrumb: 홈 > 블로그 > 글 제목
- 카테고리 뱃지, 제목, 날짜, featured image, `BlogContent`(HTML), 태그
- `BlogCTA` — 글 하단 상담 유도 (phone + kakao 버튼)
- 인라인 JSON-LD: `BlogPosting` + `BreadcrumbList` 스키마
- `generateMetadata` → Yoast SEO 데이터 매핑

### 3-5. `src/app/blog/[slug]/opengraph-image.tsx`
- 기존 OG 이미지와 동일한 네이비+오렌지 스타일
- 글 제목 + 카테고리 + "허소현 변호사 | 법무법인 김앤파트너스"

---

## Phase 4: SEO 통합

### 4-1. `src/app/sitemap.ts` (수정)
- `async` 함수로 변경
- 기존 홈페이지 + `/blog` + 모든 블로그 글 slug 동적 포함
- WordPress 연결 실패 시 빈 배열 fallback (빌드 깨짐 방지)

### 4-2. 글별 JSON-LD
- `BlogPosting` 스키마 (headline, author, publisher, datePublished, dateModified, image)
- `BreadcrumbList` 스키마 (홈 → 블로그 → 글 제목)
- 루트 layout.tsx의 `@graph` 스키마와 독립 (충돌 없음)

### 4-3. 글별 동적 메타데이터
- Yoast SEO 데이터 → `generateMetadata`에서 title/description/ogImage 자동 매핑

---

## Phase 5: 랜딩페이지 연동 & 스타일링

### 5-1. `src/app/globals.css` (수정) — 블로그 프로즈 스타일
- `.blog-prose` 클래스: h2~h4, p, a, ul/ol, blockquote, img, table, code, hr
- 한국어 최적 line-height 1.85
- WordPress 전용 클래스 처리: `.aligncenter`, `.alignleft`, `.wp-caption`, `figcaption`
- `@tailwindcss/typography` 플러그인 미사용 → 의존성 추가 없이 직접 작성

### 5-2. `src/components/layout/Footer.tsx` (수정)
- 푸터에 "학교폭력 법률 블로그" 링크 추가
- 랜딩페이지 전환율 보호를 위해 헤더에는 미추가 (블로그 전용 헤더만 사용)

---

## 수정/생성 파일 요약

| 파일 | 작업 |
|------|------|
| `.env.local` | 신규 — WP API URL |
| `src/lib/types/wordpress.ts` | 신규 — 타입 정의 |
| `src/lib/wordpress.ts` | 신규 — API 클라이언트 |
| `src/app/blog/layout.tsx` | 신규 — 블로그 레이아웃 |
| `src/app/blog/page.tsx` | 신규 — 글 목록 |
| `src/app/blog/[slug]/page.tsx` | 신규 — 글 상세 |
| `src/app/blog/[slug]/opengraph-image.tsx` | 신규 — 글별 OG 이미지 |
| `src/components/layout/BlogHeader.tsx` | 신규 — 블로그 헤더 |
| `src/components/blog/BlogCard.tsx` | 신규 — 카드 컴포넌트 |
| `src/components/blog/BlogPagination.tsx` | 신규 — 페이지네이션 |
| `src/components/blog/BlogContent.tsx` | 신규 — HTML 렌더러 |
| `src/components/blog/BlogCTA.tsx` | 신규 — 상담 유도 배너 |
| `next.config.ts` | 수정 — WP 이미지 도메인 |
| `src/app/sitemap.ts` | 수정 — 블로그 글 동적 포함 |
| `src/app/globals.css` | 수정 — 블로그 프로즈 CSS |
| `src/components/layout/Footer.tsx` | 수정 — 블로그 링크 |

---

## 검증 방법

1. `npm run build` → WP API 연결 포함 빌드 성공
2. `/blog` → 글 목록 정상 렌더링, 카테고리 필터 동작
3. `/blog/[slug]` → 글 상세 정상 렌더링, featured image 표시
4. `/sitemap.xml` → 블로그 글 URL 포함 확인
5. 글 상세 페이지 소스에서 `BlogPosting` JSON-LD 확인
6. OG 이미지 `/blog/[slug]/opengraph-image` 정상 생성
7. 모바일 반응형 확인 (블로그 목록/상세)
8. ISR 동작: 글 수정 후 1시간 내 반영 확인

---

## 주의사항

- **WordPress 슬러그**: 한국어 제목 → 자동 URL 인코딩됨. SEO를 위해 각 글마다 영문 slug 수동 설정 권장
- **ISR 타이밍**: `revalidate: 3600` (1시간). 즉시 반영 필요 시 추후 On-demand Revalidation API Route 추가 가능
- **이미지 최적화**: Phase 1에서는 WP 이미지를 `<img>` 그대로 사용. 추후 `html-react-parser`로 `next/image` 변환 가능
- **CORS**: 서버 컴포넌트의 server-to-server fetch는 CORS 불필요. 클라이언트 컴포넌트에서 직접 WP API 호출 시에만 필요
- **빌드 시 WP 미접속**: sitemap과 generateStaticParams에 try/catch fallback 포함
