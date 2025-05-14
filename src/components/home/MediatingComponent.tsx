import Image from "next/image";

import { PortableText } from "next-sanity";

import styles from "./projects.module.css";
import {
  getMediating,
  getPrintedMatter,
  getSpokenWord,
} from "../../../sanity/sanity-utils";
import ProjectButtons from "./ProjectButtons";
import RouterComponent from "./RouterComponent";

export default async function MediatingComponent() {
  const mediating = await getMediating();
  const spokenWord = await getSpokenWord();
  const printedMatter = await getPrintedMatter();

  return (
    <div className={styles.row}>
      <RouterComponent id="mediating" section={"?section=mediating"} />
      <div className={styles.mobileHeader}>
        <div className={styles.mobileKicker}>Mediating</div>
        <div className={styles.mobileHeadline}>Mediating</div>
      </div>
      <div className={styles.text}>
        <div className={styles.kicker}>Mediating</div>
        <PortableText value={mediating.text} />
      </div>
      <div className={styles.image}>
        <Image
          src={mediating.image.url}
          width={mediating.image.dimensions.width}
          height={mediating.image.dimensions.height}
          alt={mediating.image.alt || ""}
        />
      </div>
      <ProjectButtons
        content={[spokenWord, printedMatter]}
        headlines={["Spoken Word", "Printed Matter"]}
        category={"Mediating"}
        categorySlug="mediating"
      />
    </div>
  );
}
