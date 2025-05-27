"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./team.module.css";
import TeamEntry from "./TeamEntry";
import type { PersonType } from "@/types/types";
import { useInView } from "react-intersection-observer";
import RouterComponent from "./RouterComponent";
import TeamButton from "./TeamButton";

type Position = { top: number; left: number };

export default function TeamEntryWrapper({
  persons,
}: {
  persons: PersonType[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Use a ref for inView to avoid re-renders affecting positions
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  // Store positions in a ref to avoid re-renders affecting them
  const positionsRef = useRef<Position[]>([]);

  // Simplified position generation
  const generatePositions = useCallback(() => {
    if (typeof window === "undefined")
      return Array(persons.length).fill({ top: 0, left: 0 });

    const containerWidth = window.innerWidth * 0.8; // 80% of window width
    const containerHeight = window.innerHeight * 0.9; // 80% of window height

    const positions: Position[] = [];

    for (let i = 0; i < persons.length; i++) {
      // Try to find a position that's not too close to existing positions
      let newPos: Position;
      let attempts = 0;
      let tooClose = true;

      while (tooClose && attempts < 50) {
        newPos = {
          top: Math.random() * containerHeight,
          left: Math.random() * containerWidth,
        };

        // Check if this position is far enough from existing positions
        tooClose = positions.some((pos) => {
          const dx = pos.left - newPos.left;
          const dy = pos.top - newPos.top;
          return dx * dx + dy * dy < 150 * 150; // Minimum distance
        });

        attempts++;

        if (!tooClose || attempts >= 50) {
          positions.push(newPos);
          break;
        }
      }

      // If we couldn't find a good position, just use a random one
      if (tooClose) {
        positions.push({
          top: Math.random() * containerHeight,
          left: Math.random() * containerWidth,
        });
      }
    }

    return positions;
  }, [persons.length]);

  // State for positions - only used for rendering
  const [positions, setPositions] = useState<Position[]>([]);

  // Generate positions on mount and when window size changes
  useEffect(() => {
    const handleResize = () => {
      const newPositions = generatePositions();
      positionsRef.current = newPositions;
      setPositions(newPositions);
    };

    // Initial generation
    handleResize();

    // Update on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [generatePositions]);

  // Handle shuffle button click
  const handleShuffle = useCallback(() => {
    const newPositions = generatePositions();
    positionsRef.current = newPositions;
    setPositions(newPositions);
  }, [generatePositions]);

  return (
    <>
      {inView && (
        <div className={styles.resetButton} onClick={handleShuffle}>
          Shuffle
        </div>
      )}
      <RouterComponent id="people" section="?section=people" />
      <div className={styles.teamlist} ref={ref}>
        <div
          className={styles.buttonEntry}
          style={{
            top: "-2em",
            left: "5em",
            pointerEvents: "none"
          }}
        >
          <div className={styles.button}>
            <div className={styles.kicker}>People</div>
            Team
          </div>
        </div>
        {persons.map((member, i) => (
          <TeamEntry
            key={`${member.name}-${i}`}
            member={member}
            i={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            initialPosition={positions[i] || { top: 0, left: 0 }}
          />
        ))}
      </div>
    </>
  );
}
