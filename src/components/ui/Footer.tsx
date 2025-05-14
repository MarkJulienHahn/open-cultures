import Link from "next/link";
import { getFooter } from "../../../sanity/sanity-utils";
import styles from "./footer.module.css";
import Image from "next/image";

export default async function Footer({ page }: { page?: string }) {
  const footer = await getFooter();

  return (
    <div className={`${styles.footer} ${page && styles[page]}`}>
      <div className={styles.footerInner}>
        <div className={styles.topRow}>
          <p className={styles.contact}>{footer.text}</p>
          <div className={styles.logosWrapper}>
            <div className={styles.logoRow}>
              <p>Partner Institutions</p>
              <div className={styles.logos}>
                {footer.partners.map((entry: { url: string }, i: number) => (
                  <Image
                    key={i}
                    src={entry.url}
                    width={500}
                    height={250}
                    alt={"Logo"}
                  />
                ))}
              </div>
            </div>
            <div className={styles.logoRow}>
              <p>Funded by</p>
              <div className={styles.logos}>
                {footer.supporters.map((entry: { url: string }, i: number) => (
                  <Image
                    key={i}
                    src={entry.url}
                    width={500}
                    height={250}
                    alt={"Logo"}
                  />
                ))}
              </div>
            </div>
            <div className={styles.links}>
              <a href={`mailto:${footer.email}`}>Email</a>
              <Link href="imprint">Imprint</Link>
              <Link href="privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
