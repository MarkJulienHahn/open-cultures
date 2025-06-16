export const revalidate = 10;

import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenImaginaries } from "../../../../sanity/sanity-utils";

import { PortableText } from "next-sanity";
import Wallpaper from "@/components/ui/Wallpaper";

export default async function page() {
  const openImaginaries = await getOpenImaginaries();

  return (
    <>
      <main>
        <div className={styles.wrapper} id={"open-cultures"}>
          <div className={styles.quoteWrapper}>
            <div className={`${styles.quote} body__imaginaries`}>
              <p>{openImaginaries.headerText}</p>
            </div>
          </div>
          {/* <NewsEntryWrapper news={news} /> */}
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.headline} body__imaginaries__inverted`}>
            <div className={styles.kicker} style={{ color: "var(--blue)" }}>
              OpenImaginaries
            </div>
            {openImaginaries.introtext.title}
          </div>
          <div className={`${styles.body} body__imaginaries border`}>
            <PortableText value={openImaginaries.introtext.text} />
          </div>
          <div className={`${styles.contact} body__imaginaries border`}>
            <div className={styles.kicker} style={{ color: "var(--blue)" }}>
              Partner Institutions
            </div>
            <PortableText value={openImaginaries.introtext.partners} />
          </div>
          <div
            className={`${styles.contact}  ${styles.contactSingle} body__imaginaries border`}
          >
            <div className={styles.kicker} style={{ color: "var(--blue)" }}>
              Contact
            </div>
            <PortableText value={openImaginaries.introtext.contact} />
          </div>
        </div>
        <Wallpaper background={"red"} img={"/images/openImaginaries.png"} />
      </main>
      <Footer page={"imaginaries"} />
    </>
  );
}
