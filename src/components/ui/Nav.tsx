"use client";

import { Suspense } from "react";
import NavInner from "./NavInner";

export default function Nav() {
  return (
    <Suspense fallback={null}>
      <NavInner />
    </Suspense>
  );
}
