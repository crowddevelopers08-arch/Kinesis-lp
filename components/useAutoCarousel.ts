"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal scroll-snap carousel that auto-advances one slide at a time and loops.
 * Autoplay pauses only while the visitor is swiping, while `hold` is true (e.g. a modal
 * is open) or while the tab is hidden. Any slide change restarts the interval.
 */
export function useAutoCarousel(count: number, { interval = 4000, hold = false } = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [current, setCurrent] = useState(0);
  const [touching, setTouching] = useState(false);
  const [hidden, setHidden] = useState(false);

  const slideWidth = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
  };

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = Math.min(i * slideWidth(), el.scrollWidth - el.clientWidth);
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      const atStart = el.scrollLeft <= 4;
      if (dir === 1 && atEnd) return goTo(0);
      if (dir === -1 && atStart) return goTo(count - 1);
      goTo(current + dir);
    },
    [current, count, goTo]
  );

  // Which slide sits at the left edge (drives the dots)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = slideWidth();
      if (!w) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      setCurrent(atEnd ? count - 1 : Math.round(el.scrollLeft / w));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (touching || hidden || hold) return;
    const t = setTimeout(() => step(1), interval);
    return () => clearTimeout(t);
  }, [touching, hidden, hold, step, current, interval]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const touchHandlers = {
    onTouchStart: () => {
      clearTimeout(resumeTimer.current);
      setTouching(true);
    },
    onTouchEnd: () => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => setTouching(false), 1500);
    },
    onTouchCancel: () => {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => setTouching(false), 1500);
    },
  };

  return { trackRef, current, goTo, step, touchHandlers };
}
