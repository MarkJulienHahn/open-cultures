import Image from "next/image";
import styles from "./page.module.css";

import image from "../../public/images/241114_open-cultures_logo-frame-animation_V3.gif";

export default function Home() {
  return (
    <main>
      <Image src={image} fill alt={""} style={{ objectFit: "cover" }} />
      <div className={styles.link}>
        <a href="https://gtas-braunschweig.de/researching/detail/open-planning-cultures">Mehr Infos</a>
      </div>
    </main>
  );
}
