export const revalidate = 10;

import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenPlanning } from "../../../../sanity/sanity-utils";

import Wallpaper from "@/components/ui/Wallpaper";
import { PortableTextWithLinks } from "@/components/ui/utils/PortableTextWithLinks";

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
            <PortableTextWithLinks value={openPlanning.introtext.text} />
          </div>
          <div className={`${styles.contact} body__planning border`}>
            <div className={styles.kicker} style={{ color: "var(--pink)" }}>
              Partner Institutions
            </div>
            <PortableTextWithLinks value={openPlanning.introtext.partners} />
          </div>
          <div
            className={`${styles.contact}  ${styles.contactSingle} body__planning border`}
          >
            <div className={styles.kicker} style={{ color: "var(--pink)" }}>
              Contact
            </div>
            <PortableTextWithLinks value={openPlanning.introtext.contact} />
          </div>
        </div>
        <Wallpaper background={"green"} img={"/images/openPlanning.png"} />
      </main>
      <Footer page={"planning"} />
    </>
  );
}
