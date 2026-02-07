import { SITE, ORGANIZATION, LAWYER, CONTACT, YOUTUBE_VIDEOS } from "./constants";
import { SEO, FAQ, AUTHORITY, PROCESS, TESTIMONIALS, YOUTUBE } from "./content";

function getLegalServiceSchema() {
  return {
    "@type": "LegalService",
    "@id": `${SITE.url}/#legalservice`,
    name: "학교폭력 전문 변호사 | 법무법인 김앤파트너스",
    description: SEO.description,
    url: SITE.url,
    telephone: ORGANIZATION.phone,
    priceRange: "$$",
    serviceType: [
      "학교폭력 법률 상담",
      "학폭위 대응",
      "학교폭력 행정심판",
      "학교폭력 처분 경감",
    ],
    areaServed: {
      "@type": "Country",
      name: "대한민국",
    },
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION.address,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: getAggregateRatingSchema(),
    review: TESTIMONIALS.items.map((item) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: item.name,
      },
      reviewBody: item.text,
    })),
  };
}

function getPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE.url}/#lawyer`,
    name: LAWYER.name,
    jobTitle: LAWYER.jobTitle,
    image: `${SITE.url}${LAWYER.image}`,
    url: SITE.url,
    worksFor: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
    knowsAbout: [
      "학교폭력",
      "학교폭력대책심의위원회",
      "학폭위 대응",
      "행정심판",
      "소년보호사건",
    ],
    hasCredential: AUTHORITY.credentials.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "경력",
      name: cred,
    })),
  };
}

function getFAQPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function getVideoObjectSchemas() {
  const videos = [
    {
      id: YOUTUBE_VIDEOS.urgentResponse,
      name: YOUTUBE.tabs[0].label + " — " + YOUTUBE.tabs[0].hookPoint.replace(/"/g, ""),
      description: YOUTUBE.tabs[0].summary,
    },
    {
      id: YOUTUBE_VIDEOS.defenseStrategy,
      name: YOUTUBE.tabs[1].label + " — " + YOUTUBE.tabs[1].hookPoint.replace(/"/g, ""),
      description: YOUTUBE.tabs[1].summary,
    },
    {
      id: YOUTUBE_VIDEOS.realityCheck,
      name: YOUTUBE.tabs[2].label + " — " + YOUTUBE.tabs[2].hookPoint.replace(/"/g, ""),
      description: YOUTUBE.tabs[2].summary,
    },
  ];

  return videos.map((v) => ({
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
    uploadDate: "2024-01-01T00:00:00+09:00",
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
  }));
}

function getAggregateRatingSchema() {
  const ratings = TESTIMONIALS.items.map((i) => i.rating);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    bestRating: 5,
    ratingCount: ratings.length,
    reviewCount: ratings.length,
  };
}

function getBreadcrumbListSchema() {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "학교폭력 전문 변호사",
        item: SITE.url,
      },
    ],
  };
}

function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "ko",
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
  };
}

function getHowToSchema() {
  return {
    "@type": "HowTo",
    "@id": `${SITE.url}/#howto`,
    name: "학교폭력 대응 절차",
    description:
      "학교폭력 통보를 받은 후 전문 변호사와 함께하는 대응 절차를 안내합니다.",
    totalTime: "P14D",
    step: PROCESS.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
      url: `${SITE.url}/#${CONTACT.phoneHref ? "process" : "process"}`,
    })),
  };
}

export function getAllSchemas() {
  return [
    getLegalServiceSchema(),
    getPersonSchema(),
    getFAQPageSchema(),
    ...getVideoObjectSchemas(),
    getBreadcrumbListSchema(),
    getWebSiteSchema(),
    getHowToSchema(),
  ];
}
