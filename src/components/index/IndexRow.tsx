"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./index.module.css";
import IndexContent from "./IndexContent";
import { PortableText } from "next-sanity";

import Hamburger from "hamburger-react";
import { TextBlock } from "@/types/types";
import { useEffect, useRef } from "react";

type Entry = {
  name: string;
  slug: { current: string };
  affiliation?: string;
  text?: TextBlock;
  quote?: string;
  email: string;
  link: string[];
  externalLink: string;
  portrait?: {
    url: string;
  };
  lab?: string;
  website?: string;
};

type Props = {
  category: string;
  label: string;
  introtext?: TextBlock;
  content?: Entry[];
};

export default function IndexRow({
  category,
  label,
  introtext,
  content,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const rowRef = useRef<HTMLDivElement>(null);
  const params = new URLSearchParams(searchParams.toString());

  const handleClick = () => {
    if (!isActive) {
      params.set("category", category);
      params.delete("entry");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeRow = () => {
    if (isActive) {
      params.delete("category");
      const newParams = params.toString();
      router.push(newParams ? `?${newParams}` : "/", { scroll: false });
    }
  };

  const isActive = currentCategory === category;

  useEffect(() => {
    if (isActive && rowRef.current) {
      const timeout = setTimeout(() => {
        rowRef.current &&
          rowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <>
      <div
        className={`${styles.row} ${isActive && styles.rowOpen}`}
        onClick={handleClick}
      >
        <div className={styles.rowRef} ref={rowRef}></div>
        <div className={styles.rowSingle}>
          {isActive && (
            <span className={styles.closeButton} onClick={closeRow}>
              <Hamburger size={20} toggled={true} />
            </span>
          )}
          {label}
        </div>
        <AnimatePresence initial={false}>
          {introtext && isActive && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: "1em" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={styles.introtext}
            >
              <PortableText value={introtext} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {content && isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {content.map((entry) => (
              <IndexContent key={entry.slug.current} entry={entry} category={category}/>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
