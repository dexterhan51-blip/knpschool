import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "학교폭력 전문 변호사 허소현 | 법무법인 김앤파트너스";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A1931",
          padding: "60px",
        }}
      >
        {/* 상단 오렌지 라인 */}
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

        {/* 메인 타이틀 */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          학교폭력 전문 변호사
        </div>

        {/* 서브 타이틀 */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontWeight: 700,
            color: "#FF6B35",
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          48시간 골든타임 긴급 대응
        </div>

        {/* 구분선 */}
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

        {/* 변호사 정보 */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          허소현 변호사 | 법무법인 김앤파트너스
        </div>

        {/* 전화번호 */}
        <div
          style={{
            display: "flex",
            fontSize: "40px",
            fontWeight: 800,
            color: "#FF6B35",
            marginTop: "32px",
            letterSpacing: "2px",
          }}
        >
          1577-2896
        </div>
      </div>
    ),
    { ...size }
  );
}
