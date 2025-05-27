"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function Wallpaper({
  img,
  background,
}: {
  img: string;
  background: string;
}) {
  const [opacity, setOpacity] = useState(1);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const newOpacity = scrollY > 2 * window.innerHeight ? 0 : 1;
        if (newOpacity !== opacity) {
          setOpacity(newOpacity);
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [opacity]);

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      style={{
        backgroundColor: `var(--${background})`,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <div
        className="wallpaper"
        style={{
          background: `url(${img})`,
          backgroundSize: "cover",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: opacity,
          transition: "opacity 0.2s ease-out",
          zIndex: -2,
        }}
      />
    </div>
  );
}
