import { profile } from "@/lib/profile";
import { Hero } from "@/components/Hero/Hero";
import { Section } from "@/components/Section/Section";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { Timeline } from "@/components/Timeline/Timeline";
import { SkillChips } from "@/components/SkillChips/SkillChips";
import styles from "./PageContent.module.scss";

export function PageContent() {
  return (
    <div className={styles.page}>
      <Hero />

      <Section id="about" title="about" subtitle="bio.txt">
        {profile.bio.split("\n\n").map((para, i) => (
          <p key={i} className={styles.bio}>{para}</p>
        ))}
      </Section>

      <Section id="projects" title="featured projects" subtitle="ls projects/">
        <div className={styles.grid}>
          {profile.projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="experience" subtitle="history.log">
        <Timeline items={[...profile.experience]} />
      </Section>

      <Section id="publications" title="publications" subtitle="papers.bib">
        <ul className={styles.pubs}>
          {profile.publications.map((p) => (
            <li key={p.title} className={styles.pub}>
              <div className={styles.pubTitle}>{p.title}</div>
              <div className={styles.pubVenue}>{p.venue}</div>
              <p className={styles.pubDesc}>{p.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" title="skills" subtitle="cat /etc/skills">
        <SkillChips />
      </Section>

      <Section id="education" title="education" subtitle="alma_mater.log">
        <Timeline items={[...profile.education]} />
      </Section>

      <Section id="contact" title="contact" subtitle="say hi">
        <ul className={styles.contactList}>
          <li>
            <a href={`mailto:${profile.socials.email}`}>✉ {profile.socials.email}</a>
          </li>
          <li>
            <a href={profile.socials.github} target="_blank" rel="noreferrer noopener">⌥ {profile.socials.github}</a>
          </li>
          <li>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer noopener">⌬ linkedin/in/gautam-gupta</a>
          </li>
          <li>
            <a href={profile.socials.twitter} target="_blank" rel="noreferrer noopener">✕ {profile.socials.twitter}</a>
          </li>
        </ul>
      </Section>
    </div>
  );
}
