import { useEffect, useRef, useState } from "react";
import { PortableText } from "next-sanity";
import styles from "./projects.module.css";
import { TextBlock, ImageType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

export default function ProjectImageButton({
  category,
  project,
  position: initialPosition = { top: 0, left: 0 },
  categorySlug,
}: {
  category: string;
  project: {
    images: ImageType[];
    text: TextBlock;
    slug: { current: string };
    headline?: string;
  };
  position: { top: number; left: number };
  categorySlug: string;
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

  console.log(project.slug);

  return (
    project.images && (
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
          <div className={styles.kicker}>{category}</div>
          <div className={styles.entryImage}>
            {project.images?.length && (
              <Image
                src={project.images[0].url}
                width={400}
                height={400}
                alt={project.images[0].alt || "Summer School Image"}
              />
            )}
          </div>
          <div className={styles.buttonContent}>
            <div className={styles.textHeadline}>{project.headline}</div>
            <PortableText value={project.text} />
            {project.slug?.current ? (
              <div className={styles.buttonLink}>
                <Link
                  href={`/glossary?category=${categorySlug}&entry=${project.slug.current}`}
                >
                  Show More ↗
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}
