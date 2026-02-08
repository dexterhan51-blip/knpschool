import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/wordpress";

export const runtime = "edge";
export const alt = "블로그 포스트";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "학교폭력 법률 블로그";
  let category = "법률 정보";

  try {
    const post = await getPostBySlug(slug);
    if (post) {
      title = post.title;
      category = post.categories[0]?.name || "법률 정보";
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A1931",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#FF6B35",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            fontWeight: 600,
            color: "#FF6B35",
            marginBottom: "24px",
          }}
        >
          {category}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "48px",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          {title.length > 60 ? title.substring(0, 57) + "..." : title}
        </div>

        <div
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#FF6B35",
            marginTop: "40px",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          허소현 변호사 | 법무법인 김앤파트너스
        </div>
      </div>
    ),
    { ...size },
  );
}
