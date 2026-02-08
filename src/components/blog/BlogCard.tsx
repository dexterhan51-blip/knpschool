import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/types/wordpress";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      {post.featuredImage ? (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      ) : (
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex aspect-[16/9] items-center justify-center bg-navy/5">
            <span className="text-3xl text-navy/20">&#9998;</span>
          </div>
        </Link>
      )}

      <div className="p-5">
        {post.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {post.categories.map((cat) => (
              <span
                key={cat.id}
                className="text-xs font-semibold text-orange"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <h2 className="mb-2 line-clamp-2 text-lg font-bold text-navy">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-orange"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-navy/60">
          {post.excerpt}
        </p>

        <time dateTime={post.dateISO} className="text-xs text-navy/40">
          {post.date}
        </time>
      </div>
    </article>
  );
}
