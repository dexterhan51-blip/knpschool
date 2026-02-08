import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllPostSlugs } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPostSlugs();
    blogPosts = slugs.map((slug) => ({
      url: `${SITE.url}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    console.warn("Could not fetch blog posts for sitemap");
  }

  return [...staticPages, ...blogPosts];
}
