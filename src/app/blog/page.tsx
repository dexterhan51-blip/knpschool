import type { Metadata } from "next";
import { getPosts, getCategories } from "@/lib/wordpress";
import { SITE } from "@/lib/constants";
import BlogCard from "@/components/blog/BlogCard";
import BlogPagination from "@/components/blog/BlogPagination";

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const title =
    page > 1
      ? `학교폭력 법률 블로그 - ${page}페이지 | 법무법인 김앤파트너스`
      : "학교폭력 법률 블로그 | 학폭위 대응, 처분 경감 정보";
  const description =
    "학교폭력 전문 변호사가 알려드리는 학폭위 대응법, 행정심판, 처분 경감 전략. 학부모를 위한 실용적인 법률 정보를 제공합니다.";

  return {
    title,
    description,
    alternates: {
      canonical: page > 1 ? `/blog?page=${page}` : "/blog",
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/blog`,
      type: "website",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const { posts, totalPages, currentPage } = await getPosts(page);
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-navy md:text-4xl">
          학교폭력 법률 블로그
        </h1>
        <p className="mt-4 text-base text-navy/60">
          학교폭력 전문 변호사가 전하는 실질적인 대응 정보
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <a
            href="/blog"
            className="shrink-0 rounded-full border border-navy/20 px-4 py-1.5 text-sm font-medium text-navy/70 transition-colors hover:bg-navy hover:text-white"
          >
            전체
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className="shrink-0 rounded-full border border-navy/20 px-4 py-1.5 text-sm font-medium text-navy/70 transition-colors hover:bg-navy hover:text-white"
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-navy/40">
          <p className="text-lg">아직 게시된 글이 없습니다.</p>
        </div>
      )}

      {totalPages > 1 && (
        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
