import type { Education, Experience } from "@/lib/profile";
import styles from "./Timeline.module.scss";

type Item = {
  primary: string;
  secondary: string;
  period: string;
  meta?: string;
  bullets?: string[];
};

function toItem(x: Experience | Education): Item {
  if ("role" in x) {
    return {
      primary: x.role,
      secondary: x.company,
      period: x.period,
      meta: x.location,
      bullets: x.bullets,
    };
  }
  return {
    primary: x.degree,
    secondary: x.school,
    period: x.period,
    meta: x.location,
    bullets: x.detail ? [x.detail] : undefined,
  };
}

export function Timeline({ items }: { items: (Experience | Education)[] }) {
  return (
    <ol className={styles.list}>
      {items.map((raw, i) => {
        const x = toItem(raw);
        return (
          <li key={i} className={styles.item}>
            <header className={styles.header}>
              <span className={styles.period}>[{x.period}]</span>
              <span className={styles.primary}>{x.primary}</span>
              <span className={styles.at}>@</span>
              <span className={styles.secondary}>{x.secondary}</span>
              {x.meta && <span className={styles.meta}>· {x.meta}</span>}
            </header>
            {x.bullets && x.bullets.length > 0 && (
              <ul className={styles.bullets}>
                {x.bullets.map((b, j) => (
                  <li key={j}>
                    <span className={styles.tree}>├─</span> {b}
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
