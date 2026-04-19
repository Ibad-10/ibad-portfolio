// app/page.tsx
"use client";
import { Hero }       from "@/components/sections/Hero";
import { About }      from "@/components/sections/About";
import { Skills }     from "@/components/sections/Skills";
import { Projects }   from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { RobotDemo }  from "@/components/sections/RobotDemo";
import { Contact }    from "@/components/sections/Contact";
import { NavBar }         from "@/components/ui/NavBar";
import { PixelCursor }    from "@/components/ui/PixelCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { EasterEgg }      from "@/components/ui/EasterEgg";

export default function Home() {
  return (
    <>
      <PixelCursor />
      <ScrollProgress />
      <NavBar />
      <EasterEgg />
      <main className="snap-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Hackathons />
        <RobotDemo />
        <Contact />
      </main>
    </>
  );
}
