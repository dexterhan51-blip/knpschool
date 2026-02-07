import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
