"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./team.module.css";
import { PortableText } from "next-sanity";

import { PersonType } from "@/types/types";

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
        top: e.clientY - offsetY,
        left: e.clientX - offsetX,
      };
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <div
      className={[
        styles.teamEntry,
        member.lab ? styles[member.lab.toLowerCase()] : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        top: position ? `${position.top}px` : "0px",
        left: position ? `${position.left}px` : "0px",
        zIndex: i === activeIndex ? "10" : "0",
      }}
      ref={entryRef}
      onMouseDown={handleMouseDown}
      onClick={() => setActiveIndex(i)}
    >
      <div className={styles.teamName}>
        <div>{member.name}</div>
        <div>{member.affiliation}</div>
      </div>
      <div className={styles.teamActive}>
        <PortableText value={member.text} />
        <div className={styles.link}>Show Profile ↗</div>
      </div>
    </div>
  );
}
