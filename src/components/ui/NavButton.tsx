"use client";

import React from "react";
import styles from "./nav.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ButtonProps = {
  label: string;
  style?: string;
  link?: string;
};

export default function NavButton({ label, style, link }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    const id = makeSlug(label);
    const element = document.getElementById(id);

    function makeSlug(input: string) {
      return input
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .toLowerCase(); // Convert entire string to lowercase
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      router.push(`?section=${id}`, { scroll: false });
    } else {
    }
  };

  return !link ? (
    <div
      onClick={handleClick}
      className={`${styles.button} ${style || "default"}`}
    >
      {label}
    </div>
  ) : (
    <Link className={`${styles.button} ${style || "default"}`} href={link}>
      {label}
    </Link>
  );
}
