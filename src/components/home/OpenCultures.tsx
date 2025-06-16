import React from "react";
import { getOpenCultures } from "../../../sanity/sanity-utils";
import styles from "./openCultures.module.css";
import { PortableText } from "next-sanity";
import RouterComponent from "./RouterComponent";
import { TextBlock } from "@/types/types";
import Image from "next/image";

type OpenCulturesData = {
  introtext: {
    title: string;
    text: TextBlock;
    partners: { name: string; link: string; indented: boolean }[];
    partnerLogos: { asset: { url: string; _id: number } }[];
    supporters: string[];
    supporterLogos: { asset: { url: string; _id: number } }[];
  };
  headerText: string;
};

export default async function OpenCultures() {
  const openCultures: OpenCulturesData = await getOpenCultures();

  return (
    <>
      <RouterComponent section={"?"} />
      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>
          <p>{openCultures.headerText}</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.kicker}>OpenCultures</div>
          {openCultures.introtext.title}
        </div>
        <div className={styles.body}>
          <PortableText value={openCultures.introtext.text} />
        </div>
        <div className={styles.contactWrapper}>
          <div className={styles.contact}>
            <div className={styles.kicker}>Partner Institutions</div>
            <ul>
              {openCultures.introtext.partners.map((entry, i) => (
                <li
                  key={i}
                  className={styles.contactEntry}
                  style={{ paddingLeft: entry.indented ? "3em" : "0" }}
                >
                  {entry?.link ? (
                    <a href={entry?.link} target="_blank" rel="noreferrer">
                      {entry?.name} ↗
                    </a>
                  ) : (
                    entry?.name
                  )}
                </li>
              ))}
            </ul>
            {openCultures.introtext?.partnerLogos && (
              <div className={styles.logosWrapper}>
                {openCultures.introtext.partnerLogos.map((logo) => (
                  <div className={styles.logoWrapper} key={logo.asset._id}>
                    <Image
                      src={logo.asset.url}
                      width={150}
                      height={60}
                      alt={"Logo"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.contact}>
            <div className={styles.kicker}>Funded by</div>
            {openCultures.introtext?.supporterLogos && (
              <div className={styles.logosWrapper}>
                {openCultures.introtext.supporterLogos.map((logo) => (
                  <div className={styles.logoWrapper} key={logo.asset._id}>
                    <Image
                      src={logo.asset.url}
                      width={100}
                      height={60}
                      alt={"Logo"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
