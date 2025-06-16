export const revalidate = 10;

import News from "@/components/home/News";
import OpenCultures from "@/components/home/OpenCultures";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";
import Footer from "@/components/ui/Footer";
import Wallpaper from "@/components/ui/Wallpaper";

export default function Home() {
  return (
    <>
      <main>
        <OpenCultures />
        <News />
        <Team />
        <Projects />
        <Wallpaper background={"beige"} img={"/images/openCultures.png"} />
      </main>
      <Footer />
    </>
  );
}
