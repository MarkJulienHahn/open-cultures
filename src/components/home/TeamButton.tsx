"use client";

import { useState, useRef } from "react";
import styles from "./team.module.css";

type TeamButtonProps = {
  label: string;
  content: {
    name: string;
    affiliation: string;
    quote?: string;
    link?: string;
  }[];
  initialPosition: {
    top: number; // Keep as number for the initial values
    left: number; // Keep as number for the initial values
  };
};

export default function TeamButton({
  label,
  content,
  initialPosition,
}: TeamButtonProps) {
  // Make sure position is set as a string for top/left
  const [position, setPosition] = useState<{ top: string; left: string }>({
    top: `${initialPosition.top}px`,
    left: `${initialPosition.left}px`,
  });

  const entryRef = useRef<HTMLDivElement | null>(null);

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    offsetX = e.clientX - entryRef.current!.offsetLeft;
    offsetY = e.clientY - entryRef.current!.offsetTop;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        top: `${e.clientY - offsetY}px`, // Keep `px` here
        left: `${e.clientX - offsetX}px`, // Keep `px` here
      };
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={styles.buttonEntry}
      style={{
        top: position.top,
        left: position.left,
      }}
      ref={entryRef}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.button}>
        <div className={styles.kicker}>People</div>
        {label}
      </div>

      <div className={styles.buttonList}>
        {content.map((entry, i) => (
          <div className={styles.buttonListEntry} key={i}>
            <div className={styles.buttonListName}>
              <p>{entry.name}</p>
              <p>{entry.affiliation}</p>
            </div>
            {entry.quote && <p>»{entry.quote}«</p>}
            {entry.link && (
              <a href={entry.link} target="_blank" rel="noreferrer">
                Show Website↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
