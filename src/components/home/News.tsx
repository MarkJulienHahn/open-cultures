import React from "react";
import styles from "./news.module.css";

import { NewsType } from "@/types/types";

import { getNews, getOpenCultures } from "@/../sanity/sanity-utils";
import NewsEntryWrapper from "./NewsEntryWrapper";

export default async function News() {
  const news: NewsType[] = await getNews();
  const openCultures = await getOpenCultures();

  return (
    <div className={styles.wrapper}>
      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>
          <p>{openCultures.headerText}</p>
        </div>
      </div>
      <NewsEntryWrapper news={news} />
    </div>
  );
}
