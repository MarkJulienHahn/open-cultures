  "use client";

  import { useState, useEffect } from "react";
  import styles from "./news.module.css";
  import NewsEntry from "./NewsEntry";

  import { NewsType } from "@/types/types";

  export default function NewsEntryWrapper({ news }: { news: NewsType[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [positions, setPositions] = useState<{ top: number; left: number }[]>(
      []
    );

    function generateRandomPosition(
      existing: { top: number; left: number }[],
      minDistance = 300
    ) {
      let attempts = 0;
      while (attempts < 100) {
        const top = (Math.random() * 30 * window.innerHeight) / 100;
        const left = (Math.random() * 60 * window.innerWidth) / 100;
        const isFarEnough = existing.every((p) => {
          const dx = p.left - left;
          const dy = p.top - top;
          return Math.sqrt(dx * dx + dy * dy) >= minDistance;
        });
        if (attempts >= 100) console.warn("Max attempts reached for one position");
        if (isFarEnough) return { top, left };
        attempts++;
      }
      return {
        top: (Math.random() * 30 * window.innerHeight) / 100,
        left: (Math.random() * 80 * window.innerWidth) / 100,
      };
    }

    useEffect(() => {
      if (typeof window === "undefined") return;
      const pos: { top: number; left: number }[] = [];
      news.forEach(() => {
        pos.push(generateRandomPosition(pos));
      });
      setPositions(pos);
    }, [news]);

    return (
      <div className={styles.newsWrapper}>
        {positions.length === news.length &&
          news.map((entry, i) => (
            <NewsEntry
              key={i}
              i={i}
              entry={entry}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              position={positions[i]}
            />
          ))}
      </div>
    );
  }