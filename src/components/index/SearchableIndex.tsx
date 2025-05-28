"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import styles from "@/components/index/index.module.css";
import SearchResult from "./SearchResult";
import Hamburger from "hamburger-react";
import { ImageType, PersonType, ProjectType, TextBlock } from "@/types/types";

function textFrom(
  obj: string | { _type: string; children: { text: string }[] } | undefined
): string {
  if (!obj) return "";
  if (typeof obj === "string") return obj;

  // Check if obj is an array of blocks
  if (Array.isArray(obj)) {
    return obj
      .filter((b) => b._type === "block" && b.children)
      .map((b) => b.children.map((c) => c.text).join(""))
      .join("\n");
  }

  // Check if obj is an object with a `text` field
  if (
    typeof obj === "object" &&
    "text" in obj &&
    typeof obj.text === "string"
  ) {
    return obj.text;
  }

  return "";
}

type EntryProps = {
  headerText: string;
  introtext: {
    partners: string[];
    supporters: string[];
    text: TextBlock;
  };
  text: TextBlock[];
  title: string;
};

type ProjectIntroProps = {
  image: ImageType;
  text: TextBlock;
};

type ProjectProps = {
  headline: string;
  images: ImageType[];
  slug: { current: string };
  subHeadline: string;
  text: TextBlock;
};

export default function SearchableIndex({
  openCultures,
  openPlanning,
  openFactory,
  openImaginaries,
  team,
  praxisPartners,
  advisoryBoard,
  livingLab,
  livingLabProjects,
  tml,
  tmlProjects,
  mpc,
  mpcProjects,
  summerSchools,
  summerSchoolProjects,
  conferences,
  conferencesProjects,
  printedMatter,
  printedMatterProjects,
  spokenWord,
  spokenWordProjects,
}: {
  openCultures: EntryProps;
  openPlanning: EntryProps;
  openFactory: EntryProps;
  openImaginaries: EntryProps;
  team: PersonType[];
  praxisPartners: PersonType[];
  advisoryBoard: PersonType[];
  livingLab: ProjectIntroProps;
  tml: ProjectIntroProps;
  mpc: ProjectIntroProps;
  summerSchools: ProjectIntroProps;
  conferences: ProjectIntroProps;
  printedMatter: ProjectIntroProps;
  spokenWord: ProjectIntroProps;
  livingLabProjects: ProjectProps[];
  tmlProjects: ProjectProps[];
  mpcProjects: ProjectProps[];
  summerSchoolProjects: ProjectProps[];
  conferencesProjects: ProjectProps[];
  printedMatterProjects: ProjectProps[];
  spokenWordProjects: ProjectProps[];
}) {
  const [term, setTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(1);

  const entries = useMemo(() => {
    return [
      {
        label: "Open Planning Cultures",
        category: "open-planning-culture",
        contentText: textFrom(openCultures.introtext.text),
        content: openCultures,
      },
      {
        label: "OpenPlanning",
        category: "open-planning",
        contentText: textFrom(openPlanning.introtext.text),
        content: openPlanning,
      },
      {
        label: "OpenFactoy",
        category: "open-factory",
        contentText: textFrom(openFactory.introtext.text),
        content: openFactory,
      },
      {
        label: "OpenImaginaries",
        category: "open-imaginaries",
        introtext: textFrom(openImaginaries.introtext.text),
        content: openImaginaries,
      },
      ...team.map((person: PersonType) => ({
        label: person.name || "Unnamed",
        category: "team",
        contentText: `${textFrom(person?.text)} ${person?.affiliation || ""}`,
        content: person,
      })),
      ...praxisPartners.map((person: PersonType) => ({
        label: person.name || "Unnamed",
        category: "praxis-partners",
        contentText: `${textFrom(person?.text)} ${person?.affiliation || ""}`,
        content: person,
      })),
      ...advisoryBoard.map((person: PersonType) => ({
        label: person.name || "Unnamed",
        category: "advisory-board",
        contentText: `${textFrom(person?.quote)} ${person?.affiliation || ""}`,
        content: person,
      })),
      {
        label: "LivingLab",
        category: "living-lab",
        contentText: textFrom(livingLab.text),
        content: livingLab,
      },
      ...livingLabProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "living-lab",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Transdisciplinary MethodLab",
        category: "transdisciplinary-method-lab",
        contentText: textFrom(tml.text),
        content: tml,
      },
      ...tmlProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "transdisciplinary-method-lab",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Doctoral School",
        category: "doctoral-school",
        contentText: textFrom(mpc.text),
        content: mpc,
      },
      ...mpcProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "doctoral-school",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Summer Schools",
        category: "summer-schools",
        contentText: textFrom(summerSchools.text),
        content: summerSchools,
      },
      ...summerSchoolProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "summer-schools",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Conferences",
        category: "conferences",
        contentText: textFrom(conferences.text),
        content: conferences,
      },
      ...conferencesProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "conferences",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Printed Matter",
        category: "printed-matter",
        contentText: textFrom(printedMatter.text),
        content: printedMatter,
      },
      ...printedMatterProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "printed-matter",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
      {
        label: "Spoken Word",
        category: "spoken-word",
        contentText: textFrom(spokenWord.text),
        content: spokenWord,
      },
      ...spokenWordProjects.map((entry: ProjectType) => ({
        label: entry.headline || "Unnamed",
        category: "spoken-word",
        contentText: `${textFrom(entry?.text)}`,
        content: entry,
      })),
    ];
  }, [
    openCultures,
    openPlanning,
    openFactory,
    openImaginaries,
    team,
    praxisPartners,
    advisoryBoard,
    livingLab,
    livingLabProjects,
    tml,
    tmlProjects,
    mpc,
    mpcProjects,
    summerSchools,
    summerSchoolProjects,
    conferences,
    conferencesProjects,
    printedMatter,
    printedMatterProjects,
    spokenWord,
    spokenWordProjects,
  ]);

  // Setup Fuse
  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: ["label", "introtext", "contentText"],
        threshold: 0.1,
        includeScore: true,
        includeMatches: true,
        ignoreLocation: true,
      }),
    [entries]
  );

  // Filter by search term
  const results = term
    ? fuse.search(term).map((res) => ({
        ...res.item,
        matches: res.matches,
      }))
    : entries;
  const filtered = results.slice(0, visibleCount);

  return (
    <div className={styles.searchWrapper}>
      {term && (
        <div className={styles.clearButton} onClick={() => setTerm("")}>
          <Hamburger toggled={true} size={20} />
        </div>
      )}
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          setVisibleCount(5); // reset on new search
        }}
      />

      {term &&
        filtered.map((entry) => (
          <SearchResult
            term={term}
            key={entry.label + entry.category}
            entry={entry}
          />
        ))}

      {term && results.length > visibleCount && (
        <div className={styles.loadMoreButtonWrapper}>
          <div
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className={styles.loadMoreButton}
          >
            Show more ({results.length - visibleCount})
          </div>
        </div>
      )}

      {term && !results.length && (
        <div className={styles.loadMoreButtonWrapper}>
          <div onClick={() => setTerm("")} className={styles.loadMoreButton}>
            No results / clear
          </div>
        </div>
      )}
    </div>
  );
}
