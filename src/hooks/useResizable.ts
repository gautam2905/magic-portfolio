"use client";

import { useEffect, useRef } from "react";

export function useResizable(
  ref: React.RefObject<HTMLElement | null>,
  opts: {
    min: number;
    max: number;
    initial: number;
    storageKey?: string;
    onChange?: (px: number) => void;
  },
) {
  const dragging = useRef(false);
  const startY = useRef(0);
  const startH = useRef(0);
  const heightRef = useRef(opts.initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stored = opts.storageKey
      ? Number(localStorage.getItem(opts.storageKey))
      : NaN;
    const h = !Number.isNaN(stored) && stored >= opts.min && stored <= opts.max
      ? stored
      : opts.initial;
    heightRef.current = h;
    el.style.height = `${h}px`;
    opts.onChange?.(h);
  }, [ref, opts]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    startY.current = e.clientY;
    startH.current = heightRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dy = startY.current - e.clientY; // dragging up grows height
    let next = startH.current + dy;
    next = Math.max(opts.min, Math.min(opts.max, next));
    heightRef.current = next;
    if (ref.current) ref.current.style.height = `${next}px`;
    opts.onChange?.(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (opts.storageKey) {
      localStorage.setItem(opts.storageKey, String(heightRef.current));
    }
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return { onPointerDown, onPointerMove, onPointerUp };
}
