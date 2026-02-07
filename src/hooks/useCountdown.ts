"use client";

import { useState, useEffect, useCallback } from "react";
import { COUNTDOWN } from "@/lib/constants";

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function useCountdown(): CountdownTime {
  const getRemaining = useCallback((): CountdownTime => {
    if (typeof window === "undefined") {
      return { hours: COUNTDOWN.totalHours, minutes: 0, seconds: 0, isExpired: false };
    }

    let startTime = sessionStorage.getItem(COUNTDOWN.storageKey);
    if (!startTime) {
      const now = Date.now().toString();
      sessionStorage.setItem(COUNTDOWN.storageKey, now);
      startTime = now;
    }

    const elapsed = Date.now() - parseInt(startTime, 10);
    const totalMs = COUNTDOWN.totalHours * 60 * 60 * 1000;
    const remaining = Math.max(0, totalMs - elapsed);

    if (remaining === 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isExpired: false };
  }, []);

  const [time, setTime] = useState<CountdownTime>({
    hours: COUNTDOWN.totalHours,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setTime(getRemaining());
    const interval = setInterval(() => {
      setTime(getRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [getRemaining]);

  return time;
}
