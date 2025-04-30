import News from "@/components/home/News";
import OpenCultures from "@/components/home/OpenCultures";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";
import Wallpaper from "@/components/ui/Wallpaper";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <News />
        <OpenCultures />
        <Team />
        <Projects />
        <Wallpaper img={"/images/openCultures.png"} />
      </Suspense>
    </main>
  );
}
