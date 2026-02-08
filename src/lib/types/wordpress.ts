// WordPress REST API response types

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified_gmt: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  tags: number[];
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: WPMediaItem[];
  };
  yoast_head_json?: WPYoastSEO;
}

export interface WPYoastSEO {
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}

export interface WPCategory {
  id: number;
  count: number;
  name: string;
  slug: string;
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  name: string;
  slug: string;
}

export interface WPMediaItem {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}

// Transformed types for frontend use

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateISO: string;
  modifiedISO: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  categories: CategoryInfo[];
  tags: TagInfo[];
  seo: {
    title: string;
    description: string;
    ogImage: string | null;
  };
}

export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

export interface TagInfo {
  id: number;
  name: string;
  slug: string;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}
