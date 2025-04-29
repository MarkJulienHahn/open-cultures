"use client";

import React from "react";
import styles from "./nav.module.css";
import { useRouter } from "next/navigation";

type ButtonProps = {
  label: string;
  style?: string;
};

export default function NavButton({ label, style }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const id = label.toLowerCase();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      router.push(`?section=${id}`, { scroll: false });
    } else {
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.button} ${style || "default"}`}
    >
      {label}
    </div>
  );
}
