import styles from "./Section.module.scss";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ id, title, subtitle, children }: Props) {
  const divider = `╠═══════════════ // ${id} ${"═".repeat(Math.max(0, 40 - id.length))}╣`;
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <pre className={styles.divider} aria-hidden="true">{divider}</pre>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
        {subtitle && <span className={styles.subtitle}>{`  // ${subtitle}`}</span>}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
