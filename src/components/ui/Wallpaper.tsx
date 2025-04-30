"use client";

import { useEffect, useState } from "react";

export default function Wallpaper({ img }: { img: string }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="wallpaper"
      style={{
        background: `url(${img})`,
        backgroundSize: "cover",    
        // filter: scrollY > 100 ? "blur(10px)" : "blur(0px)",
        opacity: scrollY > 100 ? "0" : "1",
    }}
    >
    </div>
  );
}
