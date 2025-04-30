"use client";

import { useSearchParams, usePathname } from "next/navigation";
import React from "react";
import styles from "./nav.module.css";
import NavButton from "./NavButton";

export default function Nav() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeSection = searchParams.get("section");

  const isHome = pathname === "/";

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <NavButton
            label={"Open Cultures"}
            link={!isHome ? "/" : ""}
            style={isHome ? "default" : "inverted"}
          />
        </div>
        <div className={styles.right}>
          <div>
            <NavButton label={"Open Planning"} style={"planning"} />
            <NavButton label={"Open Planning"} style={"factory"} />
            <NavButton label={"Open Planning"} style={"imaginaries"} />
          </div>
          <NavButton label={"Index"} style={!isHome ? "default muted" : "inverted"} link={"glossary"} />
        </div>
      </div>

      {isHome && (
        <div className={styles.bottomRow}>
          <NavButton
            label={"People"}
            style={activeSection == "people" ? undefined : "inverted"}
          />
          <NavButton
            label={"LivingLab"}
            style={activeSection == "livingLab" ? undefined : "inverted"}
          />
          <NavButton
            label={"Interacting"}
            style={activeSection == "interacting" ? undefined : "inverted"}
          />
          <NavButton
            label={"Mediating"}
            style={activeSection == "mediating" ? undefined : "inverted"}
          />
        </div>
      )}
    </div>
  );
}
