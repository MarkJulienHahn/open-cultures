import { NewsType } from "@/types/types";
import styles from "./news.module.css";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { useState, useRef, useEffect } from "react";
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
  const [position, setPosition] = useState({
    top: `${initialPosition.top}px`,
    left: `${initialPosition.left}px`,
  });

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
        top: `${e.clientY - offsetY.current}px`,
        left: `${e.clientX - offsetX.current}px`,
      });
    }
  };

  function extractQueryString(fullUrl: string): string {
    try {
      const url = new URL(fullUrl);
      return url.search ? url.pathname + url.search : url.pathname;
    } catch (error) {
      console.error("Ungültige URL:", error);
      return "";
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
          <div className={styles.newsActiveLink}>
            <Link href={extractQueryString(entry.slug)}>Read more ↗</Link>
          </div>
        )}
        {entry.external?.url && (
          <div className={styles.newsActiveLink}>
            <a href={entry.external.url}>{entry.external.name || "Learn More"} ↗</a>
          </div>
        )}
      </div>
    </div>
  );
}
