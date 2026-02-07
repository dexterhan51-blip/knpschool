"use client";

import { useState, useEffect } from "react";
import { CONTACT, SECTION_ID } from "@/lib/constants";
import { STICKY_BAR } from "@/lib/content";
import PhoneIcon from "@/components/icons/PhoneIcon";

export default function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const closingSection = document.getElementById(SECTION_ID.closingCta);
    if (!closingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(closingSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-navy/95 backdrop-blur-lg border-t border-white/10 px-4 py-3">
        <a
          href={CONTACT.phoneHref}
          className="flex items-center justify-center gap-3 rounded-full bg-orange px-6 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-orange-light active:bg-orange"
        >
          <PhoneIcon className="w-5 h-5" />
          <span>{STICKY_BAR.text}</span>
          <span className="text-sm font-normal text-white/80">|</span>
          <span className="text-sm font-normal text-white/80">{STICKY_BAR.subtext}</span>
        </a>
      </div>
    </div>
  );
}
