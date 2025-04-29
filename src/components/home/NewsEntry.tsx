import { NewsType } from "@/types/types";
import styles from "./news.module.css";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { useState, useRef } from "react";
import Link from "next/link";

export default function NewsEntry({
  i,
  entry,
  activeIndex,
  setActiveIndex,
  position: initialPosition,
}: {
  i: number;
  entry: NewsType;
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
  position: { top: number; left: number };
}) {
  // Track current position for dragging
  const [position, setPosition] = useState({
    top: `${initialPosition.top}px`,
    left: `${initialPosition.left}px`,
  });

  const entryRef = useRef<HTMLDivElement | null>(null);

  // Dragging state
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
        top: `${e.clientY - offsetY}px`,
        left: `${e.clientX - offsetX}px`,
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
      className={[styles.newsEntry, entry.lab ? styles[entry.lab] : ""]
        .filter(Boolean)
        .join(" ")}
      style={{
        top: position.top,
        left: position.left,
        zIndex: activeIndex === i ? "1" : "",
      }}
      ref={entryRef}
      onMouseDown={handleMouseDown}
      onClick={() => setActiveIndex(i)}
    >
      <div className={styles.label}>News</div>
      <div className={styles.imageWrapper}>
        <Image
          src={entry.image.url}
          width={entry.image.dimensions.width}
          height={entry.image.dimensions.height}
          alt={entry.image.alt || ""}
        />
      </div>
      <div className={styles.newsActive}>
        <p className={styles.newsActiveHeadline}>{entry.title}</p>
        <PortableText value={entry.text} />
        {entry.slug && (
          <Link className={styles.newsActiveLink} href={entry.slug}>
            → Read more
          </Link>
        )}
      </div>
    </div>
  );
}
