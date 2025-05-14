"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyClassSetter() {
  const pathname = usePathname();

  useEffect(() => {
    let bodyClass = "body__default";

    if (pathname.includes("planning")) {
      bodyClass = "body__planning";
    } else if (pathname.includes("factory")) {
      bodyClass = "body__factory";
    } else if (pathname.includes("imaginaries")) {
      bodyClass = "body__imaginaries";
    }

    document.body.className = bodyClass;
  }, [pathname]);

  return null;
}
