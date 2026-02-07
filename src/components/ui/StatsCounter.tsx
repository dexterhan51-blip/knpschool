"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/content";

function AnimatedNumber({
  target,
  prefix,
  suffix,
  label,
  visible,
  delay,
}: {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  visible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        // Ease-out effect
        const progress = step / steps;
        current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        setCount(current);

        if (step >= steps) {
          setCount(target);
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [visible, target, delay]);

  return (
    <div className="text-center">
      <div className="text-4xl font-black tabular-nums text-orange md:text-5xl">
        {prefix}
        {visible ? count : 0}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-navy/60">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-12 grid grid-cols-2 gap-8 rounded-2xl border border-navy/10 bg-white p-8 shadow-sm md:grid-cols-4"
    >
      {STATS.items.map((stat, i) => (
        <AnimatedNumber
          key={stat.label}
          target={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          label={stat.label}
          visible={visible}
          delay={i * 200}
        />
      ))}
    </div>
  );
}
