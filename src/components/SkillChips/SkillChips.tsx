import { profile } from "@/lib/profile";
import styles from "./SkillChips.module.scss";

const GROUPS: { key: keyof typeof profile.skills; label: string }[] = [
  { key: "languages", label: "languages" },
  { key: "ml", label: "ml & data" },
  { key: "tools", label: "tools" },
  { key: "interests", label: "interests" },
];

export function SkillChips() {
  return (
    <div className={styles.wrap}>
      {GROUPS.map(({ key, label }) => (
        <div key={key} className={styles.group}>
          <div className={styles.label}>{label}</div>
          <ul className={styles.chips}>
            {profile.skills[key].map((s) => (
              <li key={s} className={styles.chip}>
                [ {s} ]
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
