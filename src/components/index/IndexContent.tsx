import { useRouter, useSearchParams } from "next/navigation";

import { PortableText } from "next-sanity";
import styles from "./index.module.css";
import Image from "next/image";
import { TextBlock } from "@/types/types";
import Hamburger from "hamburger-react";
import { useState } from "react";
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("entry");

  const params = new URLSearchParams(searchParams.toString());

  const handleClick = () => {
    if (!isActive) {
      entry;
      params.set("entry", entry.slug.current);
    }

    router.push(`?${params.toString()}`);
  };

  const closeRow = () => {
    if (isActive) {
      params.delete("entry");
      const newParams = params.toString();
      router.push(newParams ? `?${newParams}` : "/");
    }
  };

  const isActive = currentCategory === entry.slug.current;
  const lab = entry?.lab?.toLowerCase();

  return (
    <>
      {lightbox && entry.images && (
        <Lightbox setLightBox={setLightBox} images={entry.images} />
      )}

      <div
        className={`${styles.row} ${lab && styles[lab]} ${styles.indented} ${isActive ? styles.open : styles.closed}`}
        onClick={handleClick}
      >
        <div>{entry.name || entry.headline}</div>
        <div className={styles.content}>
          <div className={styles.content__text}>
            <div>
              {isActive && (
                <span className={styles.closeButton} onClick={closeRow}>
                  <Hamburger size={20} toggled={true} />
                </span>
              )}
              {entry.affiliation ||
                (entry.subHeadline && (
                  <p className={styles.content__subhead}>
                    {entry.affiliation || entry.subHeadline}
                  </p>
                ))}
            </div>

            {entry.text && <PortableText value={entry.text} />}
            {entry.quote && <p>{entry.quote}</p>}
          </div>

          {entry?.portrait?.url && (
            <div className={styles.content__image}>
              <Image
                src={entry?.portrait?.url}
                alt=""
                width={400}
                height={500}
              />
            </div>
          )}

          {entry.images && (
            <div
              className={`${styles.content__image} ${entry.images.length > 0 && styles.clickable}`}
              onClick={() => setLightBox(true)}
            >
              <Image
                src={entry.images[0].url}
                alt={entry.images[0].alt || ""}
                width={500}
                height={600}
              />{" "}
              <p className={styles.caption}>
                {1} / {entry.images.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
