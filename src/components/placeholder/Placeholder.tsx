import Image from "next/image";
import styles from "./page.module.css";


import image from "../../public/images/241114_open-cultures_logo-frame-animation_V3.gif";

import logo1 from "../../public/images/TUBraunschweig_1C_white.png";
import logo2 from "../../public/images/gdg_logo_screen_high_res_white.png";
import logo3 from "../../public/images/Logo_deu_eng_white.png";
import logo4 from "../../public/images/zukunft-niedersachsen_Logo_Weiss_RGB.png";
import logo5 from "../../public/images/VWST_W_PNG.png";
import logo6 from "../../public/images/ZKfN_Logo_RGB_white.png";

export default function Placeholder() {
  return (
    <>
      <Image src={image} fill alt={""} style={{ objectFit: "cover" }} />
      <div className={styles.content}>
        <div className={styles.content__left}>
          <div className={styles.content__text}>
            <h1>
              Open Planning Cultures. Design Principles for Transformative
              Spaces{" "}
            </h1>
            <p>
              How can climate knowledge be translated into sustainable living
              through design principles which directly support climate
              adaptation in urban development and spatial planning?{" "}
            </p>
          </div>
          <div className={styles.content__links}>
            <div>
              <a href="mailto:opencultures@tu-braunschweig.de">Contact ↗</a>
            </div>
            <div>
              <a
                href="https://gtas-braunschweig.de/researching/detail/open-planning-cultures"
                target="blank"
                rel="_noreferrer"
              >
                Information ↗
              </a>
            </div>
          </div>
        </div>
        <div className={styles.content__right}>
          <div className={styles.logos__row}>
            <p className={styles.logos__headline}>Partner Institutions</p>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo1}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo2}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo3}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
          </div>
          <div className={styles.logos__row}>
            <p className={styles.logos__headline}>Funded by</p>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo4}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo5}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
            <div className={styles.logos__imageContainer}>
              <Image
                src={logo6}
                alt={""}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
