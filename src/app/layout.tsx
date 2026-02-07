import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SEO } from "@/lib/content";
import { SITE, NAVER_VERIFICATION } from "@/lib/constants";
import { getAllSchemas } from "@/lib/schemas";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(NAVER_VERIFICATION ? { other: { "naver-site-verification": NAVER_VERIFICATION } } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const graphData = {
    "@context": "https://schema.org",
    "@graph": getAllSchemas(),
  };

  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphData) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
