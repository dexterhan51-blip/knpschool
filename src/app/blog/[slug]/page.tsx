import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/wordpress";
import { SITE } from "@/lib/constants";
import BlogContent from "@/components/blog/BlogContent";
import BlogCTA from "@/components/blog/BlogCTA";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `${SITE.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.dateISO,
      modifiedTime: post.modifiedISO,
      images: post.seo.ogImage ? [{ url: post.seo.ogImage }] : undefined,
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    image: post.featuredImage?.url,
    datePublished: post.dateISO,
    dateModified: post.modifiedISO,
    author: {
      "@type": "Person",
      name: "허소현",
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: "법무법인 김앤파트너스",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "블로그",
        item: `${SITE.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-navy/40" aria-label="breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-navy"
              >
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-navy"
              >
                블로그
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-navy/60">{post.title}</li>
          </ol>
        </nav>

        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-navy md:text-4xl md:leading-tight">
          {post.title}
        </h1>

        {/* Date */}
        <time dateTime={post.dateISO} className="text-sm text-navy/40">
          {post.date}
        </time>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <BlogContent html={post.content} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-navy/10 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy/50"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <BlogCTA />
      </article>
    </>
  );
}
