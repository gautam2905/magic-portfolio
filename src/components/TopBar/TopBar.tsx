"use client";

import Link from "next/link";
import styles from "./TopBar.module.scss";

const NAV = [
  { label: "about", cmd: "cat about.txt", anchor: "#about", showOn: "all" },
  { label: "work", cmd: "ls projects", anchor: "#projects", showOn: "all" },
  { label: "experience", cmd: "experience", anchor: "#experience", showOn: "desktop" },
  { label: "contact", cmd: "contact", anchor: "#contact", showOn: "all" },
] as const;

type Props = {
  comfort: boolean;
  setComfort: (on: boolean) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
  cwd: string;
  onNavCommand: (cmd: string) => void;
};

export function TopBar({
  comfort,
  setComfort,
  soundOn,
  setSoundOn,
  cwd,
  onNavCommand,
}: Props) {
  function navClick(e: React.MouseEvent, cmd: string, anchor: string) {
    e.preventDefault();
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onNavCommand(cmd);
  }

  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.logo} aria-label="home">
        <span className={styles.logoMark}>[ GG ]</span>
        <span className={styles.path}>gautam@portfolio:{cwd}</span>
      </Link>
      <nav className={styles.nav} aria-label="primary">
        {NAV.map((item) => (
          <a
            key={item.cmd}
            href={item.anchor}
            className={`${styles.navLink} ${item.showOn === "desktop" ? styles.desktopOnly : ""}`}
            onClick={(e) => navClick(e, item.cmd, item.anchor)}
          >
            [ {item.label} ]
          </a>
        ))}
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setComfort(!comfort)}
          title={comfort ? "comfort mode is on (click to toggle)" : "comfort mode is off (click to toggle)"}
          aria-pressed={comfort}
        >
          [ {comfort ? "◐ comfort on" : "◐ comfort off"} ]
        </button>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setSoundOn(!soundOn)}
          aria-pressed={soundOn}
          title="key tick sound"
        >
          [ {soundOn ? "▶ sound" : "◼ mute"} ]
        </button>
      </nav>
    </header>
  );
}
