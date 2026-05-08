import styles from "./CrtOverlay.module.scss";

export function CrtOverlay() {
  return (
    <>
      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
    </>
  );
}
