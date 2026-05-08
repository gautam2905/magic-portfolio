"use client";

import { useCallback, useEffect, useState } from "react";

export type SecretId =
  | "konami"
  | "snake-played"
  | "snake-50"
  | "matrix"
  | "theme-amber"
  | "theme-blue"
  | "coffee"
  | "kernel-panic";

export type SecretMeta = {
  id: SecretId;
  name: string;
  hint: string;
};

export const SECRETS: SecretMeta[] = [
  { id: "konami",        name: "Konami code",         hint: "??? — try the old keyboard tricks" },
  { id: "snake-played",  name: "Played Snake",        hint: "??? — there's a game in here somewhere" },
  { id: "snake-50",      name: "Snake high score 50", hint: "??? — a numerical milestone" },
  { id: "matrix",        name: "Saw the Matrix",      hint: "??? — green characters fall like rain" },
  { id: "theme-amber",   name: "Switched to amber",   hint: "??? — think 1980s monochrome monitors" },
  { id: "theme-blue",    name: "Switched to blue",    hint: "??? — another monochrome era" },
  { id: "coffee",        name: "Found the coffee",    hint: "??? — fuel of programmers" },
  { id: "kernel-panic",  name: "Caused a kernel panic", hint: "??? — overwhelming the system with attention" },
];

const STORAGE_KEY = "gautam-os.secrets";

function load(): Set<SecretId> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function save(set: Set<SecretId>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

type Listener = (id: SecretId, meta: SecretMeta) => void;
const listeners = new Set<Listener>();

export function onUnlock(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useSecrets() {
  const [unlocked, setUnlocked] = useState<Set<SecretId>>(() => new Set());

  useEffect(() => {
    setUnlocked(load());
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setUnlocked(load());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const unlock = useCallback((id: SecretId) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      save(next);
      const meta = SECRETS.find((s) => s.id === id);
      if (meta) listeners.forEach((l) => l(id, meta));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(new Set());
    setUnlocked(new Set());
  }, []);

  const list = SECRETS.map((s) => ({ ...s, unlocked: unlocked.has(s.id) }));
  const found = unlocked.size;

  return { unlocked, unlock, reset, list, found, total: SECRETS.length };
}
