import { profile } from "@/lib/profile";
import { IdentityBadge } from "./IdentityBadge";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-name">
      <IdentityBadge />
      <div className={styles.body}>
        <h1 id="hero-name" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>
          <span className={styles.gt}>{">"}</span>{" "}
          <span>&ldquo;{profile.tagline}&rdquo;</span>
        </p>
        <ul className={styles.stats}>
          {profile.stats.map((s) => (
            <li key={s.label} className={styles.stat}>
              <span className={styles.statLabel}>{s.label}:</span>{" "}
              <span className={styles.statValue}>{s.value}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.socials}>
          <li>
            <a href={profile.socials.github} target="_blank" rel="noreferrer noopener">
              [ ⌥ github ]
            </a>
          </li>
          <li>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer noopener">
              [ ⌬ linkedin ]
            </a>
          </li>
          <li>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer noopener">
              [ ✕ twitter ]
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.socials.email}`}>
              [ ✉ email ]
            </a>
          </li>
          <li>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer noopener">
              [ ↓ resume.pdf ]
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
