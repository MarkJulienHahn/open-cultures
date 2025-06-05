"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./index.module.css";
import IndexContent from "./IndexContent";
import { PortableText } from "next-sanity";
import Image from "next/image";

import Hamburger from "hamburger-react";
import { ImageType, TextBlock } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import Lightbox from "./Lightbox";

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
  subtitle?: string;
  question?: string;
  images?: ImageType[];
  partners?: TextBlock;
  contact?: TextBlock;
};

export default function IndexRow({
  category,
  label,
  introtext,
  content,
  subtitle,
  question,
  images,
  partners,
  contact,
}: Props) {
  const [lightbox, setLightBox] = useState(false);
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
      {lightbox && images && (
        <Lightbox setLightBox={setLightBox} images={images} />
      )}
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
              className={styles.content__wrapper}
            >
              <div className={styles.introtext}>
                {subtitle || question ? (
                  <div className={styles.content__subhead}>
                    {subtitle && (
                      <div
                        style={{
                          fontFamily: "Siggnal Mono",
                        }}
                      >
                        {subtitle}
                      </div>
                    )}
                    {question && (
                      <div
                        style={{
                          marginTop: "1em",
                        }}
                      >
                        {question}
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <PortableText value={introtext} />
                {partners && (
                  <div className={styles.contact}>
                    <h3>Partner Institutions</h3>
                    <PortableText value={partners} />
                  </div>
                )}
                {contact && (
                  <div className={styles.contact}>
                    <h3>Contact</h3>
                    <PortableText value={contact} />
                  </div>
                )}
              </div>

              {images?.length && (
                <div
                  className={`${styles.content__image} ${
                    images.length > 0 && styles.clickable
                  }`}
                  onClick={() => setLightBox(true)}
                >
                  <Image
                    src={images[0].url}
                    alt={images[0].alt || ""}
                    width={500}
                    height={600}
                  />
                  <p className={styles.caption}>
                    {1} / {images.length}
                  </p>
                </div>
              )}
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
              <IndexContent
                key={entry.slug.current}
                entry={entry}
                category={category}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
