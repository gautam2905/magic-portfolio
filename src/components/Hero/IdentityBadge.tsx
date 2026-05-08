import styles from "./IdentityBadge.module.scss";

export function IdentityBadge() {
  return (
    <div className={styles.badge}>
      <div className={styles.photoFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me.jpg" alt="Gautam Gupta" className={styles.photo} />
        <span className={styles.photoLabel}>./me.jpg</span>
      </div>
    </div>
  );
}
