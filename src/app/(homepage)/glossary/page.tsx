import IndexRow from "@/components/index/IndexRow";
import styles from "@/components/index/index.module.css";
import {
  getAdvisoryBoard,
  getConferences,
  getConferencesProjects,
  getLivingLab,
  getLivingLabProjects,
  getMPC,
  getMPCProjects,
  getOpenCultures,
  getOpenFactory,
  getOpenImaginaries,
  getOpenPlanning,
  getPerson,
  getPraxisPartners,
  getPrintedMatter,
  getPrintedMatterProjects,
  getSpokenWord,
  getSpokenWordProjects,
  getSummerSchools,
  getSummerSchoolsProjects,
  getTML,
  getTMLProjects,
} from "../../../../sanity/sanity-utils";
import SearchableIndex from "@/components/index/SearchableIndex";
import Footer from "@/components/ui/Footer";
import Wallpaper from "@/components/ui/Wallpaper";
import { Suspense } from "react";

export default async function Glossary() {
  const openCultures = await getOpenCultures();
  const openPlanning = await getOpenPlanning();
  const openFactory = await getOpenFactory();
  const openImaginaries = await getOpenImaginaries();

  const team = await getPerson();
  const praxisPartners = await getPraxisPartners();
  const advisoryBoard = await getAdvisoryBoard();

  const livingLab = await getLivingLab();
  const livingLabProjects = await getLivingLabProjects();

  const tml = await getTML();
  const tmlProjects = await getTMLProjects();
  const mpc = await getMPC();
  const mpcProjects = await getMPCProjects();
  const summerSchools = await getSummerSchools();
  const summerSchoolProjects = await getSummerSchoolsProjects();
  const conferences = await getConferences();
  const conferencesProjects = await getConferencesProjects();

  const printedMatter = await getPrintedMatter();
  const printedMatterProjects = await getPrintedMatterProjects();
  const spokenWord = await getSpokenWord();
  const spokenWordProjects = await getSpokenWordProjects();

  return (
    <>
      <main className={styles.wrapper}>
        <Suspense fallback={null}>
          <SearchableIndex
            openCultures={openCultures}
            openPlanning={openPlanning}
            openFactory={openFactory}
            openImaginaries={openImaginaries}
            team={team}
            praxisPartners={praxisPartners}
            advisoryBoard={advisoryBoard}
            livingLab={livingLab}
            livingLabProjects={livingLabProjects}
            tml={tml}
            tmlProjects={tmlProjects}
            mpc={mpc}
            mpcProjects={mpcProjects}
            summerSchools={summerSchools}
            summerSchoolProjects={summerSchoolProjects}
            conferences={conferences}
            conferencesProjects={conferencesProjects}
            printedMatter={printedMatter}
            printedMatterProjects={printedMatterProjects}
            spokenWord={spokenWord}
            spokenWordProjects={spokenWordProjects}
          />
        </Suspense>
        <Suspense fallback={null}>
          <p className={styles.section}>Climate Future Lab</p>
          <IndexRow
            label={"Open Planning Cultures. Design Principles for Transformative Spaces"}
            category="open-planning-culture"
            introtext={openCultures.introtext.text}
          />
          <p className={styles.section}>SubLabs</p>
          <IndexRow
            label={"OpenPlanning"}
            category="open-planning"
            introtext={openPlanning.introtext.text}
          />
          <IndexRow
            label={"OpenFactory"}
            category="open-factory"
            introtext={openFactory.introtext.text}
          />
          <IndexRow
            label={"OpenImaginaries"}
            category="open-imaginaries"
            introtext={openImaginaries.introtext.text}
          />
        </Suspense>
        <p className={styles.section}>People</p>
        <Suspense fallback={null}>
          <div className={styles.rows}>
            <IndexRow label={"Team"} content={team} category="team" />
            <IndexRow
              label={"Praxis Partners"}
              content={praxisPartners}
              category="praxis-partners"
            />
            <IndexRow
              label={"Advisory Board"}
              content={advisoryBoard}
              category="advisory-board"
            />
          </div>
        </Suspense>
        <p className={styles.section}>LivingLab</p>
        <Suspense fallback={null}>
          <div className={styles.rows}>
            <IndexRow
              label={"LivingLab"}
              category="living-lab"
              introtext={livingLab.text}
              content={livingLabProjects}
            />
          </div>
        </Suspense>
        <p className={styles.section}>Interacting</p>
        <Suspense fallback={null}>
          <div className={styles.rows}>
            <IndexRow
              label={"Transdisciplinary Method Lab"}
              category="transdisciplinary-method-lab"
              introtext={tml.text}
              content={tmlProjects}
            />
            <IndexRow
              label={"Doctoral School"}
              category="doctoral-school"
              introtext={mpc.text}
              content={mpcProjects}
            />
            <IndexRow
              label={"Summer Schools"}
              category="summer-schools"
              introtext={summerSchools.text}
              content={summerSchoolProjects}
            />
            <IndexRow
              label={"Public Conferences"}
              category="public-conferences"
              introtext={conferences.text}
              content={conferencesProjects}
            />
          </div>
        </Suspense>
        <p className={styles.section}>Mediating</p>
        <Suspense fallback={null}>
          <div className={styles.rows}>
            <IndexRow
              label={"Printed Matter"}
              category="printed-matter"
              introtext={printedMatter.text}
              content={printedMatterProjects}
            />
            <IndexRow
              label={"Spoken Word"}
              category="spoken-word"
              introtext={spokenWord.text}
              content={spokenWordProjects}
            />
          </div>
        </Suspense>
        <Wallpaper background={"beige"} img={""} />
      </main>
      <Footer />
    </>
  );
}
