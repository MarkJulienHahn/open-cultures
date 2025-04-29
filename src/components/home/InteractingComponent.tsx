import Image from "next/image";

import { PortableText } from "next-sanity";

import styles from "./projects.module.css";
import {
  getConferences,
  getInteracting,
  getMPC,
  getSummerSchools,
  getTML,
} from "../../../sanity/sanity-utils";
import ProjectButtons from "./ProjectButtons";
import RouterComponent from "./RouterComponent";

export default async function InteractingComponent() {
  const interacting = await getInteracting();
  const TML = await getTML();
  const MPC = await getMPC();
  const summerSchools = await getSummerSchools();
  const conferences = await getConferences();

  return (
    <div className={styles.row}>
      <RouterComponent id="interacting" section={"?section=interacting"} />
      <div className={styles.text}>
        <div className={styles.kicker}>Interacting</div>
        <PortableText value={interacting.text} />
      </div>
      <div className={styles.image}>
        <Image
          src={interacting.image.url}
          width={interacting.image.dimensions.width}
          height={interacting.image.dimensions.height}
          alt={interacting.image.alt || ""}
        />
      </div>

      <ProjectButtons
        content={[TML, MPC, summerSchools, conferences]}
        category={"Interacting"}
        headlines={[
          "Transdisciplinary Method Lab",
          "Methodological PhD Colloquium",
          "Summer Schools",
          "Conferences",
        ]}
      />
    </div>
  );
}
