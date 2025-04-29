import { PortableText } from "next-sanity";
import styles from "./projects.module.css";
import { useEffect, useRef, useState } from "react";
import { TextBlock } from "@/types/types";

export default function ProjectButton({
  category,
  label,
  content,
  position: initialPosition = { top: 0, left: 0 }, // Default to { top: 0, left: 0 }
}: {
  category: string;
  label?: string;
  content: { text: TextBlock };
  position: { top: number; left: number };
}) {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: initialPosition.top,
    left: initialPosition.left,
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

  return (
    <>
      <div
        className={styles.buttonEntry}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        ref={entryRef}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.button}>
          <div className={styles.kicker}>{category}</div>
          {label}
        </div>
        <div className={styles.buttonContent}>
          <PortableText value={content.text} />
        </div>
      </div>
    </>
  );
}
