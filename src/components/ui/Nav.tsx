"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import styles from "./nav.module.css";
import NavButton from "./NavButton";

// Suspense boundary should wrap around the useSearchParams hook
export default function Nav() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section");

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <NavButton label={"Open Cultures"} />
        </div>
        <div className={styles.right}>
          <div>
            <NavButton label={"Open Planning"} style={"planning"} />
            <NavButton label={"Open Planning"} style={"factory"} />
            <NavButton label={"Open Planning"} style={"imaginaries"} />
          </div>
          <NavButton label={"Index"} style={"inverted"} />
        </div>
      </div>

      <div className={styles.bottomRow}>
        <NavButton
          label={"People"}
          style={activeSection == "people" ? undefined : "inverted" }
        />
        <NavButton
          label={"LivingLab"}
          style={activeSection == "livingLab" ? undefined : "inverted" }
        />
        <NavButton
          label={"Interacting"}
          style={activeSection == "interacting" ? undefined : "inverted" }
        />
        <NavButton
          label={"Mediating"}
          style={activeSection == "mediating" ? undefined : "inverted" }
        />
      </div>
    </div>
  );
}
