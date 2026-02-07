"use client";

import PhoneIcon from "@/components/icons/PhoneIcon";
import KakaoIcon from "@/components/icons/KakaoIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";

type Variant = "primary" | "kakao" | "outline";

interface CTAButtonProps {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
  icon?: "phone" | "kakao" | "download";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-orange text-white hover:bg-orange-light active:bg-orange",
  kakao:
    "bg-[#FEE500] text-[#191919] hover:bg-[#F5DC00] active:bg-[#FEE500]",
  outline:
    "border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/5 active:bg-white/10",
};

const iconMap = {
  phone: PhoneIcon,
  kakao: KakaoIcon,
  download: DownloadIcon,
};

export default function CTAButton({
  variant = "primary",
  href,
  children,
  pulse = false,
  className = "",
  icon,
}: CTAButtonProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <a
      href={href}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full px-8 py-4 text-lg font-bold
        transition-all duration-200 ease-in-out
        ${variantStyles[variant]}
        ${pulse ? "animate-pulse-cta" : ""}
        ${className}
      `}
    >
      {IconComponent && <IconComponent className="w-5 h-5" />}
      {children}
    </a>
  );
}
