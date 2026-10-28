"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home";
import About from "@/components/About";
import Logo from "@/components/Logo";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

type Language = "UZ" | "RU" | "EN";

export default function Home() {
  const [lang, setLang] = useState<Language>("EN");

  return (
    <main className="portfolio-bg relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.04) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} />
        <Hero lang={lang.toLowerCase() as "uz" | "en" | "ru"} />
        <Logo />
        <About lang={lang.toLowerCase() as "uz" | "en" | "ru"} />
        <Skills lang={lang.toLowerCase() as "uz" | "en" | "ru"} />
        <Projects lang={lang.toLowerCase() as "uz" | "en" | "ru"}/>
        <Contact lang={lang.toLowerCase() as "uz" | "en" | "ru"} />
      </div>
    </main>
  );
}
