import News from "@/components/home/News";
import OpenCultures from "@/components/home/OpenCultures";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";

export default function Home() {
  return (
    <main>
      <News />
      <OpenCultures />
      <Team />
      <Projects />
    </main>
  );
}
