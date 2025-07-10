"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./team.module.css";
import { PortableText } from "next-sanity";
import { PersonType } from "@/types/types";
import Link from "next/link";

type TeamEntryProps = {
  member: PersonType;
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
  i: number;
  initialPosition: { top: number; left: number };
};

export default function TeamEntry({
  member,
  activeIndex,
  setActiveIndex,
  i,
  initialPosition,
}: TeamEntryProps) {
  const [position, setPosition] = useState(initialPosition);
  const entryRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offsetX.current = e.clientX - (entryRef.current?.offsetLeft || 0);
    offsetY.current = e.clientY - (entryRef.current?.offsetTop || 0);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      setPosition({
        top: e.clientY - offsetY.current,
        left: e.clientX - offsetX.current,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Effect to reset position when `initialPosition` changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={[
        styles.teamEntry,
        member.lab ? styles[member.lab.toLowerCase()] : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        // zIndex: i === activeIndex ? "10" : "0",
      }}
      ref={entryRef}
      onMouseDown={handleMouseDown}
      onClick={() => setActiveIndex(i)}
    >
      <div className={styles.teamName}>
        <a href={member.website} target="_blank" rel="noreferrer">
          <div>
            {member.title} {member.name}
          </div>
        </a>

        {member.position.map((position, i) => (
          <div key={i} className={styles.teamAffiliation}>
            {position}
          </div>
        ))}
      </div>
      <div className={styles.teamActive}>
        <PortableText value={member.text} />
        <div className={styles.link}>
          <Link href={`/glossary?category=team&entry=${member.slug.current}`}>
            Show Profile ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
