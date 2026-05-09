"use client";

import { useState } from "react";
import type { Demo } from "@/lib/profile";
import styles from "./DemoCard.module.scss";

export function DemoCard({ demo }: { demo: Demo }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <article className={styles.card} id={`demo-${demo.slug}`}>
      <a
        href={demo.url}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.thumbLink}
        aria-label={`open ${demo.name} in a new tab`}
      >
        <div className={styles.thumb}>
          {!imgFailed && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={demo.image}
              alt={`${demo.name} screenshot`}
              className={styles.img}
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <pre className={styles.fallback}>{`╔══════════════╗
║              ║
║   [${demo.id.padEnd(5)}]    ║
║              ║
║  screenshot  ║
║   pending    ║
║              ║
╚══════════════╝`}</pre>
          )}
          <span className={styles.live}>● live</span>
        </div>
      </a>
      <header className={styles.header}>
        <span className={styles.id}>[{demo.id}]</span>
        <h3 className={styles.name}>{demo.name}</h3>
      </header>
      <p className={styles.tagline}>{demo.tagline}</p>
      <p className={styles.desc}>{demo.desc}</p>
      <ul className={styles.stack} aria-label="stack">
        {demo.stack.map((s) => (
          <li key={s} className={styles.tag}>{s}</li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a
          href={demo.url}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.cta}
        >
          → open {demo.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </a>
        {demo.paper && (
          <a href={demo.paper} target="_blank" rel="noreferrer noopener">
            → paper
          </a>
        )}
      </div>
    </article>
  );
}
