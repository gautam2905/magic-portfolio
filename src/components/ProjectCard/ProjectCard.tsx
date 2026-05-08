"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/profile";
import styles from "./ProjectCard.module.scss";

export function ProjectCard({ project }: { project: Project }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = project.image ?? `/projects/${project.slug}.png`;
  return (
    <article className={styles.card} id={`project-${project.slug}`}>
      <Link href={`/project/${project.slug}`} className={styles.thumbLink} aria-label={`open ${project.name}`}>
        <div className={styles.thumb}>
          {!imgFailed && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imgSrc}
              alt=""
              className={styles.img}
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <div className={styles.thumbFallback}>
              <pre className={styles.thumbAscii}>{`╔══════════════╗
║              ║
║   [${project.id}]      ║
║              ║
║  screenshot  ║
║   pending    ║
║              ║
╚══════════════╝`}</pre>
            </div>
          )}
        </div>
      </Link>
      <header className={styles.header}>
        <span className={styles.id}>[{project.id}]</span>
        <h3 className={styles.name}>{project.name}</h3>
      </header>
      <p className={styles.tagline}>{project.tagline}</p>
      <p className={styles.desc}>{project.desc}</p>
      <ul className={styles.stack} aria-label="stack">
        {project.stack.map((s) => (
          <li key={s} className={styles.tag}>{s}</li>
        ))}
      </ul>
      <div className={styles.actions}>
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer noopener">
            → live
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer noopener">
            → github
          </a>
        )}
        {project.period && (
          <span className={styles.period}>{project.period}</span>
        )}
      </div>
    </article>
  );
}
