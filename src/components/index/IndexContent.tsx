"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import styles from "./index.module.css";
import Image from "next/image";
import { TextBlock } from "@/types/types";
import Hamburger from "hamburger-react";
import { useState, useRef, useEffect } from "react";
import Lightbox from "./Lightbox";

type Entry = {
  name?: string;
  headline?: string;
  subHeadline?: string;
  slug: { current: string };
  affiliation?: string;
  text?: TextBlock;
  quote?: string;
  portrait?: {
    url: string;
  };
  images?: {
    alt: string | null;
    url: string;
    caption: string | null;
    dimensions: {
      aspectRatio: number;
      width: number;
      height: number;
    };
  }[];
  lab?: string;
};

type Props = {
  entry: Entry;
};

export default function IndexContent({ entry }: Props) {
  const [lightbox, setLightBox] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null); // Ref for the row to scroll into view

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentEntry = searchParams.get("entry");

  const params = new URLSearchParams(searchParams.toString());
  const isActive = currentEntry === entry.slug.current;
  const lab = entry?.lab?.toLowerCase();

  const [shouldRender, setShouldRender] = useState(false);

  // Delay activating the row on first load, so it animates in
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isActive) {
        setShouldRender(true);
      }
    }, 50); // short delay for animation
    return () => clearTimeout(timeout);
  }, []); // only once on mount

  // Handle opening after initial mount
  useEffect(() => {
    if (isActive && !shouldRender) {
      setShouldRender(true);
    }
  }, [isActive]);

  // Scroll into view after row is open and fully rendered
  useEffect(() => {
    if (isActive && rowRef.current) {
      // Add a delay to ensure the animation is completed before scrolling
      const timeout = setTimeout(() => {
        rowRef.current &&
          rowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500); // Adjust delay to match animation timing
      return () => clearTimeout(timeout);
    }
  }, [isActive]); // Scroll into view when the row becomes active

  useEffect(() => {
    if (!isActive && shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 250); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isActive, shouldRender]);

  const handleClick = () => {
    if (!isActive) {
      params.set("entry", entry.slug.current);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  const closeRow = () => {
    if (isActive) {
      setShouldRender(false);
      setTimeout(() => {
        params.delete("entry");
        const newParams = params.toString();
        router.push(newParams ? `?${newParams}` : "/", { scroll: false });
      }, 250); // match animation duration
    }
  };

  return (
    <>
      {lightbox && entry.images && (
        <Lightbox setLightBox={setLightBox} images={entry.images} />
      )}

      <div
        className={`${styles.row} ${lab && styles[lab]} ${styles.indented} 
        ${isActive ? styles.open : styles.closed}
        `}
        onClick={handleClick}
      >
        <div className={styles.rowRef} ref={rowRef}></div>
        <div>{entry.name || entry.headline}</div>
        <AnimatePresence initial={false}>
          {shouldRender && (
            <motion.div
              key="entry-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <div className={styles.content} ref={contentRef}>
                <div className={styles.content__text}>
                  <div>
                    <span className={styles.closeButton} onClick={closeRow}>
                      <Hamburger size={20} toggled={true} />
                    </span>

                    <div className={styles.content__subhead}>
                      {entry.affiliation || entry.subHeadline}
                    </div>

                    {entry.text && <PortableText value={entry.text} />}
                    {entry.quote && <p>{entry.quote}</p>}
                  </div>
                </div>

                {entry?.portrait?.url && (
                  <div className={styles.content__image}>
                    <Image
                      src={entry.portrait.url}
                      alt=""
                      width={400}
                      height={500}
                    />
                  </div>
                )}

                {entry.images && (
                  <div
                    className={`${styles.content__image} ${
                      entry.images.length > 0 && styles.clickable
                    }`}
                    onClick={() => setLightBox(true)}
                  >
                    <Image
                      src={entry.images[0].url}
                      alt={entry.images[0].alt || ""}
                      width={500}
                      height={600}
                    />
                    <p className={styles.caption}>
                      {1} / {entry.images.length}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
