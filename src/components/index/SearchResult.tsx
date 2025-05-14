import styles from "@/components/index/index.module.css";
import Link from "next/link";

function highlight(text: string, match: string) {
  const parts = text.split(new RegExp(`(${match})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === match.toLowerCase() ? (
      <mark key={i} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ") // replace dashes/underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
}

export default function SearchResult({ entry, term }) {
  return (
    <Link
      href={
        entry.content?.slug?.current
          ? `/glossary?category=${entry.category}&entry=${entry.content?.slug?.current}`
          : `/glossary?category=${entry.category}`
      }
    >
      <div className={styles.searchResult}>
        <div className={styles.searchResult__headline}>
          {term ? highlight(entry.label, term) : entry.label}
        </div>
        <div className={styles.searchResult__body}>
          <div className={styles.searchResult__category}>
            {slugToTitle(entry.category)}
          </div>
          <div className={styles.searchResult__text}>
            <p>
              {term
                ? highlight(entry.contentText || "", term)
                : entry.contentText}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
