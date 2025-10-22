import Link from "next/link";
import { getFooter } from "../../../sanity/sanity-utils";
import styles from "./footer.module.css";
import Image from "next/image";

import { PortableTextWithLinks } from "./utils/PortableTextWithLinks";

export default async function Footer({ page }: { page?: string }) {
  const footer = await getFooter();

  return (
    <>
      <div className={`${styles.footer} ${page && styles[page]}`}>
        <div className={styles.footerInner}>
          <div className={styles.topRow}>
            <div className={`${styles.contact} ${styles.coordination}`}>
              <PortableTextWithLinks value={footer.coordination} />
            </div>
            <div className={`${styles.contact} ${styles.info}`}>
              <PortableTextWithLinks value={footer.info} />
            </div>
            <div className={`${styles.contact} ${styles.address}`}>
              <PortableTextWithLinks value={footer.address} />
            </div>
            <div className={`${styles.contact} ${styles.contactData}`}>
              <PortableTextWithLinks value={footer.contact} />
            </div>
            <div className={styles.links}>
              <Link href="imprint">Imprint</Link>
              <Link href="privacy">Privacy</Link>
            </div>
          </div>
          <div className={styles.logosWrapper}>
            <div className={`${styles.logoRow} ${styles.col5}`}>
              <p>Partner Institutions</p>
              <div className={styles.logos}>
                {footer.partners?.map((entry: { url: string }, i: number) => (
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
            <div className={`${styles.logoRow} ${styles.col5}`}>
              <p>Funded by</p>
              <div className={styles.logos}>
                {footer.supporters?.map((entry: { url: string }, i: number) => (
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
            {footer.association && (
              <div className={`${styles.logoRow} ${styles.col2}`}>
                <p>In Association with</p>
                <div className={styles.logos}>
                  {footer.association?.map(
                    (entry: { url: string }, i: number) => (
                      <Image
                        key={i}
                        src={entry.url}
                        width={500}
                        height={250}
                        alt={"Logo"}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
