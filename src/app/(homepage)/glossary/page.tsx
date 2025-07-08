export const revalidate = 10;

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
  getLearningAndDoing,
  getLearningAndDoingProjects,
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
  const learningAndDoing = await getLearningAndDoing();
  const learningAndDoingProjects = await getLearningAndDoingProjects();
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
            learningAndDoing={learningAndDoing}
            learningAndDoingProjects={learningAndDoingProjects}
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
            label={
              "Open Planning Cultures. Design Principles for Transformative Spaces"
            }
            category="open-planning-culture"
            introtext={openCultures.introtext.text}
          />
          <p className={styles.section}>SubLabs</p>
          <IndexRow
            label={"OpenPlanning"}
            category="open-planning"
            introtext={openPlanning.introtext.text}
            subtitle={openPlanning.introtext.title}
            question={openPlanning.headerText}
            partners={openPlanning.introtext.partners}
            contact={openPlanning.introtext.contact}
          />
          <IndexRow
            label={"OpenFactory"}
            category="open-factory"
            introtext={openFactory.introtext.text}
            subtitle={openFactory.introtext.title}
            question={openFactory.headerText}
            partners={openFactory.introtext.partners}
            contact={openFactory.introtext.contact}
          />
          <IndexRow
            label={"OpenImaginaries"}
            category="open-imaginaries"
            introtext={openImaginaries.introtext.text}
            subtitle={openImaginaries.introtext.title}
            question={openImaginaries.headerText}
            partners={openImaginaries.introtext.partners}
            contact={openImaginaries.introtext.contact}
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
        {livingLabProjects && (
          <>
            <p className={styles.section}>LivingLab</p>
            <Suspense fallback={null}>
              <div className={styles.rows}>
                {livingLabProjects.map((entry, i) => (
                  <IndexRow
                    key={i}
                    label={entry.headline}
                    category={entry.slug.current}
                    introtext={entry.text}
                    subtitle={entry.subHeadline}
                    images={entry.images}
                  />
                ))}
              </div>
            </Suspense>
          </>
        )}

        <p className={styles.section}>Interacting</p>
        <Suspense fallback={null}>
          <div className={styles.rows}>
            <IndexRow
              label={"Doing Transdisciplinarity"}
              category="transdisciplinary-method-lab"
              introtext={tml.text}
              content={tmlProjects}
            />

            <IndexRow
              label={"Learning & Doing"}
              category="learning-and-doing"
              introtext={learningAndDoing.text}
              content={learningAndDoingProjects}
            />
            <IndexRow
              label={"Doctoral School"}
              category="doctoral-school"
              introtext={mpc.text}
              content={mpcProjects}
            />
            <IndexRow
              label={"Conferences"}
              category="conferences"
              introtext={conferences.text}
              content={conferencesProjects}
            />
            <IndexRow
              label={"Summer Schools"}
              category="summer-schools"
              introtext={summerSchools.text}
              content={summerSchoolProjects}
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
