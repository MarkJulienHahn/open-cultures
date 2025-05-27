import React from "react";
import styles from "./news.module.css";

import { NewsType } from "@/types/types";

import { getNews } from "@/../sanity/sanity-utils";
import NewsEntryWrapper from "./NewsEntryWrapper";

export default async function News() {
  const news: NewsType[] = await getNews();

  return (
    <div className={styles.wrapper} id={"open-cultures"}>

      <NewsEntryWrapper news={news} />
    </div>
  );
}
