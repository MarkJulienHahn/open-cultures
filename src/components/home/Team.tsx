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

export default async function Team() {
  const persons = await getPerson();
  const team = await getTeam();
  const advisoryBoard = await getAdvisoryBoard();
  const praxisPartners = await getPraxisPartners();

  const generateNonOverlappingPositions = () => {
    const margin = 500; // Minimum distance in pixels
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    const pos1 = {
      top: Math.random() * (vh * 0.1),
      left: Math.random() * (vw * 0.8),
    };

    let pos2;
    do {
      pos2 = {
        top: Math.random() * (vh * 0.1),
        left: Math.random() * (vw * 0.8),
      };
    } while (
      Math.hypot(pos2.left - pos1.left, pos2.top - pos1.top) < margin
    );

    return [pos1, pos2];
  };

  // These will be recalculated on client
  const [button1Pos, button2Pos] = generateNonOverlappingPositions();

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
        <TeamButton
          label={"Advisory Board"}
          content={advisoryBoard}
          initialPosition={button1Pos}
        />
        <TeamButton
          label={"Praxis Partners"}
          content={praxisPartners}
          initialPosition={button2Pos}
        />
      </div>
    </div>
  );
}
