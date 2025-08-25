import Image from "next/image";

import { PortableText } from "next-sanity";

import styles from "./projects.module.css";
import {
  getConferences,
  getInteracting,
  getLearningAndDoing,
  getLearningAndDoingProjects,
  getMPC,
  getSummerSchools,
  getSummerSchoolsProjects,
  getTML,
} from "../../../sanity/sanity-utils";
import ProjectButtons from "./ProjectButtons";
import SummerSchoolButtons from "./SummerSchoolButtons";
import RouterComponent from "./RouterComponent";
import Link from "next/link";

export default async function InteractingComponent() {
  const interacting = await getInteracting();
  const TML = await getTML();
  const MPC = await getMPC();
  const learningAndDoing = await getLearningAndDoing();
  const learningAndDoingProjects = await getLearningAndDoingProjects();
  const summerSchools = await getSummerSchools();
  const summerSchoolProjects = await getSummerSchoolsProjects();
  const conferences = await getConferences();


  return (
    <>
      <div className={styles.row} style={{ marginBottom: "0" }}>
        <RouterComponent id="interacting" section={"?section=interacting"} />
        <div className={styles.mobileHeader}>
          <div className={styles.mobileKicker}>Interacting</div>
          <div className={styles.mobileHeadline}>Interacting</div>
        </div>
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
          <Link href="/glossary?category=interdisciplinary-workshop">
            <div className={styles.linkButton}>Show More↗</div>
          </Link>
        </div>

        <ProjectButtons
          content={[TML, MPC, conferences]}
          category={"Interacting"}
          headlines={[
            "Inter(disciplinary Work)shop",
            "Doctoral School",
            "Conferences",
          ]}
          categorySlug="interacting"
        />
      </div>
      <div className={styles.summerSchoolButtons}>
        <SummerSchoolButtons
          content={[summerSchools]}
          category={"Interacting"}
          categorySlug={"summer-schools"}
          headlines={["Summer Schools"]}
          projects={summerSchoolProjects}
        />
        <SummerSchoolButtons
          content={[learningAndDoing]}
          category={"Interacting"}
          categorySlug={"learning-and-doing"}
          headlines={["Learning & Doing Transdisciplinarity"]}
          projects={learningAndDoingProjects}
        />
      </div>
    </>
  );
}
