"use client";
import { useState, useEffect } from "react";

import styles from "./team.module.css";
import TeamEntry from "./TeamEntry";
import { PersonType } from "@/types/types";
import { useInView } from "react-intersection-observer";
import RouterComponent from "./RouterComponent";

type Position = { top: number; left: number };

export default function TeamEntryWrapper({
  persons,
}: {
  persons: PersonType[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const generateRandomPosition = (
    existing: Position[],
    minDistance = 150
  ): Position => {
    let attempts = 0;
    while (attempts < 1000) {
      const top = (Math.random() * 38 * parseFloat(getComputedStyle(document.documentElement).fontSize)); // 38em in px
      const left = (Math.random() * 80 * window.innerWidth) / 100;

      const isFarEnough = existing.every((p) => {
        const dx = p.left - left;
        const dy = p.top - top;
        return Math.sqrt(dx * dx + dy * dy) >= minDistance;
      });

      if (isFarEnough) return { top, left };
      attempts++;
    }

    // fallback
    return {
      top: (Math.random() * 38 * parseFloat(getComputedStyle(document.documentElement).fontSize)),
      left: (Math.random() * 80 * window.innerWidth) / 100,
    };
  };

  const generateAllPositions = (): Position[] => {
    const positions: Position[] = [];
    for (let i = 0; i < persons.length; i++) {
      positions.push(generateRandomPosition(positions, 150));
    }
    return positions;
  };

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    setPositions(generateAllPositions());
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setPositions(generateAllPositions());
  };

  return (
    <>
      {inView && (
        <div className={styles.resetButton} onClick={handleReset}>
          Shuffle
        </div>
      )}
      <RouterComponent id="people" section="?section=people" />
      <div className={styles.teamlist} ref={ref}>
        {persons.map((member, i) => (
          <TeamEntry
            key={i}
            member={member}
            i={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            initialPosition={positions[i]}
          />
        ))}
      </div>
    </>
  );
}
