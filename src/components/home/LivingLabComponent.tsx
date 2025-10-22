

import Image from "next/image";

import styles from "./projects.module.css";
import {
  getLivingLab,
  getLivingLabProjects,
} from "../../../sanity/sanity-utils";
import ProjectButtons from "./ProjectButtons";
import RouterComponent from "./RouterComponent";
import Link from "next/link";
import { PortableTextWithLinks } from "../ui/utils/PortableTextWithLinks";

export default async function LivingLabComponent() {
  const livingLab = await getLivingLab();
  const livingLabProjects = await getLivingLabProjects();

  return (
    <>
      <RouterComponent id="livinglab" section="?section=livingLab" />
      <div className={styles.row}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileKicker}>LivingLab</div>
          <div className={styles.mobileHeadline}>LivingLab</div>
        </div>
        <div className={styles.text}>
          <div className={styles.kicker}>LivingLab</div>
          <PortableTextWithLinks value={livingLab.text} />
        </div>
        <div className={styles.image}>
          <Image
            src={livingLab.image.url}
            width={livingLab.image.dimensions.width}
            height={livingLab.image.dimensions.height}
            alt={livingLab.image.alt || ""}
          />
          <Link href="/glossary?category=living-lab">
            <div className={styles.linkButton}>Show More↗</div>
          </Link>
        </div>

        <ProjectButtons
          content={livingLabProjects}
          category={"LivingLab"}
          categorySlug={"living-lab"}
        />
      </div>
    </>
  );
}
