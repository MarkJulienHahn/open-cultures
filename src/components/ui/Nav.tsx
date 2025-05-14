"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import styles from "./nav.module.css";
import NavButton from "./NavButton";
import { Cross as Hamburger } from "hamburger-react";
import Link from "next/link";

export default function Nav() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeSection = searchParams.get("section");

  const isHome = pathname === "/";
  const isPlanning = pathname.includes("planning");
  const isFactory = pathname.includes("factory");
  const isImaginaries = pathname.includes("imaginaries");

  const [open, setOpen] = useState(false);

  return (
    <Suspense>
      {/* DESKTOP */}
      <div className={styles.wrapper}>
        <div className={styles.topRow}>
          <div className={styles.left}>
            <NavButton
              label={"Open Cultures"}
              link={!isHome ? "/" : ""}
              style={
                isHome
                  ? "default"
                  : isPlanning
                    ? "planning"
                    : isFactory
                      ? "factory"
                      : isImaginaries
                        ? "imaginaries"
                        : "inverted"
              }
            />
          </div>
          <div className={styles.right}>
            <div>
              <NavButton
                label={"Open Planning"}
                style={
                  isHome
                    ? "planning"
                    : isPlanning
                      ? "planning__inverted muted"
                      : isFactory
                        ? "factory"
                        : isImaginaries
                          ? "imaginaries"
                          : "planning"
                }
                link={"open-planning"}
              />
              <NavButton
                label={"Open Factory"}
                style={
                  isHome
                    ? "factory"
                    : isPlanning
                      ? "planning"
                      : isFactory
                        ? "factory__inverted muted"
                        : isImaginaries
                          ? "imaginaries"
                          : "factory"
                }
                link={"open-factory"}
              />
              <NavButton
                label={"Open Imaginaries"}
                style={
                  isHome
                    ? "imaginaries"
                    : isPlanning
                      ? "planning"
                      : isFactory
                        ? "factory"
                        : isImaginaries
                          ? "imaginaries__inverted muted"
                          : "imaginaries"
                }
                link={"open-imaginaries"}
              />
            </div>
            <NavButton
              label={"Index"}
              style={
                isHome
                  ? "inverted"
                  : isPlanning
                    ? "planning"
                    : isFactory
                      ? "factory"
                      : isImaginaries
                        ? "imaginaries"
                        : "default muted"
              }
              link={"glossary"}
            />
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

      {/* MOBILE */}
      <div className={styles.mobile}>
        <div
          className={styles.menuButton}
          onClick={() => setOpen(!open)}

        >
          <span className={styles.menuBurger}>
            <Hamburger size={15} toggled={open} toggle={setOpen} />
          </span>
          <span>Open Cultures</span>
        </div>
        <div className={styles.indexButton}>
          <Link href="/glossary">
            <span>Index</span>
          </Link>
        </div>
      </div>
      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : styles.mobileClosed}`}
        onClick={() => setOpen(!open)}
      >
        {isHome ? (
          <>
            <NavButton label={"People"} style={"default"} />
            <NavButton label={"LivingLab"} style={"default"} />
            <NavButton label={"Interacting"} style={"default"} />
            <NavButton
              label={"Mediating"}
              style={"default"}
              link={!isHome ? "/?section=mediating" : ""}
            />
          </>
        ) : (
          <NavButton label={"Open Cultures"} style={"default"} link={"/"} />
        )}
        <NavButton
          label={"Open Planning"}
          style={
            isHome
              ? "planning"
              : isPlanning
                ? "planning__inverted muted"
                : isFactory
                  ? "factory"
                  : isImaginaries
                    ? "imaginaries"
                    : "planning"
          }
          link={"open-planning"}
        />
        <NavButton
          label={"Open Factory"}
          style={
            isHome
              ? "factory"
              : isPlanning
                ? "planning"
                : isFactory
                  ? "factory__inverted muted"
                  : isImaginaries
                    ? "imaginaries"
                    : "factory"
          }
          link={"open-factory"}
        />
        <NavButton
          label={"Open Imaginaries"}
          style={
            isHome
              ? "imaginaries"
              : isPlanning
                ? "planning"
                : isFactory
                  ? "factory"
                  : isImaginaries
                    ? "imaginaries__inverted muted"
                    : "imaginaries"
          }
          link={"open-imaginaries"}
        />
      </div>
    </Suspense>
  );
}
