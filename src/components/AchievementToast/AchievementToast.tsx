"use client";

import { useEffect, useState } from "react";
import { onUnlock, type SecretMeta } from "@/lib/secrets";
import styles from "./AchievementToast.module.scss";

type Toast = SecretMeta & { key: number };

export function AchievementToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return onUnlock((id, meta) => {
      const t: Toast = { ...meta, key: Date.now() + Math.random() };
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.key !== t.key));
      }, 3500);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.key} className={styles.toast}>
          <pre className={styles.trophy}>{`  ___
 (___)
 |___|
 |___|`}</pre>
          <div>
            <div className={styles.label}>[ ACHIEVEMENT UNLOCKED ]</div>
            <div className={styles.name}>{t.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
