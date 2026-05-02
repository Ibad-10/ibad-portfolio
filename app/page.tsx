import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { Photography } from "@/components/sections/Photography";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Hackathons />
      <Photography />
      <Contact />
    </main>
  );
}
