export const revalidate = 10;

import Footer from "@/components/ui/Footer";
import styles from "@/components/sub-labs/sub-lab.module.css";
import { getOpenFactory } from "../../../../sanity/sanity-utils";

import Wallpaper from "@/components/ui/Wallpaper";
import { PortableTextWithLinks } from "@/components/ui/utils/PortableTextWithLinks";

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
              OpenFactory
            </div>
            {openFactory.introtext.title}
          </div>
          <div className={`${styles.body} body__factory border`}>
            <PortableTextWithLinks value={openFactory.introtext.text} />
          </div>
          <div className={`${styles.contact} body__factory border`}>
            <div className={styles.kicker} style={{ color: "var(--yellow)" }}>
              Partner Institutions
            </div>
            <PortableTextWithLinks value={openFactory.introtext.partners} />
          </div>
          <div
            className={`${styles.contact}  ${styles.contactSingle} body__factory border`}
          >
            <div className={styles.kicker} style={{ color: "var(--yellow)" }}>
              Contact
            </div>
            <PortableTextWithLinks value={openFactory.introtext.contact} />
          </div>
        </div>
        <Wallpaper background={"purple"} img={"/images/openFactory.png"} />
      </main>
      <Footer page={"factory"} />
    </>
  );
}
