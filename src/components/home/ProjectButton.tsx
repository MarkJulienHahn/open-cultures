import { useEffect, useRef, useState } from "react";
import { PortableText } from "next-sanity";
import styles from "./projects.module.css";
import { TextBlock } from "@/types/types";
import Link from "next/link";

export default function ProjectButton({
  category,
  label,
  content,
  position: initialPosition = { top: 0, left: 0 },
  categorySlug,
}: {
  category: string;
  label?: string;
  content: { text?: TextBlock; slug: { current: string } };
  position: { top: number; left: number };
  categorySlug: string;
  link?: string;
}) {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: initialPosition.top,
    left: initialPosition.left,
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

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={styles.buttonEntryOuter}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      ref={entryRef}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.buttonEntry}>
        <div className={styles.button}>
          <div className={styles.kicker}>{category}</div>
          {label}
        </div>
        <div className={styles.buttonContent}>
          {content.text && <PortableText value={content.text} />}
          {content.slug?.current && (
            <div className={styles.buttonLink}>
              <Link
                href={
                  categorySlug == "living-lab"
                    ? `/glossary?category=${categorySlug}&entry=${content.slug.current}`
                    : `/glossary?category=${content.slug.current}`
                }
              >
                Show More ↗
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* {link && (
        <div className={styles.linkWrapper}>
          <Link href={link}>
            <div className={styles.link}>Show all ↗</div>
          </Link>
        </div>
      )} */}
    </div>
  );
}
