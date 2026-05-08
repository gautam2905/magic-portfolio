"use client";

import { BSOD } from "@/lib/ascii";

export function KernelPanic() {
  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        inset: 0,
        background: "#0044aa",
        color: "#ffffff",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        textShadow: "none",
        padding: "1rem",
      }}
    >
      <pre
        style={{
          color: "#ffffff",
          fontSize: "1rem",
          lineHeight: 1.3,
          whiteSpace: "pre",
          textShadow: "none",
        }}
      >
        {BSOD}
      </pre>
    </div>
  );
}
