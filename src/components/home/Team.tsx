import { PortableText } from "next-sanity";
import {
  getAdvisoryBoard,
  getPraxisPartners,
  getPerson,
  getTeam,
} from "../../../sanity/sanity-utils";

import styles from "./team.module.css";
import TeamEntryWrapper from "./TeamEntryWrapper";
import AdvisoryBoard from "./AdvisoryBoard";
import PraxisPartners from "./PraxisPartners";
import Link from "next/link";

export default async function Team() {
  const persons = await getPerson();
  const team = await getTeam();
  const advisoryBoard = await getAdvisoryBoard();
  const praxisPartners = await getPraxisPartners();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <div className={styles.kicker}>People</div>
          <PortableText value={team.text} />
        </div>
      </div>
      <TeamEntryWrapper persons={persons} />
      <div className={styles.buttonsWrapper}>
        <AdvisoryBoard label={"Advisory Board"} content={advisoryBoard} />
        <PraxisPartners label={"Praxis Partners"} content={praxisPartners} />
      </div>
      <Link href="/glossary?category=team">
        <div className={styles.linkButton}>Show Team↗</div>
      </Link>
    </div>
  );
}
