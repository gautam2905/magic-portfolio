"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/useTypewriter";
import styles from "./BootSequence.module.scss";

const LINES = [
  "GAUTAM-OS v2.0.5 BIOS",
  "Copyright (C) 2025 GG Industries",
  "--------------------------------------",
  "Memory Test ............ [  OK  ]",
  "Loading kernel ......... [  OK  ]",
  "Mounting /home/gautam .. [  OK  ]",
  "Initializing portfolio . [  OK  ]",
  "Establishing uplink .... [  OK  ]",
  "--------------------------------------",
  "Welcome, visitor.",
];

const PER_LINE_MS = 150;
const AUTO_SKIP_MS = 1800;

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone();
      return;
    }

    function finish() {
      if (finished.current) return;
      finished.current = true;
      onDone();
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      timeouts.push(setTimeout(() => setLineIdx(i + 1), i * PER_LINE_MS));
    });
    const finishT = setTimeout(finish, LINES.length * PER_LINE_MS + 200);
    const autoSkip = setTimeout(finish, AUTO_SKIP_MS);

    function onSignOfLife() {
      finish();
    }
    window.addEventListener("keydown", onSignOfLife);
    window.addEventListener("click", onSignOfLife);
    window.addEventListener("scroll", onSignOfLife, { passive: true });
    window.addEventListener("mousemove", onSignOfLife, { passive: true });
    window.addEventListener("touchstart", onSignOfLife, { passive: true });

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishT);
      clearTimeout(autoSkip);
      window.removeEventListener("keydown", onSignOfLife);
      window.removeEventListener("click", onSignOfLife);
      window.removeEventListener("scroll", onSignOfLife);
      window.removeEventListener("mousemove", onSignOfLife);
      window.removeEventListener("touchstart", onSignOfLife);
    };
  }, [onDone]);

  return (
    <div className={styles.boot} role="status" aria-live="polite">
      <pre className={styles.lines}>
        {LINES.slice(0, lineIdx).join("\n")}
      </pre>
      <div className={styles.skip}>(press any key to skip)</div>
    </div>
  );
}
