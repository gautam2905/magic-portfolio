"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { TerminalPanel } from "@/components/TerminalPanel/TerminalPanel";
import { BootSequence } from "@/components/BootSequence/BootSequence";
import { KernelPanic } from "@/components/KernelPanic/KernelPanic";
import { AchievementToast } from "@/components/AchievementToast/AchievementToast";
import { useKonami } from "@/lib/konami";
import { useSecrets } from "@/lib/secrets";
import { playBootBeep } from "@/lib/sound";
import type { Theme } from "@/components/Terminal/types";

const MatrixRain = dynamic(() => import("@/components/MatrixRain/MatrixRain"), {
  ssr: false,
});
const Snake = dynamic(() => import("@/components/Snake/Snake"), { ssr: false });

const THEME_KEY = "gautam-os.theme";
const SOUND_KEY = "gautam-os.sound";
const COMFORT_KEY = "gautam-os.comfort";
const BOOT_KEY = "gautam-os.booted";

function readBool(key: string, fallback = false): boolean {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(key);
  if (v === "1") return true;
  if (v === "0") return false;
  return fallback;
}

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

type Props = {
  initialCommand?: string;
  scrollTo?: string;
  children: React.ReactNode;
};

export function PortfolioApp({ initialCommand, scrollTo, children }: Props) {
  const [theme, setTheme] = useState<Theme>("green");
  const [comfort, setComfort] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [booted, setBooted] = useState(true);
  const [bootChecked, setBootChecked] = useState(false);
  const [matrixOn, setMatrixOn] = useState(false);
  const [snakeOn, setSnakeOn] = useState(false);
  const [panic, setPanic] = useState(false);
  const [cwd, setCwd] = useState("~");

  const matrixTimer = useRef<number | null>(null);
  const injectorRef = useRef<((cmd: string) => void) | null>(null);

  const secretsApi = useSecrets();

  // hydrate persisted state on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skipBoot = params.get("boot") === "skip";
    const sessionBooted = sessionStorage.getItem(BOOT_KEY);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skipBoot || sessionBooted) {
      setBooted(true);
    } else {
      setBooted(false);
      try { playBootBeep(); } catch { /* noop */ }
    }
    setBootChecked(true);

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (storedTheme === "amber" || storedTheme === "blue" || storedTheme === "green") {
      setTheme(storedTheme);
    }
    setSoundOn(readBool(SOUND_KEY));
    setComfort(reduceMotion ? true : readBool(COMFORT_KEY));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-comfort", comfort ? "1" : "0");
  }, [theme, comfort]);

  const persistTheme = useCallback((t: Theme) => {
    setTheme(t);
    localStorage.setItem(THEME_KEY, t);
    if (t === "amber") secretsApi.unlock("theme-amber");
    if (t === "blue") secretsApi.unlock("theme-blue");
  }, [secretsApi]);

  const persistComfort = useCallback((on: boolean) => {
    setComfort(on);
    localStorage.setItem(COMFORT_KEY, on ? "1" : "0");
  }, []);

  const persistSound = useCallback((on: boolean) => {
    setSoundOn(on);
    localStorage.setItem(SOUND_KEY, on ? "1" : "0");
  }, []);

  const onBootDone = useCallback(() => {
    setBooted(true);
    sessionStorage.setItem(BOOT_KEY, "1");
  }, []);

  const startMatrix = useCallback(() => {
    if (isMobile()) return;
    setMatrixOn(true);
    secretsApi.unlock("matrix");
    if (matrixTimer.current !== null) window.clearTimeout(matrixTimer.current);
    matrixTimer.current = window.setTimeout(() => setMatrixOn(false), 10_000);
  }, [secretsApi]);

  const startSnake = useCallback(() => {
    setSnakeOn(true);
    secretsApi.unlock("snake-played");
  }, [secretsApi]);

  const exitSnake = useCallback((score: number) => {
    setSnakeOn(false);
    if (score >= 50) secretsApi.unlock("snake-50");
  }, [secretsApi]);

  const triggerKernelPanic = useCallback(() => {
    setPanic(true);
    secretsApi.unlock("kernel-panic");
    setTimeout(() => setPanic(false), 2200);
  }, [secretsApi]);

  const reboot = useCallback(() => {
    sessionStorage.removeItem(BOOT_KEY);
    setBooted(false);
  }, []);

  useKonami(() => {
    startMatrix();
    secretsApi.unlock("konami");
    if (injectorRef.current) {
      injectorRef.current("echo [ ACHIEVEMENT UNLOCKED: l33t hax0r ]");
    }
  });

  // triple-click on an opt-in target (data-panic-target) triggers kernel panic.
  // We use the browser's native click count (event.detail) so casual clicks
  // around the page can't accumulate into an accidental BSOD.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.detail !== 3) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (!target.closest("[data-panic-target]")) return;
      triggerKernelPanic();
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [triggerKernelPanic]);

  // initial scroll based on prop
  useEffect(() => {
    if (!scrollTo || !booted) return;
    const id = window.setTimeout(() => {
      const el = document.querySelector(scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => window.clearTimeout(id);
  }, [scrollTo, booted]);

  const registerInjector = useCallback((fn: (cmd: string) => void) => {
    injectorRef.current = fn;
  }, []);

  const onNavCommand = useCallback((cmd: string) => {
    injectorRef.current?.(cmd);
  }, []);

  if (!bootChecked) return null;

  if (!booted) {
    return <BootSequence onDone={onBootDone} />;
  }

  return (
    <>
      {matrixOn && <MatrixRain />}
      <TopBar
        comfort={comfort}
        setComfort={persistComfort}
        soundOn={soundOn}
        setSoundOn={persistSound}
        cwd={cwd}
        onNavCommand={onNavCommand}
      />
      <main className="page">{children}</main>
      <TerminalPanel
        initialCommand={initialCommand}
        theme={theme}
        setTheme={persistTheme}
        comfort={comfort}
        setComfort={persistComfort}
        startMatrix={startMatrix}
        startSnake={startSnake}
        triggerKernelPanic={triggerKernelPanic}
        reboot={reboot}
        secrets={secretsApi.list}
        found={secretsApi.found}
        total={secretsApi.total}
        unlockSecret={(id) => secretsApi.unlock(id as never)}
        resetSecrets={secretsApi.reset}
        registerInjector={registerInjector}
      />
      {snakeOn && <Snake onExit={exitSnake} />}
      {panic && <KernelPanic />}
      <AchievementToast />
    </>
  );
}
