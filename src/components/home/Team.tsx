// Team.tsx
import { PortableText } from "next-sanity";
import {
  getAdvisoryBoard,
  getPraxisPartners,
  getPerson,
  getTeam,
} from "../../../sanity/sanity-utils";

import styles from "./team.module.css";
import TeamEntryWrapper from "./TeamEntryWrapper";
import TeamButton from "./TeamButton";
import Link from "next/link";

export default async function Team() {
  const persons = await getPerson();
  const team = await getTeam();
  const advisoryBoard = await getAdvisoryBoard();
  const praxisPartners = await getPraxisPartners();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.kicker}>People</div>
          Team
        </div>
        <div className={styles.body}>
          <PortableText value={team.text} />
        </div>
      </div>
      <TeamEntryWrapper persons={persons} />
      <div className={styles.buttonsWrapper}>
        <TeamButton label={"Advisory Board"} content={advisoryBoard} />
        <TeamButton label={"Praxis Partners"} content={praxisPartners} />
      </div>
      <Link href="/glossary?category=team">
        <div className={styles.linkButton}>Show Team↗</div>
      </Link>
    </div>
  );
}
