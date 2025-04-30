import News from "@/components/home/News";
import OpenCultures from "@/components/home/OpenCultures";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <News />
        <OpenCultures />
        <Team />
        <Projects />
      </Suspense>
    </main>
  );
}
