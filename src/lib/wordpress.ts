import type {
  WPPost,
  WPCategory,
  WPTag,
  BlogPost,
  CategoryInfo,
  TagInfo,
  PaginatedPosts,
} from "@/lib/types/wordpress";

const API_URL = process.env.WORDPRESS_API_URL!;
const REVALIDATE = Number(process.env.WORDPRESS_REVALIDATE_SECONDS) || 3600;
const POSTS_PER_PAGE = 12;

// ─── Low-level fetch helper ───────────────────────────────────

async function wpFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<{ data: T; totalPages: number; totalPosts: number }> {
  const url = new URL(`${API_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      url.searchParams.set(key, String(val));
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as T;
  const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
  const totalPosts = Number(res.headers.get("X-WP-Total")) || 0;

  return { data, totalPages, totalPosts };
}

// ─── Category & Tag resolution ────────────────────────────────

let categoriesCache: WPCategory[] | null = null;
let tagsCache: WPTag[] | null = null;

async function getAllCategories(): Promise<WPCategory[]> {
  if (categoriesCache) return categoriesCache;
  const { data } = await wpFetch<WPCategory[]>("/wp/v2/categories", {
    per_page: 100,
    hide_empty: "true",
  });
  categoriesCache = data;
  return data;
}

async function getAllTags(): Promise<WPTag[]> {
  if (tagsCache) return tagsCache;
  const { data } = await wpFetch<WPTag[]>("/wp/v2/tags", {
    per_page: 100,
    hide_empty: "true",
  });
  tagsCache = data;
  return data;
}

// ─── Transformers ─────────────────────────────────────────────

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim();
}

function formatKoreanDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function transformPost(
  wp: WPPost,
  categories: WPCategory[],
  tags: WPTag[],
): BlogPost {
  const postCategories: CategoryInfo[] = wp.categories
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is WPCategory => c !== undefined)
    .map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

  const postTags: TagInfo[] = wp.tags
    .map((id) => tags.find((t) => t.id === id))
    .filter((t): t is WPTag => t !== undefined)
    .map((t) => ({ id: t.id, name: t.name, slug: t.slug }));

  // Featured image from _embed
  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  const featuredImage = media
    ? {
        url: media.source_url,
        alt: media.alt_text || wp.title.rendered,
        width: media.media_details?.width || 1200,
        height: media.media_details?.height || 630,
      }
    : null;

  const seoTitle = wp.yoast_head_json?.title || wp.title.rendered;
  const seoDescription =
    wp.yoast_head_json?.description || stripHTML(wp.excerpt.rendered);
  const ogImage =
    wp.yoast_head_json?.og_image?.[0]?.url || featuredImage?.url || null;

  return {
    id: wp.id,
    slug: wp.slug,
    title: wp.title.rendered,
    excerpt: stripHTML(wp.excerpt.rendered),
    content: wp.content.rendered,
    date: formatKoreanDate(wp.date),
    dateISO: wp.date_gmt + "Z",
    modifiedISO: wp.modified_gmt + "Z",
    featuredImage,
    categories: postCategories,
    tags: postTags,
    seo: {
      title: seoTitle,
      description: seoDescription,
      ogImage,
    },
  };
}

// ─── Public API ───────────────────────────────────────────────

export async function getPosts(page = 1): Promise<PaginatedPosts> {
  const [{ data: wpPosts, totalPages, totalPosts }, categories, tags] =
    await Promise.all([
      wpFetch<WPPost[]>("/wp/v2/posts", {
        page,
        per_page: POSTS_PER_PAGE,
        _embed: "",
      }),
      getAllCategories(),
      getAllTags(),
    ]);

  const posts = wpPosts.map((wp) => transformPost(wp, categories, tags));

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const [{ data: wpPosts }, categories, tags] = await Promise.all([
    wpFetch<WPPost[]>("/wp/v2/posts", {
      slug,
      _embed: "",
    }),
    getAllCategories(),
    getAllTags(),
  ]);

  if (wpPosts.length === 0) return null;
  return transformPost(wpPosts[0], categories, tags);
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data, totalPages } = await wpFetch<WPPost[]>("/wp/v2/posts", {
      page,
      per_page: 100,
      _fields: "slug",
    });
    slugs.push(...data.map((p) => p.slug));
    hasMore = page < totalPages;
    page++;
  }

  return slugs;
}

export async function getCategories(): Promise<CategoryInfo[]> {
  const categories = await getAllCategories();
  return categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
}

export { POSTS_PER_PAGE };
