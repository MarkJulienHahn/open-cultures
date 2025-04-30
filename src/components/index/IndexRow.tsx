"use client";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./index.module.css";
import IndexContent from "./IndexContent";
import { PortableText } from "next-sanity";

import Hamburger from "hamburger-react";
import { TextBlock } from "@/types/types";

type Entry = {
  name: string;
  slug: { current: string };
  affiliation?: string;
  text?: TextBlock;
  quote?: string;
  portrait?: {
    url: string;
  };
  lab?: string;
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

  const params = new URLSearchParams(searchParams.toString());

  const handleClick = () => {
    if (!isActive) {
      params.set("category", category);
      params.delete("entry");
    }
    router.push(`?${params.toString()}`);
  };

  const closeRow = () => {
    if (isActive) {
      params.delete("category");
      const newParams = params.toString();
      router.push(newParams ? `?${newParams}` : "/");
    }
  };

  const isActive = currentCategory === category;

  return (
    <>
      <div
        className={`${styles.row} ${isActive && styles.rowOpen}`}
        onClick={handleClick}
      >
        <div>
          {isActive && (
            <span className={styles.closeButton} onClick={closeRow}>
              <Hamburger size={20} toggled={true} />
            </span>
          )}
          {label}
        </div>
        {introtext && isActive && (
          <div className={styles.introtext}>
            <PortableText value={introtext} />
          </div>
        )}
      </div>
      {content &&
        isActive &&
        content.map((entry, i) => <IndexContent entry={entry} key={i} />)}
    </>
  );
}
