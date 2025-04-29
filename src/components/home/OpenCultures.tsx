import React from "react";
import { getOpenCultures } from "../../../sanity/sanity-utils";
import styles from "./openCultures.module.css";
import { PortableText } from "next-sanity";
import RouterComponent from "./RouterComponent";
import { TextBlock } from "@/types/types";

type OpenCulturesData = {
  introtext: {
    title: string;
    text: TextBlock;
    partners: string[];
    supporters: string[];
  };
};

export default async function OpenCultures() {
  const openCultures: OpenCulturesData = await getOpenCultures();
  return (
    <>
      <RouterComponent section={"?"} />
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.kicker}>Open Cultures</div>
          {openCultures.introtext.title}
        </div>
        <div className={styles.body}>
          <PortableText value={openCultures.introtext.text} />
        </div>
        <div className={styles.contact}>
          <h3>Partner Institutions</h3>
          <ul>
            {openCultures.introtext.partners.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
          <h3>Funded by</h3>
          <ul>
            {openCultures.introtext.supporters.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
