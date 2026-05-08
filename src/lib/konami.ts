"use client";

import { useEffect } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let buffer: string[] = [];
    function onKey(e: KeyboardEvent) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer.push(k);
      if (buffer.length > KONAMI.length) buffer.shift();
      if (buffer.length === KONAMI.length && buffer.every((x, i) => x === KONAMI[i])) {
        buffer = [];
        onUnlock();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
