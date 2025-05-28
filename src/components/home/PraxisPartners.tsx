"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./team.module.css";

type TeamButtonProps = {
  label: string;
  content: {
    name: string;
    affiliation: string;
    title: string;
    website?: string;
    quote?: string;
    externalLink?: string;
  }[];
};

export default function AdvisoryBoard({ label, content }: TeamButtonProps) {
  const [position, setPosition] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
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

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Dynamically set position when the component mounts
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPosition({
      top: `${Math.random() * (vh * 0.1)}px`,
      left: `${Math.random() * (vw * 0.8)}px`,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // Only run on mount

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

      <div className={styles.buttonListPartners}>
        <div className={styles.buttonColumn}>
          {content.map((entry, i) => (
            <div className={styles.buttonListPartner} key={i}>
              <div
                style={{ pointerEvents: entry.externalLink ? "auto" : "none" }}
              >
                <a href={entry.externalLink} target="_blank" rel="noreferrer">
                  <p>
                    {entry.title} {entry.name}&nbsp;{entry.externalLink ? "↗" : null}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
