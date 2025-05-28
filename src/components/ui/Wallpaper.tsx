"use client";

// import { useState, useRef } from "react";

export default function Wallpaper({
  img,
  background,
}: {
  img: string;
  background: string;
}) {
  // const [opacity, setOpacity] = useState(1);
  // const ticking = useRef(false);

  // const handleScroll = useCallback(() => {
  //   if (!ticking.current) {
  //     window.requestAnimationFrame(() => {
  //       const scrollY = window.scrollY;
  //       const viewportHeight = window.innerHeight;
  //       const scrollHeight = document.body.scrollHeight;

  //       const nearBottom = scrollY + viewportHeight >= scrollHeight - 500;
  //       const scrolledDown = scrollY > 2 * viewportHeight;

  //       let newOpacity = 1;

  //       if (scrolledDown && !nearBottom) {
  //         newOpacity = 0;
  //       }

  //       if (nearBottom) {
  //         newOpacity = 1;
  //       }

  //       setOpacity(newOpacity);
  //       ticking.current = false;
  //     });

  //     ticking.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   handleScroll(); // initial check
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [handleScroll]);

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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1,
          transition: "opacity 0.2s ease-out",
          zIndex: -2,
        }}
      />
    </div>
  );
}
