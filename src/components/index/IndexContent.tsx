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
  website?: string;
  name?: string;
  headline?: string;
  subHeadline?: string;
  slug: { current: string };
  position?: string[];
  affiliation?: string;
  email: string;
  link: string[];
  externalLink: string;
  title?: string;
  text?: TextBlock;
  quote?: string;
  portrait?: {
    url: string;
  };
  caption?: string;
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
  category?: string;
};

export default function IndexContent({ entry, category }: Props) {
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

  const isTatjana = entry.slug.current === "tatjana-schneider";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isActive) {
        setShouldRender(true);
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isActive && !shouldRender) {
      setShouldRender(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && rowRef.current) {
      const timeout = setTimeout(() => {
        rowRef.current &&
          rowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive && shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 250);
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
      }, 250);
    }
  };

  const showExternal = () => {
    if (entry?.externalLink) {
      window.open(entry.externalLink, "_blank");
    }
  };

  console.log(entry);

  return (
    <>
      {lightbox && entry.images && (
        <Lightbox setLightBox={setLightBox} images={entry.images} />
      )}

      <div
        className={`${styles.row} ${lab && styles[lab]} ${styles.indented} 

        ${isActive ? styles.open : styles.closed}
        `}
        onClick={!entry.externalLink ? handleClick : showExternal}
      >
        <div className={styles.rowRef} ref={rowRef}></div>
        {isTatjana && !isActive && (
          <div className={styles.threeColorHoverWrapper}>
            <div
              className={`${styles.threeColorHoverBeige} ${styles.threeColorHover}`}
            />
            <div
              className={`${styles.threeColorHoverPurple} ${styles.threeColorHover}`}
            />
            <div
              className={`${styles.threeColorHoverRed} ${styles.threeColorHover}`}
            />
          </div>
        )}
        <div className={styles.rowInner}>
          <span>
            {entry.website && isActive ? (
              <a href={entry.website} target="_blank" rel="norefferer">
                {entry?.title} {entry.name || entry.headline}
                {" ↗"}
              </a>
            ) : (
              <>
                {entry?.title} {entry.name || entry.headline}{" "}
              </>
            )}
            {entry.externalLink && "↗"}
          </span>

          {category == "team" && (
            <div className={styles.rowDetails}>
              <span className={isTatjana && styles.rowDetailsFactory}>
                {!isActive
                  ? entry.position.map((position, i) => (
                      <span key={i}>
                        {position}
                        {entry.position.length > 1 &&
                          entry.position.length > i + 1 &&
                          ", "}
                      </span>
                    ))
                  : null}
              </span>
              <span className={isTatjana && styles.rowDetailsImaginaries}>
                {!isActive ? `Open${entry.lab}` : null}
              </span>
            </div>
          )}
        </div>
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

                    {entry.affiliation && (
                      <div className={styles.content__subhead}>
                        <div style={{ fontFamily: "Siggnal Mono" }}>
                          {entry.affiliation ? entry.affiliation : null}
                        </div>
                        <div style={{ marginTop: "1em" }}>
                          <a href={`mailto:${entry?.email}`}>
                            {entry?.email ? entry?.email : null}
                          </a>
                        </div>
                        {entry?.link?.length &&
                          entry?.link?.map((entry, i) => (
                            <div key={i}>
                              <a
                                href={`https://${entry}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {entry ? `${entry} ↗` : null}
                              </a>
                            </div>
                          ))}
                      </div>
                    )}

                    {entry.subHeadline && (
                      <div className={styles.content__subhead}>
                        <div style={{ fontFamily: "Siggnal Mono" }}>
                          {entry.subHeadline}
                        </div>
                      </div>
                    )}

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
                    {entry.caption && (
                      <p className={styles.caption}>{entry.caption}</p>
                    )}
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
