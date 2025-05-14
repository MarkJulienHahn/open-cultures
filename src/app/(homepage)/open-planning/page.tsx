import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenPlanning } from "../../../../sanity/sanity-utils";

import { PortableText } from "next-sanity";
import Wallpaper from "@/components/ui/Wallpaper";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
  Key,
} from "react";

export default async function page() {
  const openPlanning = await getOpenPlanning();

  return (
    <>
      <main>
        <div className={styles.wrapper} id={"open-cultures"}>
          <div className={styles.quoteWrapper}>
            <div className={`${styles.quote} body__planning`}>
              <p>{openPlanning.headerText}</p>
            </div>
          </div>
          {/* <NewsEntryWrapper news={news} /> */}
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.headline} body__planning__inverted`}>
            <div className={styles.kicker} style={{ color: "var(--pink)" }}>
              Open Cultures
            </div>
            {openPlanning.introtext.title}
          </div>
          <div className={`${styles.body} body__planning border`}>
            <PortableText value={openPlanning.introtext.text} />
          </div>
          <div className={`${styles.contact} body__planning border`}>
            <h3>Partner Institutions</h3>
            <ul>
              {openPlanning.introtext.partners.map(
                (entry: {
                  name: string | undefined;
                  link: string | undefined;
                }) =>
                  entry?.name && (
                    <li key={entry.name}>
                      <div>{entry.name}</div>
                      {entry.link && (
                        <div>
                          <a href={entry.link} target="_blank" rel="noreferrer">
                            → Contact
                          </a>
                        </div>
                      )}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <Wallpaper background={"green"} img={"/images/openPlanning.png"} />
      </main>
      <Footer page={"planning"} />
    </>
  );
}
