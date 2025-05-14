import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenFactory } from "../../../../sanity/sanity-utils";

import { PortableText } from "next-sanity";
import Wallpaper from "@/components/ui/Wallpaper";

export default async function page() {
  const openFactory = await getOpenFactory();

  return (
    <>
      <main>
        <div className={styles.wrapper} id={"open-cultures"}>
          <div className={styles.quoteWrapper}>
            <div className={`${styles.quote} body__factory`}>
              <p>{openFactory.headerText}</p>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.headline} body__factory__inverted`}>
            <div className={styles.kicker} style={{ color: "var(--yellow)" }}>
              Open Cultures
            </div>
            {openFactory.introtext.title}
          </div>
          <div className={`${styles.body} body__factory border`}>
            <PortableText value={openFactory.introtext.text} />
          </div>
          {openFactory.introtext.partners && (
            <div className={`${styles.contact} body__factory border`}>
              <h3>Partner Institutions</h3>
              <ul>
                {openFactory.introtext.partners.map(
                  (entry: {
                    name: string | undefined;
                    link: string | undefined;
                  }) =>
                    entry?.name && (
                      <li key={entry.name}>
                        <div>{entry.name}</div>
                        {entry.link && (
                          <div>
                            <a
                              href={entry.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              → Contact
                            </a>
                          </div>
                        )}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>
        <Wallpaper background={"purple"} img={"/images/openFactory.png"} />
      </main>
      <Footer page={"factory"} />
    </>
  );
}
