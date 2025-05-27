import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenPlanning } from "../../../../sanity/sanity-utils";

import { PortableText } from "next-sanity";
import Wallpaper from "@/components/ui/Wallpaper";

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
        </div>
        <div className={styles.wrapper}>
          <div className={`${styles.headline} body__planning__inverted`}>
            <div className={styles.kicker} style={{ color: "var(--pink)" }}>
              OpenPlanning
            </div>
            {openPlanning.introtext.title}
          </div>
          <div className={`${styles.body} body__planning border`}>
            <PortableText value={openPlanning.introtext.text} />
          </div>
          <div className={`${styles.contact} body__planning border`}>
            <h3><em>Partner Institutions</em></h3>
            <PortableText value={openPlanning.introtext.partners} />
          </div>
        </div>
        <Wallpaper background={"green"} img={"/images/openPlanning.png"} />
      </main>
      <Footer page={"planning"} />
    </>
  );
}
