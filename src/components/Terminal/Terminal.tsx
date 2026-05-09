"use client";

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { profile } from "@/lib/profile";
import { SEGFAULT } from "@/lib/ascii";
import { playTick } from "@/lib/sound";
import { prefersReducedMotion } from "@/hooks/useTypewriter";
import { runCommand, tabComplete } from "./commands";
import type { LineKind, Secret, TerminalLine, Theme } from "./types";
import styles from "./Terminal.module.scss";

let _id = 0;
function nextId() {
  return ++_id;
}

type TerminalProps = {
  initialCommand?: string;
  theme: Theme;
  setTheme: (t: Theme) => void;
  comfort: boolean;
  setComfort: (on: boolean) => void;
  startMatrix: () => void;
  startSnake: () => void;
  triggerKernelPanic: () => void;
  reboot: () => void;
  secrets: Secret[];
  unlockSecret: (id: string) => void;
  resetSecrets: () => void;
  registerInjector: (fn: (cmd: string) => void) => void;
  className?: string;
  hintPills?: React.ReactNode;
};

export function Terminal({
  initialCommand,
  theme,
  setTheme,
  comfort,
  setComfort,
  startMatrix,
  startSnake,
  triggerKernelPanic,
  reboot,
  secrets,
  unlockSecret,
  resetSecrets,
  registerInjector,
  className,
  hintPills,
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(() => [
    {
      id: nextId(),
      kind: "output",
      text: "[ booting gautam-os v2.1... ok ]",
      instant: true,
    },
    {
      id: nextId(),
      kind: "output",
      text: "Welcome. Scroll up to read about me, or type a command below.",
      instant: true,
    },
    { id: nextId(), kind: "output", text: "", instant: true },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [cwd, setCwd] = useState("~");
  const [soundOn, setSoundOn] = useState(false);
  const [invalidStreak, setInvalidStreak] = useState(0);
  const [hidPills, setHidPills] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const print = useCallback(
    (text: string, kind: LineKind = "output", html?: React.ReactNode) => {
      setLines((prev) => [
        ...prev,
        {
          id: nextId(),
          kind,
          text,
          html,
          instant: reduceMotion || kind === "ascii" || kind === "html",
        },
      ]);
    },
    [reduceMotion],
  );

  const printAscii = useCallback((text: string) => print(text, "ascii"), [print]);
  const printError = useCallback((text: string) => print(text, "error"), [print]);
  const printHtml = useCallback(
    (node: React.ReactNode) => print("", "html", node),
    [print],
  );

  const clearScreen = useCallback(() => {
    setLines([]);
  }, []);

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      setLines((prev) => [
        ...prev,
        {
          id: nextId(),
          kind: "prompt",
          text: trimmed,
          cwdAtTime: cwd,
          instant: true,
        },
      ]);
      if (!trimmed) return;
      setHistory((h) => [...h, trimmed]);
      setHistoryIdx(null);
      setHidPills(true);

      const ctx = {
        print,
        printAscii,
        printError,
        printHtml,
        clear: clearScreen,
        history,
        setCwd,
        cwd,
        setTheme,
        theme,
        setSound: setSoundOn,
        soundOn,
        setComfort,
        comfort,
        startMatrix,
        startSnake,
        triggerKernelPanic,
        reboot,
        secrets,
        unlockSecret,
        resetSecrets,
      };

      const { ran, isInvalid } = runCommand(trimmed, ctx);

      if (!ran && isInvalid) {
        const nextStreak = invalidStreak + 1;
        setInvalidStreak(nextStreak);
        printError(`command not found: ${trimmed.split(/\s+/)[0]} — type \`help\` for a list`);
        printAscii(SEGFAULT);
        if (nextStreak >= 3) {
          print("Lost? Try `help`.");
          setInvalidStreak(0);
        }
      } else if (ran) {
        setInvalidStreak(0);
      }
    },
    [
      cwd,
      print,
      printAscii,
      printError,
      printHtml,
      clearScreen,
      history,
      theme,
      setTheme,
      soundOn,
      comfort,
      setComfort,
      startMatrix,
      startSnake,
      triggerKernelPanic,
      reboot,
      invalidStreak,
      secrets,
      unlockSecret,
      resetSecrets,
    ],
  );

  // keep a stable ref to submit so effects don't re-fire on every render
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  // expose injector for NavBar (stable — uses ref)
  useEffect(() => {
    registerInjector((cmd: string) => {
      submitRef.current(cmd);
    });
  }, [registerInjector]);

  // initial-command auto-run from route — runs once, strict-mode safe
  const ranInitial = useRef(false);
  useEffect(() => {
    if (ranInitial.current || !initialCommand) return;
    ranInitial.current = true;
    Promise.resolve().then(() => submitRef.current(initialCommand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCommand]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const completion = tabComplete(input);
      if (completion) setInput(completion);
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearScreen();
      return;
    }
    if (soundOn && e.key.length === 1) {
      playTick();
    }
  }

  const promptText = `${profile.handle}@portfolio:${cwd}$ `;

  return (
    <div
      className={`${styles.terminal} ${className ?? ""}`}
      onClick={focusInput}
      data-theme={theme}
      ref={scrollRef}
    >
      <div className={styles.output} aria-live="polite" aria-atomic="false">
        {lines.map((l) => (
          <Line key={l.id} line={l} />
        ))}
      </div>
      {!hidPills && hintPills && (
        <div className={styles.pills}>{hintPills}</div>
      )}
      <div className={styles.inputLine}>
        <span className={styles.prompt} data-panic-target>
          {promptText}
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
          aria-label="terminal input"
        />
      </div>
    </div>
  );
}

function Line({ line }: { line: TerminalLine }) {
  if (line.kind === "ascii") {
    return (
      <pre className={styles.ascii} aria-label="ASCII art">
        {line.text}
      </pre>
    );
  }
  if (line.kind === "html") {
    return <div className={styles.line}>{line.html}</div>;
  }
  if (line.kind === "prompt") {
    const cwd = line.cwdAtTime ?? "~";
    return (
      <div className={styles.line}>
        <span className={styles.prompt}>{`${profile.handle}@portfolio:${cwd}$ `}</span>
        <span>{line.text}</span>
      </div>
    );
  }
  if (line.kind === "error") {
    return <div className={`${styles.line} ${styles.error}`}>{line.text}</div>;
  }
  return <div className={styles.line}>{line.text}</div>;
}
