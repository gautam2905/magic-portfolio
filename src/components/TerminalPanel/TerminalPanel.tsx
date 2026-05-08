"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/Terminal/Terminal";
import { useResizable } from "@/hooks/useResizable";
import type { Secret, Theme } from "@/components/Terminal/types";
import styles from "./TerminalPanel.module.scss";

const HEIGHT_KEY = "gautam-os.panel.height";

const HINT_COMMANDS = [
  { label: "help", cmd: "help" },
  { label: "ls projects", cmd: "ls projects" },
  { label: "play snake", cmd: "run snake" },
  { label: "matrix", cmd: "matrix" },
  { label: "theme amber", cmd: "theme amber" },
  { label: "secrets", cmd: "secrets" },
];

type Props = {
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
  found: number;
  total: number;
  unlockSecret: (id: string) => void;
  resetSecrets: () => void;
  registerInjector: (fn: (cmd: string) => void) => void;
};

export function TerminalPanel(props: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    setCollapsed(mq.matches); // collapsed by default on mobile
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlers = useResizable(wrapRef, {
    min: 140,
    max: 900,
    initial: 320,
    storageKey: HEIGHT_KEY,
  });

  const injector = useRef<((cmd: string) => void) | null>(null);
  const registerLocal = useRef((fn: (cmd: string) => void) => {
    injector.current = fn;
    props.registerInjector(fn);
  }).current;

  const runHint = (cmd: string) => {
    setCollapsed(false);
    setTimeout(() => injector.current?.(cmd), 50);
  };

  return (
    <aside
      className={`${styles.panel} ${collapsed ? styles.collapsed : ""}`}
      ref={wrapRef}
      aria-label="terminal panel"
    >
      {!collapsed && (
        <div
          className={styles.handle}
          role="separator"
          aria-orientation="horizontal"
          aria-label="resize terminal"
          onPointerDown={handlers.onPointerDown}
          onPointerMove={handlers.onPointerMove}
          onPointerUp={handlers.onPointerUp}
        >
          <span className={styles.grip}>═══</span>
        </div>
      )}
      <div className={styles.bar}>
        <span className={styles.barTitle}>
          gautam@portfolio · secrets {props.found}/{props.total}
        </span>
        <div className={styles.barRight}>
          <button
            type="button"
            className={styles.barBtn}
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "open terminal" : "minimize terminal"}
          >
            {collapsed ? "[ ⌨ open terminal ]" : "[ — ]"}
          </button>
        </div>
      </div>

      {!collapsed && (
        <Terminal
          {...props}
          className={styles.terminal}
          hintPills={
            <>
              <span className={styles.pillsLabel}>{"> try:"}</span>
              {HINT_COMMANDS.map((h) => (
                <button
                  key={h.cmd}
                  type="button"
                  className={styles.pill}
                  onClick={() => runHint(h.cmd)}
                >
                  [ {h.label} ]
                </button>
              ))}
            </>
          }
        />
      )}
    </aside>
  );
}
