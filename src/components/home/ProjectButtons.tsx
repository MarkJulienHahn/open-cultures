"use client";

import { TextBlock } from "@/types/types";
import ProjectButton from "./ProjectButton";
import styles from "./projects.module.css";
import { useEffect, useState } from "react";

type ProjectType = {
  text: TextBlock;
  headline?: string;
  subHeadline?: string;
};

export default function ProjectButtons({
  content,
  category,
  headlines,
}: {
  content: ProjectType[];
  category: string;
  headlines?: string[];
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
      const top = (Math.random() * 50 * window.innerHeight) / 100;
      const left = (Math.random() * 25 * window.innerWidth) / 100;
      const isFarEnough = existing.every((p) => {
        const dx = p.left - left;
        const dy = p.top - top;
        return Math.sqrt(dx * dx + dy * dy) >= minDistance;
      });
      if (isFarEnough) return { top, left };
      attempts++;
    }
    return {
      top: (Math.random() * 50 * window.innerHeight) / 100,
      left: (Math.random() * 25 * window.innerWidth) / 100
    };
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pos: { top: number; left: number }[] = [];
    content.forEach(() => {
      pos.push(generateRandomPosition(pos));
    });
    setPositions(pos);
  }, [content]);

  // Ensure positions are populated before rendering
  if (positions.length === 0) {
    return <div>Loading...</div>; // Or any other placeholder
  }

  return (
    <div className={styles.buttons}>
      {content.map((entry, i) => (
        <ProjectButton
          key={i}
          category={category}
          content={entry}
          label={headlinesUsed[i]}
          position={positions[i]}
        />
      ))}
    </div>
  );
}
