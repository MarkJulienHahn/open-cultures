import Image from "next/image";
import styles from "./page.module.css";

import image from "../../public/images/241114_open-cultures_logo-frame-animation_V3.gif";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image src={image} fill alt={""} style={{ objectFit: "cover" }} />
      </main>
    </div>
  );
}
