"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, msPerChar = 8, instant = false) {
  const [shown, setShown] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);

  useEffect(() => {
    if (instant) {
      setShown(text);
      setDone(true);
      return;
    }
    setShown("");
    setDone(false);
    let i = 0;
    let cancelled = false;
    function step() {
      if (cancelled) return;
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) {
        setTimeout(step, msPerChar + Math.random() * 4);
      } else {
        setDone(true);
      }
    }
    const id = setTimeout(step, msPerChar);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [text, msPerChar, instant]);

  return { shown, done, complete: () => setShown(text) };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
