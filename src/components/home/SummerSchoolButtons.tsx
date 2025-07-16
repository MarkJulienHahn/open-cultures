"use client";

import { useEffect, useState } from "react";
import { ImageType, TextBlock } from "@/types/types";
import ProjectButton from "./ProjectButton";
import ProjectImageButton from "./ProjectImageButton";
import styles from "./projects.module.css";
import Link from "next/link";

type ProjectType = {
  text: TextBlock;
  headline?: string;
  subHeadline?: string;
  slug: { current: string };
  images: ImageType[];
};

export default function SummerSchoolButtons({
  content,
  category,
  headlines,
  categorySlug,
  projects,
}: {
  content: ProjectType[];
  category: string;
  headlines?: string[];
  categorySlug: string;
  projects: ProjectType[];
}) {
  const headlinesUsed = headlines || content.map((entry) => entry.headline);
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );

  function generateRandomPosition(
    existing: { top: number; left: number }[],
    minDistance = 300
  ) {
    let attempts = 0;
    while (attempts < 1000) {
      const top = (Math.random() * 40 * window.innerHeight) / 100;
      const left = (Math.random() * 75 * window.innerWidth) / 100;
      const isFarEnough = existing.every((p) => {
        const dx = p.left - left;
        const dy = p.top - top;
        return Math.sqrt(dx * dx + dy * dy) >= minDistance;
      });
      if (isFarEnough) return { top, left };
      attempts++;
    }
    return {
      top: (Math.random() * 40 * window.innerHeight) / 100,
      left: (Math.random() * 75 * window.innerWidth) / 100,
    };
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const frame = requestAnimationFrame(() => {
      const pos: { top: number; left: number }[] = [];
      const totalItems = 1 + (projects?.length || 0); // 1 for ProjectButton + rest
      for (let i = 0; i < totalItems; i++) {
        pos.push(generateRandomPosition(pos));
      }
      setPositions(pos);
    });

    return () => cancelAnimationFrame(frame);
  }, [content, projects]);

  if (positions.length === 0) {
    return null;
  }

  return (
    <div className={styles.summerSchool}>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileKicker}>Interacting</div>
        <div className={styles.mobileHeadline}>{category}</div>
      </div>
      <div className={styles.summerSchoolButton}>
        <ProjectButton
          category={category}
          categorySlug={categorySlug}
          content={content[0]}
          label={headlinesUsed[0]}
          position={positions[0]}
          link={`/glossary?category=${category}`}
        />
      </div>
      {projects &&
        projects.map(
          (project, i) =>
            i < 2 && (
              <ProjectImageButton
                key={i}
                project={project}
                position={positions[i + 1]}
                category={headlines[0]}
                categorySlug={categorySlug}
              />
            )
        )}
      <Link href={`/glossary?category=${category}`}>
        <div className={styles.linkButton}>Show More↗</div>
      </Link>
    </div>
  );
}
