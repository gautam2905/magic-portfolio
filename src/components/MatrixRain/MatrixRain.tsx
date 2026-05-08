"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    function recalc() {
      if (!canvas) return;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }
    window.addEventListener("resize", recalc);

    let rafId = 0;
    let last = 0;
    const FRAME_MS = 50;

    function draw(t: number) {
      if (!canvas || !ctx) return;
      if (t - last < FRAME_MS) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      last = t;

      ctx.fillStyle = "rgba(10, 14, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const styles = getComputedStyle(document.documentElement);
      const color = styles.getPropertyValue("--crt-text").trim() || "#33ff66";
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", recalc);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        opacity: 0.18,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
